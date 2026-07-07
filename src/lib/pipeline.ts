/**
 * Ingestion + analysis pipeline.
 *
 *   fetchAllAccounts()  — poll every tracked account, dedupe, cache to DB.
 *   analyzePending()    — run AI analysis on posts that don't have one yet.
 *   runPipeline()       — do both; used by the poll endpoint / cron job.
 *
 * Everything is defensive: a failure for one account/instance/post is logged
 * and skipped, never allowed to abort the whole run. Cached posts remain in
 * the DB so the app keeps serving even when every feed is down.
 */

import { getTrackedAccounts } from '@config/accounts';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';
import { getSource, SourceError, InstanceAttempt, SourceType } from '@/lib/sources';
import { analyzePost } from '@/lib/ai/analyze';
import { clearPostsCache } from '@/lib/cache';

/** Record a FetchLog row for each failed upstream attempt (source health). */
async function logInstanceFailures(
  handle: string,
  type: SourceType,
  attempts: InstanceAttempt[],
) {
  const failed = attempts.filter((a) => !a.ok);
  if (failed.length === 0) return;
  try {
    await prisma.fetchLog.createMany({
      data: failed.map((a) => ({
        handle,
        source: `${type}:${a.host}`,
        instance: a.instance,
        success: false,
        errorMessage: (a.error || `HTTP ${a.status ?? '?'}`).slice(0, 300),
        durationMs: a.durationMs,
      })),
    });
  } catch (err) {
    console.error('[fetch] failed to write instance failure logs:', err);
  }
}

export interface FetchSummary {
  accountsPolled: number;
  postsFound: number;
  postsNew: number;
  failures: { handle: string; error: string }[];
  durationMs: number;
}

export interface AnalyzeSummary {
  analyzed: number;
  failed: number;
  remaining: number;
  durationMs: number;
}

/** Ensure every configured account has a DB row; returns handle -> id map. */
export async function ensureAccounts(): Promise<Map<string, string>> {
  const accounts = getTrackedAccounts();
  const map = new Map<string, string>();

  for (const acc of accounts) {
    const row = await prisma.account.upsert({
      where: { handle: acc.handle },
      update: { displayName: acc.displayName },
      create: { handle: acc.handle, displayName: acc.displayName },
    });
    map.set(acc.handle.toLowerCase(), row.id);
  }
  return map;
}

/** Insert new (deduped) posts and return how many were newly added. */
async function persistPosts(
  posts: { sourcePostId: string; url: string; text: string; authorHandle: string; authorName?: string; publishedAt: Date; source: string }[],
  accountId: string,
  fallbackName: string,
): Promise<number> {
  let added = 0;
  for (const post of posts) {
    try {
      const existing = await prisma.post.findUnique({
        where: { sourcePostId: post.sourcePostId },
        select: { id: true },
      });
      if (existing) continue;
      await prisma.post.create({
        data: {
          sourcePostId: post.sourcePostId,
          url: post.url,
          text: post.text,
          authorHandle: post.authorHandle,
          authorName: post.authorName ?? fallbackName,
          publishedAt: post.publishedAt,
          source: post.source,
          accountId,
        },
      });
      added += 1;
    } catch (err) {
      console.error(`[fetch] failed to persist post ${post.sourcePostId}:`, err);
    }
  }
  return added;
}

export async function fetchAllAccounts(): Promise<FetchSummary> {
  const start = Date.now();
  const accountMap = await ensureAccounts();
  const accounts = getTrackedAccounts();

  let postsFound = 0;
  let postsNew = 0;
  const failures: { handle: string; error: string }[] = [];

  const totalSources = accounts.reduce((n, a) => n + a.sources.length, 0);
  console.log(
    `[fetch] starting poll of ${accounts.length} account(s), ${totalSources} source(s)`,
  );

  for (const acc of accounts) {
    const accountId = accountMap.get(acc.handle.toLowerCase());
    if (!accountId) continue;

    // Poll every configured source for this account (merge + dedupe).
    for (const ref of acc.sources) {
      const source = getSource(ref.type);
      if (!source) continue; // type disabled via ENABLED_SOURCES

      const attemptStart = Date.now();
      try {
        console.log(`[fetch] ${acc.handle}: trying ${ref.type} (${ref.ref})…`);
        const result = await source.fetchPosts(ref.ref, env.maxPostsPerAccount);
        postsFound += result.posts.length;

        const newForSource = await persistPosts(result.posts, accountId, acc.displayName);
        postsNew += newForSource;
        console.log(
          `[fetch] ${acc.handle}: ${result.posts.length} found, ${newForSource} new via ${result.source}`,
        );

        await prisma.fetchLog.create({
          data: {
            handle: acc.handle,
            source: result.source,
            instance: ref.ref,
            success: true,
            postsFound: result.posts.length,
            postsNew: newForSource,
            durationMs: Date.now() - attemptStart,
          },
        });
        // Record any instances that failed before one succeeded (flaky feeds).
        await logInstanceFailures(acc.handle, ref.type, result.attempts);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : String(err);
        failures.push({ handle: `${acc.handle} (${ref.type})`, error: message });

        if (err instanceof SourceError) {
          await logInstanceFailures(acc.handle, ref.type, err.attempts);
        }
        await prisma.fetchLog.create({
          data: {
            handle: acc.handle,
            source: `${ref.type}:${ref.ref}`,
            instance: ref.ref,
            success: false,
            errorMessage: message.slice(0, 500),
            durationMs: Date.now() - attemptStart,
          },
        });
      }
    }
  }

  // Always invalidate the read cache: even with 0 new posts, FetchLog changed,
  // so the status/source-health view must refresh.
  clearPostsCache();

  console.log(
    `[fetch] done: ${postsFound} found, ${postsNew} new, ${failures.length} source(s) failed in ${Date.now() - start}ms`,
  );

  return {
    accountsPolled: accounts.length,
    postsFound,
    postsNew,
    failures,
    durationMs: Date.now() - start,
  };
}

/** Analyze posts that don't yet have an Analysis row. */
export async function analyzePending(limit = 25): Promise<AnalyzeSummary> {
  const start = Date.now();

  const pending = await prisma.post.findMany({
    where: { analysis: null },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });

  let analyzed = 0;
  let failed = 0;

  for (const post of pending) {
    try {
      const result = await analyzePost({
        handle: post.authorHandle,
        authorName: post.authorName ?? undefined,
        text: post.text,
        publishedAt: post.publishedAt,
      });

      await prisma.analysis.create({
        data: {
          postId: post.id,
          summary: result.summary,
          globalMarketImpact: result.globalMarketImpact,
          cryptoImpact: result.cryptoImpact,
          impactScore: result.impactScore,
          sentiment: result.sentiment,
          tags: JSON.stringify(result.tags),
          model: result.model,
        },
      });
      analyzed += 1;
    } catch (err) {
      // On failure the post keeps analysis=null (pending) and is retried on the
      // next run — a single AI failure never crashes the pipeline.
      console.error(`[analyze] failed for post ${post.id} (left pending):`, err);
      failed += 1;
    }
  }

  if (analyzed > 0) clearPostsCache();

  const remaining = await prisma.post.count({ where: { analysis: null } });
  console.log(
    `[analyze] analyzed ${analyzed}, failed ${failed}, ${remaining} still pending`,
  );

  return { analyzed, failed, remaining, durationMs: Date.now() - start };
}

export async function runPipeline(): Promise<{
  fetch: FetchSummary;
  analyze: AnalyzeSummary;
}> {
  const fetch = await fetchAllAccounts();
  const analyze = await analyzePending();
  return { fetch, analyze };
}

/**
 * Insert clearly-labeled demo posts (deduped) and analyze them. Safe to call
 * repeatedly. By default it only seeds when the DB is empty; pass `force: true`
 * to seed regardless. Used by the admin seed endpoint and `npm run db:seed`.
 */
export async function seedDemoPosts(
  opts: { force?: boolean } = {},
): Promise<{ inserted: number; skipped: boolean; analyze: AnalyzeSummary | null }> {
  const { SAMPLES } = await import('@/lib/sample-posts');

  const existing = await prisma.post.count();
  if (existing > 0 && !opts.force) {
    return { inserted: 0, skipped: true, analyze: null };
  }

  const accountMap = await ensureAccounts();
  let inserted = 0;

  for (let i = 0; i < SAMPLES.length; i++) {
    const s = SAMPLES[i];
    const accountId = accountMap.get(s.handle.toLowerCase());
    if (!accountId) continue;

    const sourcePostId = `sample-${s.handle}-${i}`;
    const already = await prisma.post.findUnique({ where: { sourcePostId } });
    if (already) continue;

    await prisma.post.create({
      data: {
        sourcePostId,
        url: `https://x.com/${s.handle}`,
        text: s.text,
        authorHandle: s.handle,
        authorName: s.name,
        publishedAt: new Date(Date.now() - s.minutesAgo * 60_000),
        source: 'demo:seed',
        accountId,
      },
    });
    inserted += 1;
  }

  if (inserted > 0) clearPostsCache();
  const analyze = await analyzePending(SAMPLES.length);
  console.log(`[seed] inserted ${inserted} demo post(s)`);
  return { inserted, skipped: false, analyze };
}

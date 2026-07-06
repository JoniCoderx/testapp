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
import { getPostSource, SourceError, InstanceAttempt } from '@/lib/sources';
import { analyzePost } from '@/lib/ai/analyze';
import { clearPostsCache } from '@/lib/cache';

/** Record a FetchLog row for each failed instance attempt (source health). */
async function logInstanceFailures(handle: string, attempts: InstanceAttempt[]) {
  const failed = attempts.filter((a) => !a.ok);
  if (failed.length === 0) return;
  try {
    await prisma.fetchLog.createMany({
      data: failed.map((a) => ({
        handle,
        source: `nitter:${a.host}`,
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

export async function fetchAllAccounts(): Promise<FetchSummary> {
  const start = Date.now();
  const source = getPostSource();
  const accountMap = await ensureAccounts();
  const accounts = getTrackedAccounts();

  let postsFound = 0;
  let postsNew = 0;
  const failures: { handle: string; error: string }[] = [];

  for (const acc of accounts) {
    const accountId = accountMap.get(acc.handle.toLowerCase());
    if (!accountId) continue;

    const attemptStart = Date.now();
    try {
      const result = await source.fetchPostsForHandle(
        acc.handle,
        env.maxPostsPerAccount,
      );
      postsFound += result.posts.length;

      let newForHandle = 0;
      for (const post of result.posts) {
        try {
          // Dedupe by sourcePostId: only insert posts we haven't cached yet.
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
              authorName: post.authorName ?? acc.displayName,
              publishedAt: post.publishedAt,
              source: post.source,
              accountId,
            },
          });
          newForHandle += 1;
        } catch (err) {
          // A unique-constraint race just means it was inserted concurrently.
          console.error(`[fetch] failed to persist post ${post.sourcePostId}:`, err);
        }
      }
      postsNew += newForHandle;

      await prisma.fetchLog.create({
        data: {
          handle: acc.handle,
          source: result.source,
          instance: result.instance,
          success: true,
          postsFound: result.posts.length,
          postsNew: newForHandle,
          durationMs: Date.now() - attemptStart,
        },
      });
      // Also record any instances that failed before one succeeded, so the
      // source-health view reflects flaky instances even on a good run.
      await logInstanceFailures(acc.handle, result.attempts);
    } catch (err) {
      const message =
        err instanceof SourceError
          ? err.message
          : err instanceof Error
            ? err.message
            : String(err);
      failures.push({ handle: acc.handle, error: message });

      // Per-instance failure records (source health).
      if (err instanceof SourceError) {
        await logInstanceFailures(acc.handle, err.attempts);
      }

      // Per-account failure record.
      await prisma.fetchLog.create({
        data: {
          handle: acc.handle,
          success: false,
          errorMessage: message.slice(0, 500),
          durationMs: Date.now() - attemptStart,
        },
      });
    }
  }

  if (postsNew > 0) clearPostsCache();

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

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';
import { rateLimit, tooManyRequests } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const RECENT_WINDOW_MINUTES = 90;

// Short-lived cache: this aggregates several counts, and the underlying data
// only changes when the poller runs.
let cached: { body: unknown; expires: number } | null = null;
const TTL_MS = 15_000;

function startOfUtcDay(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/**
 * GET /api/status  (public, read-only)
 * Market-intelligence stats + source health derived from FetchLog. Powers the
 * dashboard stat cards and the source-status widget. Never throws — returns a
 * safe degraded payload if the database is unavailable.
 */
export async function GET(req: NextRequest) {
  const rl = rateLimit(req, 'status', { limit: 60, windowMs: 60_000 });
  if (!rl.ok) return tooManyRequests(rl);

  if (cached && cached.expires > Date.now()) {
    return NextResponse.json(cached.body, {
      headers: { 'Cache-Control': 'public, s-maxage=15', 'X-Cache': 'HIT' },
    });
  }

  const dayStart = startOfUtcDay();
  const recentSince = new Date(Date.now() - RECENT_WINDOW_MINUTES * 60_000);

  try {
    const [
      totalPosts,
      totalAnalyzed,
      highImpactToday,
      cryptoToday,
      lastSuccess,
      lastAny,
      recentSuccesses,
      recentFailures,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.analysis.count(),
      prisma.post.count({
        where: {
          publishedAt: { gte: dayStart },
          analysis: { impactScore: { gte: 61 } },
        },
      }),
      prisma.post.count({
        where: {
          publishedAt: { gte: dayStart },
          analysis: { tags: { contains: '"crypto"' } },
        },
      }),
      prisma.fetchLog.findFirst({
        where: { success: true },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true, postsNew: true },
      }),
      prisma.fetchLog.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      }),
      prisma.fetchLog.count({
        where: { success: true, createdAt: { gte: recentSince } },
      }),
      prisma.fetchLog.count({
        where: { success: false, createdAt: { gte: recentSince } },
      }),
    ]);

    // Per-instance health: for each configured instance, when did it last
    // successfully serve a fetch (source == "nitter:<host>").
    const instances = await Promise.all(
      env.nitterInstances.map(async (url) => {
        const host = url.replace(/^https?:\/\//, '');
        const last = await prisma.fetchLog.findFirst({
          where: { success: true, source: `nitter:${host}` },
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true },
        });
        const lastSuccessAt = last?.createdAt ?? null;
        const healthy =
          !!lastSuccessAt &&
          Date.now() - lastSuccessAt.getTime() < RECENT_WINDOW_MINUTES * 60_000;
        return { url, host, lastSuccessAt: lastSuccessAt?.toISOString() ?? null, healthy };
      }),
    );

    const recentAttempts = recentSuccesses + recentFailures;
    const allSourcesDown = recentAttempts > 0 && recentSuccesses === 0;

    const body = {
      ok: true,
      stats: {
        totalPosts,
        totalAnalyzed,
        pending: Math.max(0, totalPosts - totalAnalyzed),
        highImpactToday,
        cryptoToday,
        lastSuccessfulFetch: lastSuccess?.createdAt.toISOString() ?? null,
        lastFetchAt: lastAny?.createdAt.toISOString() ?? null,
      },
      sources: {
        configured: env.nitterInstances.length,
        instances,
        recent: {
          windowMinutes: RECENT_WINDOW_MINUTES,
          successes: recentSuccesses,
          failures: recentFailures,
        },
        allSourcesDown,
      },
    };

    cached = { body, expires: Date.now() + TTL_MS };
    return NextResponse.json(body, {
      headers: { 'Cache-Control': 'public, s-maxage=15', 'X-Cache': 'MISS' },
    });
  } catch (err) {
    console.error('[api/status] failed:', err);
    return NextResponse.json(
      {
        ok: false,
        degraded: true,
        error: 'Status temporarily unavailable',
        stats: null,
        sources: null,
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

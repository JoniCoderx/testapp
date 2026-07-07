import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit, tooManyRequests } from '@/lib/rate-limit';
import { cacheGet, cacheSet } from '@/lib/cache';
import { getEnabledTypes } from '@/lib/sources';

export const dynamic = 'force-dynamic';

const RECENT_WINDOW_MINUTES = 90;
// Cached via the shared read cache so the pipeline (fetch/analyze/seed) can
// invalidate it immediately after mutating data.
const STATUS_CACHE_KEY = 'status:v1';
const TTL_MS = 15_000;

function startOfUtcDay(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/** Build the always-present source list from the enabled source types. */
function baseInstances() {
  return getEnabledTypes().map((type) => ({
    url: type,
    host: type,
    lastSuccessAt: null as string | null,
    healthy: false,
  }));
}

/**
 * A safe, fully-populated payload used when the DB is unreachable or empty.
 * Everything is zeros/nulls (never absent), so the dashboard renders a clean
 * "0 / Not yet" state instead of "unavailable" or "—".
 */
function safePayload(dbConnected: boolean) {
  return {
    ok: true,
    dbConnected,
    stats: {
      totalPosts: 0,
      totalAnalyzed: 0,
      pending: 0,
      highImpactToday: 0,
      cryptoToday: 0,
      lastSuccessfulFetch: null as string | null,
      lastFetchAt: null as string | null,
    },
    sources: {
      configured: getEnabledTypes().length,
      instances: baseInstances(),
      recent: { windowMinutes: RECENT_WINDOW_MINUTES, successes: 0, failures: 0 },
      allSourcesDown: false,
    },
  };
}

/**
 * GET /api/status  (public, read-only)
 * ALWAYS returns HTTP 200 with a well-formed payload. Empty DB → zeros;
 * unreachable DB → zeros + dbConnected:false. Never crashes, never returns null
 * stats/sources.
 */
export async function GET(req: NextRequest) {
  try {
    const rl = rateLimit(req, 'status', { limit: 60, windowMs: 60_000 });
    if (!rl.ok) return tooManyRequests(rl);
  } catch {
    /* ignore limiter errors */
  }

  const hit = cacheGet(STATUS_CACHE_KEY);
  if (hit) {
    return NextResponse.json(hit, {
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
        select: { createdAt: true },
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

    // Health per enabled source TYPE (nitter, rsshub, bluesky, reddit, …).
    const instances = await Promise.all(
      getEnabledTypes().map(async (type) => {
        const last = await prisma.fetchLog.findFirst({
          where: { success: true, source: { startsWith: `${type}:` } },
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true },
        });
        const lastSuccessAt = last?.createdAt ?? null;
        const healthy =
          !!lastSuccessAt &&
          Date.now() - lastSuccessAt.getTime() < RECENT_WINDOW_MINUTES * 60_000;
        return { url: type, host: type, lastSuccessAt: lastSuccessAt?.toISOString() ?? null, healthy };
      }),
    );

    const recentAttempts = recentSuccesses + recentFailures;
    const allSourcesDown = recentAttempts > 0 && recentSuccesses === 0;

    const body = {
      ok: true,
      dbConnected: true,
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
        configured: getEnabledTypes().length,
        instances,
        recent: {
          windowMinutes: RECENT_WINDOW_MINUTES,
          successes: recentSuccesses,
          failures: recentFailures,
        },
        allSourcesDown,
      },
    };

    cacheSet(STATUS_CACHE_KEY, body, TTL_MS);
    return NextResponse.json(body, {
      headers: { 'Cache-Control': 'public, s-maxage=15', 'X-Cache': 'MISS' },
    });
  } catch (err) {
    // DB unreachable / tables missing → return a clean zeroed payload (200),
    // never null. Do not cache the degraded response.
    console.error('[api/status] failed (returning safe zeros):', err);
    return NextResponse.json(safePayload(false), {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}

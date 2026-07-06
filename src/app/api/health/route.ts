import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env, hasAi, activeModel, resolveAiProvider, isAdminConfigured } from '@/lib/env';
import { APP_VERSION } from '@/lib/version';

export const dynamic = 'force-dynamic';

/**
 * Liveness + readiness probe.
 *
 * IMPORTANT: this always returns HTTP 200 as long as the Node process is
 * serving. The database (and other subsystems) are reported in the body via
 * `checks` and an overall `status` of "ok" | "degraded". Returning 503 here
 * would cause Render's health check to mark the entire service unhealthy and
 * serve 503 to every visitor even when the app itself is fine — so we don't.
 */
export async function GET() {
  let dbOk = false;
  let postCount = 0;
  let analyzedCount = 0;
  let lastFetch: string | null = null;
  let dbError: string | null = null;
  let tablesExist = false;

  // 1) Lightweight connection check (works on sqlite + postgres).
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'database unavailable';
    console.error('[health] db connection check failed:', err);
  }

  // 2) Best-effort stats + table-existence probe.
  if (dbOk) {
    try {
      postCount = await prisma.post.count();
      analyzedCount = await prisma.analysis.count();
      const last = await prisma.fetchLog.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      });
      lastFetch = last?.createdAt.toISOString() ?? null;
      tablesExist = true;
    } catch (err) {
      // A successful SELECT 1 but a failing count usually means the tables
      // haven't been created yet (migration/db push not run).
      console.error('[health] stats query failed (tables may be missing):', err);
    }
  }

  const status = dbOk ? 'ok' : 'degraded';

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      version: APP_VERSION,
      checks: {
        database: dbOk,
        tables: tablesExist,
        ai: hasAi(),
        aiProvider: resolveAiProvider(),
        aiModel: activeModel(),
        adminConfigured: isAdminConfigured(),
        nitterInstances: env.nitterInstances.length,
      },
      stats: {
        posts: postCount,
        analyzed: analyzedCount,
        pending: Math.max(0, postCount - analyzedCount),
        lastFetch,
      },
      config: {
        pollIntervalMinutes: env.pollIntervalMinutes,
        maxPostsPerAccount: env.maxPostsPerAccount,
      },
      ...(dbError ? { error: dbError } : {}),
    },
    {
      // Always 200 so the platform health check passes while the process is up.
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}

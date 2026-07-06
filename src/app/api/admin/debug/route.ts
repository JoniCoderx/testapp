import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { env, hasAi, activeModel, resolveAiProvider } from '@/lib/env';
import { APP_VERSION } from '@/lib/version';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/debug  (admin-only)
 * Production diagnostics for the /admin console: DB connectivity, whether the
 * tables exist, row counts, the last fetch log, configured sources, and the
 * most recent error. Never throws.
 */
export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  let dbConnected = false;
  const tables: Record<string, boolean> = {
    Account: false,
    Post: false,
    Analysis: false,
    FetchLog: false,
  };
  let totalPosts = 0;
  let totalAnalyzed = 0;
  let accounts = 0;
  let lastFetchLog: unknown = null;
  let lastError: string | null = null;

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnected = true;
  } catch (err) {
    lastError = err instanceof Error ? err.message : 'DB connection failed';
  }

  // Probe each table independently so one missing table doesn't hide the rest.
  if (dbConnected) {
    try {
      accounts = await prisma.account.count();
      tables.Account = true;
    } catch (e) {
      lastError ||= errMsg(e);
    }
    try {
      totalPosts = await prisma.post.count();
      tables.Post = true;
    } catch (e) {
      lastError ||= errMsg(e);
    }
    try {
      totalAnalyzed = await prisma.analysis.count();
      tables.Analysis = true;
    } catch (e) {
      lastError ||= errMsg(e);
    }
    try {
      const last = await prisma.fetchLog.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      tables.FetchLog = true;
      lastFetchLog = last
        ? {
            success: last.success,
            handle: last.handle,
            source: last.source,
            instance: last.instance,
            postsFound: last.postsFound,
            postsNew: last.postsNew,
            errorMessage: last.errorMessage,
            createdAt: last.createdAt.toISOString(),
          }
        : null;

      const lastFail = await prisma.fetchLog.findFirst({
        where: { success: false },
        orderBy: { createdAt: 'desc' },
        select: { errorMessage: true },
      });
      if (lastFail?.errorMessage) lastError ||= lastFail.errorMessage;
    } catch (e) {
      lastError ||= errMsg(e);
    }
  }

  const tablesExist = Object.values(tables).every(Boolean);

  return NextResponse.json(
    {
      ok: true,
      dbConnected,
      tablesExist,
      tables,
      counts: {
        accounts,
        totalPosts,
        totalAnalyzed,
        pending: Math.max(0, totalPosts - totalAnalyzed),
      },
      lastFetchLog,
      nitterInstances: env.nitterInstances,
      aiConfigured: hasAi(),
      aiProvider: resolveAiProvider(),
      aiModel: activeModel(),
      demoFallback: env.demoFallback,
      nodeEnv: env.nodeEnv,
      version: APP_VERSION,
      lastError,
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  );
}

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

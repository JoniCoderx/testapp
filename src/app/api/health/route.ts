import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env, hasOpenAi, isAdminConfigured } from '@/lib/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  let dbOk = false;
  let postCount = 0;
  let analyzedCount = 0;
  let lastFetch: string | null = null;

  try {
    postCount = await prisma.post.count();
    analyzedCount = await prisma.analysis.count();
    const last = await prisma.fetchLog.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    });
    lastFetch = last?.createdAt.toISOString() ?? null;
    dbOk = true;
  } catch (err) {
    console.error('[health] db check failed:', err);
  }

  const status = dbOk ? 'ok' : 'degraded';

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      checks: {
        database: dbOk,
        openai: hasOpenAi(),
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
    },
    { status: dbOk ? 200 : 503 },
  );
}

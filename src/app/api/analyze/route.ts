import { NextRequest, NextResponse } from 'next/server';
import { analyzePending } from '@/lib/pipeline';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * POST /api/analyze
 * Runs AI analysis on posts that don't yet have one. Optional body/query
 * `limit` controls how many are processed per call (default 25).
 */
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let limit = parseInt(searchParams.get('limit') || '', 10);

  if (!Number.isFinite(limit)) {
    try {
      const body = await req.json();
      if (body && typeof body.limit === 'number') limit = body.limit;
    } catch {
      // no/invalid body — fine
    }
  }
  if (!Number.isFinite(limit) || limit <= 0) limit = 25;
  limit = Math.min(limit, 100);

  try {
    const summary = await analyzePending(limit);
    return NextResponse.json({ ok: true, ...summary });
  } catch (err) {
    console.error('[api/analyze] failed:', err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Analyze failed' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return POST(
    new NextRequest('http://local/api/analyze', { method: 'POST' }),
  );
}

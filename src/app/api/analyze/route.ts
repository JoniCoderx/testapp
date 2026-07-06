import { NextRequest, NextResponse } from 'next/server';
import { analyzePending } from '@/lib/pipeline';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * POST /api/analyze  (admin-only)
 * Runs AI analysis on posts that don't yet have one. Optional body/query
 * `limit` controls how many are processed per call (default 25, max 100).
 *
 * Auth: Authorization: Bearer <ADMIN_SECRET>  or  x-admin-secret: <ADMIN_SECRET>
 */
export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

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

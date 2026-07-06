import { NextRequest, NextResponse } from 'next/server';
import { fetchAllAccounts } from '@/lib/pipeline';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
// Fetching all accounts across multiple instances can take a while.
export const maxDuration = 60;

/**
 * POST /api/fetch  (admin-only)
 * Polls every tracked account for new posts and caches them (dedupe by
 * sourcePostId). Does not run AI analysis — call /api/analyze for that, or use
 * /api/admin/refresh to do both.
 *
 * Auth: Authorization: Bearer <ADMIN_SECRET>  or  x-admin-secret: <ADMIN_SECRET>
 */
export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const summary = await fetchAllAccounts();
    return NextResponse.json({ ok: true, ...summary });
  } catch (err) {
    console.error('[api/fetch] failed:', err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Fetch failed' },
      { status: 500 },
    );
  }
}

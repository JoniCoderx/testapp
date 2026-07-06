import { NextRequest, NextResponse } from 'next/server';
import { runPipeline } from '@/lib/pipeline';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

/**
 * POST /api/admin/refresh  (admin-only)
 * Protected end-to-end refresh: fetch all accounts, then analyze pending posts.
 * Intended to be triggered by the Render Cron Job or the /admin page.
 *
 * Auth: Authorization: Bearer <ADMIN_SECRET>  or  x-admin-secret: <ADMIN_SECRET>
 */
export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const result = await runPipeline();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('[api/admin/refresh] failed:', err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Refresh failed' },
      { status: 500 },
    );
  }
}

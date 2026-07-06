import { NextRequest, NextResponse } from 'next/server';
import { runPipeline } from '@/lib/pipeline';
import { isAuthorizedAdmin } from '@/lib/auth';
import { isAdminConfigured } from '@/lib/env';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

/**
 * POST /api/admin/refresh
 * Protected end-to-end refresh: fetch all accounts, then analyze pending posts.
 * Intended to be called by the Render Cron Job on the configured interval.
 *
 * Auth: send the ADMIN_SECRET as
 *   Authorization: Bearer <ADMIN_SECRET>   (or)   x-admin-secret: <ADMIN_SECRET>
 */
export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'ADMIN_SECRET is not configured on the server' },
      { status: 503 },
    );
  }

  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

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

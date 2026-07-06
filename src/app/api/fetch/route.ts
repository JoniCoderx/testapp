import { NextResponse } from 'next/server';
import { fetchAllAccounts } from '@/lib/pipeline';

export const dynamic = 'force-dynamic';
// Fetching all accounts across multiple instances can take a while.
export const maxDuration = 60;

/**
 * POST /api/fetch
 * Polls every tracked account for new posts and caches them (dedupe by
 * sourcePostId). Does not run AI analysis — call /api/analyze for that, or use
 * /api/admin/refresh to do both.
 */
export async function POST() {
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

// Allow GET for convenience / uptime pings, but keep POST as the canonical verb.
export async function GET() {
  return POST();
}

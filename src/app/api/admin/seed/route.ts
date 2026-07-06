import { NextRequest, NextResponse } from 'next/server';
import { seedDemoPosts } from '@/lib/pipeline';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * POST /api/admin/seed  (admin-only)
 * Seed clearly-labeled demo posts so a fresh deployment isn't empty. By default
 * only seeds when the DB is empty; pass ?force=true to seed regardless.
 * Deduped by sourcePostId; analyzes the seeded posts.
 */
export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const force = /^(1|true|yes)$/i.test(
    new URL(req.url).searchParams.get('force') || '',
  );

  try {
    const result = await seedDemoPosts({ force });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('[api/admin/seed] failed:', err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Seed failed' },
      { status: 500 },
    );
  }
}

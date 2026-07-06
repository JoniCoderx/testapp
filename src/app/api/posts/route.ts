import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { serializePost } from '@/lib/serialize';

export const dynamic = 'force-dynamic';

const FILTERS = new Set([
  'all',
  'crypto',
  'stocks',
  'geopolitics',
  'high-impact',
  'bearish',
  'bullish',
]);

/**
 * GET /api/posts
 * Query params:
 *   filter  = all | crypto | stocks | geopolitics | high-impact | bearish | bullish
 *   search  = free-text search across post text / author / summary
 *   sort    = newest | impact
 *   limit   = max rows (default 60, capped at 200)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = (searchParams.get('filter') || 'all').toLowerCase();
  const search = (searchParams.get('search') || '').trim();
  const sort = (searchParams.get('sort') || 'newest').toLowerCase();
  const limit = Math.min(
    Math.max(parseInt(searchParams.get('limit') || '60', 10) || 60, 1),
    200,
  );

  const activeFilter = FILTERS.has(filter) ? filter : 'all';
  const where: Prisma.PostWhereInput = {};
  const and: Prisma.PostWhereInput[] = [];

  // Filters that depend on analysis fields.
  switch (activeFilter) {
    case 'crypto':
      and.push({ analysis: { tags: { contains: '"crypto"' } } });
      break;
    case 'stocks':
      and.push({ analysis: { tags: { contains: '"stocks"' } } });
      break;
    case 'geopolitics':
      and.push({ analysis: { tags: { contains: '"geopolitics"' } } });
      break;
    case 'high-impact':
      and.push({ analysis: { impactScore: { gte: 60 } } });
      break;
    case 'bearish':
      and.push({ analysis: { sentiment: 'bearish' } });
      break;
    case 'bullish':
      and.push({ analysis: { sentiment: 'bullish' } });
      break;
  }

  if (search) {
    and.push({
      OR: [
        { text: { contains: search } },
        { authorHandle: { contains: search } },
        { authorName: { contains: search } },
        { analysis: { summary: { contains: search } } },
      ],
    });
  }

  if (and.length) where.AND = and;

  const orderBy: Prisma.PostOrderByWithRelationInput[] =
    sort === 'impact'
      ? [{ analysis: { impactScore: 'desc' } }, { publishedAt: 'desc' }]
      : [{ publishedAt: 'desc' }];

  try {
    const posts = await prisma.post.findMany({
      where,
      orderBy,
      take: limit,
      include: { analysis: true },
    });

    return NextResponse.json({
      count: posts.length,
      filter: activeFilter,
      sort: sort === 'impact' ? 'impact' : 'newest',
      posts: posts.map(serializePost),
    });
  } catch (err) {
    console.error('[api/posts] query failed:', err);
    return NextResponse.json(
      { error: 'Failed to load posts', posts: [], count: 0 },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { serializePost } from '@/lib/serialize';
import { rateLimit, tooManyRequests } from '@/lib/rate-limit';
import { VALID_TAGS } from '@/lib/ai/analyze';
import { cacheGet, cacheSet } from '@/lib/cache';

export const dynamic = 'force-dynamic';

// Chip filters exposed in the UI.
const FILTERS = new Set([
  'all',
  'crypto',
  'global',
  'stocks',
  'geopolitics',
  'high-impact',
  'bearish',
  'bullish',
]);
const SENTIMENTS = new Set(['bullish', 'bearish', 'neutral', 'mixed']);
const TAGS = new Set<string>(VALID_TAGS);
// Tags that broadly indicate global-market relevance.
const GLOBAL_TAGS = ['macro', 'stocks', 'commodities', 'energy', 'geopolitics'];

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;

// A short-lived in-memory read cache (see src/lib/cache.ts) shields the DB from
// bursty reads. Data only changes when the poller runs (~every 15 min), so a
// short TTL is safe; the pipeline also clears it after a successful refresh.

/**
 * GET /api/posts  (public, read-only, rate-limited, cached)
 *
 * Query params (all optional, all validated):
 *   filter    = all | crypto | global | stocks | geopolitics | high-impact | bearish | bullish
 *   tag       = one of the signal tags (crypto, stocks, macro, …)
 *   sentiment = bullish | bearish | neutral | mixed
 *   minImpact = 0–100 minimum impact score
 *   search    = free-text (post text / author / summary), max 120 chars
 *   sort      = newest | impact
 *   limit     = page size (default 30, capped at 100)
 *   cursor    = opaque cursor (a post id) from a previous response's nextCursor
 *
 * Returns: { count, filter, sort, hasMore, nextCursor, posts }
 */
export async function GET(req: NextRequest) {
  const rl = rateLimit(req, 'posts', { limit: 120, windowMs: 60_000 });
  if (!rl.ok) return tooManyRequests(rl);

  const { searchParams } = new URL(req.url);

  const filterRaw = (searchParams.get('filter') || 'all').toLowerCase();
  const activeFilter = FILTERS.has(filterRaw) ? filterRaw : 'all';

  const search = (searchParams.get('search') || '').trim().slice(0, 120);

  const sort =
    (searchParams.get('sort') || 'newest').toLowerCase() === 'impact'
      ? 'impact'
      : 'newest';

  const limit = Math.min(
    Math.max(
      parseInt(searchParams.get('limit') || String(DEFAULT_LIMIT), 10) ||
        DEFAULT_LIMIT,
      1,
    ),
    MAX_LIMIT,
  );

  const cursor = (searchParams.get('cursor') || '').trim() || undefined;

  const tagRaw = (searchParams.get('tag') || '').toLowerCase().trim();
  const tag = TAGS.has(tagRaw) ? tagRaw : undefined;

  const sentimentRaw = (searchParams.get('sentiment') || '').toLowerCase().trim();
  const sentiment = SENTIMENTS.has(sentimentRaw) ? sentimentRaw : undefined;

  const minImpactParsed = parseInt(searchParams.get('minImpact') || '', 10);
  const minImpact = Number.isFinite(minImpactParsed)
    ? Math.min(100, Math.max(0, minImpactParsed))
    : undefined;

  const cacheKey = JSON.stringify({
    activeFilter,
    search,
    sort,
    limit,
    cursor,
    tag,
    sentiment,
    minImpact,
  });
  const cached = cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'X-Cache': 'HIT',
      },
    });
  }

  const and: Prisma.PostWhereInput[] = [];

  // Chip filter.
  switch (activeFilter) {
    case 'crypto':
      and.push({ analysis: { tags: { contains: '"crypto"' } } });
      break;
    case 'global':
      and.push({
        OR: GLOBAL_TAGS.map((t) => ({
          analysis: { tags: { contains: `"${t}"` } },
        })),
      });
      break;
    case 'stocks':
      and.push({ analysis: { tags: { contains: '"stocks"' } } });
      break;
    case 'geopolitics':
      and.push({ analysis: { tags: { contains: '"geopolitics"' } } });
      break;
    case 'high-impact':
      and.push({ analysis: { impactScore: { gte: 61 } } });
      break;
    case 'bearish':
      and.push({ analysis: { sentiment: 'bearish' } });
      break;
    case 'bullish':
      and.push({ analysis: { sentiment: 'bullish' } });
      break;
  }

  // Granular params (compose with the chip filter).
  if (tag) and.push({ analysis: { tags: { contains: `"${tag}"` } } });
  if (sentiment) and.push({ analysis: { sentiment } });
  if (minImpact !== undefined)
    and.push({ analysis: { impactScore: { gte: minImpact } } });

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

  const where: Prisma.PostWhereInput = and.length ? { AND: and } : {};

  // Deterministic ordering with `id` as the final tiebreaker so cursor
  // pagination is stable and never skips/duplicates rows.
  const orderBy: Prisma.PostOrderByWithRelationInput[] =
    sort === 'impact'
      ? [{ analysis: { impactScore: 'desc' } }, { publishedAt: 'desc' }, { id: 'desc' }]
      : [{ publishedAt: 'desc' }, { id: 'desc' }];

  try {
    const rows = await prisma.post.findMany({
      where,
      orderBy,
      take: limit + 1, // fetch one extra to detect a next page
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      include: { analysis: true },
    });

    const hasMore = rows.length > limit;
    const page = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore ? page[page.length - 1]?.id ?? null : null;

    const body = {
      count: page.length,
      filter: activeFilter,
      sort,
      hasMore,
      nextCursor,
      posts: page.map(serializePost),
    };

    cacheSet(cacheKey, body);

    return NextResponse.json(body, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'X-Cache': 'MISS',
      },
    });
  } catch (err) {
    console.error('[api/posts] query failed:', err);
    return NextResponse.json(
      {
        error: 'Failed to load posts',
        posts: [],
        count: 0,
        hasMore: false,
        nextCursor: null,
      },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

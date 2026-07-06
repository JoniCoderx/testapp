import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { serializePost } from '@/lib/serialize';
import { rateLimit, tooManyRequests } from '@/lib/rate-limit';
import { VALID_TAGS } from '@/lib/ai/analyze';
import { cacheGet, cacheSet } from '@/lib/cache';
import { env } from '@/lib/env';
import { getSamplePosts } from '@/lib/sample-posts';

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
const GLOBAL_TAGS = ['macro', 'stocks', 'commodities', 'energy', 'geopolitics'];

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;

interface ParsedParams {
  activeFilter: string;
  search: string;
  sort: 'newest' | 'impact';
  limit: number;
  cursor?: string;
  tag?: string;
  sentiment?: string;
  minImpact?: number;
}

/** Parse + validate query params. Never throws — always yields safe defaults. */
function parseParams(searchParams: URLSearchParams): ParsedParams {
  const num = (v: string | null): number => {
    const n = parseInt(v ?? '', 10);
    return Number.isFinite(n) ? n : NaN;
  };

  const filterRaw = (searchParams.get('filter') || 'all').toLowerCase();
  const tagRaw = (searchParams.get('tag') || '').toLowerCase().trim();
  const sentimentRaw = (searchParams.get('sentiment') || '').toLowerCase().trim();
  const minImpactParsed = num(searchParams.get('minImpact'));

  const limitParsed = num(searchParams.get('limit'));
  const limit = Math.min(
    Math.max(Number.isFinite(limitParsed) ? limitParsed : DEFAULT_LIMIT, 1),
    MAX_LIMIT,
  );

  return {
    activeFilter: FILTERS.has(filterRaw) ? filterRaw : 'all',
    search: (searchParams.get('search') || '').trim().slice(0, 120),
    sort:
      (searchParams.get('sort') || 'newest').toLowerCase() === 'impact'
        ? 'impact'
        : 'newest',
    limit,
    cursor: (searchParams.get('cursor') || '').trim() || undefined,
    tag: TAGS.has(tagRaw) ? tagRaw : undefined,
    sentiment: SENTIMENTS.has(sentimentRaw) ? sentimentRaw : undefined,
    minImpact: Number.isFinite(minImpactParsed)
      ? Math.min(100, Math.max(0, minImpactParsed))
      : undefined,
  };
}

function buildWhere(p: ParsedParams): Prisma.PostWhereInput {
  const and: Prisma.PostWhereInput[] = [];

  switch (p.activeFilter) {
    case 'crypto':
      and.push({ analysis: { tags: { contains: '"crypto"' } } });
      break;
    case 'global':
      and.push({
        OR: GLOBAL_TAGS.map((t) => ({ analysis: { tags: { contains: `"${t}"` } } })),
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

  if (p.tag) and.push({ analysis: { tags: { contains: `"${p.tag}"` } } });
  if (p.sentiment) and.push({ analysis: { sentiment: p.sentiment } });
  if (p.minImpact !== undefined)
    and.push({ analysis: { impactScore: { gte: p.minImpact } } });

  if (p.search) {
    and.push({
      OR: [
        { text: { contains: p.search } },
        { authorHandle: { contains: p.search } },
        { authorName: { contains: p.search } },
        { analysis: { summary: { contains: p.search } } },
      ],
    });
  }

  return and.length ? { AND: and } : {};
}

/** True when the request has no filters/cursor (i.e. the default feed view). */
function isDefaultView(p: ParsedParams): boolean {
  return (
    !p.cursor &&
    p.activeFilter === 'all' &&
    !p.search &&
    !p.tag &&
    !p.sentiment &&
    p.minImpact === undefined
  );
}

function demoBody(limit: number) {
  const posts = getSamplePosts().slice(0, limit);
  return {
    count: posts.length,
    filter: 'all',
    sort: 'newest',
    hasMore: false,
    nextCursor: null,
    demo: true,
    posts,
  };
}

function safeError(message: string, p?: ParsedParams) {
  // If demo mode is enabled and this is the default view, serve labeled demo
  // posts even when the DB is unreachable — so the dashboard is never blank.
  if (env.demoFallback && p && isDefaultView(p)) {
    return NextResponse.json(demoBody(p.limit), {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
  // Otherwise a safe, dashboard-friendly empty payload (HTTP 200) so the client
  // renders an empty/degraded state instead of a hard "Server responded 500".
  return NextResponse.json(
    {
      posts: [],
      count: 0,
      hasMore: false,
      nextCursor: null,
      error: message,
      degraded: true,
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  );
}

/**
 * GET /api/posts  (public, read-only, rate-limited, cached)
 * Bulletproof: invalid params fall back to defaults; any DB/query error returns
 * a safe empty JSON payload (HTTP 200) with an `error` field — it never throws a
 * 500 at the dashboard.
 */
export async function GET(req: NextRequest) {
  // Rate limiting must itself never crash the route.
  try {
    const rl = rateLimit(req, 'posts', { limit: 120, windowMs: 60_000 });
    if (!rl.ok) return tooManyRequests(rl);
  } catch {
    /* ignore limiter errors */
  }

  let p: ParsedParams;
  try {
    p = parseParams(new URL(req.url).searchParams);
  } catch {
    p = { activeFilter: 'all', search: '', sort: 'newest', limit: DEFAULT_LIMIT };
  }

  const cacheKey = JSON.stringify(p);
  try {
    const cached = cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
          'X-Cache': 'HIT',
        },
      });
    }
  } catch {
    /* cache miss on error */
  }

  const where = buildWhere(p);
  const orderBy: Prisma.PostOrderByWithRelationInput[] =
    p.sort === 'impact'
      ? [{ analysis: { impactScore: 'desc' } }, { publishedAt: 'desc' }, { id: 'desc' }]
      : [{ publishedAt: 'desc' }, { id: 'desc' }];

  const runQuery = (withCursor: boolean) =>
    prisma.post.findMany({
      where,
      orderBy,
      take: p.limit + 1,
      include: { analysis: true },
      ...(withCursor && p.cursor ? { cursor: { id: p.cursor }, skip: 1 } : {}),
    });

  let rows;
  try {
    rows = await runQuery(true);
  } catch (err) {
    // Most common causes here: an invalid/stale cursor, or the DB/table not
    // being reachable. Retry once without the cursor before giving up.
    console.error('[api/posts] query failed:', err);
    if (p.cursor) {
      try {
        rows = await runQuery(false);
      } catch (err2) {
        console.error('[api/posts] retry without cursor failed:', err2);
        return safeError('The signals database is temporarily unavailable.', p);
      }
    } else {
      return safeError('The signals database is temporarily unavailable.', p);
    }
  }

  try {
    const hasMore = rows.length > p.limit;
    const page = hasMore ? rows.slice(0, p.limit) : rows;
    let posts = page.map(serializePost);

    // Emergency demo fallback: empty DB + DEMO_FALLBACK + default view → serve
    // clearly-labeled sample posts so the dashboard is never blank on a fresh
    // deployment (the "demo" flag drives a banner in the UI).
    let demo = false;
    if (posts.length === 0 && env.demoFallback && isDefaultView(p)) {
      try {
        const total = await prisma.post.count();
        if (total === 0) {
          posts = getSamplePosts().slice(0, p.limit);
          demo = true;
        }
      } catch {
        posts = getSamplePosts().slice(0, p.limit);
        demo = true;
      }
    }

    const body = {
      count: posts.length,
      filter: p.activeFilter,
      sort: p.sort,
      hasMore: demo ? false : hasMore,
      nextCursor: demo || !hasMore ? null : page[page.length - 1]?.id ?? null,
      demo,
      posts,
    };

    try {
      if (!demo) cacheSet(cacheKey, body);
    } catch {
      /* non-fatal */
    }

    return NextResponse.json(body, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'X-Cache': 'MISS',
      },
    });
  } catch (err) {
    console.error('[api/posts] serialization failed:', err);
    return safeError('Failed to render signals.');
  }
}

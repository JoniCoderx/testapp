import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, tooManyRequests } from '@/lib/rate-limit';
import { getMarketNews } from '@/lib/finnhub';

export const dynamic = 'force-dynamic';

/**
 * GET /api/market-news?category=general&limit=30  (public, read-only)
 *
 * Live market headlines from Finnhub (server-side; the API key never reaches
 * the browser). Falls back to clearly-labeled demo data when FINNHUB_API_KEY is
 * unset or the upstream call fails — this route never throws a 500.
 */
export async function GET(req: NextRequest) {
  try {
    const rl = rateLimit(req, 'market-news', { limit: 120, windowMs: 60_000 });
    if (!rl.ok) return tooManyRequests(rl);
  } catch {
    /* ignore limiter errors */
  }

  let category = 'general';
  let limit = 30;
  try {
    const sp = new URL(req.url).searchParams;
    category = (sp.get('category') || 'general').toLowerCase().trim();
    const n = parseInt(sp.get('limit') || '', 10);
    if (Number.isFinite(n)) limit = Math.min(50, Math.max(1, n));
  } catch {
    /* keep defaults */
  }

  try {
    const res = await getMarketNews(category, limit);
    return NextResponse.json(
      { news: res.data, demo: res.demo, error: res.error ?? null, cachedAt: res.cachedAt },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      },
    );
  } catch (err) {
    console.error('[api/market-news] failed:', err);
    return NextResponse.json(
      { news: [], demo: true, error: 'Market news temporarily unavailable.', cachedAt: null },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

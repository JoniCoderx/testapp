import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, tooManyRequests } from '@/lib/rate-limit';
import { getCompanyNews } from '@/lib/finnhub';

export const dynamic = 'force-dynamic';

/**
 * GET /api/company-news?symbol=AAPL&days=7&limit=20  (public, read-only)
 *
 * Company-specific headlines from Finnhub (server-side key). Missing key or
 * upstream failure yields clearly-labeled demo data — never a 500.
 */
export async function GET(req: NextRequest) {
  try {
    const rl = rateLimit(req, 'company-news', { limit: 120, windowMs: 60_000 });
    if (!rl.ok) return tooManyRequests(rl);
  } catch {
    /* ignore limiter errors */
  }

  let symbol = '';
  let days = 7;
  let limit = 20;
  try {
    const sp = new URL(req.url).searchParams;
    symbol = (sp.get('symbol') || '').trim();
    const d = parseInt(sp.get('days') || '', 10);
    if (Number.isFinite(d)) days = Math.min(30, Math.max(1, d));
    const n = parseInt(sp.get('limit') || '', 10);
    if (Number.isFinite(n)) limit = Math.min(50, Math.max(1, n));
  } catch {
    /* keep defaults */
  }

  if (!symbol) {
    return NextResponse.json(
      { news: [], demo: false, error: 'A `symbol` query parameter is required.', cachedAt: null },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const res = await getCompanyNews(symbol, days, limit);
    return NextResponse.json(
      { symbol: symbol.toUpperCase(), news: res.data, demo: res.demo, error: res.error ?? null, cachedAt: res.cachedAt },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      },
    );
  } catch (err) {
    console.error('[api/company-news] failed:', err);
    return NextResponse.json(
      { news: [], demo: true, error: 'Company news temporarily unavailable.', cachedAt: null },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, tooManyRequests } from '@/lib/rate-limit';
import { getSentiment } from '@/lib/finnhub';

export const dynamic = 'force-dynamic';

/**
 * GET /api/sentiment?symbol=AAPL  (public, read-only)
 *
 * News sentiment from Finnhub. This endpoint is premium on Finnhub's free tier,
 * so when it is unavailable the response carries `supported: false` alongside
 * clearly-labeled demo values — the route never throws a 500.
 */
export async function GET(req: NextRequest) {
  try {
    const rl = rateLimit(req, 'sentiment', { limit: 120, windowMs: 60_000 });
    if (!rl.ok) return tooManyRequests(rl);
  } catch {
    /* ignore limiter errors */
  }

  let symbol = '';
  try {
    const sp = new URL(req.url).searchParams;
    symbol = (sp.get('symbol') || '').trim();
  } catch {
    /* keep default */
  }

  if (!symbol) {
    return NextResponse.json(
      { sentiment: null, demo: false, error: 'A `symbol` query parameter is required.', cachedAt: null },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const res = await getSentiment(symbol);
    return NextResponse.json(
      { sentiment: res.data, demo: res.demo, error: res.error ?? null, cachedAt: res.cachedAt },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      },
    );
  } catch (err) {
    console.error('[api/sentiment] failed:', err);
    return NextResponse.json(
      { sentiment: null, demo: true, error: 'Sentiment temporarily unavailable.', cachedAt: null },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

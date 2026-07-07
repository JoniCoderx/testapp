import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, tooManyRequests } from '@/lib/rate-limit';
import { getQuotes } from '@/lib/finnhub';

export const dynamic = 'force-dynamic';

// Default watchlist when no symbols are supplied.
const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'GOOGL', 'META', 'SPY'];

/**
 * GET /api/quote?symbols=AAPL,MSFT  (public, read-only)
 *
 * Real-time quotes from Finnhub (server-side key). Missing key or upstream
 * failure yields clearly-labeled demo quotes — never a 500.
 */
export async function GET(req: NextRequest) {
  try {
    const rl = rateLimit(req, 'quote', { limit: 180, windowMs: 60_000 });
    if (!rl.ok) return tooManyRequests(rl);
  } catch {
    /* ignore limiter errors */
  }

  let symbols = DEFAULT_SYMBOLS;
  try {
    const sp = new URL(req.url).searchParams;
    const raw = (sp.get('symbols') || sp.get('symbol') || '').trim();
    if (raw) {
      const parsed = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (parsed.length) symbols = parsed;
    }
  } catch {
    /* keep defaults */
  }

  try {
    const res = await getQuotes(symbols);
    return NextResponse.json(
      { quotes: res.data, demo: res.demo, error: res.error ?? null, cachedAt: res.cachedAt },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      },
    );
  } catch (err) {
    console.error('[api/quote] failed:', err);
    return NextResponse.json(
      { quotes: [], demo: true, error: 'Quotes temporarily unavailable.', cachedAt: null },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

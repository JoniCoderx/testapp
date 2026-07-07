/**
 * Finnhub market/news data provider — SERVER-SIDE ONLY.
 *
 * Reads FINNHUB_API_KEY from the environment and is imported exclusively by
 * /api routes, so the key is never shipped to the browser. Every call is
 * cached in-memory (TTL per endpoint) to stay within Finnhub's rate limits,
 * and every function returns clean, clearly-labeled DEMO data when the key is
 * missing or the upstream request fails — the app never crashes on this.
 */

const BASE = 'https://finnhub.io/api/v1';
const TIMEOUT_MS = 10_000;

function apiKey(): string {
  return (process.env.FINNHUB_API_KEY || '').trim();
}

export function hasFinnhub(): boolean {
  return apiKey().length > 0;
}

// --- normalized shapes ------------------------------------------------------
export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  url: string;
  datetime: string; // ISO
  image: string | null;
  related: string | null;
  category: string | null;
}

export interface Quote {
  symbol: string;
  current: number;
  change: number;
  percent: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
}

export interface Sentiment {
  symbol: string;
  supported: boolean;
  bullishPercent: number;
  bearishPercent: number;
  companyNewsScore: number | null;
  articlesLastWeek: number | null;
}

export interface Result<T> {
  data: T;
  demo: boolean;
  error?: string;
  cachedAt: string;
}

// --- tiny TTL cache ---------------------------------------------------------
const cache = new Map<string, { expires: number; value: unknown }>();

function cacheGet<T>(key: string): T | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (hit.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return hit.value as T;
}

function cacheSet(key: string, value: unknown, ttlMs: number) {
  if (cache.size > 500) cache.clear();
  cache.set(key, { value, expires: Date.now() + ttlMs });
}

async function finnhubGet<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const sep = path.includes('?') ? '&' : '?';
    const res = await fetch(`${BASE}${path}${sep}token=${apiKey()}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (res.status === 401 || res.status === 403) {
      throw new Error(`finnhub ${res.status} (key invalid or premium endpoint)`);
    }
    if (res.status === 429) throw new Error('finnhub rate limit (429)');
    if (!res.ok) throw new Error(`finnhub HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

function iso(secOrMs?: number): string {
  if (!secOrMs) return new Date().toISOString();
  // Finnhub uses seconds; guard against ms just in case.
  const ms = secOrMs > 1e12 ? secOrMs : secOrMs * 1000;
  const d = new Date(ms);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function ok<T>(data: T, demo = false, error?: string): Result<T> {
  return { data, demo, error, cachedAt: new Date().toISOString() };
}

// ---------------------------------------------------------------------------
// Market news
// ---------------------------------------------------------------------------
const NEWS_CATEGORIES = new Set(['general', 'forex', 'crypto', 'merger']);

export async function getMarketNews(
  category = 'general',
  limit = 30,
): Promise<Result<NewsItem[]>> {
  const cat = NEWS_CATEGORIES.has(category) ? category : 'general';
  const key = `news:${cat}`;
  const cached = cacheGet<Result<NewsItem[]>>(key);
  if (cached) return cached;

  if (!hasFinnhub()) {
    const res = ok(demoNews(cat).slice(0, limit), true);
    cacheSet(key, res, 60_000);
    return res;
  }
  try {
    const raw = await finnhubGet<RawNews[]>(`/news?category=${cat}`);
    const news = normalizeNews(raw).slice(0, limit);
    const res = news.length ? ok(news) : ok(demoNews(cat).slice(0, limit), true);
    cacheSet(key, res, 5 * 60_000);
    return res;
  } catch (err) {
    const res = ok(demoNews(cat).slice(0, limit), true, msg(err));
    cacheSet(key, res, 60_000);
    return res;
  }
}

// ---------------------------------------------------------------------------
// Quotes (single or batch)
// ---------------------------------------------------------------------------
export async function getQuotes(symbols: string[]): Promise<Result<Quote[]>> {
  const clean = symbols
    .map((s) => s.toUpperCase().replace(/[^A-Z0-9.:\-]/g, '').slice(0, 20))
    .filter(Boolean)
    .slice(0, 12);
  if (clean.length === 0) return ok([], hasFinnhub() ? false : true);

  const key = `quotes:${clean.join(',')}`;
  const cached = cacheGet<Result<Quote[]>>(key);
  if (cached) return cached;

  if (!hasFinnhub()) {
    const res = ok(clean.map(demoQuote), true);
    cacheSet(key, res, 20_000);
    return res;
  }
  try {
    const quotes = await Promise.all(
      clean.map(async (symbol) => {
        try {
          const q = await finnhubGet<RawQuote>(`/quote?symbol=${encodeURIComponent(symbol)}`);
          if (!q || typeof q.c !== 'number' || q.c === 0) return demoQuote(symbol);
          return {
            symbol,
            current: q.c,
            change: q.d ?? 0,
            percent: q.dp ?? 0,
            high: q.h ?? q.c,
            low: q.l ?? q.c,
            open: q.o ?? q.c,
            prevClose: q.pc ?? q.c,
          } as Quote;
        } catch {
          return demoQuote(symbol);
        }
      }),
    );
    const anyReal = quotes.some((q, i) => q.current !== demoQuote(clean[i]).current);
    const res = ok(quotes, !anyReal);
    cacheSet(key, res, 30_000);
    return res;
  } catch (err) {
    const res = ok(clean.map(demoQuote), true, msg(err));
    cacheSet(key, res, 20_000);
    return res;
  }
}

// ---------------------------------------------------------------------------
// Company news
// ---------------------------------------------------------------------------
export async function getCompanyNews(
  symbol: string,
  days = 7,
  limit = 20,
): Promise<Result<NewsItem[]>> {
  const sym = symbol.toUpperCase().replace(/[^A-Z0-9.\-]/g, '').slice(0, 12);
  if (!sym) return ok([], !hasFinnhub());
  const key = `cnews:${sym}:${days}`;
  const cached = cacheGet<Result<NewsItem[]>>(key);
  if (cached) return cached;

  if (!hasFinnhub()) {
    const res = ok(demoCompanyNews(sym).slice(0, limit), true);
    cacheSet(key, res, 60_000);
    return res;
  }
  try {
    const to = new Date();
    const from = new Date(Date.now() - days * 86_400_000);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    const raw = await finnhubGet<RawNews[]>(
      `/company-news?symbol=${encodeURIComponent(sym)}&from=${fmt(from)}&to=${fmt(to)}`,
    );
    const news = normalizeNews(raw).slice(0, limit);
    const res = news.length ? ok(news) : ok(demoCompanyNews(sym).slice(0, limit), true);
    cacheSet(key, res, 10 * 60_000);
    return res;
  } catch (err) {
    const res = ok(demoCompanyNews(sym).slice(0, limit), true, msg(err));
    cacheSet(key, res, 60_000);
    return res;
  }
}

// ---------------------------------------------------------------------------
// News sentiment (premium on Finnhub free tier → graceful "unsupported")
// ---------------------------------------------------------------------------
export async function getSentiment(symbol: string): Promise<Result<Sentiment>> {
  const sym = symbol.toUpperCase().replace(/[^A-Z0-9.\-]/g, '').slice(0, 12);
  if (!sym) return ok(demoSentiment('') , !hasFinnhub());
  const key = `sent:${sym}`;
  const cached = cacheGet<Result<Sentiment>>(key);
  if (cached) return cached;

  if (!hasFinnhub()) {
    const res = ok(demoSentiment(sym), true);
    cacheSet(key, res, 60_000);
    return res;
  }
  try {
    const raw = await finnhubGet<RawSentiment>(`/news-sentiment?symbol=${encodeURIComponent(sym)}`);
    const s: Sentiment = {
      symbol: sym,
      supported: true,
      bullishPercent: Math.round((raw?.sentiment?.bullishPercent ?? 0) * 100),
      bearishPercent: Math.round((raw?.sentiment?.bearishPercent ?? 0) * 100),
      companyNewsScore: raw?.companyNewsScore ?? null,
      articlesLastWeek: raw?.buzz?.articlesInLastWeek ?? null,
    };
    const res = ok(s);
    cacheSet(key, res, 15 * 60_000);
    return res;
  } catch (err) {
    // 401/403 → endpoint not available on this plan. Return demo, supported=false.
    const res = ok({ ...demoSentiment(sym), supported: false }, true, msg(err));
    cacheSet(key, res, 5 * 60_000);
    return res;
  }
}

// --- helpers ----------------------------------------------------------------
function msg(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

interface RawNews {
  id?: number;
  headline?: string;
  summary?: string;
  source?: string;
  url?: string;
  datetime?: number;
  image?: string;
  related?: string;
  category?: string;
}
interface RawQuote {
  c?: number;
  d?: number;
  dp?: number;
  h?: number;
  l?: number;
  o?: number;
  pc?: number;
}
interface RawSentiment {
  buzz?: { articlesInLastWeek?: number };
  companyNewsScore?: number;
  sentiment?: { bullishPercent?: number; bearishPercent?: number };
}

function normalizeNews(raw: RawNews[]): NewsItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((n) => n && n.headline && n.url)
    .map((n, i) => ({
      id: String(n.id ?? `${n.url}-${i}`),
      headline: String(n.headline),
      summary: String(n.summary || '').slice(0, 400),
      source: String(n.source || 'Finnhub'),
      url: String(n.url),
      datetime: iso(n.datetime),
      image: n.image || null,
      related: n.related || null,
      category: n.category || null,
    }));
}

// --- deterministic demo data (clearly labeled) ------------------------------
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function demoQuote(symbol: string): Quote {
  const seed = hash(symbol);
  const base = 40 + (seed % 460);
  const percent = ((seed % 1000) / 100 - 5); // -5%..+5%
  const change = +(base * (percent / 100)).toFixed(2);
  const current = +(base + change).toFixed(2);
  return {
    symbol,
    current,
    change,
    percent: +percent.toFixed(2),
    high: +(current * 1.02).toFixed(2),
    low: +(current * 0.98).toFixed(2),
    open: base,
    prevClose: base,
  };
}

function demoNews(category: string): NewsItem[] {
  const now = Date.now();
  const items = [
    { h: 'Fed holds rates steady, signals data-dependent path ahead', s: 'Officials kept the benchmark rate unchanged and emphasized inflation progress.', src: 'MarketWire', rel: 'SPY' },
    { h: 'Tech megacaps lead broad market rally as yields ease', s: 'Semiconductors and AI names paced gains across major indices.', src: 'StreetDesk', rel: 'NVDA' },
    { h: 'Bitcoin extends gains amid renewed ETF inflows', s: 'Digital assets rose as institutional demand picked up.', src: 'CryptoBeat', rel: 'BTC' },
    { h: 'Oil steadies as supply concerns offset demand worries', s: 'Crude prices found support after a volatile session.', src: 'EnergyNow', rel: 'USO' },
    { h: 'Retail sales beat expectations, boosting consumer names', s: 'Stronger-than-expected data lifted discretionary stocks.', src: 'MacroLine', rel: 'XRT' },
    { h: 'Gold near record as investors seek safety', s: 'Haven demand supported precious metals.', src: 'MetalsDaily', rel: 'GLD' },
  ];
  return items.map((it, i) => ({
    id: `demo-${category}-${i}`,
    headline: it.h,
    summary: it.s,
    source: it.src,
    url: 'https://finnhub.io/',
    datetime: new Date(now - i * 3_600_000).toISOString(),
    image: null,
    related: it.rel,
    category,
  }));
}

function demoCompanyNews(symbol: string): NewsItem[] {
  const now = Date.now();
  const items = [
    `${symbol} tops earnings estimates, shares move on guidance`,
    `Analysts adjust price targets on ${symbol} after product update`,
    `${symbol} announces new partnership to expand market reach`,
    `${symbol} insiders report routine transactions in latest filing`,
  ];
  return items.map((h, i) => ({
    id: `demo-${symbol}-${i}`,
    headline: h,
    summary: `Sample company news for ${symbol}. Configure FINNHUB_API_KEY for live coverage.`,
    source: 'MarketWire',
    url: 'https://finnhub.io/',
    datetime: new Date(now - i * 7_200_000).toISOString(),
    image: null,
    related: symbol,
    category: 'company',
  }));
}

function demoSentiment(symbol: string): Sentiment {
  const seed = hash(symbol || 'x');
  const bull = 40 + (seed % 40);
  return {
    symbol,
    supported: true,
    bullishPercent: bull,
    bearishPercent: 100 - bull,
    companyNewsScore: +(0.4 + (seed % 50) / 100).toFixed(2),
    articlesLastWeek: 20 + (seed % 60),
  };
}

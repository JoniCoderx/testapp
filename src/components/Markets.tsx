'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn, timeAgo } from '@/lib/ui';

// --- shapes (mirror the /api responses) ------------------------------------
interface Quote {
  symbol: string;
  current: number;
  change: number;
  percent: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
}
interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  url: string;
  datetime: string;
  image: string | null;
  related: string | null;
  category: string | null;
}

const WATCHLIST = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'GOOGL', 'META', 'SPY'];
const NEWS_CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'forex', label: 'Forex' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'merger', label: 'M&A' },
];

function toneOf(n: number): 'up' | 'down' | 'flat' {
  if (n > 0.0001) return 'up';
  if (n < -0.0001) return 'down';
  return 'flat';
}
function toneText(t: 'up' | 'down' | 'flat') {
  return t === 'up' ? 'text-emerald-400' : t === 'down' ? 'text-rose-400' : 'text-white/50';
}
function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// --- demo banner ------------------------------------------------------------
function DemoBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-500/[0.06] px-4 py-3">
      <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" fill="none">
        <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.2A2 2 0 0 0 3.83 21h16.34a2 2 0 0 0 1.72-2.94l-8.18-14.2a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <div className="text-sm font-semibold text-amber-200">Showing sample market data</div>
        <p className="mt-0.5 text-xs text-amber-100/60">
          A live <code className="rounded bg-white/10 px-1">FINNHUB_API_KEY</code> is not configured
          (or the provider is rate-limited). Figures below are illustrative placeholders, not live quotes.
        </p>
      </div>
    </div>
  );
}

function ErrorRow({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/[0.04] px-6 py-10 text-center">
      <p className="text-sm text-white/60">{message}</p>
      <button onClick={onRetry} className="btn-ghost mt-4 !py-2 text-xs">
        Try again
      </button>
    </div>
  );
}

// --- quotes -----------------------------------------------------------------
function QuoteCard({ q }: { q: Quote }) {
  const tone = toneOf(q.change);
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-bold text-white">{q.symbol}</span>
        <span className={cn('text-xs font-semibold', toneText(tone))}>
          {tone === 'up' ? '▲' : tone === 'down' ? '▼' : '◆'} {q.percent >= 0 ? '+' : ''}
          {fmt(q.percent)}%
        </span>
      </div>
      <div className="mt-2 text-xl font-bold tabular-nums text-white">${fmt(q.current)}</div>
      <div className={cn('mt-0.5 text-xs tabular-nums', toneText(tone))}>
        {q.change >= 0 ? '+' : ''}
        {fmt(q.change)}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-white/40">
        <span>H ${fmt(q.high)}</span>
        <span>L ${fmt(q.low)}</span>
        <span>O ${fmt(q.open)}</span>
        <span>PC ${fmt(q.prevClose)}</span>
      </div>
    </div>
  );
}

function QuoteSkeleton() {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="skeleton h-3 w-14 rounded" />
        <div className="skeleton h-3 w-12 rounded" />
      </div>
      <div className="skeleton mt-3 h-6 w-24 rounded" />
      <div className="skeleton mt-2 h-3 w-16 rounded" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="skeleton h-3 rounded" />
        <div className="skeleton h-3 rounded" />
        <div className="skeleton h-3 rounded" />
        <div className="skeleton h-3 rounded" />
      </div>
    </div>
  );
}

function QuotesPanel() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(`/api/quote?symbols=${WATCHLIST.join(',')}`, { cache: 'no-store' });
      const json = await res.json();
      setQuotes(Array.isArray(json.quotes) ? json.quotes : []);
      setDemo(Boolean(json.demo));
      setUpdatedAt(json.cachedAt || null);
    } catch {
      setError('Unable to load quotes right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 45_000);
    return () => clearInterval(t);
  }, [load]);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Watchlist</h2>
        {updatedAt && !loading && (
          <span className="text-[11px] text-white/30">Updated {timeAgo(updatedAt)}</span>
        )}
      </div>
      {demo && !loading && <DemoBanner />}
      {error && quotes.length === 0 ? (
        <ErrorRow message={error} onRetry={load} />
      ) : loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <QuoteSkeleton key={i} />
          ))}
        </div>
      ) : quotes.length === 0 ? (
        <div className="glass rounded-2xl px-6 py-10 text-center text-sm text-white/50">
          No quotes available.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {quotes.map((q) => (
            <QuoteCard key={q.symbol} q={q} />
          ))}
        </div>
      )}
    </section>
  );
}

// --- market news ------------------------------------------------------------
function NewsCard({ n }: { n: NewsItem }) {
  return (
    <a
      href={n.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group flex flex-col rounded-2xl p-4 transition hover:border-white/20"
    >
      <div className="flex items-center gap-2 text-[11px] text-white/40">
        <span className="font-medium text-accent-cyan/80">{n.source}</span>
        <span>·</span>
        <span>{timeAgo(n.datetime)}</span>
        {n.related && (
          <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 font-mono text-white/50">
            {n.related}
          </span>
        )}
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-white group-hover:text-accent-cyan">
        {n.headline}
      </h3>
      {n.summary && (
        <p className="mt-1.5 line-clamp-2 text-xs text-white/50">{n.summary}</p>
      )}
    </a>
  );
}

function NewsSkeleton() {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="skeleton h-2.5 w-24 rounded" />
      <div className="skeleton mt-3 h-3 w-full rounded" />
      <div className="skeleton mt-2 h-3 w-4/5 rounded" />
      <div className="skeleton mt-3 h-2.5 w-full rounded" />
    </div>
  );
}

function NewsPanel() {
  const [category, setCategory] = useState('general');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/market-news?category=${category}&limit=18`, { cache: 'no-store' });
      const json = await res.json();
      setNews(Array.isArray(json.news) ? json.news : []);
      setDemo(Boolean(json.demo));
    } catch {
      setError('Unable to load market news right now.');
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Market News</h2>
        <div className="flex flex-wrap gap-1.5">
          {NEWS_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition',
                category === c.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:bg-white/5 hover:text-white',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      {demo && !loading && <DemoBanner />}
      {error && news.length === 0 ? (
        <ErrorRow message={error} onRetry={load} />
      ) : loading ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsSkeleton key={i} />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="glass rounded-2xl px-6 py-12 text-center text-sm text-white/50">
          No headlines in this category right now.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.id} n={n} />
          ))}
        </div>
      )}
    </section>
  );
}

// --- page shell -------------------------------------------------------------
export default function Markets() {
  return (
    <div className="safe-x mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live markets · Finnhub
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Markets
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-white/50">
          Real-time quotes and market-moving headlines. Powered by Finnhub with graceful
          demo fallback when a live key isn&apos;t configured — the page always renders.
        </p>
      </motion.div>

      <div className="space-y-10">
        <QuotesPanel />
        <NewsPanel />
      </div>

      <p className="mt-12 text-center text-[11px] text-white/25">
        Market data for informational purposes only · Not investment advice · MarketPulse X
      </p>
    </div>
  );
}

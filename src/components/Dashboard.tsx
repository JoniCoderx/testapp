'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SerializedPost } from '@/lib/serialize';
import PostCard from '@/components/PostCard';
import Filters, { FilterId, SortId } from '@/components/Filters';
import {
  EmptyState,
  ErrorState,
  SkeletonGrid,
  SourcesDownBanner,
} from '@/components/States';
import { SourceStatus, StatusPayload } from '@/components/SourceStatus';
import { timeAgo } from '@/lib/ui';

const PAGE_SIZE = 30;

export default function Dashboard() {
  const [posts, setPosts] = useState<SerializedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortId>('newest');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const initial = useRef(true);

  // Debounce search input.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const buildParams = useCallback(
    (cursor?: string | null) => {
      const params = new URLSearchParams({
        filter,
        sort,
        limit: String(PAGE_SIZE),
      });
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (cursor) params.set('cursor', cursor);
      return params;
    },
    [filter, sort, debouncedSearch],
  );

  const loadPosts = useCallback(async () => {
    if (initial.current) setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/posts?${buildParams().toString()}`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setPosts(Array.isArray(data.posts) ? data.posts : []);
      setNextCursor(data.nextCursor ?? null);
      setHasMore(Boolean(data.hasMore));
      setUpdatedAt(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
      initial.current = false;
    }
  }, [buildParams]);

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/posts?${buildParams(nextCursor).toString()}`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setPosts((prev) => {
        const seen = new Set(prev.map((p) => p.id));
        const fresh = (data.posts as SerializedPost[]).filter((p) => !seen.has(p.id));
        return [...prev, ...fresh];
      });
      setNextCursor(data.nextCursor ?? null);
      setHasMore(Boolean(data.hasMore));
    } catch {
      /* keep existing posts; user can retry */
    } finally {
      setLoadingMore(false);
    }
  }, [buildParams, nextCursor, loadingMore]);

  const loadStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/status', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      setStatus(data as StatusPayload);
    } catch {
      /* non-fatal */
    }
  }, []);

  // Reload feed whenever filter/sort/search changes.
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Status + gentle auto-refresh (read-only; no OpenAI spend).
  useEffect(() => {
    loadStatus();
    const t = setInterval(() => {
      loadPosts();
      loadStatus();
    }, 90_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const s = status?.stats;
  const statCards = [
    { label: 'Total analyzed', value: s ? s.totalAnalyzed.toLocaleString() : '—' },
    { label: 'High-impact today', value: s ? s.highImpactToday.toLocaleString() : '—' },
    { label: 'Crypto today', value: s ? s.cryptoToday.toLocaleString() : '—' },
    {
      label: 'Last successful fetch',
      value: s?.lastSuccessfulFetch ? timeAgo(s.lastSuccessfulFetch) : '—',
    },
  ];

  const filtersActive = filter !== 'all' || debouncedSearch.length > 0;
  const allSourcesDown = status?.sources?.allSourcesDown ?? false;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live terminal
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Signal <span className="text-gradient">Feed</span>
          </h1>
          <p className="mt-1 text-sm text-white/50">
            AI-decoded market impact from the most-followed voices on X.
          </p>
        </div>
        {updatedAt && (
          <div className="text-xs text-white/40">
            Last updated{' '}
            <span className="font-medium text-white/70">{timeAgo(updatedAt)}</span>
            <span className="mx-1.5 text-white/20">·</span>
            auto-refreshes
          </div>
        )}
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="glass glow-card rounded-2xl px-4 py-3.5">
            <div className="text-[10px] uppercase tracking-wider text-white/40">
              {card.label}
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-white">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid: feed + sidebar */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="order-2 lg:order-1">
          {allSourcesDown && (
            <div className="mb-4">
              <SourcesDownBanner />
            </div>
          )}

          <Filters
            active={filter}
            onFilter={setFilter}
            search={search}
            onSearch={setSearch}
            sort={sort}
            onSort={setSort}
          />

          <div className="mt-6">
            {loading ? (
              <SkeletonGrid count={6} />
            ) : error ? (
              <ErrorState message={error} onRetry={loadPosts} />
            ) : posts.length === 0 ? (
              <EmptyState
                filtered={filtersActive}
                onClear={() => {
                  setFilter('all');
                  setSearch('');
                }}
              />
            ) : (
              <>
                <motion.div layout className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {posts.map((p) => (
                      <PostCard key={p.id} post={p} />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {hasMore && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="btn-ghost disabled:opacity-60"
                    >
                      {loadingMore ? 'Loading…' : 'Load more signals'}
                    </button>
                  </div>
                )}

                <p className="mt-8 text-center text-xs text-white/30">
                  Showing {posts.length} signal{posts.length === 1 ? '' : 's'} ·
                  Not financial advice · AI-generated analysis · Impact score is
                  an estimate only.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="order-1 space-y-4 lg:order-2">
          <SourceStatus status={status} />
          <div className="glass rounded-2xl p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Impact scale
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {[
                { c: 'bg-cyan-400', l: 'Low', r: '0–30' },
                { c: 'bg-amber-400', l: 'Medium', r: '31–60' },
                { c: 'bg-rose-400', l: 'High', r: '61–100' },
              ].map((row) => (
                <div key={row.l} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/60">
                    <span className={`h-1.5 w-1.5 rounded-full ${row.c}`} />
                    {row.l}
                  </span>
                  <span className="font-mono text-white/35">{row.r}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

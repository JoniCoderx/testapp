'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SerializedPost } from '@/lib/serialize';
import PostCard from '@/components/PostCard';
import Filters, { FilterId, SortId } from '@/components/Filters';
import { EmptyState, ErrorState, SkeletonGrid } from '@/components/States';

interface Stats {
  posts: number;
  analyzed: number;
  pending: number;
  lastFetch: string | null;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<SerializedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortId>('newest');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [notice, setNotice] = useState<string | null>(null);
  const initial = useRef(true);

  // Debounce search input.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const loadPosts = useCallback(async () => {
    if (initial.current) setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ filter, sort, limit: '120' });
      if (debouncedSearch) params.set('search', debouncedSearch);
      const res = await fetch(`/api/posts?${params.toString()}`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
      initial.current = false;
    }
  }, [filter, sort, debouncedSearch]);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch('/api/health', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.stats) setStats(data.stats);
    } catch {
      /* non-fatal */
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    loadStats();
    // Live-ish: poll the feed periodically without a full reload.
    const t = setInterval(() => {
      loadPosts();
      loadStats();
    }, 90_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setNotice('Fetching latest posts and running analysis…');
    try {
      const fetchRes = await fetch('/api/fetch', { method: 'POST' });
      const fetchData = await fetchRes.json().catch(() => ({}));
      await fetch('/api/analyze', { method: 'POST' });
      await Promise.all([loadPosts(), loadStats()]);

      if (fetchData?.postsNew != null) {
        const failures = fetchData?.failures?.length || 0;
        setNotice(
          `Fetched ${fetchData.postsNew} new post(s)` +
            (failures ? ` · ${failures} source(s) unavailable` : ''),
        );
      } else {
        setNotice('Refresh complete.');
      }
    } catch (err) {
      setNotice(
        err instanceof Error ? `Refresh failed: ${err.message}` : 'Refresh failed',
      );
    } finally {
      setRefreshing(false);
      setTimeout(() => setNotice(null), 6000);
    }
  }, [loadPosts, loadStats]);

  const statCards = [
    { label: 'Total signals', value: stats?.posts ?? '—' },
    { label: 'Analyzed', value: stats?.analyzed ?? '—' },
    { label: 'Pending', value: stats?.pending ?? '—' },
    {
      label: 'Last fetch',
      value: stats?.lastFetch
        ? new Date(stats.lastFetch).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '—',
    },
  ];

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
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="btn-primary self-start disabled:opacity-60 sm:self-auto"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
            fill="none"
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {refreshing ? 'Refreshing…' : 'Refresh feed'}
        </button>
      </div>

      {/* Stat strip */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="glass rounded-2xl px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-white/40">
              {s.label}
            </div>
            <div className="mt-1 font-mono text-xl font-bold text-white">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-accent-cyan/20 bg-accent-cyan/[0.06] px-4 py-2.5 text-sm text-accent-cyan"
          >
            {notice}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="mt-6">
        <Filters
          active={filter}
          onFilter={setFilter}
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
        />
      </div>

      {/* Results */}
      <div className="mt-6">
        {loading ? (
          <SkeletonGrid count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={loadPosts} />
        ) : posts.length === 0 ? (
          <EmptyState onRefresh={handleRefresh} refreshing={refreshing} />
        ) : (
          <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {!loading && !error && posts.length > 0 && (
        <p className="mt-8 text-center text-xs text-white/30">
          Showing {posts.length} signal{posts.length === 1 ? '' : 's'} · Not
          financial advice · AI-generated analysis · Impact score is an estimate
          only.
        </p>
      )}
    </div>
  );
}

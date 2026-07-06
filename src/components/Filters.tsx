'use client';

import { cn } from '@/lib/ui';

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'geopolitics', label: 'Geopolitics' },
  { id: 'high-impact', label: 'High Impact' },
  { id: 'bearish', label: 'Bearish' },
  { id: 'bullish', label: 'Bullish' },
] as const;

export type FilterId = (typeof FILTERS)[number]['id'];
export type SortId = 'newest' | 'impact';

interface Props {
  active: FilterId;
  onFilter: (id: FilterId) => void;
  search: string;
  onSearch: (v: string) => void;
  sort: SortId;
  onSort: (s: SortId) => void;
}

export default function Filters({
  active,
  onFilter,
  search,
  onSearch,
  sort,
  onSort,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-sm">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search posts, handles, summaries…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent-cyan/50 focus:bg-white/[0.05]"
          />
          {search && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Sort</span>
          <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {(
              [
                { id: 'newest', label: 'Newest' },
                { id: 'impact', label: 'Highest impact' },
              ] as const
            ).map((s) => (
              <button
                key={s.id}
                onClick={() => onSort(s.id)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition',
                  sort === s.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => onFilter(f.id)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-xs font-medium transition',
              active === f.id
                ? 'border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan'
                : 'border-white/10 bg-white/[0.02] text-white/55 hover:border-white/25 hover:text-white',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

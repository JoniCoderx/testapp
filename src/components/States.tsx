'use client';

export function PostCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-32 rounded" />
          <div className="skeleton h-2.5 w-24 rounded" />
        </div>
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-11/12 rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>
      <div className="mt-4 skeleton h-16 w-full rounded-xl" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="skeleton h-14 rounded-xl" />
        <div className="skeleton h-14 rounded-xl" />
      </div>
      <div className="mt-4 skeleton h-1.5 w-full rounded-full" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Empty state. `filtered` distinguishes "no data has been ingested yet" from
 * "your current filters/search matched nothing".
 */
export function EmptyState({
  filtered,
  onClear,
}: {
  filtered?: boolean;
  onClear?: () => void;
}) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent-cyan" fill="none">
          <path d="M3 3v18h18M7 14l3-3 3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">
        {filtered ? 'No matching signals' : 'No signals yet'}
      </h3>
      <p className="mt-2 max-w-md text-sm text-white/50">
        {filtered
          ? 'Nothing matches your current filters or search. Try clearing them to see the full feed.'
          : 'The feed is being populated. New posts are pulled automatically every few minutes — check back shortly.'}
      </p>
      {filtered && onClear && (
        <button onClick={onClear} className="btn-ghost mt-6">
          Clear filters
        </button>
      )}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-rose-400/20 bg-rose-500/[0.04] px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-300">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
          <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.2A2 2 0 0 0 3.83 21h16.34a2 2 0 0 0 1.72-2.94l-8.18-14.2a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">
        Couldn&apos;t load signals
      </h3>
      <p className="mt-2 max-w-md text-sm text-white/50">
        {message || 'Something went wrong while loading posts.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-ghost mt-6">
          Try again
        </button>
      )}
    </div>
  );
}

/**
 * Non-blocking banner shown when every feed source is currently failing but
 * cached posts are still being served (item 6).
 */
export function SourcesDownBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-500/[0.06] px-4 py-3">
      <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" fill="none">
        <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.2A2 2 0 0 0 3.83 21h16.34a2 2 0 0 0 1.72-2.94l-8.18-14.2a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <div className="text-sm font-semibold text-amber-200">
          Sources temporarily unavailable
        </div>
        <p className="mt-0.5 text-xs text-amber-100/60">
          Public feed sources are not responding right now. You&apos;re viewing
          the most recent cached signals — new posts will resume automatically
          once a source recovers.
        </p>
      </div>
    </div>
  );
}

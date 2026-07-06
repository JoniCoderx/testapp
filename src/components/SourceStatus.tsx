'use client';

import { cn, timeAgo } from '@/lib/ui';

export interface StatusPayload {
  ok?: boolean;
  degraded?: boolean;
  stats: {
    totalPosts: number;
    totalAnalyzed: number;
    pending: number;
    highImpactToday: number;
    cryptoToday: number;
    lastSuccessfulFetch: string | null;
    lastFetchAt: string | null;
  } | null;
  sources: {
    configured: number;
    instances: { url: string; host: string; lastSuccessAt: string | null; healthy: boolean }[];
    recent: { windowMinutes: number; successes: number; failures: number };
    allSourcesDown: boolean;
  } | null;
}

export function SourceStatus({ status }: { status: StatusPayload | null }) {
  const sources = status?.sources;
  const healthyCount = sources?.instances.filter((i) => i.healthy).length ?? 0;
  const total = sources?.configured ?? 0;

  const overall = !sources
    ? { label: 'Unknown', dot: 'bg-slate-400', text: 'text-slate-300' }
    : sources.allSourcesDown
      ? { label: 'Sources down', dot: 'bg-rose-400', text: 'text-rose-300' }
      : healthyCount === 0
        ? { label: 'Awaiting first fetch', dot: 'bg-amber-400', text: 'text-amber-300' }
        : healthyCount < total
          ? { label: 'Partial', dot: 'bg-amber-400', text: 'text-amber-300' }
          : { label: 'Operational', dot: 'bg-emerald-400', text: 'text-emerald-300' };

  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <path d="M5 12.5 9 8l3 3 4-5 3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 20h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Source status
        </div>
        <span className={cn('flex items-center gap-1.5 text-xs font-medium', overall.text)}>
          <span className="relative flex h-2 w-2">
            <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-70', overall.dot)} />
            <span className={cn('relative inline-flex h-2 w-2 rounded-full', overall.dot)} />
          </span>
          {overall.label}
        </span>
      </div>

      <div className="space-y-1.5">
        {sources?.instances.map((inst) => (
          <div key={inst.host} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-mono text-white/60">
              <span className={cn('h-1.5 w-1.5 rounded-full', inst.healthy ? 'bg-emerald-400' : 'bg-rose-400/70')} />
              {inst.host}
            </span>
            <span className="text-white/35">
              {inst.lastSuccessAt ? `ok ${timeAgo(inst.lastSuccessAt)}` : 'no success yet'}
            </span>
          </div>
        ))}
        {!sources && (
          <div className="text-xs text-white/40">Status unavailable.</div>
        )}
      </div>

      {sources && (
        <div className="mt-3 border-t border-white/[0.06] pt-2 text-[11px] text-white/35">
          Last {sources.recent.windowMinutes}m: {sources.recent.successes} ok ·{' '}
          {sources.recent.failures} failed
        </div>
      )}
    </div>
  );
}

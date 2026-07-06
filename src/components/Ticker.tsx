'use client';

/**
 * Decorative ticker-tape strip. Accepts items; if none are provided it shows a
 * default set of tracked-signal labels so the marketing page always feels live.
 */
export interface TickerItem {
  label: string;
  value?: string;
  tone?: 'up' | 'down' | 'flat';
}

const DEFAULT_ITEMS: TickerItem[] = [
  { label: 'GLOBAL IMPACT', value: 'MONITORING', tone: 'flat' },
  { label: 'CRYPTO SIGNAL', value: 'LIVE', tone: 'up' },
  { label: 'GEOPOLITICS', value: 'ELEVATED', tone: 'down' },
  { label: 'AI / TECH', value: 'ACTIVE', tone: 'up' },
  { label: 'MACRO', value: 'WATCH', tone: 'flat' },
  { label: 'ENERGY', value: 'STABLE', tone: 'flat' },
  { label: 'REGULATION', value: 'TRACKING', tone: 'flat' },
];

function toneClass(tone?: string) {
  if (tone === 'up') return 'text-emerald-400';
  if (tone === 'down') return 'text-rose-400';
  return 'text-cyan-300';
}

function arrow(tone?: string) {
  if (tone === 'up') return '▲';
  if (tone === 'down') return '▼';
  return '◆';
}

export default function Ticker({ items = DEFAULT_ITEMS }: { items?: TickerItem[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base-900 to-transparent" />
      <div className="flex w-max animate-ticker gap-8 whitespace-nowrap font-mono text-xs">
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-white/40">{it.label}</span>
            {it.value && (
              <span className={toneClass(it.tone)}>
                {arrow(it.tone)} {it.value}
              </span>
            )}
            <span className="text-white/15">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

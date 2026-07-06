import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Relative "time ago" formatting for post timestamps. */
export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const seconds = Math.floor((Date.now() - then) / 1000);
  if (seconds < 60) return `${Math.max(1, seconds)}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export const SENTIMENT_STYLES: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  bullish: {
    label: 'Bullish',
    className: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    dot: 'bg-emerald-400',
  },
  bearish: {
    label: 'Bearish',
    className: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    dot: 'bg-rose-400',
  },
  mixed: {
    label: 'Mixed',
    className: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    dot: 'bg-amber-400',
  },
  neutral: {
    label: 'Neutral',
    className: 'border-slate-400/30 bg-slate-400/10 text-slate-300',
    dot: 'bg-slate-400',
  },
};

export function sentimentStyle(s: string) {
  return SENTIMENT_STYLES[s] ?? SENTIMENT_STYLES.neutral;
}

export const TAG_META: Record<string, { label: string; className: string }> = {
  crypto: { label: 'Crypto', className: 'border-amber-400/30 text-amber-300' },
  stocks: { label: 'Stocks', className: 'border-emerald-400/30 text-emerald-300' },
  geopolitics: { label: 'Geopolitics', className: 'border-rose-400/30 text-rose-300' },
  ai: { label: 'AI', className: 'border-cyan-400/30 text-cyan-300' },
  tech: { label: 'Tech', className: 'border-sky-400/30 text-sky-300' },
  regulation: { label: 'Regulation', className: 'border-violet-400/30 text-violet-300' },
  war: { label: 'War', className: 'border-red-400/30 text-red-300' },
  macro: { label: 'Macro', className: 'border-teal-400/30 text-teal-300' },
  energy: { label: 'Energy', className: 'border-orange-400/30 text-orange-300' },
  commodities: { label: 'Commodities', className: 'border-yellow-400/30 text-yellow-300' },
};

export function tagMeta(tag: string) {
  return (
    TAG_META[tag] ?? {
      label: tag,
      className: 'border-white/20 text-white/70',
    }
  );
}

/**
 * Impact score styling by band (item 8):
 *   0–30   Low
 *   31–60  Medium
 *   61–100 High
 */
export function impactColor(score: number): {
  label: 'Low' | 'Medium' | 'High';
  text: string;
  bar: string;
  ring: string;
  chip: string;
} {
  if (score >= 61)
    return {
      label: 'High',
      text: 'text-rose-300',
      bar: 'from-rose-500 to-red-400',
      ring: 'text-rose-400',
      chip: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    };
  if (score >= 31)
    return {
      label: 'Medium',
      text: 'text-amber-300',
      bar: 'from-amber-500 to-orange-400',
      ring: 'text-amber-400',
      chip: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    };
  return {
    label: 'Low',
    text: 'text-cyan-300',
    bar: 'from-cyan-500 to-teal-400',
    ring: 'text-cyan-400',
    chip: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
  };
}

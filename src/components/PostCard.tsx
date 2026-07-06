'use client';

import { motion } from 'framer-motion';
import type { SerializedPost } from '@/lib/serialize';
import {
  cn,
  impactColor,
  sentimentStyle,
  tagMeta,
  timeAgo,
} from '@/lib/ui';

function ImpactMeter({ score }: { score: number }) {
  const { text, bar, label, chip } = impactColor(score);
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/40">
          Impact score
          <span className={cn('chip !py-0 !text-[9px]', chip)}>{label}</span>
        </span>
        <span className={cn('font-mono text-sm font-bold', text)}>
          {score}
          <span className="text-white/30">/100</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full bg-gradient-to-r', bar)}
        />
      </div>
    </div>
  );
}

function Avatar({ name, handle }: { name: string | null; handle: string }) {
  const letter = (name || handle || '?').charAt(0).toUpperCase();
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 text-sm font-bold text-white">
      {letter}
    </div>
  );
}

export default function PostCard({ post }: { post: SerializedPost }) {
  const a = post.analysis;
  const sent = a ? sentimentStyle(a.sentiment) : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="glass glow-card flex flex-col rounded-2xl p-5"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar name={post.authorName} handle={post.authorHandle} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-white">
              {post.authorName || post.authorHandle}
            </span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-accent-cyan" fill="currentColor">
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.68.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.66 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span className="truncate">@{post.authorHandle}</span>
            <span>·</span>
            <span className="shrink-0">{timeAgo(post.publishedAt)}</span>
          </div>
        </div>
        {sent && (
          <span className={cn('chip shrink-0', sent.className)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', sent.dot)} />
            {sent.label}
          </span>
        )}
      </div>

      {/* Post text */}
      <p className="mt-3.5 text-sm leading-relaxed text-white/85">
        {post.text}
      </p>

      {/* Analysis */}
      {a ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent-cyan/80">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              AI summary
            </div>
            <p className="text-sm text-white/70">{a.summary}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Global market impact
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {a.globalMarketImpact}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-300/70">
                Crypto impact
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {a.cryptoImpact}
              </p>
            </div>
          </div>

          <ImpactMeter score={a.impactScore} />

          {a.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {a.tags.map((t) => {
                const meta = tagMeta(t);
                return (
                  <span
                    key={t}
                    className={cn('chip bg-white/[0.02]', meta.className)}
                  >
                    {meta.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-white/40">
          <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-accent-cyan" />
          Awaiting AI analysis…
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="font-mono text-[10px] text-white/25">
          {post.source || 'source: —'}
        </span>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-accent-cyan hover:text-white"
        >
          View original
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}

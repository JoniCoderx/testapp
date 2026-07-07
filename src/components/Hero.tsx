'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DEFAULT_ACCOUNTS } from '@config/accounts';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <span className="chip border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            </span>
            LIVE · Tracking {DEFAULT_ACCOUNTS.length} top voices across X, Reddit, YouTube &amp; more
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">Real-time social signals.</span>
          <br />
          <span className="text-white">Market impact </span>
          <span className="text-gradient">decoded by AI.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base text-white/55 sm:text-lg"
        >
          MarketPulse X monitors new posts from the world&apos;s most influential
          accounts across X, Reddit, YouTube, Bluesky &amp; more, then uses AI to
          estimate whether each one could move{' '}
          <span className="text-white/80">global markets</span> or{' '}
          <span className="text-white/80">crypto</span> — with an impact score,
          sentiment read, and instant summary.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href="/dashboard" className="btn-primary w-full sm:w-auto">
            Launch the terminal
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a href="#how" className="btn-ghost w-full sm:w-auto">
            How it works
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            { k: String(DEFAULT_ACCOUNTS.length), v: 'Tracked accounts' },
            { k: '7', v: 'Free sources' },
            { k: '0–100', v: 'Impact score' },
            { k: '24/7', v: 'Auto-polling' },
          ].map((s) => (
            <div key={s.v} className="glass glow-card rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl">
                {s.k}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-white/40">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

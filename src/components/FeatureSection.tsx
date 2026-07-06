'use client';

import { motion } from 'framer-motion';
import { DEFAULT_ACCOUNTS } from '@config/accounts';

const FEATURES = [
  {
    title: 'Global market impact',
    body: 'Every post is assessed for potential effect on broad equity, macro, and commodity markets — not just what was said, but what it could move.',
    icon: 'M3 3v18h18',
  },
  {
    title: 'Crypto-specific read',
    body: 'A dedicated crypto lens flags posts that could ripple through Bitcoin, Ethereum, and the wider digital-asset ecosystem.',
    icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  },
  {
    title: 'Impact score 0–100',
    body: 'A single, cautious number estimating overall market relevance and risk so you can triage the noise at a glance.',
    icon: 'M12 20V10M6 20v-6M18 20V4',
  },
  {
    title: 'Sentiment engine',
    body: 'Bullish, bearish, neutral, or mixed — a fast directional read on the tone behind each signal.',
    icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
  },
  {
    title: 'Smart tagging',
    body: 'Crypto, stocks, geopolitics, AI, tech, regulation, war, macro, energy, commodities — filterable in one click.',
    icon: 'M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
  },
  {
    title: 'Resilient by design',
    body: 'Multi-instance Nitter fallback plus database caching means the feed keeps working even when a source goes dark.',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
];

const STEPS = [
  {
    n: '01',
    t: 'Ingest',
    d: 'Poll public feeds from tracked accounts every 10–15 minutes with automatic instance fallback and dedupe.',
  },
  {
    n: '02',
    t: 'Analyze',
    d: 'Each new post is sent to an AI financial-analyst prompt that returns a structured impact assessment.',
  },
  {
    n: '03',
    t: 'Decode',
    d: 'Scores, sentiment, and tags land in a live terminal you can filter, search, and sort in real time.',
  },
];

export default function FeatureSection() {
  return (
    <>
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A serious <span className="text-gradient">financial intelligence</span>{' '}
            layer
          </h2>
          <p className="mt-4 text-white/50">
            Not a toy. MarketPulse X turns the firehose of influential social
            posts into structured, filterable market signal.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass glow-card rounded-2xl p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 text-accent-cyan">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d={f.icon}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-strong relative overflow-hidden rounded-3xl p-8"
            >
              <div className="absolute -right-4 -top-6 font-mono text-7xl font-black text-white/[0.04]">
                {s.n}
              </div>
              <div className="relative">
                <div className="font-mono text-sm text-accent-cyan">{s.n}</div>
                <h3 className="mt-2 text-xl font-bold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {s.d}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 text-center">
          <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            Currently tracking
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {DEFAULT_ACCOUNTS.map((a) => (
              <span
                key={a.handle}
                className="chip border-white/10 bg-white/[0.03] text-white/70"
              >
                @{a.handle}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

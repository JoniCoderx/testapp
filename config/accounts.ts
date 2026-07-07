/**
 * Tracked accounts configuration.
 *
 * Each account lists one or more FREE `sources` to pull posts from. If several
 * sources are given, they are all polled and their posts merged + deduped —
 * this gives redundancy (e.g. Nitter primary, RSSHub fallback for the same X
 * account) and lets a single logical account span multiple platforms.
 *
 * Source `ref` meaning by type:
 *   nitter   → X/Twitter handle (no @)              e.g. "elonmusk"
 *   rsshub   → RSSHub route path                    e.g. "twitter/user/elonmusk"
 *   mastodon → user@instance                        e.g. "Gargron@mastodon.social"
 *   bluesky  → Bluesky handle                        e.g. "bsky.app"
 *   reddit   → "r/<subreddit>" or "u/<user>"        e.g. "r/CryptoCurrency"
 *   youtube  → channel id (UC…)                      e.g. "UCLA_DiR1FfKNvjuUpBHmylQ"
 *   rss      → any full RSS/Atom feed URL           e.g. "https://example.com/feed"
 *
 * Override the X handle list at runtime (no code edit) via TRACKED_HANDLES.
 */

import type { SourceRef, SourceType } from '@/lib/sources/types';

export interface TrackedAccount {
  /** Unique config id (also the DB Account key). Need not equal a handle. */
  handle: string;
  displayName: string;
  /** Platform/category label for the UI. */
  category: string;
  sources: SourceRef[];
}

/** Helper: an X account served by Nitter with an RSSHub fallback. */
function x(handle: string, displayName: string): TrackedAccount {
  return {
    handle,
    displayName,
    category: 'X',
    sources: [
      { type: 'nitter', ref: handle, label: 'Nitter' },
      { type: 'rsshub', ref: `twitter/user/${handle}`, label: 'RSSHub' },
    ],
  };
}

// --- Top X / Twitter voices (Nitter + RSSHub) ------------------------------
const X_ACCOUNTS: TrackedAccount[] = [
  x('elonmusk', 'Elon Musk'),
  x('realDonaldTrump', 'Donald J. Trump'),
  x('BarackObama', 'Barack Obama'),
  x('Cristiano', 'Cristiano Ronaldo'),
  x('katyperry', 'Katy Perry'),
  x('rihanna', 'Rihanna'),
  x('narendramodi', 'Narendra Modi'),
  x('taylorswift13', 'Taylor Swift'),
  x('NASA', 'NASA'),
  x('BillGates', 'Bill Gates'),
];

// --- Top voices on OTHER platforms (all free, no X dependency) --------------
const CROSS_PLATFORM_ACCOUNTS: TrackedAccount[] = [
  // Reddit — market-relevant communities (free public JSON).
  { handle: 'reddit-worldnews', displayName: 'r/worldnews', category: 'Reddit', sources: [{ type: 'reddit', ref: 'r/worldnews' }] },
  { handle: 'reddit-crypto', displayName: 'r/CryptoCurrency', category: 'Reddit', sources: [{ type: 'reddit', ref: 'r/CryptoCurrency' }] },
  { handle: 'reddit-stocks', displayName: 'r/stocks', category: 'Reddit', sources: [{ type: 'reddit', ref: 'r/stocks' }] },
  { handle: 'reddit-tech', displayName: 'r/technology', category: 'Reddit', sources: [{ type: 'reddit', ref: 'r/technology' }] },

  // YouTube — channel Atom feeds (free, no key).
  { handle: 'yt-nasa', displayName: 'NASA (YouTube)', category: 'YouTube', sources: [{ type: 'youtube', ref: 'UCLA_DiR1FfKNvjuUpBHmylQ' }] },
  { handle: 'yt-spacex', displayName: 'SpaceX (YouTube)', category: 'YouTube', sources: [{ type: 'youtube', ref: 'UCtI0Hodo5o5dUb67FeUjDeA' }] },
  { handle: 'yt-mrbeast', displayName: 'MrBeast (YouTube)', category: 'YouTube', sources: [{ type: 'youtube', ref: 'UCX6OQ3DkcsbYNE6H8uQQuVA' }] },

  // Bluesky — public AT Protocol read API (free, no auth).
  { handle: 'bsky-official', displayName: 'Bluesky', category: 'Bluesky', sources: [{ type: 'bluesky', ref: 'bsky.app' }] },
  { handle: 'bsky-pfrazee', displayName: 'Paul Frazee', category: 'Bluesky', sources: [{ type: 'bluesky', ref: 'pfrazee.com' }] },

  // Mastodon — public account RSS (free, no auth).
  { handle: 'masto-gargron', displayName: 'Eugen Rochko', category: 'Mastodon', sources: [{ type: 'mastodon', ref: 'Gargron@mastodon.social' }] },
];

export const DEFAULT_ACCOUNTS: TrackedAccount[] = [
  ...X_ACCOUNTS,
  ...CROSS_PLATFORM_ACCOUNTS,
];

/**
 * Resolve the accounts to track. If TRACKED_HANDLES is set, it overrides the
 * X list (handles only; Nitter + RSSHub sources) and the cross-platform
 * accounts are still included.
 */
export function getTrackedAccounts(): TrackedAccount[] {
  const override = process.env.TRACKED_HANDLES?.trim();
  if (!override) return DEFAULT_ACCOUNTS;

  const known = new Map(X_ACCOUNTS.map((a) => [a.handle.toLowerCase(), a]));
  const xAccounts = override
    .split(',')
    .map((h) => h.trim().replace(/^@/, ''))
    .filter(Boolean)
    .map((handle) => known.get(handle.toLowerCase()) ?? x(handle, handle));

  return [...xAccounts, ...CROSS_PLATFORM_ACCOUNTS];
}

/** All distinct source types referenced by the tracked accounts. */
export function usedSourceTypes(): SourceType[] {
  const set = new Set<SourceType>();
  for (const acc of DEFAULT_ACCOUNTS) {
    for (const s of acc.sources) set.add(s.type);
  }
  return Array.from(set);
}

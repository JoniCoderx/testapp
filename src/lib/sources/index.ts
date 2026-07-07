/**
 * Source registry.
 *
 * Maps a SourceType to its implementation. Adding a new free (or paid) source
 * is a one-line change here — nothing else in the app needs to know which
 * sources exist. `getEnabledTypes()` honors the ENABLED_SOURCES env override.
 */

import { env } from '@/lib/env';
import { NitterSource } from './nitter';
import { RssHubSource } from './rsshub';
import { BlueskySource } from './bluesky';
import { RedditSource } from './reddit';
import { MastodonSource, YouTubeSource, GenericRssSource } from './feed-sources';
import { ALL_SOURCE_TYPES, PostSource, SourceType } from './types';

export * from './types';

const registry = new Map<SourceType, () => PostSource>([
  ['nitter', () => new NitterSource()],
  ['rsshub', () => new RssHubSource()],
  ['mastodon', () => new MastodonSource()],
  ['bluesky', () => new BlueskySource()],
  ['reddit', () => new RedditSource()],
  ['youtube', () => new YouTubeSource()],
  ['rss', () => new GenericRssSource()],
]);

const instances = new Map<SourceType, PostSource>();

/** Get the source implementation for a type (null if unknown/disabled). */
export function getSource(type: SourceType): PostSource | null {
  if (!isEnabled(type)) return null;
  if (instances.has(type)) return instances.get(type)!;
  const factory = registry.get(type);
  if (!factory) return null;
  const source = factory();
  instances.set(type, source);
  return source;
}

/** Which source types are enabled (ENABLED_SOURCES env override; default all). */
export function getEnabledTypes(): SourceType[] {
  const override = env.enabledSources;
  if (!override.length) return [...ALL_SOURCE_TYPES];
  return ALL_SOURCE_TYPES.filter((t) => override.includes(t));
}

export function isEnabled(type: SourceType): boolean {
  const override = env.enabledSources;
  return override.length === 0 || override.includes(type);
}

/**
 * Legacy single-source accessor kept for backwards compatibility. Returns the
 * Nitter source (the original default). New code should use getSource(type).
 */
export function getPostSource(): PostSource {
  return getSource('nitter') ?? new NitterSource();
}

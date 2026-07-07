/**
 * Source abstraction layer.
 *
 * A `PostSource` knows how to fetch recent posts for a given reference (a
 * handle, channel id, or feed URL, depending on the source). The rest of the
 * app depends only on this interface, so the underlying implementations (free
 * RSS / public APIs today; a paid provider tomorrow) can be swapped or extended
 * without touching the pipeline, API routes, or UI.
 */

/** Supported free source types. */
export type SourceType =
  | 'nitter' // X/Twitter via Nitter RSS
  | 'rsshub' // Many platforms via RSSHub RSS
  | 'mastodon' // Mastodon account RSS (@user@instance)
  | 'bluesky' // Bluesky public AT Protocol API (JSON)
  | 'reddit' // Reddit public JSON (user or subreddit)
  | 'youtube' // YouTube channel Atom feed
  | 'rss'; // Any generic RSS/Atom feed URL

export const ALL_SOURCE_TYPES: SourceType[] = [
  'nitter',
  'rsshub',
  'mastodon',
  'bluesky',
  'reddit',
  'youtube',
  'rss',
];

/** A concrete place to pull an account's posts from. */
export interface SourceRef {
  type: SourceType;
  /** Meaning depends on `type` (handle, channel id, feed url, …). */
  ref: string;
  /** Optional human label (e.g. "X", "YouTube"). */
  label?: string;
}

export interface RawPost {
  /** Stable identifier from the source. Used for dedupe (unique across app). */
  sourcePostId: string;
  url: string;
  text: string;
  authorHandle: string;
  authorName?: string;
  publishedAt: Date;
  /** Human-readable source id, e.g. "nitter:nitter.net" or "bluesky:nasa.gov". */
  source: string;
}

/** Outcome of a single upstream attempt (instance/endpoint), for logging. */
export interface InstanceAttempt {
  instance: string;
  host: string;
  ok: boolean;
  status?: number;
  error?: string;
  durationMs: number;
}

export interface FetchResult {
  ref: string;
  posts: RawPost[];
  /** The concrete source/endpoint that succeeded, for logging. */
  source: string;
  /** Per-attempt outcomes (includes any failures before success). */
  attempts: InstanceAttempt[];
}

export interface PostSource {
  /** Source type, e.g. "nitter". */
  readonly type: SourceType;
  /** Stable name for logging/telemetry. */
  readonly name: string;

  /**
   * Fetch up to `limit` recent posts for `ref`.
   * Implementations should throw on unrecoverable failure so callers can log
   * and move on to the next source.
   */
  fetchPosts(ref: string, limit: number): Promise<FetchResult>;
}

export class SourceError extends Error {
  constructor(
    message: string,
    public readonly ref: string,
    public readonly attempts: InstanceAttempt[] = [],
  ) {
    super(message);
    this.name = 'SourceError';
  }
}

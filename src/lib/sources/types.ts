/**
 * Source abstraction layer.
 *
 * A `PostSource` knows how to fetch recent posts for a given handle. The rest
 * of the app depends only on this interface, so the underlying implementation
 * (Nitter RSS today; X API, RSSHub, or a scraping provider tomorrow) can be
 * swapped without touching the pipeline, API routes, or UI.
 */

export interface RawPost {
  /** Stable identifier from the source (status id / guid). Used for dedupe. */
  sourcePostId: string;
  url: string;
  text: string;
  authorHandle: string;
  authorName?: string;
  publishedAt: Date;
  /** Human-readable source id, e.g. "nitter:nitter.net". */
  source: string;
}

export interface FetchResult {
  handle: string;
  posts: RawPost[];
  /** The concrete source/instance that succeeded, for logging. */
  source: string;
  instance?: string;
}

export interface PostSource {
  /** Stable name for logging/telemetry, e.g. "nitter". */
  readonly name: string;

  /**
   * Fetch up to `limit` recent posts for `handle`.
   * Implementations should throw on unrecoverable failure so callers can log
   * and, where relevant, fall back to another source.
   */
  fetchPostsForHandle(handle: string, limit: number): Promise<FetchResult>;
}

export class SourceError extends Error {
  constructor(
    message: string,
    public readonly handle: string,
    public readonly instance?: string,
  ) {
    super(message);
    this.name = 'SourceError';
  }
}

/**
 * Bluesky source — the public AT Protocol read API is free and requires no
 * auth. `ref` is a Bluesky handle, e.g. "nasa.gov" or "user.bsky.social".
 */

import { env } from '@/lib/env';
import { fetchWithTimeout, describeError } from './http';
import {
  FetchResult,
  InstanceAttempt,
  PostSource,
  RawPost,
  SourceError,
} from './types';

interface BskyFeedItem {
  post?: {
    uri?: string;
    author?: { handle?: string; displayName?: string };
    record?: { text?: string; createdAt?: string };
  };
}

export class BlueskySource implements PostSource {
  readonly type = 'bluesky' as const;
  readonly name = 'bluesky';

  constructor(private readonly api: string = env.blueskyApi) {}

  async fetchPosts(ref: string, limit: number): Promise<FetchResult> {
    const actor = ref.replace(/^@/, '');
    const host = this.api.replace(/^https?:\/\//, '');
    const url =
      `${this.api}/xrpc/app.bsky.feed.getAuthorFeed` +
      `?actor=${encodeURIComponent(actor)}&limit=${Math.min(limit, 30)}&filter=posts_no_replies`;
    const started = Date.now();

    let attempt: InstanceAttempt;
    try {
      const res = await fetchWithTimeout(url, { accept: 'application/json' });
      attempt = { instance: this.api, host, ok: res.ok, status: res.status, durationMs: Date.now() - started };
      if (!res.ok) {
        throw new SourceError(`Bluesky HTTP ${res.status} for ${actor}`, actor, [
          { ...attempt, ok: false, error: `HTTP ${res.status}` },
        ]);
      }
      const data = (await res.json()) as { feed?: BskyFeedItem[] };
      const posts: RawPost[] = (data.feed || [])
        .map((item): RawPost | null => {
          const p = item.post;
          const text = p?.record?.text?.trim();
          const uri = p?.uri;
          if (!p || !text || !uri) return null;
          const rkey = uri.split('/').pop();
          const handle = p.author?.handle || actor;
          return {
            sourcePostId: `bluesky:${uri}`,
            url: rkey ? `https://bsky.app/profile/${handle}/post/${rkey}` : `https://bsky.app/profile/${handle}`,
            text,
            authorHandle: handle,
            authorName: p.author?.displayName,
            publishedAt: p.record?.createdAt ? new Date(p.record.createdAt) : new Date(),
            source: `bluesky:${host}`,
          };
        })
        .filter((p): p is RawPost => p !== null)
        .slice(0, limit);

      return { ref: actor, posts, source: `bluesky:${host}`, attempts: [attempt] };
    } catch (err) {
      if (err instanceof SourceError) throw err;
      const reason = describeError(err);
      throw new SourceError(`Bluesky failed for ${actor}: ${reason}`, actor, [
        { instance: this.api, host, ok: false, error: reason, durationMs: Date.now() - started },
      ]);
    }
  }
}

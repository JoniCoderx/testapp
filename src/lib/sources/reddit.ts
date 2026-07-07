/**
 * Reddit source — the public JSON endpoints are free (rate-limited, no auth).
 * `ref` is "r/<subreddit>" or "u/<user>" (also accepts "user/<user>").
 */

import { fetchWithTimeout, describeError } from './http';
import {
  FetchResult,
  InstanceAttempt,
  PostSource,
  RawPost,
  SourceError,
} from './types';

interface RedditChild {
  data?: {
    id?: string;
    title?: string;
    selftext?: string;
    permalink?: string;
    created_utc?: number;
    author?: string;
    subreddit?: string;
    over_18?: boolean;
    stickied?: boolean;
  };
}

function toUrl(ref: string, limit: number): { url: string; handle: string } {
  const clean = ref.replace(/^\/+/, '');
  if (/^r\//i.test(clean)) {
    const sub = clean.slice(2).replace(/\/.*$/, '');
    return { url: `https://www.reddit.com/r/${sub}/new.json?limit=${limit}`, handle: `r/${sub}` };
  }
  const user = clean.replace(/^(u|user)\//i, '').replace(/\/.*$/, '');
  return {
    url: `https://www.reddit.com/user/${user}/submitted.json?limit=${limit}&sort=new`,
    handle: `u/${user}`,
  };
}

export class RedditSource implements PostSource {
  readonly type = 'reddit' as const;
  readonly name = 'reddit';

  async fetchPosts(ref: string, limit: number): Promise<FetchResult> {
    const { url, handle } = toUrl(ref, Math.min(limit, 25));
    const host = 'www.reddit.com';
    const started = Date.now();
    let attempt: InstanceAttempt;
    try {
      const res = await fetchWithTimeout(url, { accept: 'application/json' });
      attempt = { instance: url, host, ok: res.ok, status: res.status, durationMs: Date.now() - started };
      if (!res.ok) {
        throw new SourceError(`Reddit HTTP ${res.status} for ${handle}`, handle, [
          { ...attempt, ok: false, error: `HTTP ${res.status}` },
        ]);
      }
      const data = (await res.json()) as { data?: { children?: RedditChild[] } };
      const posts: RawPost[] = (data.data?.children || [])
        .map((child): RawPost | null => {
          const d = child.data;
          if (!d || !d.id || !d.title || d.over_18) return null;
          const body = (d.selftext || '').trim();
          const text = body ? `${d.title} — ${body.slice(0, 280)}` : d.title;
          return {
            sourcePostId: `reddit:${d.id}`,
            url: d.permalink ? `https://www.reddit.com${d.permalink}` : `https://www.reddit.com/${handle}`,
            text,
            authorHandle: d.author ? `u/${d.author}` : handle,
            authorName: d.author,
            publishedAt: d.created_utc ? new Date(d.created_utc * 1000) : new Date(),
            source: `reddit:${host}`,
          };
        })
        .filter((p): p is RawPost => p !== null)
        .slice(0, limit);

      return { ref: handle, posts, source: `reddit:${host}`, attempts: [attempt] };
    } catch (err) {
      if (err instanceof SourceError) throw err;
      const reason = describeError(err);
      throw new SourceError(`Reddit failed for ${handle}: ${reason}`, handle, [
        { instance: url, host, ok: false, error: reason, durationMs: Date.now() - started },
      ]);
    }
  }
}

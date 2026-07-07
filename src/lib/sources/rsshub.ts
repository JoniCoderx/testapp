/**
 * RSSHub source — a free, open RSS gateway for hundreds of platforms
 * (X/Twitter, YouTube, Telegram, Weibo, and many more).
 *
 * `ref` is an RSSHub route path, e.g. "twitter/user/elonmusk" or
 * "youtube/channel/UCxxxx". Public instances are tried in order with fallback.
 * Configure instances via RSSHUB_INSTANCES (default https://rsshub.app).
 */

import { env } from '@/lib/env';
import { fetchWithTimeout, describeError } from './http';
import { parseFeed, stripHtml, looksLikeFeed } from './rss-parse';
import {
  FetchResult,
  InstanceAttempt,
  PostSource,
  RawPost,
  SourceError,
} from './types';

export class RssHubSource implements PostSource {
  readonly type = 'rsshub' as const;
  readonly name = 'rsshub';

  constructor(private readonly instances: string[] = env.rsshubInstances) {}

  async fetchPosts(ref: string, limit: number): Promise<FetchResult> {
    const route = ref.replace(/^\/+/, '');
    const errors: string[] = [];
    const attempts: InstanceAttempt[] = [];

    if (this.instances.length === 0) {
      throw new SourceError('No RSSHub instances configured', route, []);
    }

    for (const instance of this.instances) {
      const host = instance.replace(/^https?:\/\//, '');
      const url = `${instance}/${route}`;
      const started = Date.now();
      try {
        const res = await fetchWithTimeout(url);
        if (!res.ok) {
          errors.push(`${host}: HTTP ${res.status}`);
          attempts.push({ instance, host, ok: false, status: res.status, error: `HTTP ${res.status}`, durationMs: Date.now() - started });
          continue;
        }
        const xml = await res.text();
        if (!looksLikeFeed(xml)) {
          errors.push(`${host}: not a valid feed`);
          attempts.push({ instance, host, ok: false, status: res.status, error: 'not a valid feed', durationMs: Date.now() - started });
          continue;
        }

        const handle = route.split('/').pop() || route;
        const posts: RawPost[] = parseFeed(xml)
          .slice(0, limit)
          .map((item): RawPost | null => {
            const text = stripHtml(item.title || item.content || '');
            if (!item.link || !text) return null;
            return {
              sourcePostId: `rsshub:${item.id || item.link}`,
              url: item.link,
              text,
              authorHandle: handle,
              authorName: item.author,
              publishedAt: item.published ?? new Date(),
              source: `rsshub:${host}`,
            };
          })
          .filter((p): p is RawPost => p !== null);

        attempts.push({ instance, host, ok: true, status: 200, durationMs: Date.now() - started });
        return { ref: route, posts, source: `rsshub:${host}`, attempts };
      } catch (err) {
        const reason = describeError(err);
        errors.push(`${host}: ${reason}`);
        attempts.push({ instance, host, ok: false, error: reason, durationMs: Date.now() - started });
      }
    }

    throw new SourceError(
      `All RSSHub instances failed for ${route} — ${errors.join('; ')}`,
      route,
      attempts,
    );
  }
}

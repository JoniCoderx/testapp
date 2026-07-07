/**
 * Single-endpoint feed sources built on the shared RSS/Atom parser:
 *   - MastodonSource: any Mastodon account's public RSS (@user@instance)
 *   - YouTubeSource:  a channel's Atom feed (channel id UC…)
 *   - GenericRssSource: any RSS/Atom feed URL
 */

import { fetchWithTimeout, describeError } from './http';
import { FeedItem, parseFeed, stripHtml, looksLikeFeed } from './rss-parse';
import {
  FetchResult,
  InstanceAttempt,
  PostSource,
  RawPost,
  SourceError,
} from './types';

/** Fetch a single feed URL and return parsed items (throws on failure). */
async function fetchFeed(
  url: string,
): Promise<{ items: FeedItem[]; attempt: InstanceAttempt }> {
  const host = url.replace(/^https?:\/\//, '').split('/')[0];
  const started = Date.now();
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const xml = await res.text();
    if (!looksLikeFeed(xml)) throw new Error('not a valid feed');
    return {
      items: parseFeed(xml),
      attempt: { instance: url, host, ok: true, status: 200, durationMs: Date.now() - started },
    };
  } catch (err) {
    const reason = describeError(err);
    throw new SourceError(reason, url, [
      { instance: url, host, ok: false, error: reason, durationMs: Date.now() - started },
    ]);
  }
}

// ---------------------------------------------------------------------------
// Mastodon — ref is "@user@instance" or "user@instance".
// ---------------------------------------------------------------------------
export class MastodonSource implements PostSource {
  readonly type = 'mastodon' as const;
  readonly name = 'mastodon';

  async fetchPosts(ref: string, limit: number): Promise<FetchResult> {
    const clean = ref.replace(/^@/, '');
    const [user, instance] = clean.split('@');
    if (!user || !instance) {
      throw new SourceError('Mastodon ref must be user@instance', ref, []);
    }
    const url = `https://${instance}/@${user}.rss`;
    const { items, attempt } = await fetchFeed(url);

    const posts: RawPost[] = items
      .slice(0, limit)
      .map((item): RawPost | null => {
        const text = stripHtml(item.content || item.title || '');
        if (!item.link || !text) return null;
        return {
          sourcePostId: `mastodon:${item.id || item.link}`,
          url: item.link,
          text,
          authorHandle: `${user}@${instance}`,
          authorName: item.author || user,
          publishedAt: item.published ?? new Date(),
          source: `mastodon:${instance}`,
        };
      })
      .filter((p): p is RawPost => p !== null);

    return { ref, posts, source: `mastodon:${instance}`, attempts: [attempt] };
  }
}

// ---------------------------------------------------------------------------
// YouTube — ref is a channel id (UC…) or "channel_id=UC…".
// ---------------------------------------------------------------------------
export class YouTubeSource implements PostSource {
  readonly type = 'youtube' as const;
  readonly name = 'youtube';

  async fetchPosts(ref: string, limit: number): Promise<FetchResult> {
    const channelId = ref.replace(/^channel_id=/, '').trim();
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
    const { items, attempt } = await fetchFeed(url);

    const posts: RawPost[] = items
      .slice(0, limit)
      .map((item): RawPost | null => {
        const title = stripHtml(item.title || '');
        const desc = stripHtml(item.content || '');
        const text = desc && desc !== title ? `${title} — ${desc.slice(0, 240)}` : title;
        if (!item.link || !text) return null;
        return {
          sourcePostId: `youtube:${item.id || item.link}`,
          url: item.link,
          text,
          authorHandle: item.author || channelId,
          authorName: item.author,
          publishedAt: item.published ?? new Date(),
          source: `youtube:${channelId}`,
        };
      })
      .filter((p): p is RawPost => p !== null);

    return { ref, posts, source: `youtube:${channelId}`, attempts: [attempt] };
  }
}

// ---------------------------------------------------------------------------
// Generic RSS/Atom — ref is a full feed URL.
// ---------------------------------------------------------------------------
export class GenericRssSource implements PostSource {
  readonly type = 'rss' as const;
  readonly name = 'rss';

  async fetchPosts(ref: string, limit: number): Promise<FetchResult> {
    if (!/^https?:\/\//i.test(ref)) {
      throw new SourceError('RSS ref must be a full URL', ref, []);
    }
    const { items, attempt } = await fetchFeed(ref);
    const host = ref.replace(/^https?:\/\//, '').split('/')[0];

    const posts: RawPost[] = items
      .slice(0, limit)
      .map((item): RawPost | null => {
        const text = stripHtml(item.title || item.content || '');
        if (!item.link || !text) return null;
        return {
          sourcePostId: `rss:${item.id || item.link}`,
          url: item.link,
          text,
          authorHandle: item.author || host,
          authorName: item.author,
          publishedAt: item.published ?? new Date(),
          source: `rss:${host}`,
        };
      })
      .filter((p): p is RawPost => p !== null);

    return { ref, posts, source: `rss:${host}`, attempts: [attempt] };
  }
}

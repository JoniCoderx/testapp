/**
 * Nitter RSS source implementation.
 *
 * Fetches a handle's timeline via a Nitter instance's RSS endpoint
 * (`/<handle>/rss`). Multiple instances are tried in order with automatic
 * fallback, since public Nitter instances are frequently rate-limited or
 * offline. Parsing is done with a small dependency-free XML reader so we don't
 * pull in a heavy RSS library.
 */

import { env } from '@/lib/env';
import { FetchResult, PostSource, RawPost, SourceError } from './types';

const FETCH_TIMEOUT_MS = 12_000;
const USER_AGENT =
  'MarketPulseX/1.0 (+https://github.com/JoniCoderx/testapp) RSS reader';

/** Decode the handful of XML/HTML entities that appear in RSS payloads. */
function decodeEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

/** Strip HTML tags and collapse whitespace to produce clean post text. */
function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTag(block: string, tag: string): string | undefined {
  const match = block.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'),
  );
  return match ? decodeEntities(match[1]).trim() : undefined;
}

/**
 * Derive a stable post id from a Nitter guid/link. Nitter guids look like
 * `https://nitter.net/elonmusk/status/1790000000000000000#m`. We key off the
 * numeric status id so the same post from different instances dedupes cleanly.
 */
function derivePostId(link: string | undefined, guid: string | undefined): string {
  const candidate = guid || link || '';
  const status = candidate.match(/status\/(\d+)/);
  if (status) return status[1];
  // Fall back to a normalized guid/link if no status id is present.
  return candidate.replace(/#.*$/, '').trim() || candidate;
}

/** Normalize a Nitter link back to a canonical x.com URL. */
function toCanonicalUrl(link: string, handle: string): string {
  const status = link.match(/status\/(\d+)/);
  if (status) return `https://x.com/${handle}/status/${status[1]}`;
  return link;
}

interface RssItem {
  title?: string;
  description?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  creator?: string;
}

function parseRssItems(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    items.push({
      title: extractTag(block, 'title'),
      description: extractTag(block, 'description'),
      link: extractTag(block, 'link'),
      guid: extractTag(block, 'guid'),
      pubDate: extractTag(block, 'pubDate'),
      creator: extractTag(block, 'dc:creator'),
    });
  }
  return items;
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
      // Always hit the network; caching is handled in our database.
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timer);
  }
}

export class NitterSource implements PostSource {
  readonly name = 'nitter';

  constructor(private readonly instances: string[] = env.nitterInstances) {}

  async fetchPostsForHandle(handle: string, limit: number): Promise<FetchResult> {
    const cleanHandle = handle.replace(/^@/, '');
    const errors: string[] = [];

    if (this.instances.length === 0) {
      throw new SourceError('No Nitter instances configured', cleanHandle);
    }

    for (const instance of this.instances) {
      const host = instance.replace(/^https?:\/\//, '');
      const url = `${instance}/${encodeURIComponent(cleanHandle)}/rss`;
      try {
        const res = await fetchWithTimeout(url);
        if (!res.ok) {
          errors.push(`${host}: HTTP ${res.status}`);
          continue;
        }
        const xml = await res.text();
        if (!xml.includes('<item') && !xml.includes('<rss')) {
          errors.push(`${host}: not a valid RSS feed`);
          continue;
        }

        const items = parseRssItems(xml).slice(0, limit);
        const authorName =
          extractTag(xml.split('<item')[0] || '', 'title')?.replace(
            /^@?.*?\s*\/\s*/,
            '',
          ) || undefined;

        const posts: RawPost[] = items
          .map((item): RawPost | null => {
            const link = item.link || item.guid;
            const rawText = item.title || item.description || '';
            const text = stripHtml(rawText);
            if (!link || !text) return null;

            const sourcePostId = derivePostId(item.link, item.guid);
            const publishedAt = item.pubDate
              ? new Date(item.pubDate)
              : new Date();

            return {
              sourcePostId,
              url: toCanonicalUrl(link, cleanHandle),
              text,
              authorHandle: cleanHandle,
              authorName:
                (item.creator && item.creator.replace(/^@/, '')) ||
                authorName ||
                undefined,
              publishedAt: isNaN(publishedAt.getTime())
                ? new Date()
                : publishedAt,
              source: `nitter:${host}`,
            };
          })
          .filter((p): p is RawPost => p !== null);

        return {
          handle: cleanHandle,
          posts,
          source: `nitter:${host}`,
          instance,
        };
      } catch (err) {
        const reason =
          err instanceof Error
            ? err.name === 'AbortError'
              ? 'timeout'
              : err.message
            : String(err);
        errors.push(`${host}: ${reason}`);
      }
    }

    throw new SourceError(
      `All Nitter instances failed for @${cleanHandle} — ${errors.join('; ')}`,
      cleanHandle,
    );
  }
}

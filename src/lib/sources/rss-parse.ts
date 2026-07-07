/**
 * Shared, dependency-free RSS 2.0 + Atom feed parsing utilities.
 *
 * Used by every feed-based source (Nitter, RSSHub, Mastodon, YouTube, generic
 * RSS). Keeping the parsing in one place means one well-tested code path
 * instead of several slightly-different regex parsers.
 */

/** Decode the handful of XML/HTML entities that appear in feed payloads. */
export function decodeEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => {
      try {
        return String.fromCodePoint(Number(n));
      } catch {
        return '';
      }
    })
    .replace(/&amp;/g, '&');
}

/** Strip HTML tags and collapse whitespace to produce clean post text. */
export function stripHtml(html: string): string {
  return decodeEntities(
    html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

/** Extract the inner text of the first `<tag>…</tag>` in `block`. */
export function extractTag(block: string, tag: string): string | undefined {
  const match = block.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'),
  );
  return match ? decodeEntities(match[1]).trim() : undefined;
}

/** Extract an attribute value from the first `<tag …attr="value"…>` in `block`. */
export function extractAttr(
  block: string,
  tag: string,
  attr: string,
): string | undefined {
  const tagMatch = block.match(new RegExp(`<${tag}\\s[^>]*>`, 'i'));
  if (!tagMatch) return undefined;
  const attrMatch = tagMatch[0].match(
    new RegExp(`${attr}\\s*=\\s*"([^"]*)"`, 'i'),
  );
  return attrMatch ? decodeEntities(attrMatch[1]) : undefined;
}

export interface FeedItem {
  id?: string;
  title?: string;
  /** Best available body text (description / content / summary). */
  content?: string;
  link?: string;
  published?: Date;
  author?: string;
}

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value.trim());
  return isNaN(d.getTime()) ? undefined : d;
}

/** Pull the best link out of an RSS or Atom item block. */
function extractLink(block: string): string | undefined {
  // RSS: <link>url</link>
  const rss = extractTag(block, 'link');
  if (rss && /^https?:/i.test(rss)) return rss;
  // Atom: <link rel="alternate" href="url"/> — prefer alternate/text-html.
  const links = block.match(/<link\b[^>]*>/gi) || [];
  let fallback: string | undefined;
  for (const l of links) {
    const href = l.match(/href\s*=\s*"([^"]+)"/i)?.[1];
    if (!href) continue;
    if (/rel\s*=\s*"alternate"/i.test(l) || /text\/html/i.test(l)) return href;
    fallback ||= href;
  }
  return fallback || (rss && rss.length ? rss : undefined);
}

/**
 * Parse an RSS 2.0 or Atom feed into normalized items (best-effort, never
 * throws). Handles `<item>` (RSS) and `<entry>` (Atom), including YouTube's
 * `media:group` description and `yt:videoId`.
 */
export function parseFeed(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const blockRegex = /<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m: RegExpExecArray | null;

  while ((m = blockRegex.exec(xml)) !== null) {
    const block = m[2];

    const content =
      extractTag(block, 'content:encoded') ||
      extractTag(block, 'description') ||
      extractTag(block, 'media:description') ||
      extractTag(block, 'content') ||
      extractTag(block, 'summary') ||
      extractTag(block, 'title');

    const id =
      extractTag(block, 'yt:videoId') ||
      extractTag(block, 'guid') ||
      extractTag(block, 'id');

    const author =
      extractTag(block, 'dc:creator') ||
      extractTag(block, 'name') || // atom <author><name>
      undefined;

    const published = parseDate(
      extractTag(block, 'pubDate') ||
        extractTag(block, 'published') ||
        extractTag(block, 'updated') ||
        extractTag(block, 'dc:date'),
    );

    items.push({
      id,
      title: extractTag(block, 'title'),
      content,
      link: extractLink(block),
      published,
      author: author?.replace(/^@/, ''),
    });
  }

  return items;
}

/** Quick sanity check that a string looks like an RSS/Atom feed. */
export function looksLikeFeed(xml: string): boolean {
  return /<(rss|feed|rdf:RDF)\b/i.test(xml) || /<(item|entry)\b/i.test(xml);
}

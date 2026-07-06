import type { Post, Analysis } from '@prisma/client';

export interface SerializedPost {
  id: string;
  sourcePostId: string;
  url: string;
  text: string;
  authorHandle: string;
  authorName: string | null;
  publishedAt: string;
  source: string | null;
  analysis: {
    summary: string;
    globalMarketImpact: string;
    cryptoImpact: string;
    impactScore: number;
    sentiment: string;
    tags: string[];
    model: string | null;
  } | null;
}

type PostWithAnalysis = Post & { analysis: Analysis | null };

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw !== 'string') return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

/** Convert any date-ish value to an ISO string, never throwing. */
function toIso(value: unknown): string {
  try {
    const d = value instanceof Date ? value : new Date(value as string);
    return isNaN(d.getTime()) ? new Date(0).toISOString() : d.toISOString();
  } catch {
    return new Date(0).toISOString();
  }
}

function toInt(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

/**
 * Convert a Prisma Post (+ optional analysis) into a plain, JSON-safe object.
 * Defensive by design: every Date becomes an ISO string, tags are parsed
 * safely, and a null analysis relation is handled — so a malformed row can
 * never break JSON serialization of the whole response.
 */
export function serializePost(post: PostWithAnalysis): SerializedPost {
  return {
    id: String(post.id),
    sourcePostId: String(post.sourcePostId),
    url: String(post.url ?? ''),
    text: String(post.text ?? ''),
    authorHandle: String(post.authorHandle ?? ''),
    authorName: post.authorName ?? null,
    publishedAt: toIso(post.publishedAt),
    source: post.source ?? null,
    analysis: post.analysis
      ? {
          summary: String(post.analysis.summary ?? ''),
          globalMarketImpact: String(post.analysis.globalMarketImpact ?? ''),
          cryptoImpact: String(post.analysis.cryptoImpact ?? ''),
          impactScore: toInt(post.analysis.impactScore),
          sentiment: String(post.analysis.sentiment ?? 'neutral'),
          tags: parseTags(post.analysis.tags),
          model: post.analysis.model ?? null,
        }
      : null,
  };
}

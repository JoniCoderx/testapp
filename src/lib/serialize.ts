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

function parseTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function serializePost(post: PostWithAnalysis): SerializedPost {
  return {
    id: post.id,
    sourcePostId: post.sourcePostId,
    url: post.url,
    text: post.text,
    authorHandle: post.authorHandle,
    authorName: post.authorName,
    publishedAt: post.publishedAt.toISOString(),
    source: post.source,
    analysis: post.analysis
      ? {
          summary: post.analysis.summary,
          globalMarketImpact: post.analysis.globalMarketImpact,
          cryptoImpact: post.analysis.cryptoImpact,
          impactScore: post.analysis.impactScore,
          sentiment: post.analysis.sentiment,
          tags: parseTags(post.analysis.tags),
          model: post.analysis.model,
        }
      : null,
  };
}

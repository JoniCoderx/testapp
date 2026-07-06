/**
 * AI analysis layer.
 *
 * Given a post, produces a structured market-impact analysis via OpenAI. If no
 * API key is configured (or the call fails), a deterministic heuristic
 * fallback keeps the pipeline working so the product never hard-fails on a
 * single dependency.
 */

import OpenAI from 'openai';
import { env, hasOpenAi } from '@/lib/env';

export const VALID_TAGS = [
  'crypto',
  'stocks',
  'geopolitics',
  'ai',
  'tech',
  'regulation',
  'war',
  'macro',
  'energy',
  'commodities',
] as const;

export type Sentiment = 'bullish' | 'bearish' | 'neutral' | 'mixed';

export interface AnalysisResult {
  summary: string;
  globalMarketImpact: string;
  cryptoImpact: string;
  impactScore: number;
  sentiment: Sentiment;
  tags: string[];
  model: string;
}

export const SYSTEM_PROMPT =
  'You are a financial markets analyst. You do not give investment advice. ' +
  'You estimate whether a public post may affect broad markets or crypto ' +
  'markets. Be concise, cautious, and practical.';

function buildUserPrompt(input: {
  handle: string;
  authorName?: string;
  text: string;
  publishedAt: Date;
}): string {
  return [
    `Analyze the potential market impact of the following public X/Twitter post.`,
    '',
    `Author: ${input.authorName || input.handle} (@${input.handle})`,
    `Posted: ${input.publishedAt.toISOString()}`,
    `Post text: """${input.text}"""`,
    '',
    'Respond with ONLY a JSON object using exactly this shape:',
    '{',
    '  "summary": "short summary (max ~25 words)",',
    '  "globalMarketImpact": "short explanation of possible effect on broad/global markets",',
    '  "cryptoImpact": "short explanation of possible effect on crypto markets",',
    '  "impactScore": 0-100 integer estimating overall market relevance/risk,',
    '  "sentiment": "bullish | bearish | neutral | mixed",',
    `  "tags": array of any of ${JSON.stringify(VALID_TAGS)}`,
    '}',
    '',
    'If the post is purely personal, cultural, or entertainment with no ',
    'plausible market relevance, use a low impactScore and neutral sentiment.',
  ].join('\n');
}

function clampScore(n: unknown): number {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

function normalizeSentiment(s: unknown): Sentiment {
  const v = String(s || '').toLowerCase();
  if (v === 'bullish' || v === 'bearish' || v === 'mixed') return v;
  return 'neutral';
}

function normalizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  const allowed = new Set<string>(VALID_TAGS);
  const out = new Set<string>();
  for (const t of tags) {
    const v = String(t).toLowerCase().trim();
    if (allowed.has(v)) out.add(v);
  }
  return Array.from(out);
}

let client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!client) client = new OpenAI({ apiKey: env.openAiKey, maxRetries: 2 });
  return client;
}

/** Raised when an OpenAI-backed analysis cannot be produced. Callers should
 * leave the post pending (unanalyzed) and retry on the next run. */
export class AnalysisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AnalysisError';
  }
}

/**
 * Robustly extract a JSON object from a model response. Handles code fences and
 * leading/trailing prose by locating the first balanced `{ … }` block.
 */
export function parseJsonLoose(raw: string): Record<string, unknown> {
  const cleaned = raw.replace(/```(?:json)?/gi, '').trim();
  try {
    return JSON.parse(cleaned) as Record<string, unknown>;
  } catch {
    // Fallback: grab the outermost brace-delimited region and retry.
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end > start) {
      const slice = cleaned.slice(start, end + 1);
      return JSON.parse(slice) as Record<string, unknown>;
    }
    throw new SyntaxError('No JSON object found in model response');
  }
}

function shapeResult(parsed: Record<string, unknown>): AnalysisResult {
  return {
    summary: String(parsed.summary || '').slice(0, 400) || 'No summary available.',
    globalMarketImpact:
      String(parsed.globalMarketImpact || '').slice(0, 600) ||
      'No clear global market impact identified.',
    cryptoImpact:
      String(parsed.cryptoImpact || '').slice(0, 600) ||
      'No clear crypto market impact identified.',
    impactScore: clampScore(parsed.impactScore),
    sentiment: normalizeSentiment(parsed.sentiment),
    tags: normalizeTags(parsed.tags),
    model: env.openAiModel,
  };
}

export async function analyzePost(input: {
  handle: string;
  authorName?: string;
  text: string;
  publishedAt: Date;
}): Promise<AnalysisResult> {
  // Free / degraded mode: no key configured → deterministic heuristic so the
  // app remains fully usable without spending any OpenAI credits.
  if (!hasOpenAi()) {
    return heuristicAnalysis(input.text);
  }

  try {
    const completion = await getClient().chat.completions.create({
      model: env.openAiModel,
      temperature: 0.2,
      max_tokens: 500,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(input) },
      ],
    });

    const raw = completion.choices[0]?.message?.content || '';
    if (!raw.trim()) throw new AnalysisError('Empty response from OpenAI');

    return shapeResult(parseJsonLoose(raw));
  } catch (err) {
    // A key IS configured but the call/parse failed. Do NOT silently downgrade
    // to a heuristic (that would mask real analysis) and do NOT crash — surface
    // an AnalysisError so the pipeline leaves the post pending for retry.
    const message = err instanceof Error ? err.message : String(err);
    console.error('[analyze] OpenAI analysis failed (post left pending):', message);
    throw new AnalysisError(message);
  }
}

/**
 * Lightweight keyword-based fallback. Not a substitute for the model, but
 * keeps the feed populated and clearly labeled when AI is unavailable.
 */
export function heuristicAnalysis(text: string): AnalysisResult {
  const lower = text.toLowerCase();
  const tags = new Set<string>();

  const keywordMap: Record<string, string[]> = {
    crypto: ['crypto', 'bitcoin', 'btc', 'ethereum', 'eth', 'doge', 'dogecoin', 'blockchain', 'defi', 'nft', 'token'],
    stocks: ['stock', 'shares', 'nasdaq', 's&p', 'dow', 'earnings', 'ipo', 'market cap', 'tesla', 'ticker'],
    geopolitics: ['sanction', 'election', 'president', 'government', 'diplomat', 'treaty', 'border', 'nato', 'summit'],
    ai: ['ai', 'artificial intelligence', 'gpt', 'llm', 'neural', 'model', 'robot', 'agi'],
    tech: ['tech', 'software', 'chip', 'semiconductor', 'app', 'launch', 'startup', 'platform'],
    regulation: ['regulation', 'sec', 'lawsuit', 'ban', 'policy', 'fine', 'compliance', 'antitrust'],
    war: ['war', 'attack', 'military', 'missile', 'invasion', 'conflict', 'troops'],
    macro: ['inflation', 'fed', 'rate', 'gdp', 'recession', 'economy', 'interest', 'jobs', 'unemployment'],
    energy: ['oil', 'gas', 'energy', 'opec', 'barrel', 'nuclear', 'solar', 'grid'],
    commodities: ['gold', 'silver', 'copper', 'wheat', 'commodity', 'metals'],
  };

  for (const [tag, kws] of Object.entries(keywordMap)) {
    if (kws.some((k) => lower.includes(k))) tags.add(tag);
  }

  const bullishWords = ['surge', 'soar', 'record', 'growth', 'win', 'great', 'boom', 'rally', 'up'];
  const bearishWords = ['crash', 'collapse', 'ban', 'crisis', 'fall', 'drop', 'war', 'recession', 'down', 'plunge'];
  const bull = bullishWords.filter((w) => lower.includes(w)).length;
  const bear = bearishWords.filter((w) => lower.includes(w)).length;

  let sentiment: Sentiment = 'neutral';
  if (bull > 0 && bear > 0) sentiment = 'mixed';
  else if (bull > bear) sentiment = 'bullish';
  else if (bear > bull) sentiment = 'bearish';

  const marketRelevant = tags.size > 0;
  const impactScore = Math.min(
    100,
    tags.size * 18 + (bull + bear) * 6 + (marketRelevant ? 10 : 0),
  );

  return {
    summary:
      text.length > 140 ? text.slice(0, 137).trim() + '…' : text || 'No summary available.',
    globalMarketImpact: marketRelevant
      ? 'Heuristic estimate: post references market-relevant topics that could influence sentiment.'
      : 'Heuristic estimate: no obvious broad-market relevance detected.',
    cryptoImpact: tags.has('crypto')
      ? 'Heuristic estimate: post references crypto assets or the crypto ecosystem.'
      : 'Heuristic estimate: no direct crypto relevance detected.',
    impactScore,
    sentiment,
    tags: Array.from(tags),
    model: 'heuristic-fallback',
  };
}

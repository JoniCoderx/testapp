import { NextRequest, NextResponse } from 'next/server';

/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * Suitable for a single long-lived Node process (Render web service). It caps
 * abusive read traffic without any external dependency (keeping the app free).
 * For multi-instance horizontal scaling, swap this for a shared store (e.g.
 * Redis) — the call sites don't change.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export interface RateLimitOptions {
  /** Max requests allowed per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
}

function clientKey(req: NextRequest, scope: string): string {
  const fwd = req.headers.get('x-forwarded-for') || '';
  const ip =
    fwd.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  return `${scope}:${ip}`;
}

export function rateLimit(
  req: NextRequest,
  scope: string,
  opts: RateLimitOptions,
): RateLimitResult {
  const key = clientKey(req, scope);
  const now = Date.now();

  // Opportunistic cleanup to bound memory.
  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) {
      if (b.resetAt < now) buckets.delete(k);
    }
  }

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    bucket = { count: 0, resetAt: now + opts.windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;
  const remaining = Math.max(0, opts.limit - bucket.count);
  return {
    ok: bucket.count <= opts.limit,
    remaining,
    resetAt: bucket.resetAt,
    limit: opts.limit,
  };
}

/** Build a 429 response with standard rate-limit headers. */
export function tooManyRequests(result: RateLimitResult): NextResponse {
  const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
  return NextResponse.json(
    { error: 'Too many requests. Please slow down.', retryAfter },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': '0',
        'Cache-Control': 'no-store',
      },
    },
  );
}

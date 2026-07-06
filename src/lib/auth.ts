import { NextRequest, NextResponse } from 'next/server';
import { env, isAdminConfigured } from '@/lib/env';

/**
 * Validate an admin request. Accepts the secret via either:
 *   Authorization: Bearer <ADMIN_SECRET>
 *   x-admin-secret: <ADMIN_SECRET>
 * Uses a length-checked constant-time-ish comparison.
 */
export function isAuthorizedAdmin(req: NextRequest): boolean {
  if (!isAdminConfigured()) return false;

  const bearer = req.headers.get('authorization') || '';
  const headerSecret = (
    req.headers.get('x-admin-secret') ||
    (bearer.toLowerCase().startsWith('bearer ') ? bearer.slice(7) : '')
  ).trim();

  if (!headerSecret) return false;
  return safeEqual(headerSecret, env.adminSecret);
}

/**
 * Guard for mutating/admin endpoints. Returns a NextResponse to short-circuit
 * with (401/503) when the caller is not an authorized admin, or `null` when the
 * request is authorized and may proceed.
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'This endpoint is disabled because ADMIN_SECRET is not configured on the server.',
      },
      { status: 503 },
    );
  }
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } },
    );
  }
  return null;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

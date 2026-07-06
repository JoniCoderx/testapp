import { NextRequest } from 'next/server';
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
  const headerSecret =
    req.headers.get('x-admin-secret') ||
    (bearer.toLowerCase().startsWith('bearer ') ? bearer.slice(7).trim() : '');

  if (!headerSecret) return false;
  return safeEqual(headerSecret, env.adminSecret);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

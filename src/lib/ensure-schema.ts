/**
 * Node-only: ensure the database schema exists at server boot.
 *
 * On a managed Postgres deployment (Render) this runs `prisma db push` to
 * create the Account/Post/Analysis/FetchLog tables if they're missing, so the
 * app self-heals even when the platform's build/start commands didn't run the
 * migration. Best-effort, time-boxed, and never throws.
 *
 * This module is imported ONLY from instrumentation.ts under a
 * `NEXT_RUNTIME === 'nodejs'` guard, so its `node:child_process` usage never
 * reaches the edge bundle.
 */

let done = false;

export async function ensureSchema(): Promise<void> {
  if (done) return;
  done = true;

  const url = process.env.DATABASE_URL || '';
  // Only auto-migrate a managed Postgres URL; local sqlite is handled by
  // `npm run db:push`.
  if (!/^postgres(ql)?:\/\//i.test(url)) return;
  if (process.env.AUTO_DB_PUSH === 'false') return;

  try {
    const { execSync } = await import('node:child_process');
    const { existsSync } = await import('node:fs');

    const candidates = [
      'node_modules/prisma/build/index.js',
      'node_modules/.bin/prisma',
    ];
    const bin = candidates.find((c) => existsSync(c));
    if (!bin) {
      console.warn('[startup] prisma CLI not found; skipping schema ensure');
      return;
    }

    const cmd = bin.endsWith('.js')
      ? `node ${bin} db push --skip-generate`
      : `${bin} db push --skip-generate`;

    console.log('[startup] ensuring database schema (prisma db push)…');
    execSync(cmd, { stdio: 'inherit', timeout: 120_000, env: process.env });
    console.log('[startup] database schema is ready.');
  } catch (err) {
    console.error(
      '[startup] schema ensure failed (app will start anyway):',
      err instanceof Error ? err.message : err,
    );
  }
}

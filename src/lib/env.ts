/**
 * Centralized, typed access to environment configuration with sane defaults.
 * Never throws at import time so the UI can still render without full config.
 */

function num(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const env = {
  openAiKey: process.env.OPENAI_API_KEY ?? '',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',

  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  // Trimmed so trailing spaces/newlines in the Render env var can't cause a
  // silent mismatch with the value the user types.
  adminSecret: (process.env.ADMIN_SECRET || '').trim(),

  nitterInstances: (
    process.env.NITTER_INSTANCES ||
    'https://nitter.net,https://xcancel.com,https://nitter.poast.org'
  )
    .split(',')
    .map((s) => s.trim().replace(/\/+$/, ''))
    .filter(Boolean),

  pollIntervalMinutes: num(process.env.POLL_INTERVAL_MINUTES, 15),
  maxPostsPerAccount: num(process.env.MAX_POSTS_PER_ACCOUNT, 5),

  nodeEnv: process.env.NODE_ENV || 'development',
  // When true (and in production with an empty DB), /api/posts serves a small
  // set of clearly-labeled demo posts so the dashboard is never blank/broken.
  demoFallback: /^(1|true|yes)$/i.test(process.env.DEMO_FALLBACK || ''),
};

export function hasOpenAi(): boolean {
  return env.openAiKey.length > 0;
}

export function isAdminConfigured(): boolean {
  return env.adminSecret.length > 0;
}

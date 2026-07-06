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
  adminSecret: process.env.ADMIN_SECRET || '',

  nitterInstances: (
    process.env.NITTER_INSTANCES ||
    'https://nitter.net,https://xcancel.com,https://nitter.poast.org'
  )
    .split(',')
    .map((s) => s.trim().replace(/\/+$/, ''))
    .filter(Boolean),

  pollIntervalMinutes: num(process.env.POLL_INTERVAL_MINUTES, 15),
  maxPostsPerAccount: num(process.env.MAX_POSTS_PER_ACCOUNT, 5),
};

export function hasOpenAi(): boolean {
  return env.openAiKey.length > 0;
}

export function isAdminConfigured(): boolean {
  return env.adminSecret.length > 0;
}

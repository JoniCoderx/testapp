/**
 * Tracked accounts configuration.
 *
 * Edit this list to change which X/Twitter handles MarketPulse X tracks.
 * `handle` must match the account's X username WITHOUT the leading "@".
 *
 * You can also override the list at runtime without editing code by setting
 * the TRACKED_HANDLES env var to a comma-separated list of handles, e.g.
 *   TRACKED_HANDLES=elonmusk,realDonaldTrump,NASA
 */

export interface TrackedAccount {
  handle: string;
  displayName: string;
}

export const DEFAULT_ACCOUNTS: TrackedAccount[] = [
  { handle: 'elonmusk', displayName: 'Elon Musk' },
  { handle: 'realDonaldTrump', displayName: 'Donald J. Trump' },
  { handle: 'BarackObama', displayName: 'Barack Obama' },
  { handle: 'Cristiano', displayName: 'Cristiano Ronaldo' },
  { handle: 'katyperry', displayName: 'Katy Perry' },
  { handle: 'rihanna', displayName: 'Rihanna' },
  { handle: 'narendramodi', displayName: 'Narendra Modi' },
  { handle: 'taylorswift13', displayName: 'Taylor Swift' },
  { handle: 'NASA', displayName: 'NASA' },
  { handle: 'BillGates', displayName: 'Bill Gates' },
];

/**
 * Resolve the list of accounts to track, honoring the optional
 * TRACKED_HANDLES env override (handles only; display names are derived).
 */
export function getTrackedAccounts(): TrackedAccount[] {
  const override = process.env.TRACKED_HANDLES?.trim();
  if (!override) return DEFAULT_ACCOUNTS;

  const byHandle = new Map(
    DEFAULT_ACCOUNTS.map((a) => [a.handle.toLowerCase(), a]),
  );

  return override
    .split(',')
    .map((h) => h.trim().replace(/^@/, ''))
    .filter(Boolean)
    .map(
      (handle) =>
        byHandle.get(handle.toLowerCase()) ?? {
          handle,
          displayName: handle,
        },
    );
}

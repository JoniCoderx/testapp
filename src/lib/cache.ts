/**
 * Shared in-memory read cache for the public posts API.
 *
 * Lives in its own module so both the API route (reads) and the ingestion
 * pipeline (invalidation after a refresh) can use it without importing each
 * other. Backed by a plain Map — fine for a single long-lived Node process
 * (Render web service); swap for Redis if you scale horizontally.
 */

const CACHE_TTL_MS = 25_000;
const CACHE_MAX_ENTRIES = 300;

type CacheEntry = { body: unknown; expires: number };
const store = new Map<string, CacheEntry>();

export function cacheGet(key: string): unknown | null {
  const hit = store.get(key);
  if (!hit) return null;
  if (hit.expires < Date.now()) {
    store.delete(key);
    return null;
  }
  return hit.body;
}

export function cacheSet(key: string, body: unknown, ttlMs = CACHE_TTL_MS): void {
  if (store.size >= CACHE_MAX_ENTRIES) {
    const oldest = store.keys().next().value;
    if (oldest) store.delete(oldest);
  }
  store.set(key, { body, expires: Date.now() + ttlMs });
}

/** Invalidate all cached post responses (call after a successful refresh). */
export function clearPostsCache(): void {
  store.clear();
}

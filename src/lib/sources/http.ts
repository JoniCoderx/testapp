/** Shared fetch helper: timeout, polite User-Agent, no caching. */

// A realistic desktop-browser UA. Several public endpoints (Reddit, YouTube)
// reject generic/bot User-Agents from datacenter IPs with 403/429; a normal
// browser UA is accepted far more often.
export const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

export const DEFAULT_TIMEOUT_MS = 12_000;

export async function fetchWithTimeout(
  url: string,
  opts: { accept?: string; timeoutMs?: number } = {},
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    opts.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept:
          opts.accept ||
          'application/rss+xml, application/atom+xml, application/xml, application/json, text/xml, */*',
      },
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timer);
  }
}

export function describeError(err: unknown): string {
  if (err instanceof Error) {
    return err.name === 'AbortError' ? 'timeout' : err.message;
  }
  return String(err);
}

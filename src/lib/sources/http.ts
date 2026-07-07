/** Shared fetch helper: timeout, polite User-Agent, no caching. */

export const USER_AGENT =
  'MarketPulseX/1.0 (+https://github.com/JoniCoderx/testapp) feed reader';

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

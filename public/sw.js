/* MarketPulse X service worker — offline caching for the PWA.
 * Strategy:
 *   - navigations (pages): network-first → cached page → /offline
 *   - static assets (_next/static, icons, fonts, images): cache-first
 *   - GET API (posts/status/health): network-first → cached response
 *   - everything non-GET (POST /api/fetch, /api/admin/*, …): never touched
 */
const VERSION = 'mpx-v2';
const APP_CACHE = `mpx-app-${VERSION}`;
const RUNTIME_CACHE = `mpx-runtime-${VERSION}`;
const API_CACHE = `mpx-api-${VERSION}`;

const PRECACHE = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then((cache) =>
        Promise.allSettled(PRECACHE.map((u) => cache.add(u).catch(() => null))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => ![APP_CACHE, RUNTIME_CACHE, API_CACHE].includes(k))
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    /\.(?:png|jpg|jpeg|svg|webp|ico|woff2?|ttf|css|js)$/.test(url.pathname)
  );
}

// Only these GET API routes are safe to cache (read-only, public). Includes the
// Finnhub-backed market routes so the Markets page shows last-known data offline.
function isCacheableApi(url) {
  return (
    url.pathname === '/api/posts' ||
    url.pathname === '/api/status' ||
    url.pathname === '/api/health' ||
    url.pathname === '/api/market-news' ||
    url.pathname === '/api/quote' ||
    url.pathname === '/api/company-news' ||
    url.pathname === '/api/sentiment'
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // never cache mutations
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // only same-origin

  // Never touch admin/auth or write endpoints.
  if (url.pathname.startsWith('/api/admin')) return;
  if (url.pathname === '/api/fetch' || url.pathname === '/api/analyze') return;
  if (url.pathname.startsWith('/admin')) return;

  // Navigations → network-first, fall back to cache, then offline page.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match('/offline')),
        ),
    );
    return;
  }

  // Static assets → cache-first.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
            return res;
          }),
      ),
    );
    return;
  }

  // Read-only API → network-first, fall back to last cached response.
  if (isCacheableApi(url)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(API_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req)),
    );
    return;
  }
});

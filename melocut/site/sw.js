// MeloCut offline support: pages are network-first (fresh when online, cached when offline);
// our static files are stale-while-revalidate; the versioned audio engine is cache-first.
const CACHE = 'melocut-v6';
const CORE = ['/', '/assets/style.css', '/assets/app.js', '/assets/site.js', '/assets/config.js', '/assets/logo.svg',
  '/vendor/ffmpeg/index.js', '/vendor/ffmpeg/classes.js', '/vendor/ffmpeg/worker.js', '/vendor/ffmpeg/const.js',
  '/vendor/ffmpeg/errors.js', '/vendor/ffmpeg/utils.js', '/vendor/ffmpeg/types.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const engine = url.hostname === 'cdn.jsdelivr.net' && /@ffmpeg\/core|rnnoise-models/.test(url.pathname);
  if (!sameOrigin && !engine) return; // ads, analytics: never cached
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((r) => r || caches.match('/'))));
    return;
  }
  // The engine files are versioned (never change): cache-first. Our own files: serve the
  // cached copy instantly and refresh it in the background so updates still arrive.
  const update = () => fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  });
  e.respondWith(caches.match(req).then((hit) => {
    if (!hit) return update();
    if (sameOrigin) e.waitUntil(update().catch(() => {})); // refresh our own files only
    return hit;
  }));
});

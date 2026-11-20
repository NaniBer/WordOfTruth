// Service Worker for Word of Truth Bible PWA
const CACHE_NAME = 'wordoftruth-v2';
// Downloaded Bible files. Must match BIBLE_CACHE_NAME in src/utils/bibleData.ts.
const BIBLE_CACHE_NAME = 'wordoftruth-v1';
const KEPT_CACHES = new Set([CACHE_NAME, BIBLE_CACHE_NAME]);

// Install event - cache critical shell files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache the app shell - these are the minimum files needed for offline
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
      ]).catch(() => {
        // Some files might not exist, that's ok
        console.log('[SW] Some shell files not cached');
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!KEPT_CACHES.has(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network first; when offline, fall back to the cached copy of this page, then the cached root page.
async function navigationResponse(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cached = (await caches.match(request)) || (await caches.match('/'));
    if (cached) return cached;
    return new Response(
      '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Offline</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#1a1a2e;color:#fff;text-align:center;padding:20px}</style></head><body><div><h1>📖 Offline</h1><p>Bible data not cached.</p><p>Please open the app while online first.</p></div></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Strategy: Network First for navigation (HTML). Cached HTML points at hashed
  // JS bundles, so serving it without asking the network leaves users on old builds.
  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
    return;
  }

  // Skip external CDN requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Strategy: Stale While Revalidate for static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Always try to fetch fresh
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            // Clone synchronously before returning the original
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
            return networkResponse;
          }
          // Network returned error, try cache
          if (cachedResponse) {
            return cachedResponse;
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed, return cache if available
          if (cachedResponse) {
            return cachedResponse;
          }
          // No cache available
          return new Response('Offline', { status: 503 });
        });

      // Return cache immediately while fetching in background
      return cachedResponse || fetchPromise;
    })
  );
});

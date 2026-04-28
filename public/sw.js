// Service Worker for Word of Truth Bible PWA
const CACHE_NAME = 'wordoftruth-v2';

// Install event - cache critical shell files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache the app shell - these are the minimum files needed for offline
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/sw.js',
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
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

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

  // Strategy: Cache First for navigation requests (HTML pages)
  // This makes the PWA shell work offline
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Return cached shell or fetch new
        return cachedResponse || fetch(request).catch(() => {
          // If no cache and no network, return cached root
          return caches.match('/');
        });
      })
    );
    return;
  }

  // Skip external CDN requests (bible data)
  if (url.origin !== self.location.origin) {
    return;
  }

  // Strategy: Stale While Revalidate for static assets (JS, CSS, etc.)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const cachePromise = caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse.clone());
            });
            return networkResponse;
          }
          return cachedResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

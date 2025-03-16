const CACHE_NAME = 'brightup-cache-v1';
const URLS_TO_CACHE = [
  './index.html',
  './manifest.json',
  'https://via.placeholder.com/192/00FF00?text=Icon',
  'https://via.placeholder.com/512/00FF00?text=Icon',
  'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap'
];

// Install event: Cache all specified assets.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch event: Serve cached content when offline.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
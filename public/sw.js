const CACHE = 'dogbreedage-v3';
const urlsToCache = ['/', '/about', '/contact', '/dog-age-chart', '/compare', '/reverse-calculator', '/dog-birthday', '/labrador-age-calculator', '/golden-retriever-age-calculator', '/german-shepherd-age-calculator', '/bulldog-age-calculator', '/poodle-age-calculator', '/beagle-age-calculator', '/chihuahua-age-calculator', '/pomeranian-age-calculator', '/great-dane-age-calculator', '/husky-age-calculator', '/shih-tzu-age-calculator', '/border-collie-age-calculator', '/french-bulldog-age-calculator', '/pug-age-calculator', '/dachshund-age-calculator', '/rottweiler-age-calculator', '/corgi-age-calculator', '/yorkshire-terrier-age-calculator', '/privacy-policy', '/terms-of-service'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        if (event.request.method === 'GET' && event.request.url.startsWith(self.location.origin)) {
          const clone = fetchResponse.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        }
        return fetchResponse;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
});

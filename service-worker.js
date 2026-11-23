const CACHE_NAME = "lia-pwa-v3";

self.addEventListener("install", function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.ok) {
        const copie = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, copie);
        });
      }
      return response;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});

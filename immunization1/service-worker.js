importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('.png')) {
    // Oops! This causes workbox-strategies.js to be imported inside a fetch handler,
    // outside of the initial, synchronous service worker execution.
    const cacheFirst = new workbox.strategies.CacheFirst();
    event.respondWith(cacheFirst.handle({request: event.request}));
  }
});

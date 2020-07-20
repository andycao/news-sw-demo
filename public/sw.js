/* eslint-disable no-restricted-globals */

self.addEventListener("install", (event) => {
  console.log("installing");
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.add('/cat.svg'))
  );
});

self.addEventListener("activate", (event) => {
  console.log("active");
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
});

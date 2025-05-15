const cacheName = "block-puzzle-cache-v3"; // ✅ غير رقم النسخة للتأكد من تحديث الكاش
const assetsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html",
  "/icon-192.png",
  "/icon-512.png",
  "/assets/ai_default.png",
  "/assets/ai_happy.png",
  "/assets/ai_angry.png",
  "/assets/ai_thinking.png",
  "/assets/nova_logo.png",
  "/assets/sounds/button-click.mp3",
  "/assets/sounds/shape-pick.mp3",
  "/assets/sounds/singleClear.mp3",
  "/assets/sounds/combo-clear.mp3",
  "/assets/sounds/bubble-appear.mp3"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== cacheName)
          .map((key) => caches.delete(key))
      )
    )
  );
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((res) => {
          return res || caches.match("/offline.html");
        });
      })
  );
});

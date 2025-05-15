const cacheName = "block-puzzle-cache-v2";
const assetsToCache = [
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

self.addEventListener("install", (e) => {
  self.skipWaiting(); // ⬅️ مهم جدًا!
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assetsToCache))
  );
});

self.addEventListener("activate", (e) => {
  clients.claim(); // ⬅️ عشان يبدأ يشتغل فورًا
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then(res => res || caches.match("/offline.html")))
  );
});

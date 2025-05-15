const cacheName = "block-game-cache-v2";
const assetsToCache = [
  "./",
  "index.html",
  "style.css",
  "main.js",
  "assets/ai_default.png",
  "assets/ai_happy.png",
  "assets/ai_angry.png",
  "assets/ai_thinking.png",
  "assets/nova_logo.png",
  "assets/sounds/button-click.mp3",
  "assets/sounds/shape-pick.mp3",
  "assets/sounds/singleClear.mp3",
  "assets/sounds/combo-clear.mp3",
  "assets/sounds/bubble-appear.mp3"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

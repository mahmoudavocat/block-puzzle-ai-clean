const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// 🟢 تخزين كل شيء عادي ما عدا HTML (index.html)
workbox.routing.registerRoute(
  ({ request }) => request.destination !== 'document',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

// 🔥 لازم نجيب index.html من الشبكة مباشرة دايمًا
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'html-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 5,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

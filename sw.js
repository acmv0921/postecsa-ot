// POSTECSA OT — Service Worker v7
const CACHE_NAME = 'postecsa-ot-v7';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['./', './index.html', './manifest.json'])
        .then(() => {
          return cache.add('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
            .catch(() => {});
        });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;

  // ⚠️ NO cachear gerencia ni sus recursos
  if (url.pathname.includes('gerencia')) return;

  // NO interceptar Google Apps Script
  if (url.hostname.includes('script.google.com')) return;
  if (url.hostname.includes('googleusercontent.com')) return;

  if (url.origin === self.location.origin || url.hostname === 'cdnjs.cloudflare.com') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          if (url.hostname === 'cdnjs.cloudflare.com') {
            return new Response('// jsPDF no disponible offline', {
              headers: { 'Content-Type': 'application/javascript' }
            });
          }
        });
      })
    );
  }
});

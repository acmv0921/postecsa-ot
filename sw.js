// POSTECSA OT — Service Worker v1.0
const CACHE_NAME = 'postecsa-ot-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalación: precachear todos los assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local assets primero (críticos)
      return cache.addAll(['./', './index.html', './manifest.json'])
        .then(() => {
          // Intentar cachear jsPDF (puede fallar si no hay red, está OK)
          return cache.add('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
            .catch(() => console.log('jsPDF no disponible offline aún'));
        });
    })
  );
  self.skipWaiting();
});

// Activación: limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first para assets locales, network-first para CDN
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo manejar GET
  if (event.request.method !== 'GET') return;

  // Para assets locales: cache first
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
          // Sin red y sin cache: para jsPDF retornar script vacío para no romper
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

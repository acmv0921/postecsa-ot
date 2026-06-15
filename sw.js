var CACHE_NAME = 'postecsa-maint-v1';
var ASSETS = [
  './index.html',
  './manifest.json'
];

// Instalar y almacenar en caché la interfaz de la aplicación
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar el control sobre las peticiones del dispositivo
self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

// Estrategia Cache-First para cargar instantáneamente sin internet
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
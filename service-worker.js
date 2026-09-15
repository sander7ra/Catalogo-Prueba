const VERSION = 'v1';
const CACHE = `catalogo-${self.registration.scope}-${VERSION}`;
const PUBLICOS = ['./', './index.html', './css/style.css', './js/app.js', './js/pwa.js', './manifest.json', './assets/icons/icon-192.png', './assets/icons/icon-512.png', './assets/icons/apple-touch-icon.png'];
const urls = PUBLICOS.map(ruta => new URL(ruta, self.registration.scope).href);
self.addEventListener('install', evento => {
  evento.waitUntil(caches.open(CACHE).then(cache => cache.addAll(urls)));
});
self.addEventListener('activate', evento => {
  evento.waitUntil((async () => {
    const prefijo = `catalogo-${self.registration.scope}-`;
    for (const nombre of await caches.keys()) {
      if (nombre.startsWith(prefijo) && nombre !== CACHE) await caches.delete(nombre);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', evento => {
  if (evento.request.method !== 'GET' || !urls.includes(evento.request.url)) return;
  evento.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return (await cache.match(evento.request)) || fetch(evento.request);
  })());
});
// Receptor preparado. Solo funciona cuando un servidor envía push a una
// suscripción real del administrador. No pide permiso ni se suscribe solo.
self.addEventListener('push', evento => {
  evento.waitUntil(self.registration.showNotification('Mi catálogo', {
    body: 'Hay un nuevo pedido. Abre la app para revisarlo.',
    icon: new URL('./assets/icons/icon-192.png', self.registration.scope).href,
    data: { url: self.registration.scope }
  }));
});
self.addEventListener('notificationclick', evento => {
  evento.notification.close();
  evento.waitUntil((async () => {
    const ventanas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const ventana = ventanas.find(v => v.url.startsWith(self.registration.scope));
    if (ventana) return ventana.focus();
    return self.clients.openWindow(self.registration.scope);
  })());
});

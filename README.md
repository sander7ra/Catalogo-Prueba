# Mi catálogo — base PWA
La página muestra únicamente **ola**. Esta es una base editable HTML/CSS/JS,
con manifest, iconos y service worker; no es un APK ni un catálogo terminado.

## Probar en tu PC
1. Descomprime el ZIP y abre la carpeta catalogo-pwa en VS Code.
2. Usa la extensión Live Server sobre index.html (Open with Live Server).
   Alternativa con Python: desde esta carpeta ejecuta `python -m http.server 8000`.
3. Abre http://localhost:8000 si usaste Python.
4. En Chrome o Edge usa el menú para instalar la app si está disponible.
Abrir index.html con doble clic muestra ola, pero no sirve para probar instalación.

## Publicar en GitHub Pages
1. Sube el CONTENIDO de catalogo-pwa a la raíz de tu repositorio.
   index.html debe quedar en la raíz, no dentro de otra carpeta.
2. En Settings > Pages selecciona Deploy from a branch, main y /(root), y guarda.
3. Abre la URL HTTPS que te muestre GitHub Pages.
Las rutas relativas permiten funcionar bajo /nombre-del-repositorio/.

## Instalar en teléfono
- Android: abre la URL HTTPS en Chrome y usa el menú > Instalar aplicación
  o Añadir a pantalla de inicio (el texto depende del navegador).
- iPhone: abre la URL en Safari > Compartir > Añadir a pantalla de inicio;
  activa Abrir como app si se ofrece.
No necesitas un botón dentro de la página: así la prueba mantiene solo ola.
La disponibilidad y el momento de la opción de instalación dependen del navegador.

## Sin conexión y actualizaciones
Después de la primera carga correcta y activación del service worker, vuelve a
abrir la app para comprobar ola sin conexión. La caché solo contiene archivos
públicos enumerados en service-worker.js; no guarda pedidos ni recibos.
Cuando modifiques archivos, cambia VERSION en service-worker.js (por ejemplo v2),
sube tus cambios y abre la app con internet. Cierra todas sus ventanas y vuelve
 a abrir para que la nueva versión pueda activarse.

## Recibos y notificaciones: aún sin conectar
Sí es posible recibir avisos de pedidos en tu dispositivo. Esta entrega prepara
carpetas, funciones y eventos push, pero NO recibe pedidos de clientes ni envía
notificaciones reales. Pedir permiso por sí solo tampoco conecta el envío.
Hace falta base de datos, servidor/función, panel de administrador autenticado y
suscripción push en TU dispositivo. GitHub Pages puede alojar el frontend.
En iPhone, Web Push requiere iOS 16.4 o posterior, la app añadida a la pantalla
 de inicio y permiso concedido mediante una interacción del usuario.
Ver backend/README.md para el flujo propuesto. No hay credenciales integradas.

## Referencias
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
- https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/

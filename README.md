# Dulce — catálogo de prueba
Diseño basado en la referencia proporcionada. HTML, CSS y JS sin framework.

## Actualizar tu proyecto
Copia el contenido de esta carpeta sobre tu carpeta catalogo-pwa existente.
Reemplaza archivos cuando Windows lo solicite. Conserva la carpeta .git de tu
proyecto: no borres el repositorio ni crees otro. Prueba con Live Server.
Después usa git add ., git commit -m "Diseño del catálogo" y git push.

Incluye búsqueda, filtros, carrito con cantidades y total en MXN. El carrito
se conserva localmente en ese navegador. NO guarda pedidos en un servidor.
El envío está deshabilitado: no se manda ningún recibo ni notificación real.
La instalación PWA se mantiene: Android con menú del navegador; iPhone mediante
Compartir > Añadir a pantalla de inicio. Requiere HTTPS o localhost.

## Cambiar productos
Edita js/modules/catalogo.js: nombre, categoria, precio (pesos MXN), imagen,
descripcion e id único. data/productos.ejemplo.json es una copia de referencia;
la interfaz usa el archivo JS. Imágenes en assets/images/.
Las fotos actuales son recortes de baja resolución de tu referencia, solo para
maquetar. Sustitúyelas por fotos propias antes de publicar tu tienda real.
No se incluyen promociones o certificaciones ficticias.

## Actualizaciones
El service worker tiene VERSION v2. Al modificar archivos, incrementa VERSION.
Abre con internet, cierra todas las ventanas de la app y vuelve a abrir para
activar una nueva caché. Las imágenes públicas están disponibles sin conexión
tras la primera carga. La fuente Google es opcional; hay fuentes del sistema.

## Pendiente
Nombre definitivo, productos y fotos reales, datos del negocio y conexión
para pedidos/recibos/notificaciones. Consulta backend/README.md.

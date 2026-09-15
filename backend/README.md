# Servidor pendiente
Esta carpeta contiene el diseño, no un servidor funcionando. GitHub Pages
solo publica el frontend estático: no ejecuta este backend.

Flujo previsto:
1. Cliente elige productos y envía POST /pedidos.
2. Servidor valida cantidades y consulta precios oficiales (no confía en precios del navegador).
3. Guarda pedido, cliente, fecha y recibo en una base de datos.
4. Una tarea del servidor envía una notificación a las suscripciones del administrador.
5. Administrador abre un panel autenticado para ver el recibo.

API propuesta:
- GET /productos: productos públicos.
- POST /pedidos: crear pedido; validar y limitar solicitudes repetidas.
- GET /admin/pedidos: solo administrador autenticado.
- POST /admin/suscripciones: registrar suscripción push autenticada.
- DELETE /admin/suscripciones: eliminar suscripción al salir o desactivar avisos.

Opciones futuras: Firebase o servidor propio con base de datos y Web Push.
No se ha elegido proveedor ni conectado credenciales.
Guardar claves privadas del push y credenciales de correo solo en el servidor.
No guardar recibos reales en este repositorio público ni en la caché de la PWA.
La notificación debe ser genérica ("Nuevo pedido") y abrir el panel autenticado.
Si una notificación falla, el pedido debe seguir guardado y visible en el panel.
Recibo de pedido y confirmación de pago son estados distintos.

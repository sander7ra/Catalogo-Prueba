// Punto de integración futuro: solo el administrador debe suscribirse.
// Llamar desde un clic del administrador, nunca automáticamente al abrir.
export async function pedirPermisoNotificaciones() {
  if (!('Notification' in window) || !('PushManager' in window)) {
    throw new Error('Este navegador no permite notificaciones push en este contexto.');
  }
  return Notification.requestPermission();
}
// Falta: suscripción push con clave VAPID pública, guardarla mediante una
// API autenticada y enviar avisos desde el servidor al guardar cada pedido.

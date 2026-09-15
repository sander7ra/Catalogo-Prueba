export async function registrarPWA() {
  if (!('serviceWorker' in navigator)) return;
  try {
    const registro = await navigator.serviceWorker.register(new URL('../service-worker.js', import.meta.url));
    // Busca actualizaciones al abrir la app. Una versión en espera se activará
    // cuando se cierren las ventanas anteriores de esta app.
    await registro.update();
  } catch (error) {
    console.warn('No se pudo registrar la PWA. Usa HTTPS o localhost.', error);
  }
}

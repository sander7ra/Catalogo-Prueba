import { config } from '../config.js';
export async function solicitar(ruta, opciones = {}) {
  if (!config.apiBaseUrl) throw new Error('Falta conectar el servidor en js/config.js.');
  const base = config.apiBaseUrl.replace(/\/$/, '') + '/';
  const respuesta = await fetch(new URL(ruta.replace(/^\//, ''), base), {
    ...opciones,
    headers: { 'Content-Type': 'application/json', ...opciones.headers }
  });
  if (!respuesta.ok) throw new Error(`Error del servidor: ${respuesta.status}`);
  return respuesta.status === 204 ? null : respuesta.json();
}

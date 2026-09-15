import { solicitar } from './api.js';
// Preparado para un servidor futuro. No se ejecuta en la página de prueba.
// El servidor deberá validar productos, calcular precios y guardar el recibo.
export function enviarPedido(pedido) {
  return solicitar('pedidos', { method: 'POST', body: JSON.stringify(pedido) });
}

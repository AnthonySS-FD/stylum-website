// app/carrito/page.js
// Pagina completa del carrito

import CartPage from '@/components/CartPage';

export const metadata = {
  title: 'Mi carrito — STYLUM',
  description: 'Revisa tu pedido y finaliza tu compra de polos BOXYFIT STYLUM.',
};

export default function Carrito() {
  return <CartPage />;
}

'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

function CartItem({ item }) {
  var cart = useCart();
  return (
    <div className="flex gap-3 py-4 border-b border-brand-border last:border-0">
      <div className="w-14 h-16 flex-shrink-0 overflow-hidden bg-brand-border border border-brand-border">
        <img src={item.image || item.front || '/LOGO_STYLUM.png'} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <p className="font-display text-xs font-900 text-brand-white uppercase tracking-tight leading-tight">{item.name}</p>
        <p className="font-body text-xs text-brand-muted">Talla: <span className="text-brand-accent font-semibold">{item.size}</span></p>
        <div className="flex items-center justify-between mt-1">
          <p className="font-body text-sm font-semibold text-brand-white">{item.price}</p>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-brand-dim">x{item.quantity}</span>
            <button onClick={function() { cart.removeItem(item.id, item.size); }} className="text-brand-muted hover:text-red-400 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  var cart = useCart();
  var router = useRouter();

  function goToCart() {
    cart.setIsOpen(false);
    router.push('/carrito');
  }

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={function() { cart.setIsOpen(false); }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            key="sidebar"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-brand-surface border-l border-brand-border z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
              <div>
                <h2 className="font-display text-lg font-900 text-brand-white uppercase tracking-tight">Mi carrito</h2>
                <p className="font-body text-xs text-brand-muted">{cart.totalItems} {cart.totalItems === 1 ? 'producto' : 'productos'}</p>
              </div>
              <button onClick={function() { cart.setIsOpen(false); }} className="w-8 h-8 flex items-center justify-center border border-brand-border text-brand-dim hover:text-brand-white hover:border-brand-muted transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <AnimatePresence>
              {cart.lastAdded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-4 mt-3 px-4 py-2.5 bg-brand-accent/10 border border-brand-accent/30 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="font-body text-xs text-brand-accent">Agregado: {cart.lastAdded}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {cart.items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                <div className="w-14 h-14 border border-brand-border flex items-center justify-center">
                  <svg className="w-7 h-7 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-display text-base font-900 text-brand-white uppercase">Carrito vacio</p>
                  <p className="font-body text-xs text-brand-dim mt-1">Agrega polos desde la coleccion</p>
                </div>
                <button onClick={function() { cart.setIsOpen(false); }} className="bg-brand-accent text-brand-black font-body text-xs font-bold tracking-wider uppercase px-5 py-2.5 hover:bg-brand-white transition-colors">
                  Ver coleccion
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  {cart.items.map(function(item, i) { return <CartItem key={i} item={item} />; })}
                </div>
                <div className="px-5 py-4 border-t border-brand-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-sm text-brand-dim uppercase tracking-wider">Total</span>
                    <span className="font-display text-2xl font-900 text-brand-accent">S/. {cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={goToCart}
                    className="w-full flex items-center justify-center gap-3 bg-brand-accent text-brand-black font-body text-sm font-bold tracking-wider uppercase py-4 hover:bg-brand-white transition-colors duration-300 group"
                  >
                    Realizar pedido
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <button onClick={cart.clearCart} className="w-full mt-2 font-body text-xs text-brand-muted hover:text-red-400 transition-colors uppercase tracking-wider py-2">
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

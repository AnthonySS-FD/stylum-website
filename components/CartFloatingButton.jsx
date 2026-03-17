'use client';

// components/CartFloatingButton.jsx
// Boton flotante del carrito - lado izquierdo

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function CartFloatingButton() {
  var cart = useCart();
  var [visible, setVisible] = useState(false);

  useEffect(function() {
    var onScroll = function() { setVisible(window.scrollY > 400); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  if (cart.totalItems === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="float-cart"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0,   opacity: 1 }}
          exit={{ x: -80,   opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={function() { cart.setIsOpen(true); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-brand-surface border border-brand-accent text-brand-white font-body text-sm font-semibold tracking-wider uppercase px-4 py-3 shadow-lg shadow-black/40 hover:bg-brand-accent hover:text-brand-black transition-colors duration-300"
          aria-label="Ver carrito"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <span>
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
          </span>
          <span className="text-brand-accent font-bold group-hover:text-brand-black">
            S/. {cart.totalPrice.toFixed(2)}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

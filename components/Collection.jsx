'use client';

// components/Collection.jsx
// Grid de productos con modal de talla y boton agregar al carrito

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const SIZES = ['S', 'M', 'L', 'XL'];

const PRODUCTS = [
  {
    id: 1,
    name: 'BOXYFIT Stylum Green',
    price: 'S/. 49.90',
    priceNumber: 50,
    tag: 'Mas vendido',
    color: 'Verde Botella',
    image: '/BOXY_VERDEBOTELLA.jpg',
  },
  {
    id: 2,
    name: 'BOXYFIT White & Black',
    price: 'S/. 49.90',
    priceNumber: 50,
    tag: 'Nuevo',
    color: 'Blanco',
    image: '/BOXY_BLANCOYNEGRO.png',
  },
  {
    id: 3,
    name: 'BOXYFIT Stone Guinda',
    price: 'S/. 49.90',
    priceNumber: 50,
    tag: null,
    color: 'Gris',
    image: '/BOXY_GUINDA.png',
  },
  {
    id: 4,
    name: 'BOXYFIT Stylum Green',
    price: 'S/. 49.90',
    priceNumber: 50,
    tag: 'Reversa',
    color: 'Oliva',
    image: '/BOXY_VERDE_REVERSA.jpg',
  },
  {
    id: 5,
    name: 'BOXYFIT White & Black',
    price: 'S/. 49.90',
    priceNumber: 50,
    tag: 'Reversa',
    color: 'Azul marino',
    image: '/BOXY_BLANCO_REVERSA.jpg',
  },
  {
    id: 6,
    name: 'BOXYFIT Stone Guinda',
    price: 'S/. 49.90',
    priceNumber: 50,
    tag: 'Reversa',
    color: 'Crema',
    image: '/BOXY_GUINDA_REVERSA.jpeg',
  },
];

// Modal selector de talla
function SizeModal({ product, onClose }) {
  var cart = useCart();
  var [selectedSize,     setSelectedSize]     = useState(null);
  var [selectedQuantity, setSelectedQuantity] = useState(1);
  var [added,            setAdded]            = useState(false);

  function handleAdd() {
    if (!selectedSize) return;
    cart.addItem(product, selectedSize, selectedQuantity);
    setAdded(true);
    setTimeout(function() {
      onClose();
      setAdded(false);
      setSelectedSize(null);
      setSelectedQuantity(1);
    }, 800);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        exit={{ y: 60,  opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm bg-brand-surface border border-brand-border z-10"
      >
        {/* Header del modal */}
        <div className="flex items-start gap-4 p-5 border-b border-brand-border">
          <div className="w-14 h-16 flex-shrink-0 overflow-hidden bg-brand-border">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-display text-sm font-900 text-brand-white uppercase tracking-tight leading-tight">
              {product.name}
            </p>
            <p className="font-body text-sm text-brand-accent font-semibold mt-1">
              {product.price}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-brand-white transition-colors mt-0.5"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Selector de talla */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-body text-xs text-brand-dim uppercase tracking-wider">
                Selecciona tu talla
              </p>
              {!selectedSize && (
                <p className="font-body text-xs text-brand-muted">Requerido</p>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map(function(size) {
                return (
                  <button
                    key={size}
                    onClick={function() { setSelectedSize(size); }}
                    className={
                      'h-12 font-display text-base font-900 border transition-all duration-200 ' +
                      (selectedSize === size
                        ? 'bg-brand-accent border-brand-accent text-brand-black'
                        : 'bg-transparent border-brand-border text-brand-dim hover:border-brand-muted hover:text-brand-white')
                    }
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector de cantidad */}
          <div>
            <p className="font-body text-xs text-brand-dim uppercase tracking-wider mb-3">
              Cantidad
            </p>
            <div className="flex items-center border border-brand-border w-fit">
              <button
                onClick={function() { setSelectedQuantity(function(q) { return Math.max(1, q - 1); }); }}
                className="w-10 h-10 flex items-center justify-center text-brand-dim hover:text-brand-white hover:bg-brand-border transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <span className="w-12 text-center font-body text-sm font-semibold text-brand-white">
                {selectedQuantity}
              </span>
              <button
                onClick={function() { setSelectedQuantity(function(q) { return Math.min(10, q + 1); }); }}
                className="w-10 h-10 flex items-center justify-center text-brand-dim hover:text-brand-white hover:bg-brand-border transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Subtotal */}
          {selectedSize && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center py-3 border-t border-brand-border"
            >
              <span className="font-body text-xs text-brand-dim uppercase tracking-wider">Subtotal</span>
              <span className="font-display text-xl font-900 text-brand-accent">
                S/. {(product.priceNumber * selectedQuantity).toFixed(2)}
              </span>
            </motion.div>
          )}

          {/* Boton agregar */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className={
              'w-full flex items-center justify-center gap-3 font-body text-sm font-bold tracking-wider uppercase py-4 transition-all duration-300 ' +
              (added
                ? 'bg-green-500 text-white'
                : selectedSize
                  ? 'bg-brand-accent text-brand-black hover:bg-brand-white cursor-pointer'
                  : 'bg-brand-border text-brand-muted cursor-not-allowed')
            }
          >
            {added ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Agregado!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {selectedSize ? 'Agregar al carrito' : 'Selecciona una talla'}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Tarjeta de producto
function ProductCard({ product, index }) {
  var [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
        className="group relative flex flex-col bg-brand-surface border border-brand-border overflow-hidden"
      >
        {/* Imagen */}
        <div className="relative overflow-hidden aspect-[3/4] bg-brand-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={function() { setShowModal(true); }}
              className="bg-brand-accent text-brand-black font-body text-xs font-bold tracking-wider uppercase px-6 py-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out hover:bg-brand-white"
            >
              Agregar al carrito
            </button>
          </div>

          {/* Badge */}
          {product.tag && (
            <span className="absolute top-3 left-3 bg-brand-accent text-brand-black font-body font-bold tracking-wider uppercase px-2.5 py-1 z-10" style={{ fontSize: '10px' }}>
              {product.tag}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base md:text-lg font-700 text-brand-white leading-tight tracking-wide uppercase">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-medium text-brand-accent">
              {product.price}
            </span>
            <span className="font-body text-brand-dim" style={{ fontSize: '10px' }}>BOXYFIT</span>
          </div>

          {/* Boton agregar visible en mobile */}
          <button
            onClick={function() { setShowModal(true); }}
            className="mt-1 w-full bg-transparent border border-brand-border text-brand-dim hover:border-brand-accent hover:text-brand-accent font-body text-xs font-semibold tracking-wider uppercase py-2.5 transition-all duration-300"
          >
            + Agregar
          </button>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-500" />
      </motion.article>

      {/* Modal de talla */}
      <AnimatePresence>
        {showModal && (
          <SizeModal
            product={product}
            onClose={function() { setShowModal(false); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Collection() {
  var ref    = useRef(null);
  var inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} id="coleccion" className="relative py-24 md:py-32 px-6 md:px-10 bg-brand-black">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-18 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-body text-xs tracking-mega text-brand-accent uppercase mb-3"
            >
              — Coleccion actual
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl md:text-7xl font-900 text-brand-white uppercase tracking-tight leading-none"
              >
                BOXYFIT
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="font-display text-5xl md:text-7xl font-900 text-brand-accent uppercase tracking-tight leading-none"
              >
                COLLECTION
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-sm text-brand-dim max-w-xs leading-relaxed"
          >
            Corte oversize con estructura box. Telas premium, acabados impecables. Disenados para durar y destacar.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {PRODUCTS.map(function(product, i) {
            return <ProductCard key={product.id} product={product} index={i} />;
          })}
        </motion.div>

      </div>
    </section>
  );
}

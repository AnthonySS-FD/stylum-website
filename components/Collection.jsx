'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

var SIZES = ['S', 'M', 'L', 'XL'];

var SIZE_CHART = [
  { talla: 'S',  pecho: '102', largo: '68', hombro: '47' },
  { talla: 'M',  pecho: '108', largo: '71', hombro: '50' },
  { talla: 'L',  pecho: '114', largo: '74', hombro: '53' },
  { talla: 'XL', pecho: '120', largo: '77', hombro: '56' },
];

var PRODUCTS = [
  {
    id: 1,
    name: 'BOXYFIT Stylum Green',
    price: 'S/. 49.90',
    priceNumber: 49.90,
    tag: 'Mas vendido',
    color: 'Verde botella',
    front: '/BOXY_VERDEBOTELLA.jpg',
    back:  '/BOXY_VERDE_REVERSA.jpg',
  },
  {
    id: 2,
    name: 'BOXYFIT White & Black',
    price: 'S/. 49.90',
    priceNumber: 49.90,
    tag: 'Nuevo',
    color: 'Blanco y Negro',
    front: '/BOXY_BLANCONEGRO.png',
    back:  '/BOXY_BLANCO_REVERSA.jpg',
  },
  {
    id: 3,
    name: 'BOXYFIT Stone Guinda',
    price: 'S/. 49.90',
    priceNumber: 49.90,
    tag: null,
    color: 'Guinda',
    front: '/BOXY_GUINDA.png',
    back:  '/BOXY_GUINDA_REVERSA.jpeg',
  },
];

function SizeChartModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-brand-surface border border-brand-border z-10"
      >
        <div className="flex items-start justify-between p-6 border-b border-brand-border">
          <div>
            <h3 className="font-display text-2xl font-900 text-brand-white uppercase tracking-tight">
              Guia de tallas
            </h3>
            <p className="font-body text-xs text-brand-muted mt-1">
              Corte BOXYFIT — medidas en centimetros
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-brand-border text-brand-dim hover:text-brand-white hover:border-brand-muted transition-colors ml-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-hidden border border-brand-border">
            <table className="w-full">
              <thead>
                <tr className="bg-brand-accent">
                  <th className="font-body text-xs font-bold tracking-wider uppercase p-3 text-left text-brand-black">Talla</th>
                  <th className="font-body text-xs font-bold tracking-wider uppercase p-3 text-center text-brand-black">Pecho</th>
                  <th className="font-body text-xs font-bold tracking-wider uppercase p-3 text-center text-brand-black">Largo</th>
                  <th className="font-body text-xs font-bold tracking-wider uppercase p-3 text-center text-brand-black">Hombro</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map(function(row, i) {
                  return (
                    <tr key={row.talla} className={i % 2 === 0 ? 'bg-brand-black' : 'bg-brand-surface'}>
                      <td className="p-3">
                        <span className="font-display text-2xl font-900 text-brand-white">{row.talla}</span>
                      </td>
                      <td className="p-3 text-center font-body text-sm text-brand-dim">{row.pecho} cm</td>
                      <td className="p-3 text-center font-body text-sm text-brand-dim">{row.largo} cm</td>
                      <td className="p-3 text-center font-body text-sm text-brand-dim">{row.hombro} cm</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-brand-black border border-brand-border">
            <p className="font-body text-xs text-brand-dim leading-relaxed">
              <span className="text-brand-white font-semibold">Corte BOXYFIT:</span> Silueta cuadrada y suelta. Si dudas entre dos tallas, elige la menor.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SizeModal({ product, onClose }) {
  var cart = useCart();
  var [selectedSize, setSelectedSize] = useState(null);
  var [selectedQty, setSelectedQty] = useState(1);
  var [added, setAdded] = useState(false);
  var [showChart, setShowChart] = useState(false);
  var [showBack, setShowBack] = useState(false);

  function handleAdd() {
    if (!selectedSize) return;
    cart.addItem(Object.assign({}, product, { image: product.front }), selectedSize, selectedQty);
    setAdded(true);
    setTimeout(function() {
      onClose();
      setAdded(false);
      setSelectedSize(null);
      setSelectedQty(1);
    }, 900);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm bg-brand-surface border border-brand-border z-10"
        >
          <div className="flex items-start gap-4 p-5 border-b border-brand-border">
            <div
              className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-brand-border border border-brand-border cursor-pointer"
              onClick={function() { setShowBack(!showBack); }}
            >
              <img
                src={showBack ? product.back : product.front}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5 text-center">
                <span className="font-body text-white" style={{ fontSize: '8px' }}>
                  {showBack ? 'REVERSA' : 'FRENTE'}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-900 text-brand-white uppercase tracking-tight leading-tight">{product.name}</p>
              <p className="font-body text-xs text-brand-muted mt-0.5">{product.color}</p>
              <p className="font-body text-lg font-semibold text-brand-accent mt-1">{product.price}</p>
            </div>
            <button onClick={onClose} className="text-brand-muted hover:text-brand-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-5 flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-body text-xs font-semibold text-brand-white uppercase tracking-wider">Selecciona tu talla</p>
                <button onClick={function() { setShowChart(true); }} className="font-body text-xs text-brand-accent hover:text-brand-white transition-colors underline underline-offset-2">
                  Guia de tallas
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map(function(size) {
                  return (
                    <button
                      key={size}
                      onClick={function() { setSelectedSize(size); }}
                      className={
                        'h-12 font-display text-lg font-900 border-2 transition-all duration-200 ' +
                        (selectedSize === size
                          ? 'bg-brand-accent border-brand-accent text-brand-black'
                          : 'bg-transparent border-brand-border text-brand-dim hover:border-brand-accent hover:text-brand-white')
                      }
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-body text-xs font-semibold text-brand-white uppercase tracking-wider mb-3">Cantidad</p>
              <div className="flex items-center border border-brand-border w-fit">
                <button onClick={function() { setSelectedQty(function(q) { return Math.max(1, q - 1); }); }} className="w-10 h-10 flex items-center justify-center text-brand-dim hover:text-brand-white hover:bg-brand-border transition-colors font-bold text-lg">−</button>
                <span className="w-12 text-center font-body text-sm font-semibold text-brand-white">{selectedQty}</span>
                <button onClick={function() { setSelectedQty(function(q) { return Math.min(10, q + 1); }); }} className="w-10 h-10 flex items-center justify-center text-brand-dim hover:text-brand-white hover:bg-brand-border transition-colors font-bold text-lg">+</button>
              </div>
            </div>

            {selectedSize && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between py-3 border-t border-brand-border"
              >
                <span className="font-body text-xs text-brand-dim uppercase tracking-wider">Subtotal</span>
                <span className="font-display text-2xl font-900 text-brand-accent">S/. {(product.priceNumber * selectedQty).toFixed(2)}</span>
              </motion.div>
            )}

            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className={
                'w-full flex items-center justify-center gap-3 font-body text-sm font-bold tracking-wider uppercase py-4 transition-all duration-300 ' +
                (added
                  ? 'bg-green-500 text-brand-white'
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
              ) : selectedSize ? 'Agregar al carrito' : 'Selecciona una talla'}
            </button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showChart && <SizeChartModal onClose={function() { setShowChart(false); }} />}
      </AnimatePresence>
    </>
  );
}

function ProductCard({ product, index }) {
  var [showBack, setShowBack] = useState(false);
  var [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
        className="group relative flex flex-col bg-brand-surface border border-brand-border hover:border-brand-accent transition-colors duration-300 overflow-hidden"
      >
        <div className="relative overflow-hidden aspect-[3/4] bg-brand-black">
          <motion.img
            src={product.front}
            alt={product.name + ' frente'}
            animate={{ opacity: showBack ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <motion.img
            src={product.back}
            alt={product.name + ' reversa'}
            animate={{ opacity: showBack ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {product.tag && (
            <span className="absolute top-3 left-3 z-10 bg-brand-accent text-brand-black font-body font-bold tracking-wider uppercase px-2.5 py-1" style={{ fontSize: '10px' }}>
              {product.tag}
            </span>
          )}

          <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">
            <button
              onClick={function() { setShowBack(false); }}
              className={'font-body px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ' + (!showBack ? 'bg-brand-white text-brand-black' : 'bg-brand-black/60 text-brand-dim hover:text-brand-white backdrop-blur-sm')}
            >
              Frente
            </button>
            <button
              onClick={function() { setShowBack(true); }}
              className={'font-body px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ' + (showBack ? 'bg-brand-white text-brand-black' : 'bg-brand-black/60 text-brand-dim hover:text-brand-white backdrop-blur-sm')}
            >
              Reversa
            </button>
          </div>

          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/50 transition-all duration-400 flex items-center justify-center z-20 pointer-events-none group-hover:pointer-events-auto">
            <button
              className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-brand-accent text-brand-black font-body text-xs font-bold tracking-wider uppercase px-6 py-3 hover:bg-brand-white"
              onClick={function(e) { e.stopPropagation(); setShowModal(true); }}
            >
              + Agregar al carrito
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div>
            <h3 className="font-display text-base md:text-lg font-900 text-brand-white uppercase leading-tight tracking-tight">{product.name}</h3>
            <p className="font-body text-xs text-brand-muted mt-0.5 tracking-wide">{product.color}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-lg font-semibold text-brand-accent">{product.price}</span>
            <span className="font-body text-xs text-brand-muted uppercase tracking-wider">BOXYFIT</span>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={function() { setShowModal(true); }}
              className="flex-1 bg-brand-accent text-brand-black font-body text-xs font-bold tracking-wider uppercase py-3 hover:bg-brand-white transition-colors duration-300"
            >
              + Agregar
            </button>
            <button
              onClick={function() { setShowBack(!showBack); }}
              className="border border-brand-border text-brand-dim hover:border-brand-accent hover:text-brand-accent font-body text-xs font-medium uppercase px-3 py-3 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-500" />
      </motion.article>

      <AnimatePresence>
        {showModal && <SizeModal product={product} onClose={function() { setShowModal(false); }} />}
      </AnimatePresence>
    </>
  );
}

export default function Collection() {
  var ref = useRef(null);
  var inView = useInView(ref, { once: true, margin: '-10%' });
  var [showSizeChart, setShowSizeChart] = useState(false);

  return (
    <>
      <section ref={ref} id="coleccion" className="relative py-24 md:py-32 px-6 md:px-10 bg-brand-black">
        <div className="max-w-7xl mx-auto">

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
              {['BOXYFIT', 'COLLECTION'].map(function(line, i) {
                return (
                  <div key={i} className="overflow-hidden">
                    <motion.h2
                      initial={{ y: '110%' }}
                      animate={inView ? { y: '0%' } : {}}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                      className={'font-display text-5xl md:text-7xl font-900 uppercase tracking-tight leading-none ' + (i === 1 ? 'text-brand-accent' : 'text-brand-white')}
                    >
                      {line}
                    </motion.h2>
                  </div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col gap-4"
            >
              <p className="font-body text-sm text-brand-dim max-w-xs leading-relaxed">
                Corte oversize con estructura box. Telas premium y acabados impecables.
              </p>
              <button
                onClick={function() { setShowSizeChart(true); }}
                className="self-start flex items-center gap-2 font-body text-xs font-semibold tracking-wider uppercase text-brand-dim hover:text-brand-accent transition-colors duration-300 group border-b border-brand-border hover:border-brand-accent pb-0.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
                Guia de tallas BOXYFIT
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PRODUCTS.map(function(product, i) {
              return <ProductCard key={product.id} product={product} index={i} />;
            })}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {showSizeChart && <SizeChartModal onClose={function() { setShowSizeChart(false); }} />}
      </AnimatePresence>
    </>
  );
}

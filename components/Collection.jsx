'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

// ✅ Solo S, M, L — sin XL
var SIZES = ['S', 'M', 'L'];

// ✅ Tabla de tallas sin XL
var SIZE_CHART = [
  { talla: 'S', pecho: '102', largo: '68', hombro: '47' },
  { talla: 'M', pecho: '108', largo: '71', hombro: '50' },
  { talla: 'L', pecho: '114', largo: '74', hombro: '53' },
];

// ✅ Solo 3 productos
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
    front: '/BOXY_BLANCOYNEGRO.png',
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
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-[#111111] border border-[#2a2a2a] z-10 overflow-hidden"
      >
        <div className="h-0.5 bg-brand-accent w-full" />
        <div className="flex items-start justify-between p-6 border-b border-[#2a2a2a]">
          <div>
            <h3 className="font-display text-2xl font-900 text-white uppercase tracking-tight">Guia de tallas</h3>
            <p className="font-body text-xs text-[#888] mt-1">Corte BOXYFIT — medidas en centimetros</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border border-[#333] text-[#888] hover:text-white transition-colors ml-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-accent">
                <th className="font-body text-xs font-bold tracking-wider uppercase p-3 text-left text-black">Talla</th>
                <th className="font-body text-xs font-bold tracking-wider uppercase p-3 text-center text-black">Pecho</th>
                <th className="font-body text-xs font-bold tracking-wider uppercase p-3 text-center text-black">Largo</th>
                <th className="font-body text-xs font-bold tracking-wider uppercase p-3 text-center text-black">Hombro</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map(function(row, i) {
                return (
                  <tr key={row.talla} className={'border-b border-[#2a2a2a] ' + (i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#111111]')}>
                    <td className="p-3"><span className="font-display text-2xl font-900 text-white">{row.talla}</span></td>
                    <td className="p-3 text-center font-body text-sm text-[#aaa]">{row.pecho} cm</td>
                    <td className="p-3 text-center font-body text-sm text-[#aaa]">{row.largo} cm</td>
                    <td className="p-3 text-center font-body text-sm text-[#aaa]">{row.hombro} cm</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 p-4 bg-[#0d0d0d] border border-[#2a2a2a]">
            <p className="font-body text-xs text-[#777] leading-relaxed">
              <span className="text-white font-semibold">Corte BOXYFIT:</span> Silueta cuadrada y suelta. Si dudas entre dos tallas, elige la menor.
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
        className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm bg-[#111111] border border-[#2a2a2a] z-10 overflow-hidden"
        >
          <div className="h-0.5 bg-brand-accent w-full" />
          <div className="flex items-start gap-4 p-5 border-b border-[#2a2a2a]">
            <div
              className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-[#1a1a1a] border border-[#333] cursor-pointer"
              onClick={function() { setShowBack(!showBack); }}
            >
              <img src={showBack ? product.back : product.front} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-0.5 text-center">
                <span className="font-body text-white" style={{ fontSize: '8px' }}>{showBack ? 'REVERSA' : 'FRENTE'}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-900 text-white uppercase tracking-tight leading-tight">{product.name}</p>
              <p className="font-body text-xs mt-0.5" style={{ color: '#888' }}>{product.color}</p>
              <p className="font-body text-xl font-semibold text-brand-accent mt-1">{product.price}</p>
            </div>
            <button onClick={onClose} className="text-[#666] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-5 flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-body text-xs font-semibold text-white uppercase tracking-wider">Selecciona tu talla</p>
                <button onClick={function() { setShowChart(true); }} className="font-body text-xs text-brand-accent hover:text-white transition-colors">
                  Ver guia de tallas →
                </button>
              </div>
              {/* ✅ Solo 3 tallas */}
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map(function(size) {
                  return (
                    <button
                      key={size}
                      onClick={function() { setSelectedSize(size); }}
                      className={
                        'h-12 font-display text-lg font-900 border-2 transition-all duration-200 ' +
                        (selectedSize === size
                          ? 'bg-brand-accent border-brand-accent text-black'
                          : 'bg-transparent border-[#333] text-[#888] hover:border-brand-accent hover:text-white')
                      }
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-body text-xs font-semibold text-white uppercase tracking-wider mb-3">Cantidad</p>
              <div className="flex items-center border border-[#333] w-fit">
                <button onClick={function() { setSelectedQty(function(q) { return Math.max(1, q - 1); }); }} className="w-10 h-10 flex items-center justify-center text-[#888] hover:text-white hover:bg-[#222] transition-colors font-bold text-lg">−</button>
                <span className="w-12 text-center font-body text-sm font-semibold text-white">{selectedQty}</span>
                <button onClick={function() { setSelectedQty(function(q) { return Math.min(10, q + 1); }); }} className="w-10 h-10 flex items-center justify-center text-[#888] hover:text-white hover:bg-[#222] transition-colors font-bold text-lg">+</button>
              </div>
            </div>

            {selectedSize && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between py-3 border-t border-[#2a2a2a]"
              >
                <span className="font-body text-xs text-[#888] uppercase tracking-wider">Subtotal</span>
                <span className="font-display text-2xl font-900 text-brand-accent">S/. {(product.priceNumber * selectedQty).toFixed(2)}</span>
              </motion.div>
            )}

            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className={
                'w-full flex items-center justify-center gap-3 font-body text-sm font-bold tracking-wider uppercase py-4 transition-all duration-300 ' +
                (added
                  ? 'bg-green-500 text-white'
                  : selectedSize
                    ? 'bg-brand-accent text-black hover:bg-white cursor-pointer'
                    : 'bg-[#222] text-[#555] cursor-not-allowed')
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
  var [hovered, setHovered] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
        onMouseEnter={function() { setHovered(true); }}
        onMouseLeave={function() { setHovered(false); }}
        className="relative flex flex-col overflow-hidden"
        style={{ background: '#111111', border: '1px solid #222', borderRadius: '2px' }}
      >
        {/* Imagen */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>

          {/* Frente */}
          <img
            src={product.front}
            alt={product.name + ' frente'}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              opacity: showBack ? 0 : 1,
              transform: hovered && !showBack ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Reversa */}
          <img
            src={product.back}
            alt={product.name + ' reversa'}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{
              opacity: showBack ? 1 : 0,
              transform: hovered && showBack ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Overlay gradiente — pointer-events none para no bloquear botones */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
              opacity: hovered ? 1 : 0.5,
              pointerEvents: 'none',
            }}
          />

          {/* Badge */}
          {product.tag && (
            <span
              className="absolute top-3 left-3 font-body font-bold tracking-wider uppercase px-2.5 py-1 bg-brand-accent text-black"
              style={{ fontSize: '10px', zIndex: 10 }}
            >
              {product.tag}
            </span>
          )}

          {/* ✅ Boton CENTRADO al hover — z-index alto, pointerEvents controlado */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              zIndex: 15,
              pointerEvents: hovered ? 'auto' : 'none',
            }}
          >
            <motion.button
              animate={{
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : 10,
              }}
              transition={{ duration: 0.25 }}
              onClick={function() { setShowModal(true); }}
              className="bg-brand-accent text-black font-body text-xs font-bold tracking-wider uppercase px-8 py-3 hover:bg-white transition-colors duration-200 shadow-xl"
              style={{ pointerEvents: hovered ? 'auto' : 'none' }}
            >
              + Agregar al carrito
            </motion.button>
          </div>

          {/* Botones frente/reversa — z-index mayor que el boton de agregar */}
          <div className="absolute bottom-3 left-3 flex gap-1.5" style={{ zIndex: 20 }}>
            <button
              onClick={function(e) { e.stopPropagation(); setShowBack(false); }}
              className="font-body px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer"
              style={{
                background: !showBack ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.65)',
                color: !showBack ? '#000' : '#aaa',
                backdropFilter: 'blur(4px)',
              }}
            >
              Frente
            </button>
            <button
              onClick={function(e) { e.stopPropagation(); setShowBack(true); }}
              className="font-body px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer"
              style={{
                background: showBack ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.65)',
                color: showBack ? '#000' : '#aaa',
                backdropFilter: 'blur(4px)',
              }}
            >
              Reversa
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-3">
          <div>
            <h3 className="font-display text-base md:text-lg font-900 text-white uppercase leading-tight tracking-tight">
              {product.name}
            </h3>
            <p className="font-body text-xs mt-0.5 tracking-wide" style={{ color: '#888' }}>
              {product.color}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-body text-lg font-semibold text-brand-accent">{product.price}</span>
            <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#555' }}>BOXYFIT</span>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={function() { setShowModal(true); }}
              className="flex-1 bg-brand-accent text-black font-body text-xs font-bold tracking-wider uppercase py-3 hover:bg-white transition-colors duration-300"
            >
              + Agregar
            </button>
            <button
              onClick={function() { setShowBack(!showBack); }}
              className="px-3 py-3 transition-colors duration-300"
              style={{ border: '1px solid #333', color: '#888' }}
              onMouseEnter={function(e) { e.currentTarget.style.borderColor = '#6EC6E6'; e.currentTarget.style.color = '#6EC6E6'; }}
              onMouseLeave={function(e) { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888'; }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
        </div>

        {/* Borde accent inferior */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-brand-accent transition-all duration-500"
          style={{ width: hovered ? '100%' : '0%' }}
        />
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
      <section
        ref={ref}
        id="coleccion"
        className="relative py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: '#080808' }}
      >
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: '600px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(110,198,230,0.04) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative">

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
              {['BOXYFIT', 'COLLECTION'].map(function(line, i) {
                return (
                  <div key={i} className="overflow-hidden">
                    <motion.h2
                      initial={{ y: '110%' }}
                      animate={inView ? { y: '0%' } : {}}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                      className="font-display text-5xl md:text-7xl font-900 uppercase tracking-tight leading-none"
                      style={{ color: i === 1 ? '#6EC6E6' : '#F0F0F0' }}
                    >
                      {line}
                    </motion.h2>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-body text-sm leading-relaxed max-w-xs"
                style={{ color: '#888' }}
              >
                Corte oversize con estructura box. Telas premium y acabados impecables. Cada polo es edicion limitada.
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                onClick={function() { setShowSizeChart(true); }}
                className="self-start flex items-center gap-2 font-body text-xs font-semibold tracking-wider uppercase transition-colors duration-300"
                style={{ color: '#888', borderBottom: '1px solid #444', paddingBottom: '2px' }}
                onMouseEnter={function(e) { e.currentTarget.style.color = '#6EC6E6'; e.currentTarget.style.borderBottomColor = '#6EC6E6'; }}
                onMouseLeave={function(e) { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderBottomColor = '#444'; }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
                Guia de tallas BOXYFIT
              </motion.button>
            </div>
          </div>

          {/* Grid 3 columnas */}
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

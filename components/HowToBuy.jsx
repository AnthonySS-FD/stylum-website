'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCart } from '@/context/CartContext';

var STEPS = [
  {
    number: '01',
    title: 'Elige tu polo',
    desc: 'Explora nuestra coleccion BOXYFIT y selecciona el color que mas te guste. Disponible en tallas S, M y L.',
    detail: 'S · M · L disponibles',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
    cta: null,
  },
  {
    number: '02',
    title: 'Agrega al carrito',
    desc: 'Selecciona tu talla, la cantidad y agrega tu polo al carrito. Puedes agregar varios modelos en un solo pedido.',
    detail: 'Varios modelos en 1 pedido',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
      </svg>
    ),
    cta: null,
  },
  {
    number: '03',
    title: 'Completa tu pedido',
    desc: 'Ingresa tus datos de entrega y elige tu metodo de pago: Yape, Plin, transferencia o efectivo.',
    detail: 'Yape · Plin · Transferencia · Efectivo',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
    cta: null,
  },
  {
    number: '04',
    title: 'Recibe en casa',
    desc: 'Tu pedido llega a tu direccion en Lima en 24-48 horas. Para provincias coordinamos via courier.',
    detail: 'Lima 24-48h · Provincias 3-5 dias',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    cta: null,
  },
];

var GUARANTEES = [
  { icon: '🔄', title: 'Cambio de talla',     desc: 'Sin preguntas ni costo extra'           },
  { icon: '📦', title: 'Empaque cuidado',     desc: 'Tu polo llega perfecto y protegido'     },
  { icon: '✅', title: 'Calidad garantizada', desc: 'Tela premium o te devolvemos el dinero' },
  { icon: '⚡', title: 'Respuesta rapida',    desc: 'Confirmamos tu pedido al instante'      },
];

function StepCard({ step, index, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      onClick={onClick}
      className="relative flex flex-col gap-5 p-6 md:p-8 cursor-pointer transition-all duration-300"
      style={{
        background: '#141414',
        border: isActive ? '1px solid #6EC6E6' : '1px solid #222',
      }}
      onMouseEnter={function(e) { if (!isActive) e.currentTarget.style.borderColor = '#333'; }}
      onMouseLeave={function(e) { if (!isActive) e.currentTarget.style.borderColor = '#222'; }}
    >
      {/* Numero watermark */}
      <span
        className="absolute top-4 right-5 font-display font-900 leading-none select-none pointer-events-none"
        style={{ fontSize: '4rem', color: isActive ? 'rgba(110,198,230,0.1)' : 'rgba(255,255,255,0.03)' }}
      >
        {step.number}
      </span>

      {/* Icon */}
      <div
        className="w-14 h-14 flex items-center justify-center border transition-all duration-300"
        style={{
          border: isActive ? '1px solid #6EC6E6' : '1px solid #2a2a2a',
          color: isActive ? '#6EC6E6' : '#666',
          background: isActive ? 'rgba(110,198,230,0.08)' : 'transparent',
        }}
      >
        {step.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3
          className="font-display text-2xl font-900 uppercase tracking-tight transition-colors duration-300"
          style={{ color: isActive ? '#F0F0F0' : '#666' }}
        >
          {step.title}
        </h3>
        <p className="font-body text-sm leading-relaxed" style={{ color: '#888' }}>
          {step.desc}
        </p>
        {step.detail && (
          <span
            className="self-start font-body text-xs tracking-wider uppercase px-2.5 py-1 mt-1"
            style={isActive
              ? { background: 'rgba(110,198,230,0.12)', color: '#6EC6E6', border: '1px solid rgba(110,198,230,0.3)' }
              : { background: '#1a1a1a', color: '#666', border: '1px solid transparent' }
            }
          >
            {step.detail}
          </span>
        )}
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-brand-accent transition-all duration-500"
        style={{ width: isActive ? '100%' : '0%' }}
      />
    </motion.div>
  );
}

export default function HowToBuy() {
  var headerRef = useRef(null);
  var inView = useInView(headerRef, { once: true, margin: '-15%' });
  var [active, setActive] = useState(0);
  var cart = useCart();

  return (
    <section
      id="como-comprar"
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      style={{ background: '#0A0A0A', borderTop: '1px solid #1a1a1a' }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '500px', height: '300px', background: 'radial-gradient(ellipse, rgba(110,198,230,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
          >
            — Proceso de compra
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              {['Como', 'comprar?'].map(function(line, i) {
                return (
                  <div key={i} className="overflow-hidden">
                    <motion.h2
                      initial={{ y: '110%' }}
                      animate={inView ? { y: '0%' } : {}}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                      className="font-display text-5xl md:text-7xl font-900 uppercase leading-none tracking-tight"
                      style={{ color: i === 1 ? '#6EC6E6' : '#F0F0F0' }}
                    >
                      {line}
                    </motion.h2>
                  </div>
                );
              })}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="font-body text-sm max-w-xs leading-relaxed"
              style={{ color: '#888' }}
            >
              Simple, rapido y seguro. Tu polo BOXYFIT en 4 pasos desde la web.
            </motion.p>
          </div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex items-center"
          >
            {STEPS.map(function(step, i) {
              return (
                <div key={i} className="flex items-center flex-1">
                  <button
                    onClick={function() { setActive(i); }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-900 transition-all duration-300"
                    style={active >= i
                      ? { background: '#6EC6E6', border: '1px solid #6EC6E6', color: '#000' }
                      : { background: 'transparent', border: '1px solid #333', color: '#666' }
                    }
                  >
                    {active > i ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : i + 1}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-1 relative overflow-hidden" style={{ background: '#1e1e1e' }}>
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-brand-accent"
                        animate={{ width: active > i ? '100%' : '0%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
          {STEPS.map(function(step, i) {
            return (
              <StepCard
                key={i}
                step={step}
                index={i}
                isActive={active === i}
                onClick={function() { setActive(i); }}
              />
            );
          })}
        </div>

        {/* Garantias */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-10 mb-10"
          style={{ background: '#141414', border: '1px solid #222' }}
        >
          <p className="font-body text-xs tracking-mega text-brand-accent uppercase mb-6">
            — Nuestras garantias
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {GUARANTEES.map(function(g, i) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-2xl">{g.icon}</span>
                  <p className="font-body text-sm font-semibold text-brand-white">{g.title}</p>
                  <p className="font-body text-xs leading-snug" style={{ color: '#888' }}>{g.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={function() {
              var el = document.getElementById('coleccion');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-3 font-body text-sm font-bold tracking-wider uppercase px-8 py-4 transition-colors duration-300"
            style={{ background: '#6EC6E6', color: '#000' }}
            onMouseEnter={function(e) { e.currentTarget.style.background = '#F0F0F0'; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = '#6EC6E6'; }}
          >
            Ver coleccion y comprar
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <a
            href="https://wa.me/51934357309?text=Hola%20STYLUM!%20Tengo%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm transition-colors duration-300 border-b pb-0.5 uppercase tracking-wider"
            style={{ color: '#888', borderBottomColor: '#444' }}
            onMouseEnter={function(e) { e.currentTarget.style.color = '#F0F0F0'; e.currentTarget.style.borderBottomColor = '#F0F0F0'; }}
            onMouseLeave={function(e) { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderBottomColor = '#444'; }}
          >
            Tengo una consulta
          </a>
        </motion.div>

      </div>
    </section>
  );
}

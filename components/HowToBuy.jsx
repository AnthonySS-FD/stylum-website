'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Elige tu polo',
    desc: 'Explora nuestra coleccion BOXYFIT y selecciona el color y talla que mas te guste.',
    detail: 'Disponible en S, M, L, XL - 6 colores',
    cta: null,
    payments: false,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Escribenos',
    desc: 'Contactanos por WhatsApp o Instagram con tu pedido. Te respondemos en minutos.',
    detail: 'Lun-Sab de 9am a 9pm',
    cta: {
      label: 'Ir a WhatsApp',
      href: 'https://wa.me/51934357309?text=Hola%20STYLUM!%20Quiero%20hacer%20un%20pedido',
      color: '#25D366',
    },
    payments: false,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Realiza tu pago',
    desc: 'Aceptamos Yape, Plin, transferencia bancaria o efectivo contra entrega en Lima.',
    detail: null,
    cta: null,
    payments: true,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Recibe en casa',
    desc: 'Coordinamos la entrega a tu direccion en Lima o enviamos a todo el Peru via courier.',
    detail: 'Lima: 24-48h - Provincias: 3-5 dias',
    cta: null,
    payments: false,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

const PAYMENT_METHODS = [
  { name: 'Yape',      color: '#6B21A8', letter: 'Y' },
  { name: 'Plin',      color: '#0EA5E9', letter: 'P' },
  { name: 'BCP',       color: '#003087', letter: 'B' },
  { name: 'Interbank', color: '#009B4D', letter: 'I' },
  { name: 'Efectivo',  color: '#D4FF00', letter: '$' },
];

const GUARANTEES = [
  { icon: '🔄', title: 'Cambio de talla',    desc: 'Sin preguntas ni costo extra'            },
  { icon: '📦', title: 'Empaque cuidado',    desc: 'Tu polo llega perfecto y protegido'      },
  { icon: '✅', title: 'Calidad garantizada', desc: 'Tela premium o te devolvemos el dinero'  },
  { icon: '⚡', title: 'Respuesta rapida',   desc: 'Te confirmamos el pedido al instante'    },
];

function StepCard({ step, index, isActive, onClick }) {
  const baseCard = 'relative flex flex-col gap-5 p-6 md:p-8 border cursor-pointer transition-all duration-300 group';
  const activeCard = 'bg-brand-surface border-brand-accent';
  const inactiveCard = 'bg-brand-surface border-brand-border hover:border-brand-muted';

  const baseIcon = 'w-14 h-14 flex items-center justify-center border transition-all duration-300';
  const activeIcon = 'border-brand-accent text-brand-accent bg-brand-accent/10';
  const inactiveIcon = 'border-brand-border text-brand-dim group-hover:border-brand-muted group-hover:text-brand-white';

  const baseTitle = 'font-display text-2xl md:text-3xl font-900 uppercase tracking-tight transition-colors duration-300';
  const activeTitle = 'text-brand-white';
  const inactiveTitle = 'text-brand-dim group-hover:text-brand-white';

  const baseDetail = 'self-start font-body text-xs tracking-wider uppercase px-2.5 py-1 mt-1 transition-colors duration-300';
  const activeDetail = 'bg-brand-accent/15 text-brand-accent border border-brand-accent/30';
  const inactiveDetail = 'bg-brand-border text-brand-dim';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      onClick={onClick}
      className={baseCard + ' ' + (isActive ? activeCard : inactiveCard)}
    >
      {/* Background number */}
      <span className="absolute top-4 right-5 font-display text-6xl font-900 text-brand-border/50 leading-none select-none pointer-events-none">
        {step.number}
      </span>

      {/* Icon */}
      <div className={baseIcon + ' ' + (isActive ? activeIcon : inactiveIcon)}>
        {step.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className={baseTitle + ' ' + (isActive ? activeTitle : inactiveTitle)}>
          {step.title}
        </h3>

        <p className="font-body text-sm text-brand-dim leading-relaxed">
          {step.desc}
        </p>

        {step.detail && (
          <span className={baseDetail + ' ' + (isActive ? activeDetail : inactiveDetail)}>
            {step.detail}
          </span>
        )}

        {step.payments && (
          <div className="flex flex-wrap gap-2 mt-2">
            {PAYMENT_METHODS.map(function(pm) {
              return (
                <div key={pm.name} className="flex items-center gap-1.5 bg-brand-border px-2.5 py-1">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: pm.color, fontSize: '9px' }}
                  >
                    {pm.letter}
                  </span>
                  <span className="font-body text-brand-dim" style={{ fontSize: '10px' }}>
                    {pm.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {step.cta && (
          <a
            href={step.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={function(e) { e.stopPropagation(); }}
            className="self-start mt-3 flex items-center gap-2 font-body text-xs font-semibold tracking-wider uppercase px-4 py-2.5 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: step.cta.color, color: '#000000' }}
          >
            {step.cta.label}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        )}
      </div>

      {/* Active bottom bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-brand-accent transition-all duration-500"
        style={{ width: isActive ? '100%' : '0%' }}
      />
    </motion.div>
  );
}

export default function HowToBuy() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-15%' });
  const [active, setActive] = useState(0);

  return (
    <section
      id="como-comprar"
      className="relative py-24 md:py-32 px-6 md:px-10 bg-brand-black border-t border-brand-border overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
          >
            — Proceso de compra
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-5xl md:text-7xl font-900 text-brand-white uppercase leading-none tracking-tight"
                >
                  Como
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="font-display text-5xl md:text-7xl font-900 text-brand-accent uppercase leading-none tracking-tight"
                >
                  comprar?
                </motion.h2>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body text-sm text-brand-dim max-w-xs leading-relaxed"
            >
              Simple, rapido y seguro. Tu polo BOXYFIT en 4 pasos.
            </motion.p>
          </div>

          {/* Progress indicator */}
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
                    className={
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-900 transition-all duration-300 border ' +
                      (active >= i
                        ? 'bg-brand-accent border-brand-accent text-brand-black'
                        : 'bg-transparent border-brand-border text-brand-dim hover:border-brand-muted')
                    }
                  >
                    {active > i ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-1 relative overflow-hidden bg-brand-border">
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-16">
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

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-brand-border bg-brand-surface p-8 md:p-10 mb-10"
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
                  <p className="font-body text-xs text-brand-dim leading-snug">{g.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/51934357309?text=Hola%20STYLUM!%20Quiero%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-brand-accent text-brand-black font-body text-sm font-bold tracking-wider uppercase px-8 py-4 hover:bg-brand-white transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hacer mi pedido ahora
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <a
            href="#coleccion"
            className="inline-flex items-center gap-2 font-body text-sm text-brand-dim hover:text-brand-white transition-colors duration-300 border-b border-brand-muted hover:border-brand-white pb-0.5 uppercase tracking-wider"
          >
            Ver coleccion primero
          </a>
        </motion.div>

      </div>
    </section>
  );
}

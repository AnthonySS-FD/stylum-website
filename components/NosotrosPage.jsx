'use client';

// components/NosotrosPage.jsx
// Pagina completa "Sobre Nosotros" — STYLUM
// Diseño editorial streetwear premium

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// ── Datos de la marca ────────────────────────────────────────────────
var VALORES = [
  {
    number: '01',
    title: 'Autenticidad',
    desc: 'No seguimos tendencias — las ignoramos. Cada pieza nace de una vision propia, no de lo que dicta el mercado. STYLUM es genuino o no es nada.',
  },
  {
    number: '02',
    title: 'Calidad sin excusas',
    desc: 'Usamos tela de alta calidad con acabados trabajados al detalle. Desde la costura hasta el empaque, cada elemento refleja el nivel que exigimos.',
  },
  {
    number: '03',
    title: 'Diseño exclusivo',
    desc: 'Cada coleccion es limitada y con identidad unica. El personaje STYLUM en cada polo no es decoracion — es una declaracion de quien lo lleva.',
  },
  {
    number: '04',
    title: 'Comunidad real',
    desc: 'STYLUM no vende ropa, construye una tribu. Cada persona que viste STYLUM es parte de algo mas grande que una marca.',
  },
];

var PILARES = [
  { stat: 'BOXYFIT',  label: 'Corte signature'       },
  { stat: '100%',     label: 'Tela premium'           },
  { stat: 'Lima',     label: 'Hecho en Peru'          },
  { stat: 'Limited',  label: 'Ediciones limitadas'    },
];

var CARACTERISTICAS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: 'Corte BOXYFIT español',
    desc: 'El corte BOXYFIT tiene origen en la moda española — silueta cuadrada, hombros caidos, largo perfecto. No es solo oversize, es arquitectura textil.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Tela de alta calidad',
    desc: 'Seleccionamos materiales que aguantan el uso real. Algodon de peso medio, resistente al lavado, que mantiene su forma y color lavado tras lavado.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
    title: 'Diseño unico y exclusivo',
    desc: 'El personaje STYLUM — creado desde cero — es el alma de cada polo. No encontraras este diseño en ningun otro lugar. Es nuestro, es tuyo.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.499Z" />
      </svg>
    ),
    title: 'Acabados impecables',
    desc: 'Detalle en las costuras, etiquetas bordadas, ribetes precisos. Cada polo pasa por control de calidad antes de llegar a tus manos.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: 'Marca peruana con alma',
    desc: 'Nacimos en Lima con el sueno de demostrar que el streetwear de calidad puede nacer en Peru. Cada polo que vendes lleva el orgullo de lo nuestro.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: 'Ediciones limitadas',
    desc: 'No producimos en masa. Cada coleccion tiene cupos contados — cuando se acaba, se acaba. Eso hace que cada polo sea mas especial.',
  },
];

// ── Componente section header ────────────────────────────────────────
function SectionHeader({ eyebrow, lines, accent, desc }) {
  var ref    = useRef(null);
  var inView = useInView(ref, { once: true, margin: '-15%' });
  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
      >
        — {eyebrow}
      </motion.p>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          {lines.map(function(line, i) {
            return (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className={
                    'font-display text-5xl md:text-7xl font-900 uppercase leading-none tracking-tight ' +
                    (i === accent ? 'text-brand-accent' : 'text-brand-white')
                  }
                >
                  {line}
                </motion.h2>
              </div>
            );
          })}
        </div>
        {desc && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-sm text-brand-dim max-w-xs leading-relaxed"
          >
            {desc}
          </motion.p>
        )}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────
export default function NosotrosPage() {
  var heroRef = useRef(null);
  var { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  var bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  var textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <div className="bg-brand-black min-h-screen">

      {/* ── NAVBAR simple de regreso ─────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-brand-black/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img
              src="/LOGO STYLUM.png"
              alt="STYLUM"
              className="h-10 w-auto brightness-0 invert"
            />
          </a>

          <Link
            href="/"
            className="flex items-center gap-2 font-body text-xs text-brand-dim hover:text-brand-white transition-colors uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

        {/* Fondo con grid */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'linear-gradient(#F5F5F0 1px, transparent 1px), linear-gradient(90deg, #F5F5F0 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-accent/5 blur-[130px]" />
        </motion.div>

        {/* Personaje de fondo — STYLUM character */}
        <div className="absolute right-0 bottom-0 w-[50vw] md:w-[35vw] max-w-lg pointer-events-none select-none hidden md:block">
          <img
            src="/PERSONAJE STYLUM.png"
            alt=""
            className="w-full h-auto invert"
            style={{
              opacity: 0.08,
              maskImage: 'linear-gradient(to top, transparent 0%, black 40%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)',
            }}
          />
        </div>

        <motion.div style={{ y: textY }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-10 h-px bg-brand-accent" />
            <span className="font-body text-xs tracking-mega text-brand-accent uppercase">
              Nuestra historia
            </span>
          </motion.div>

          {/* Titulo hero */}
          <div className="max-w-3xl">
            {['Mas que', 'una marca.', 'Una actitud.'].map(function(line, i) {
              return (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.12 }}
                    className={
                      'font-display font-900 uppercase leading-none tracking-tight ' +
                      (i === 2
                        ? 'text-brand-accent text-6xl md:text-8xl'
                        : 'text-brand-white text-6xl md:text-8xl')
                    }
                  >
                    {line}
                  </motion.h1>
                </div>
              );
            })}
          </div>

          {/* Descripcion hero */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-body text-base md:text-lg text-brand-dim leading-relaxed max-w-xl mt-10"
          >
            STYLUM nace en Lima con un sueno claro: demostrar que el streetwear autentico, 
            de calidad y con identidad propia puede nacer en Peru y llegar a todo el mundo.
          </motion.p>

          {/* Pilares rapidos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-border mt-16 border border-brand-border max-w-2xl"
          >
            {PILARES.map(function(p, i) {
              return (
                <div key={i} className="bg-brand-black p-5 flex flex-col gap-1">
                  <span className="font-display text-2xl font-900 text-brand-accent">{p.stat}</span>
                  <span className="font-body text-xs text-brand-muted uppercase tracking-wider">{p.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ── EL ORIGEN ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-brand-surface border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="El origen"
            lines={['De donde', 'venimos.']}
            accent={1}
            desc="La historia detras de la marca."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Texto */}
            <div className="flex flex-col gap-6">
              {[
                'STYLUM nace de una frustracion: la ropa streetwear de calidad siempre venia de afuera, a precios inaccesibles, con diseños que no representaban nuestra identidad. Nos preguntamos — por que no hacerlo nosotros?',
                'Empezamos con una idea simple: un polo con corte BOXYFIT, inspirado en la silueta de la moda española, con un diseño exclusivo que no existia en ningun otro lugar. El resultado fue el primer polo STYLUM — y la respuesta fue inmediata.',
                'Hoy STYLUM es mas que ropa. Es una comunidad de personas que comparten la misma actitud: que el estilo no necesita un logo grande para hablar fuerte. Que la calidad se siente antes de verse. Que lo peruano puede ser world-class.',
              ].map(function(text, i) {
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    className="font-body text-base text-brand-dim leading-relaxed"
                  >
                    {text}
                  </motion.p>
                );
              })}

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="border-l-2 border-brand-accent pl-6 mt-4"
              >
                <p className="font-display text-2xl md:text-3xl font-900 text-brand-white uppercase leading-tight tracking-tight">
                  "El streetwear real habla sin gritar."
                </p>
                <p className="font-body text-xs text-brand-muted mt-3 uppercase tracking-wider">
                  — STYLUM, Lima 2024
                </p>
              </motion.blockquote>
            </div>

            {/* Visual: fotos de los polos */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Grid de los 3 primeros polos */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { color: '#2D5A3D', name: 'Green'   },
                  { color: '#F5F5F0', name: 'White'   },
                  { color: '#6B1E2E', name: 'Guinda'  },
                ].map(function(polo, i) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="aspect-[3/4] relative overflow-hidden group"
                      style={{ backgroundColor: polo.color }}
                    >
                      <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/10 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="font-display text-xs font-900 text-white uppercase tracking-wide">
                          {polo.name}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Caption */}
              <p className="font-body text-xs text-brand-muted mt-4 text-center tracking-wider uppercase">
                Primera coleccion STYLUM — 3 diseños, 1 identidad
              </p>

              {/* Personaje decorativo */}
              <div className="absolute -bottom-8 -right-8 w-32 opacity-10 pointer-events-none">
                <img
                  src="/PERSONAJE STYLUM.png"
                  alt=""
                  className="w-full h-auto invert"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISION / VISION ───────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-brand-black border-t border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Proposito"
            lines={['Mision &', 'Vision.']}
            accent={1}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Mision */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative bg-brand-surface border border-brand-border p-8 md:p-12 overflow-hidden group hover:border-brand-accent transition-colors duration-300"
            >
              <div className="absolute top-6 right-6 font-display text-8xl font-900 text-brand-border/40 leading-none select-none">
                M
              </div>
              <p className="font-body text-xs tracking-mega text-brand-accent uppercase mb-6">
                Mision
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-900 text-brand-white uppercase leading-tight tracking-tight mb-6">
                Vestir la actitud de una generacion.
              </h3>
              <p className="font-body text-sm text-brand-dim leading-relaxed">
                Crear streetwear de alta calidad con diseño exclusivo y corte BOXYFIT que 
                represente a una generacion que no necesita validacion externa para saber 
                lo que vale. Hacemos ropa para quienes se mueven con proposito.
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-500" />
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative bg-brand-surface border border-brand-border p-8 md:p-12 overflow-hidden group hover:border-brand-accent transition-colors duration-300"
            >
              <div className="absolute top-6 right-6 font-display text-8xl font-900 text-brand-border/40 leading-none select-none">
                V
              </div>
              <p className="font-body text-xs tracking-mega text-brand-accent uppercase mb-6">
                Vision
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-900 text-brand-white uppercase leading-tight tracking-tight mb-6">
                La marca street peruana que el mundo conozca.
              </h3>
              <p className="font-body text-sm text-brand-dim leading-relaxed">
                Convertirnos en la referencia del streetwear peruano a nivel nacional e 
                internacional. Que cuando alguien piense en una marca street con identidad 
                propia nacida en Peru, piense en STYLUM.
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-500" />
            </motion.div>
          </div>

          {/* El sueno */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 bg-brand-accent p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 flex items-center">
              <img src="/PERSONAJE STYLUM.png" alt="" className="w-full h-auto" />
            </div>
            <p className="font-body text-xs tracking-mega text-brand-black/60 uppercase mb-4">
              El sueno
            </p>
            <p className="font-display text-3xl md:text-5xl font-900 text-brand-black uppercase leading-tight tracking-tight max-w-2xl">
              Ser reconocidos a nivel nacional como la marca que cambio el streetwear peruano.
            </p>
            <p className="font-body text-sm text-brand-black/70 mt-4 max-w-xl leading-relaxed">
              No es una meta, es una certeza. Trabajamos cada dia para que STYLUM sea 
              sinomino de calidad, diseño y actitud — hecho en Peru, para el mundo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── LO QUE NOS CARACTERIZA ────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-brand-surface border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Lo que nos hace diferentes"
            lines={['La marca', 'STYLUM.']}
            accent={1}
            desc="Los pilares que definen cada polo que hacemos."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CARACTERISTICAS.map(function(c, i) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex flex-col gap-4 p-6 md:p-8 bg-brand-black border border-brand-border hover:border-brand-accent transition-all duration-300 relative overflow-hidden"
                >
                  <div className="w-12 h-12 border border-brand-border group-hover:border-brand-accent text-brand-dim group-hover:text-brand-accent flex items-center justify-center transition-all duration-300">
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-900 text-brand-white uppercase tracking-tight mb-2">
                      {c.title}
                    </h3>
                    <p className="font-body text-sm text-brand-dim leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VALORES ───────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-brand-black border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Lo que creemos"
            lines={['Nuestros', 'valores.']}
            accent={0}
            desc="Los principios que guian cada decision."
          />

          <div className="flex flex-col gap-px bg-brand-border border border-brand-border">
            {VALORES.map(function(v, i) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex gap-6 md:gap-12 items-start p-6 md:p-8 bg-brand-black hover:bg-brand-surface transition-colors duration-300"
                >
                  <span className="font-display text-4xl font-900 text-brand-border group-hover:text-brand-accent transition-colors duration-300 flex-shrink-0 leading-none mt-1">
                    {v.number}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl md:text-3xl font-900 text-brand-white uppercase tracking-tight">
                      {v.title}
                    </h3>
                    <p className="font-body text-sm text-brand-dim leading-relaxed max-w-2xl">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EL DISEÑO / PERSONAJE ─────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-brand-surface border-t border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Visual del personaje */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-72 md:w-96">
                {/* Glow */}
                <div className="absolute inset-0 bg-brand-accent/10 blur-3xl rounded-full" />
                <img
                  src="/PERSONAJE STYLUM.png"
                  alt="Personaje STYLUM"
                  className="relative w-full h-auto invert opacity-80"
                />
              </div>
              {/* Badge */}
              <div className="absolute bottom-4 left-4 bg-brand-accent text-brand-black px-4 py-2">
                <p className="font-display text-xs font-900 uppercase tracking-wider"><b>Diseño exclusivo</b></p>
              </div>
            </motion.div>

            {/* Texto */}
            <div className="flex flex-col gap-6">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-body text-xs tracking-mega text-brand-accent uppercase"
              >
                — El alma de STYLUM
              </motion.p>

              {['El personaje', 'que nos define.'].map(function(line, i) {
                return (
                  <div key={i} className="overflow-hidden">
                    <motion.h2
                      initial={{ y: '110%' }}
                      whileInView={{ y: '0%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                      className="font-display text-4xl md:text-5xl font-900 text-brand-white uppercase leading-none tracking-tight"
                    >
                      {line}
                    </motion.h2>
                  </div>
                );
              })}

              {[
                'El personaje STYLUM es mas que un logo. Es la representacion visual de la actitud que buscamos en cada persona que viste la marca — cabeza agachada, enfocado, con determinacion.',
                'Creado desde cero, exclusivo de STYLUM, aparece en la espalda de cada polo como un sello de identidad. No lo veras en ninguna otra marca porque es completamente nuestro.',
                'Cada coleccion lleva el mismo personaje, pero en contextos distintos — evolucionando junto con la marca, contando una historia que apenas empieza.',
              ].map(function(text, i) {
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="font-body text-sm text-brand-dim leading-relaxed"
                  >
                    {text}
                  </motion.p>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-brand-black border-t border-brand-border relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-accent/6 blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs tracking-mega text-brand-accent uppercase mb-6"
          >
            — Unete a la tribu
          </motion.p>

          {['Ya sabes quienes', 'somos. Ahora', 'viste STYLUM.'].map(function(line, i) {
            return (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className={
                    'font-display text-5xl md:text-7xl font-900 uppercase leading-none tracking-tight ' +
                    (i === 2 ? 'text-brand-accent' : 'text-brand-white')
                  }
                >
                  {line}
                </motion.h2>
              </div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/#coleccion"
              className="group inline-flex items-center gap-3 bg-brand-accent text-brand-black font-body text-sm font-bold tracking-wider uppercase px-8 py-4 hover:bg-brand-white transition-colors duration-300"
            >
              Ver coleccion
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="https://wa.me/51934357309?text=Hola%20STYLUM!%20Vi%20su%20historia%20y%20quiero%20saber%20mas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-brand-dim hover:text-brand-white transition-colors duration-300 border-b border-brand-muted hover:border-brand-white pb-0.5 uppercase tracking-wider"
            >
              Hablar con nosotros
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

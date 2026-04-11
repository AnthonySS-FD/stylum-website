'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TICKER = ['BOXYFIT', 'STREETWEAR', 'STYLUM', 'LIMA PERU', 'EDICION LIMITADA', 'BOXYFIT', 'STREETWEAR', 'STYLUM', 'LIMA PERU', 'EDICION LIMITADA'];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-screen min-h-[680px] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #0A0A0A 100%)' }}
    >
      {/* Grid de fondo */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(110,198,230,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(110,198,230,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Glow central */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '700px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(110,198,230,0.08) 0%, transparent 70%)',
          }}
        />
        {/* Dots decorativos */}
        <div className="absolute top-12 left-12 w-1.5 h-1.5 rounded-full bg-brand-accent opacity-60" />
        <div className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-brand-accent opacity-60" />
        <div className="absolute bottom-28 left-12 w-1 h-1 rounded-full bg-brand-border opacity-60" />
        <div className="absolute bottom-28 right-12 w-1 h-1 rounded-full bg-brand-border opacity-60" />
      </motion.div>

      {/* Personaje decorativo */}
      <div
        className="absolute right-0 bottom-16 hidden lg:block pointer-events-none select-none"
        style={{ width: '28vw', maxWidth: '380px' }}
      >
        <img
          src="/PERSONAJE STYLUM.png"
          alt=""
          className="w-full h-auto invert"
          style={{
            opacity: 0.07,
            maskImage: 'linear-gradient(to top, transparent 0%, black 40%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)',
          }}
        />
      </div>

      {/* Contenido principal */}
      <motion.div style={{ y: textY }} className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-10 h-px bg-brand-accent" />
          <span className="font-body text-xs font-medium tracking-mega uppercase text-brand-accent">
            Nueva Coleccion 2026
          </span>
          <span className="w-10 h-px bg-brand-accent" />
        </motion.div>

        {/* Logo image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <img
            src="/LOGO STYLUM.png"
            alt="STYLUM"
            className="h-16 md:h-24 w-auto mx-auto"
            style={{ filter: 'invert(1)', opacity: 0.95 }}
          />
        </motion.div>

        

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.8 }}
          className="font-body text-sm md:text-base font-light tracking-wider text-brand-dim uppercase mb-10"
        >
          with attitude — Lima, Perú
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Boton primario */}
          <a
            href="#coleccion"
            className="group relative inline-flex items-center gap-3 font-body text-sm font-bold tracking-wider uppercase px-8 py-4 overflow-hidden transition-all duration-300"
            style={{ background: '#6EC6E6', color: '#000' }}
          >
            <span className="relative z-10">Explorar coleccion</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
            {/* Hover fill */}
            <span
              className="absolute inset-0 transition-transform duration-300"
              style={{ background: '#fff', transform: 'translateX(-101%)', zIndex: 0 }}
              onMouseEnter={function(e) { e.currentTarget.style.transform = 'translateX(0)'; }}
            />
          </a>

          {/* Boton secundario */}
          <a
            href="#nosotros"
            className="font-body text-sm font-medium tracking-wider text-brand-dim uppercase hover:text-brand-white transition-colors duration-300 border-b border-brand-muted hover:border-brand-white pb-0.5"
          >
            Nuestra historia
          </a>
        </motion.div>

        {/* Stats rapidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center gap-8 mt-12 pt-8 border-t border-brand-border"
        >
          {[
            { num: '100%', label: 'Algodon premium' },
            { num: '3',    label: 'Diseños exclusivos' },
            { num: '24h',  label: 'Envio Lima' },
          ].map(function(stat, i) {
            return (
              <div key={i} className="text-center">
                <p className="font-display text-xl font-900 text-brand-accent">{stat.num}</p>
                <p className="font-body text-xs text-brand-muted uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-brand-accent to-transparent"
        />
        <span className="font-body text-xs tracking-mega text-brand-muted uppercase">Scroll</span>
      </motion.div>

      {/* Ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t py-3"
        style={{ borderColor: '#1e1e1e', background: 'rgba(20,20,20,0.8)', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex whitespace-nowrap animate-ticker">
          {[...TICKER, ...TICKER].map(function(item, i) {
            return (
              <span key={i} className="inline-flex items-center gap-5 px-6 font-display text-xs font-700 tracking-ultra text-brand-muted uppercase">
                {item}
                <span className="inline-block w-1 h-1 rounded-full bg-brand-accent" />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

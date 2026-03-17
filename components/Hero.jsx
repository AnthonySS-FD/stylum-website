'use client';

// ─────────────────────────────────────────────────────────────────────────
// components/Hero.jsx
// Full-screen hero: staggered title reveal, animated badge, parallax bg
// ─────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Ticker tape data ───────────────────────────────────────────────── */
const TICKER_ITEMS = [
  'BOXYFIT', 'STREETWEAR', 'STYLUM', 'ATTITUDE', 'URBAN',
  'MINIMAL', 'BOXYFIT', 'STREETWEAR', 'STYLUM', 'ATTITUDE', 'URBAN', 'MINIMAL',
];

/* ── Animation variants ─────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%', opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0, opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const sectionRef = useRef(null);

  // ── Parallax: bg moves slower than scroll ──────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-screen min-h-[680px] flex flex-col items-center justify-center overflow-hidden bg-brand-black"
    >

      {/* ── Background: subtle grid + accent blob ─────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--c-white) 1px, transparent 1px), linear-gradient(90deg, var(--c-white) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glowing accent blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[120px]" />
        {/* Corner accent dots */}
        <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-brand-accent opacity-60" />
        <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-brand-accent opacity-60" />
        <div className="absolute bottom-24 left-8 w-1 h-1 rounded-full bg-brand-dim opacity-40" />
        <div className="absolute bottom-24 right-8 w-1 h-1 rounded-full bg-brand-dim opacity-40" />
      </motion.div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8 md:mb-10"
        >
          <span className="w-8 h-px bg-brand-accent" />
          <span className="font-body text-xs font-medium tracking-mega uppercase text-brand-accent">
            Nueva Colección 2025
          </span>
          <span className="w-8 h-px bg-brand-accent" />
        </motion.div>

        {/* ── STYLUM wordmark ──────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="overflow-hidden"
        >
          {/* Clip each letter line */}
          <motion.div variants={lineVariants} className="flex justify-center">
  <img
    src="/LOGO STYLUM.png"
    alt="STYLUM"
    className="w-[80vw] md:w-[55vw] lg:w-[45vw] max-w-2xl brightness-0 invert"
  />
</motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.9 }}
          className="mt-6 md:mt-8 font-body text-base md:text-lg font-light tracking-wider text-brand-dim uppercase"
        >
          Streetwear with attitude
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#coleccion"
            className="group relative inline-flex items-center gap-3 bg-brand-accent text-brand-black font-body text-sm font-semibold tracking-wider uppercase px-8 py-4 overflow-hidden transition-all duration-300 hover:gap-5"
          >
            <span className="relative z-10">Explorar colección</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
            {/* Fill from left on hover */}
            <span className="absolute inset-0 bg-brand-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
          </a>

          <a
            href="#nosotros"
            className="inline-flex items-center gap-2 font-body text-sm font-medium tracking-wider text-brand-dim uppercase hover:text-brand-white transition-colors duration-300 border-b border-brand-muted hover:border-brand-white pb-0.5"
          >
            Nuestra historia
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-mega text-brand-muted uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-brand-muted to-transparent"
        />
      </motion.div>

      {/* ── Bottom ticker tape ────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-brand-border bg-brand-surface/40 backdrop-blur-sm py-2.5">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-6 font-display text-sm font-700 tracking-ultra text-brand-muted uppercase"
            >
              {item}
              <span className="inline-block w-1 h-1 rounded-full bg-brand-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Character illustration ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-16 right-0 w-[45vw] md:w-[30vw] lg:w-[25vw] max-w-sm pointer-events-none select-none hidden md:block"
        >
          <img
            src="/PERSONAJE STYLUM.png"
            alt="Personaje"
            className="w-full h-auto opacity-20 invert"
            style={{
              maskImage: 'linear-gradient(to top, transparent 0%, black 35%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 35%)',
            }}
          />
        </motion.div>
    </section>
  );
}

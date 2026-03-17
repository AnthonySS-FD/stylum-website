'use client';

// ─────────────────────────────────────────────────────────────────────────
// components/About.jsx
// Split-layout "Sobre Nosotros" with word-by-word text animation
// ─────────────────────────────────────────────────────────────────────────

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Stats / Pillars data ───────────────────────────────────────────── */
const PILLARS = [
  { number: '100%', label: 'Algodón premium 20/1' },
  { number: 'BOXY',  label: 'Corte boxyfit' },
  { number: '3+',   label: 'Colores disponibles' },
  { number: 'PE',   label: 'Hecho en Perú' },
];

/* ── Animation helpers ──────────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const wordAnim = {
  hidden: { y: '120%', opacity: 0 },
  show:   { y: '0%', opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Animated paragraph ─────────────────────────────────────────────── */
function AnimatedText({ text, className, delay = 0 }) {
  const words = text.split(' ');
  return (
    <motion.p
      variants={stagger}
      className={`flex flex-wrap gap-x-[0.3em] gap-y-0 leading-relaxed ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block leading-relaxed">
          <motion.span variants={wordAnim} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      id="nosotros"
      className="relative py-24 md:py-32 px-6 md:px-10 bg-brand-surface border-t border-brand-border"
    >
     

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">

          {/* ── Left col: Eyebrow + Title ──────────────────────── */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
            >
              — Sobre STYLUM
            </motion.p>

            {/* Stacked title lines */}
            {['Hecho con', 'identidad.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-900 text-brand-white uppercase leading-none tracking-tight"
                >
                  {line}
                </motion.h2>
              </div>
            ))}

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="w-24 h-0.5 bg-brand-accent mt-8"
            />

            {/* ── Decorative character ─────────────────────────────── */}
              <div className="absolute bottom-0 right-6 md:right-10 w-48 md:w-64 pointer-events-none select-none opacity-[0.3]">
                <img
                  src="/PERSONAJE STYLUM.png"
                  alt=""
                  className="w-full h-auto invert"
                  style={{
                    maskImage: 'linear-gradient(to top, transparent 0%, black 50%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 50%)',
                  }}
                />
              </div>
          </div>

          {/* ── Right col: Body text + pillars ─────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-8"
          >
            {/* Body paragraph */}
            <AnimatedText
              text="STYLUM nace con la idea de crear streetwear auténtico, minimalista y con identidad. Nuestros polos BOXYFIT están diseñados para quienes buscan estilo, comodidad y actitud."
              className="font-body text-base md:text-lg text-brand-dim"
            />
            <AnimatedText
              text="Cada pieza es una declaración. Sin logos excesivos, sin ruido visual — solo corte, tela y actitud. Porque el streetwear real habla sin gritar."
              className="font-body text-sm text-brand-muted"
              delay={0.2}
            />

            {/* ── Pillars grid ────────────────────────────────── */}
            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
              }}
              className="grid grid-cols-2 gap-px bg-brand-border mt-4 border border-brand-border"
            >
              {PILLARS.map((p, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="bg-brand-surface p-5 md:p-6 group hover:bg-brand-black transition-colors duration-300"
                >
                  <div className="font-display text-3xl md:text-4xl font-900 text-brand-accent group-hover:text-brand-white transition-colors duration-300">
                    {p.number}
                  </div>
                  <div className="font-body text-xs text-brand-dim tracking-wider uppercase mt-1">
                    {p.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

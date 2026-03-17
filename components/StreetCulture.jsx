'use client';

// ─────────────────────────────────────────────────────────────────────────
// components/StreetCulture.jsx
// Full-bleed section with horizontal scroll marquee + parallax image panels
// ─────────────────────────────────────────────────────────────────────────

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';

/* ── Panel data ─────────────────────────────────────────────────────── */
// Reemplaza con imágenes propias de lifestyle/streetwear de tu marca
const PANELS = [
  {
    image: '/street3.png',
    label: '01 / STREET',
    title: 'Actitud urbana.',
    sub: 'El polo que se adapta a tu flow.',
  },
  {
    image: '/street2.png',
    label: '02 / CULTURE',
    title: 'Cultura sin filtros.',
    sub: 'BOXYFIT — corte libre, estilo real.',
  },
  {
    image: '/street1.png',
    label: '03 / MINIMAL',
    title: 'Menos es más.',
    sub: 'Minimalismo que domina la calle.',
  },
];

/* ── Parallax Panel ─────────────────────────────────────────────────── */
function ParallaxPanel({ panel, index }) {
  const panelRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  });

  // Image moves opposite to scroll for parallax
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const isInView = useInView(panelRef, { once: true, margin: '-20%' });

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="relative group overflow-hidden bg-brand-surface border border-brand-border"
    >
      {/* Parallax image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          <Image
            src={panel.image}
            alt={panel.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
        </motion.div>
      </div>

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="font-body text-[10px] tracking-mega text-brand-accent uppercase mb-2">
          {panel.label}
        </p>
        <h3 className="font-display text-3xl md:text-4xl font-900 text-brand-white uppercase leading-tight tracking-tight">
          {panel.title}
        </h3>
        <p className="font-body text-sm text-brand-dim mt-2 group-hover:text-brand-white transition-colors duration-300">
          {panel.sub}
        </p>
      </div>

      {/* Hover accent border */}
      <div className="absolute inset-0 border-2 border-brand-accent scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 pointer-events-none" />
    </motion.div>
  );
}

/* ── Main Section ───────────────────────────────────────────────────── */
export default function StreetCulture() {
  const headerRef = useRef(null);
  const inView    = useInView(headerRef, { once: true, margin: '-15%' });

  return (
    <section id="estilo" className="relative py-24 md:py-32 bg-brand-black border-t border-brand-border overflow-hidden">
      {/* Vertical section label */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90 font-display text-xs tracking-mega text-brand-border uppercase whitespace-nowrap hidden xl:block">
        Street Culture ——
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Section header ──────────────────────────────────── */}
        <div ref={headerRef} className="mb-14 md:mb-18">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
          >
            — Street culture
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {['La calle', 'es la pasarela.'].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h2
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    className="font-display text-4xl md:text-6xl lg:text-7xl font-900 text-brand-white uppercase leading-none tracking-tight"
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body text-sm text-brand-dim max-w-xs leading-relaxed"
            >
              STYLUM no sigue tendencias — las ignora. Viste para ti, no para el feed.
            </motion.p>
          </div>
        </div>

        {/* ── Panels grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {PANELS.map((panel, i) => (
            <ParallaxPanel key={i} panel={panel} index={i} />
          ))}
        </div>

        {/* ── Bottom callout strip ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.7 }}
          className="mt-12 p-8 md:p-12 bg-brand-surface border border-brand-border flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-display text-3xl md:text-4xl font-900 text-brand-white uppercase tracking-tight leading-tight">
              Únete a la tribu Stylum.
            </p>
            <p className="font-body text-sm text-brand-dim mt-1">
              @stylum.oficial — Síguenos y muestra tu fit.
            </p>
          </div>
          <a
            href="https://www.instagram.com/stylum.oficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-brand-accent text-brand-black font-body text-sm font-bold tracking-wider uppercase px-8 py-4 hover:bg-brand-white transition-colors duration-300 shrink-0"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Seguir en Instagram
          </a>
        </motion.div>
      </div>

      {/* ── Bottom gradient separator ───────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-brand-surface pointer-events-none" />
    {/* ── Separador inferior ── */}
<div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
  style={{ background: 'linear-gradient(to bottom, transparent, #0d0d0d)' }}
/>
    </section>
  );
}

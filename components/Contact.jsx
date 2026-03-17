'use client';

// ─────────────────────────────────────────────────────────────────────────
// components/Contact.jsx
// Contact section with split layout, social CTAs and animated reveal
// ─────────────────────────────────────────────────────────────────────────

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Contact channels ───────────────────────────────────────────────── */
// Reemplaza los href con tus links reales
const CHANNELS = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@stylum.oficial',
    desc: 'Sigue nuestra colección, drops y lifestyle.',
    href: 'https://www.instagram.com/stylum.oficial/',
    color: '#E1306C',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+51 934 357 309',
    desc: 'Consultas, pedidos y atención directa.',
    // Reemplaza con tu número real: https://wa.me/51XXXXXXXXX
    href: 'https://wa.me/51934357309?text=Hola%20STYLUM%2C%20quiero%20info%20sobre%20sus%20polos',
    color: '#25D366',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },

  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@stylum25',
    desc: 'Contenido, behind the scenes y cultura STYLUM.',
    href: 'https://www.tiktok.com/@stylum25',
    color: '#ffffff',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z"/>
      </svg>
    ),
  },
];

/* ── Card component ─────────────────────────────────────────────────── */
function ChannelCard({ channel, delay }) {
  return (
    <motion.a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col bg-brand-surface border border-brand-border p-8 md:p-10 overflow-hidden transition-colors duration-300 hover:border-brand-muted"
    >
      {/* Background color blob */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500"
        style={{ backgroundColor: channel.color }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-sm mb-6 transition-colors duration-300"
        style={{ backgroundColor: `${channel.color}20`, color: channel.color }}
      >
        {channel.icon}
      </div>

      {/* Text */}
      <p className="font-body text-xs tracking-mega text-brand-dim uppercase mb-2">
        {channel.name}
      </p>
      <h3 className="font-display text-2xl md:text-3xl font-900 text-brand-white uppercase tracking-tight mb-3">
        {channel.handle}
      </h3>
      <p className="font-body text-sm text-brand-dim leading-relaxed mb-8">
        {channel.desc}
      </p>

      {/* CTA */}
      <div className="mt-auto flex items-center gap-2 font-body text-sm font-medium tracking-wider uppercase"
        style={{ color: channel.color }}
      >
        Ir ahora
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: channel.color }}
      />
    </motion.a>
  );
}

/* ── Main Section ───────────────────────────────────────────────────── */
export default function Contact() {
  const headerRef = useRef(null);
  const inView    = useInView(headerRef, { once: true, margin: '-15%' });

  return (
    <section
      id="contacto"
      className="relative py-24 md:py-32 px-6 md:px-10 bg-brand-surface border-t border-brand-border"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-14 md:mb-18 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
          >
            — Contacto
          </motion.p>

          {['Hablemos', 'directamente.'].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="font-display text-5xl md:text-7xl font-900 text-brand-white uppercase leading-none tracking-tight"
              >
                {line}
              </motion.h2>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-sm text-brand-dim mt-6 max-w-md mx-auto leading-relaxed"
          >
            Pedidos, consultas o simplemente hola — estamos en Instagram y WhatsApp.
          </motion.p>
        </div>

        {/* ── Channel cards ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {CHANNELS.map((ch, i) => (
            <ChannelCard key={ch.id} channel={ch} delay={i * 0.15} />
          ))}
        </div>

        {/* ── Additional note ──────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-body text-xs text-brand-muted mt-10 tracking-wide"
        >
          Respondemos en menos de 24 horas · Lima, Perú
        </motion.p>
      </div>
    </section>
  );
}

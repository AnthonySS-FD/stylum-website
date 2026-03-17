'use client';

// ─────────────────────────────────────────────────────────────────────────
// components/Footer.jsx
// Minimal footer with large brand wordmark background
// ─────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Colección', href: '#coleccion' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Estilo', href: '#estilo' },
  { label: 'Contacto', href: '#contacto' },
];

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/stylum.pe' },
  { label: 'WhatsApp', href: 'https://wa.me/51934357309' },
  { label: 'TikTok', href: 'https://tiktok.com/@stylum.pe' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-black border-t border-brand-border overflow-hidden">
      {/* ── Giant background character ──────────────────────────── */}
      <div className="absolute inset-0 flex items-end justify-center  pointer-events-none select-none overflow-hidden">
        <img
          src="/PERSONAJE STYLUM.png"
          alt=""
          className="h-[90%] w-auto opacity-[0.58] invert object-contain"
          style={{ filter: 'invert(1)', maskImage: 'linear-gradient(to top, transparent 0%, black 100%)' }}
        />
      </div> 

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">

        {/* ── Top row ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <a href="#" className="flex items-center">
              <img
                src="/LOGO STYLUM.png"
                alt="STYLUM"
                className="h-10 w-auto brightness-0 invert"
              />
            </a>
            <p className="font-body text-sm text-brand-dim leading-relaxed">
              Streetwear auténtico. Polos BOXYFIT diseñados para quienes buscan
              estilo, comodidad y actitud. Lima, Perú.
            </p>
            {/* Accent dot */}
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-brand-accent" />
              <span className="font-body text-xs text-brand-dim tracking-wider uppercase">
                Envíos a todo el Perú
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16 md:gap-20">
            <div>
              <p className="font-body text-[10px] tracking-mega text-brand-muted uppercase mb-4">
                Navegación
              </p>
              <ul className="flex flex-col gap-3">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="font-body text-sm text-brand-dim hover:text-brand-accent transition-colors duration-300 tracking-wide"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-body text-[10px] tracking-mega text-brand-muted uppercase mb-4">
                Redes sociales
              </p>
              <ul className="flex flex-col gap-3">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-brand-dim hover:text-brand-accent transition-colors duration-300 tracking-wide"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────── */}
        <div className="section-divider mb-8" />

        {/* ── Bottom row ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-brand-muted tracking-wide">
            © {year} STYLUM. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-brand-muted tracking-wide">
            Streetwear with attitude — Lima, Perú
          </p>
        </div>
      </div>
    </footer>
  );
}

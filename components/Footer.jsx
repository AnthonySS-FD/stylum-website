'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

var LINKS = [
  { label: 'Coleccion',    href: '/#coleccion'    },
  { label: 'Nosotros',     href: '/nosotros'      },
  { label: 'Estilo',       href: '/#estilo'       },
  { label: 'Contacto',     href: '/#contacto'     },
];

var SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/stylum.oficial' },
  { label: 'WhatsApp',  href: 'https://wa.me/51934357309'            },
  { label: 'TikTok',    href: 'https://tiktok.com/@stylum25'         },
];

export default function Footer() {
  var year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}
    >
      {/* Personaje background */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden">
        <img
          src="/PERSONAJE_STYLUM.png"
          alt=""
          className="h-full w-auto invert"
          style={{
            opacity: 0.04,
            maskImage: 'linear-gradient(to top, transparent 0%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 50%)',
          }}
        />
      </div>

      {/* Accent top line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #6EC6E6, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-xs">
            <Link href="/">
              <img
                src="/LOGO_STYLUM.png"
                alt="STYLUM"
                className="h-10 w-auto"
                style={{ filter: 'invert(1)', opacity: 0.85 }}
              />
            </Link>
            <p className="font-body text-sm text-brand-dim leading-relaxed">
              Streetwear autentico. Polos BOXYFIT disenados para quienes buscan estilo, comodidad y actitud. Lima, Peru.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="font-body text-xs text-brand-dim tracking-wider uppercase">Envios a todo el Peru</span>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/51934357309?text=Hola%20STYLUM!"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start flex items-center gap-2 font-body text-xs font-semibold tracking-wider uppercase px-4 py-2.5 transition-colors duration-300"
              style={{ background: '#25D366', color: '#000' }}
              onMouseEnter={function(e) { e.currentTarget.style.background = '#1fba5a'; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = '#25D366'; }}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribenos ahora
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-16 md:gap-20">
            <div>
              <p className="font-body text-xs tracking-mega text-brand-muted uppercase mb-4">Navegacion</p>
              <ul className="flex flex-col gap-3">
                {LINKS.map(function(l) {
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="font-body text-sm text-brand-dim hover:text-brand-accent transition-colors duration-300"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="font-body text-xs tracking-mega text-brand-muted uppercase mb-4">Redes sociales</p>
              <ul className="flex flex-col gap-3">
                {SOCIAL.map(function(s) {
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-brand-dim hover:text-brand-accent transition-colors duration-300"
                      >
                        {s.label} ↗
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #222, transparent)' }} />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-brand-muted tracking-wide">
            © {year} STYLUM. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-brand-muted tracking-wide">
            Streetwear with attitude — Lima, Peru
          </p>
        </div>
      </div>
    </footer>
  );
}

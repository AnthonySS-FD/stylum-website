'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

var PILLARS = [
  { number: '100%', label: 'Algodon premium' },
  { number: 'BOXY',  label: 'Corte boxyfit'  },
  { number: '3+',   label: 'Colores exclusivos' },
  { number: 'PE',   label: 'Hecho en Peru'   },
];

export default function About() {
  var ref    = useRef(null);
  var inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      id="nosotros"
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #141414 100%)', borderTop: '1px solid #1e1e1e' }}
    >
      {/* Decoracion */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(110,198,230,0.05) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(110,198,230,0.03) 0%, transparent 70%)' }}
      />

  

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Izquierda */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
            >
              — Sobre STYLUM
            </motion.p>

            {['Hecho con', 'identidad.'].map(function(line, i) {
              return (
                <div key={i} className="overflow-hidden">
                  <motion.h2
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    className="font-display font-900 text-5xl md:text-6xl lg:text-7xl uppercase leading-none tracking-tight"
                    style={{ color: '#F0F0F0' }}
                  >
                    {line}
                  </motion.h2>
                </div>
              );
            })}

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ transformOrigin: 'left', width: '5rem', height: '2px', background: '#6EC6E6', marginTop: '2rem' }}
            />

            {/* Imagen del personaje */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-10 relative"
            >
              <div
                className="p-6 relative overflow-hidden"
                style={{ background: '#141414', border: '1px solid #222' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(110,198,230,0.1)', border: '1px solid rgba(110,198,230,0.3)' }}>
                    <img src="/LOGO STYLUM.png" alt="STYLUM" className="w-10 h-auto" style={{ filter: 'invert(1)', opacity: 0.8 }} />
                  </div>
                  <div>
                    <p className="font-display text-lg font-900 text-brand-white uppercase tracking-tight">Lima, Peru</p>
                    <p className="font-body text-xs text-brand-dim mt-0.5">Marca streetwear — 2026</p>
                  </div>
                </div>
                {/* Borde accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: '#6EC6E6' }} />
              </div>
            </motion.div>
          </div>

          {/* Derecha */}
          <div className="flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-base md:text-lg text-brand-dim leading-relaxed"
            >
              STYLUM nace con la idea de crear streetwear autentico, minimalista y con identidad. Nuestros polos BOXYFIT estan disenados para quienes buscan estilo, comodidad y actitud.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-body text-sm text-brand-muted leading-relaxed"
            >
              Cada pieza es una declaracion. Sin logos excesivos, sin ruido visual — solo corte, tela y actitud. Porque el streetwear real habla sin gritar.
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="pl-5"
              style={{ borderLeft: '2px solid #6EC6E6' }}
            >
              <p className="font-display text-xl md:text-2xl font-900 text-brand-white uppercase leading-tight tracking-tight">
                "El streetwear real habla sin gritar."
              </p>
              <p className="font-body text-xs text-brand-muted mt-2 uppercase tracking-wider">
                — STYLUM, Lima 2026.
              </p>
            </motion.blockquote>

            {/* Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-px"
              style={{ background: '#222', border: '1px solid #222' }}
            >
              {PILLARS.map(function(p, i) {
                return (
                  <div
                    key={i}
                    className="p-5 flex flex-col gap-1 transition-colors duration-300"
                    style={{ background: '#141414' }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = '#1a1a1a'; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = '#141414'; }}
                  >
                    <p className="font-display text-3xl font-900 text-brand-accent">{p.number}</p>
                    <p className="font-body text-xs text-brand-muted uppercase tracking-wider">{p.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

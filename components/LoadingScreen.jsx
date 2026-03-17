'use client';

// components/LoadingScreen.jsx
// Pantalla de carga premium con logo STYLUM
// Se muestra 1 vez por sesion - luego no vuelve a aparecer

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  var [visible,  setVisible]  = useState(false);
  var [progress, setProgress] = useState(0);
  var [phase,    setPhase]    = useState('loading'); // 'loading' | 'reveal' | 'done'

  useEffect(function() {
    // Solo mostrar si no fue visto en esta sesion
    var seen = sessionStorage.getItem('stylum_loaded');
    if (seen) return;
    setVisible(true);

    // Simular progreso de carga
    var start = Date.now();
    var duration = 1800; // ms que dura la barra

    var interval = setInterval(function() {
      var elapsed = Date.now() - start;
      var pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        // Pequena pausa antes de la animacion de salida
        setTimeout(function() {
          setPhase('reveal');
          // Marcar como visto
          sessionStorage.setItem('stylum_loaded', '1');
          // Quitar del DOM despues de la animacion
          setTimeout(function() { setPhase('done'); }, 900);
        }, 300);
      }
    }, 30);

    return function() { clearInterval(interval); };
  }, []);

  if (!visible || phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-brand-black flex flex-col items-center justify-center overflow-hidden"
        >

          {/* ── Grid background sutil ──────────────────────────── */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#F5F5F0 1px, transparent 1px), linear-gradient(90deg, #F5F5F0 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── Glow central ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute w-[400px] h-[400px] rounded-full bg-brand-accent/8 blur-[100px] pointer-events-none"
          />

          {/* ── Logo ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative z-10 flex flex-col items-center gap-10"
          >
            {/* Logo image — usa tu LOGO_STYLUM.png */}
            <motion.img
              src="/LOGO STYLUM.png"
              alt="STYLUM"
              className="w-64 md:w-80 h-auto brightness-0 invert"
              style={{
                filter: 'invert(1)',
                maskImage: 'none',
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-body text-xs text-brand-dim uppercase tracking-mega"
            >
              Streetwear with attitude
            </motion.p>
          </motion.div>

          {/* ── Progress bar y contador ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4 px-8"
          >
            {/* Contador numerico */}
            <div className="flex items-baseline gap-1">
              <motion.span
                className="font-display text-5xl font-900 text-brand-white leading-none tabular-nums"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {progress}
              </motion.span>
              <span className="font-display text-2xl font-900 text-brand-muted">%</span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full max-w-xs h-px bg-brand-border relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand-accent"
                style={{ width: progress + '%' }}
                transition={{ ease: 'linear' }}
              />
              {/* Brillo en la punta */}
              <motion.div
                className="absolute top-0 w-4 h-full bg-white/60 blur-sm"
                style={{ left: 'calc(' + progress + '% - 8px)' }}
              />
            </div>

            {/* Mensaje de estado */}
            <motion.p
              key={progress < 40 ? 'a' : progress < 80 ? 'b' : 'c'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-body text-xs text-brand-muted tracking-wider uppercase"
            >
              {progress < 40
                ? 'Cargando coleccion...'
                : progress < 80
                  ? 'Preparando experiencia...'
                  : 'Casi listo...'}
            </motion.p>
          </motion.div>

          {/* ── Reveal curtain — sale hacia arriba al terminar ─ */}
          <AnimatePresence>
            {phase === 'reveal' && (
              <motion.div
                key="curtain"
                initial={{ y: '0%' }}
                animate={{ y: '-100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-brand-black z-20"
              />
            )}
          </AnimatePresence>

          {/* ── Corner decorations ────────────────────────────── */}
          <div className="absolute top-6 left-6 flex items-center gap-2 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            <span className="font-body text-xs text-brand-dim tracking-mega uppercase">STYLUM</span>
          </div>
          <div className="absolute top-6 right-6 opacity-30">
            <span className="font-body text-xs text-brand-dim tracking-mega uppercase">2025</span>
          </div>
          <div className="absolute bottom-6 left-6 opacity-20">
            <span className="font-body text-xs text-brand-muted tracking-wider">Lima, Peru</span>
          </div>
          <div className="absolute bottom-6 right-6 opacity-20">
            <span className="font-body text-xs text-brand-muted tracking-wider">BOXYFIT</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

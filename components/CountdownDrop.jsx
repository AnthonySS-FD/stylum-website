'use client';

// components/CountdownDrop.jsx
// Seccion de cuenta regresiva para el proximo drop

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ✏️ CAMBIA ESTA FECHA por la del proximo drop
// Formato: 'YYYY-MM-DDTHH:MM:SS'
var DROP_DATE = '2026-04-15T20:00:00';

// ✏️ Info del drop
var DROP_INFO = {
  label:    'Proximo drop',
  name:     'BOXYFIT SUMMER 26',
  subtitle: 'Nueva paleta de colores — Edicion limitada',
  colors:   ['#E8D5B7', '#8B9E7B', '#C4956A', '#6B7FA3'], // colores del drop
  colorNames: ['Sand', 'Sage', 'Terracota', 'Steel'],
  whatsapp: 'https://wa.me/51934357309?text=Hola%20STYLUM!%20Quiero%20anotarme%20para%20el%20proximo%20drop',
};

function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

function getTimeLeft(target) {
  var now  = Date.now();
  var end  = new Date(target).getTime();
  var diff = Math.max(0, end - now);

  var days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days: days, hours: hours, minutes: minutes, seconds: seconds, done: diff === 0 };
}

// Unidad individual del contador
function TimeUnit({ value, label }) {
  var [prev, setPrev] = useState(value);
  var [flip, setFlip] = useState(false);

  useEffect(function() {
    if (value !== prev) {
      setFlip(true);
      var t = setTimeout(function() {
        setPrev(value);
        setFlip(false);
      }, 300);
      return function() { clearTimeout(t); };
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3">
      {/* Numero con flip */}
      <div className="relative w-20 md:w-28 h-20 md:h-28 bg-brand-surface border border-brand-border flex items-center justify-center overflow-hidden">

        {/* Numero actual */}
        <motion.span
          key={value}
          initial={{ y: flip ? '-100%' : '0%', opacity: flip ? 0 : 1 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl font-900 text-brand-white leading-none tabular-nums"
        >
          {pad(value)}
        </motion.span>

        {/* Linea divisoria central */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-brand-border/50 pointer-events-none" />

        {/* Accent corner */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-brand-accent" />
      </div>

      <span className="font-body text-xs text-brand-dim tracking-mega uppercase">
        {label}
      </span>
    </div>
  );
}

export default function CountdownDrop() {
  var ref    = useRef(null);
  var inView = useInView(ref, { once: true, margin: '-15%' });

  var [time, setTime] = useState(function() { return getTimeLeft(DROP_DATE); });

  // Tick cada segundo
  useEffect(function() {
    var interval = setInterval(function() {
      setTime(getTimeLeft(DROP_DATE));
    }, 1000);
    return function() { clearInterval(interval); };
  }, []);

  return (
    <section
      ref={ref}
      id="proximo-drop"
      className="relative py-24 md:py-32 px-6 md:px-10 bg-brand-black border-t border-brand-border overflow-hidden"
    >
      {/* Background: lineas diagonales sutiles */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #F5F5F0 0px, #F5F5F0 1px, transparent 1px, transparent 60px)',
        }}
      />

      {/* Glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ────────────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
          >
            — Proximo drop
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {['COMING', 'SOON.'].map(function(line, i) {
                return (
                  <div key={i} className="overflow-hidden">
                    <motion.h2
                      initial={{ y: '110%' }}
                      animate={inView ? { y: '0%' } : {}}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                      className={
                        'font-display text-6xl md:text-8xl font-900 uppercase leading-none tracking-tight ' +
                        (i === 1 ? 'text-brand-accent' : 'text-brand-white')
                      }
                    >
                      {line}
                    </motion.h2>
                  </div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-2"
            >
              <p className="font-display text-xl md:text-2xl font-900 text-brand-white uppercase tracking-tight">
                {DROP_INFO.name}
              </p>
              <p className="font-body text-sm text-brand-dim">
                {DROP_INFO.subtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Countdown ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-14"
        >
          {time.done ? (
            <div className="flex items-center justify-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-center"
              >
                <p className="font-display text-5xl md:text-7xl font-900 text-brand-accent uppercase">
                  Ya disponible!
                </p>
                <p className="font-body text-sm text-brand-dim mt-3">
                  El drop ya esta en vivo — corre antes de que se agote
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-start justify-center md:justify-start gap-3 md:gap-5 flex-wrap">
              <TimeUnit value={time.days}    label="Dias"    />
              <div className="flex items-center justify-center h-20 md:h-28">
                <span className="font-display text-3xl md:text-5xl font-900 text-brand-muted leading-none">:</span>
              </div>
              <TimeUnit value={time.hours}   label="Horas"   />
              <div className="flex items-center justify-center h-20 md:h-28">
                <span className="font-display text-3xl md:text-5xl font-900 text-brand-muted leading-none">:</span>
              </div>
              <TimeUnit value={time.minutes} label="Minutos" />
              <div className="flex items-center justify-center h-20 md:h-28">
                <span className="font-display text-3xl md:text-5xl font-900 text-brand-muted leading-none">:</span>
              </div>
              <TimeUnit value={time.seconds} label="Segundos" />
            </div>
          )}
        </motion.div>

        {/* ── Paleta de colores del drop ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 flex flex-col gap-4"
        >
          <p className="font-body text-xs text-brand-dim tracking-mega uppercase">
            — Colores del drop
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {DROP_INFO.colors.map(function(color, i) {
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="flex items-center gap-2 group"
                >
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 border-2 border-brand-border group-hover:border-brand-muted transition-colors duration-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-body text-xs text-brand-dim uppercase tracking-wider group-hover:text-brand-white transition-colors">
                    {DROP_INFO.colorNames[i]}
                  </span>
                </motion.div>
              );
            })}
            <div className="flex items-center gap-2 ml-2">
              <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-dashed border-brand-border flex items-center justify-center">
                <span className="text-brand-muted" style={{ fontSize: '18px' }}>?</span>
              </div>
              <span className="font-body text-xs text-brand-muted uppercase tracking-wider">
                Sorpresa
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── CTA Notificacion ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 bg-brand-surface border border-brand-border"
        >
          <div className="flex-1">
            <p className="font-display text-xl md:text-2xl font-900 text-brand-white uppercase tracking-tight">
              Anotate para el drop
            </p>
            <p className="font-body text-sm text-brand-dim mt-1">
              Escribenos por WhatsApp y te avisamos cuando salga. Cupos limitados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Contador de interesados — visual, puedes editarlo */}
            <div className="flex items-center gap-2 border border-brand-border px-4 py-2.5">
              <div className="flex -space-x-2">
                {['#E8D5B7', '#8B9E7B', '#C4956A'].map(function(c, i) {
                  return (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-brand-surface"
                      style={{ backgroundColor: c }}
                    />
                  );
                })}
              </div>
              <span className="font-body text-xs text-brand-dim">
                +48 anotados
              </span>
            </div>

            <a
              href={DROP_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-brand-accent text-brand-black font-body text-sm font-bold tracking-wider uppercase px-6 py-3 hover:bg-brand-white transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Quiero anotarme
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

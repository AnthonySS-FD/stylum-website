'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

var REVIEWS = [
  { name: 'Carlos M.',    handle: '@carlosm',   text: 'El polo llego perfecto, la calidad es increible. Ya pedi el segundo.',    stars: 5 },
  { name: 'Valeria R.',   handle: '@vale.r',    text: 'El corte BOXYFIT es exactamente lo que buscaba. Tela suave y dura mucho.', stars: 5 },
  { name: 'Diego S.',     handle: '@diegostre', text: 'Marca peruana con nivel internacional. Los colores son fieles a las fotos.', stars: 5 },
  { name: 'Fernanda L.',  handle: '@fer.look',  text: 'Llego rapido y bien empaquetado. El negro es hermoso, cero destenido.',    stars: 5 },
  { name: 'Mateo C.',     handle: '@mateoc_pe', text: 'Compre 3 y todos perfectos. El oversize queda increible.',                 stars: 5 },
  { name: 'Luciana P.',   handle: '@lu.style',  text: 'La atencion fue rapida y el polo llego antes de lo esperado. 10/10',       stars: 5 },
  { name: 'Sebastian V.', handle: '@seba.urb',  text: 'Calidad de exportacion, precio justo. STYLUM cuida los detalles.',         stars: 5 },
  { name: 'Camila T.',    handle: '@cami.t',    text: 'El verde botella es mi favorito. Combina con todo y la tela es premium.',   stars: 5 },
];

var ALL = REVIEWS.concat(REVIEWS);

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map(function(_, i) {
        return (
          <svg key={i} className="w-3.5 h-3.5" style={{ fill: '#6EC6E6' }} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-72 md:w-80 mx-2 p-6 flex flex-col gap-4"
      style={{ background: '#141414', border: '1px solid #222' }}
    >
      <Stars count={review.stars} />
      <p className="font-body text-sm text-brand-dim leading-relaxed flex-1">
        "{review.text}"
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-900"
            style={{ background: 'rgba(110,198,230,0.15)', border: '1px solid rgba(110,198,230,0.3)', color: '#6EC6E6' }}
          >
            {review.name[0]}
          </div>
          <div>
            <p className="font-body text-xs font-semibold text-brand-white">{review.name}</p>
            <p className="font-body" style={{ fontSize: '10px', color: '#666' }}>{review.handle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" style={{ color: '#6EC6E6', fill: '#6EC6E6' }} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-body text-brand-accent" style={{ fontSize: '9px' }}>Verificado</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  var ref    = useRef(null);
  var inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: '#141414', borderTop: '1px solid #1e1e1e' }}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 mb-14">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
        >
          — Lo que dicen
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {['Clientes que', 'ya visten STYLUM.'].map(function(line, i) {
              return (
                <div key={i} className="overflow-hidden">
                  <motion.h2
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    className="font-display text-4xl md:text-6xl font-900 uppercase leading-none tracking-tight text-brand-white"
                  >
                    {line}
                  </motion.h2>
                </div>
              );
            })}
          </div>

          {/* Rating box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 px-6 py-4"
            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
          >
            <div className="text-center">
              <p className="font-display text-4xl font-900 text-brand-accent">5.0</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[1,2,3,4,5].map(function(i) {
                  return <svg key={i} className="w-3 h-3" style={{ fill: '#6EC6E6' }} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
                })}
              </div>
              <p className="font-body text-brand-muted mt-1 uppercase tracking-wide" style={{ fontSize: '10px' }}>+200 reseñas</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Row 1 — izquierda */}
      <div className="relative mb-4">
        <div className="flex" style={{ width: 'max-content' }}>
          <motion.div
            className="flex"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
          >
            {ALL.map(function(r, i) { return <ReviewCard key={'a' + i} review={r} />; })}
          </motion.div>
        </div>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #141414, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #141414, transparent)' }} />
      </div>

      {/* Row 2 — derecha */}
      <div className="relative">
        <div className="flex" style={{ width: 'max-content' }}>
          <motion.div
            className="flex"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          >
            {ALL.map(function(r, i) { return <ReviewCard key={'b' + i} review={r} />; })}
          </motion.div>
        </div>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #141414, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #141414, transparent)' }} />
      </div>
    </section>
  );
}

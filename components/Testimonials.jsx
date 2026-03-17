'use client';

import { motion } from 'framer-motion';

const REVIEWS = [
  { name: 'Carlos M.',    handle: '@carlosm',    text: 'El polo llegó perfecto, la calidad es increíble. Ya pedí el segundo 🔥', stars: 5 },
  { name: 'Valeria R.',   handle: '@vale.r',     text: 'El corte BOXYFIT es exactamente lo que buscaba. Tela suave y dura mucho.', stars: 5 },
  { name: 'Diego S.',     handle: '@diegostre',  text: 'Marca peruana con nivel internacional. Los colores son fieles a las fotos.', stars: 5 },
  { name: 'Fernanda L.',  handle: '@fer.look',   text: 'Llegó rápido y bien empaquetado. El negro es hermoso, cero desteñido.', stars: 5 },
  { name: 'Mateo C.',     handle: '@mateoc_pe',  text: 'Compré 3 y todos perfectos. El oversize queda increíble, super recomendado.', stars: 5 },
  { name: 'Luciana P.',   handle: '@lu.style',   text: 'La atención fue rápida y el polo llegó antes de lo esperado. 10/10', stars: 5 },
  { name: 'Sebastián V.', handle: '@seba.urb',   text: 'Calidad de exportación, precio justo. STYLUM se nota que cuida los detalles.', stars: 5 },
  { name: 'Camila T.',    handle: '@cami.t',     text: 'El gris stone es mi favorito. Combina con todo y la tela es premium de verdad.', stars: 5 },
];

// Duplicamos para el loop infinito
const ALL = [...REVIEWS, ...REVIEWS];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-brand-accent fill-brand-accent" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="flex-shrink-0 w-72 md:w-80 bg-brand-surface border border-brand-border p-6 mx-2">
      <StarRating count={review.stars} />
      <p className="font-body text-sm text-brand-dim leading-relaxed mb-4">
        "{review.text}"
      </p>
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-brand-border flex items-center justify-center">
          <span className="font-display text-xs font-700 text-brand-accent">
            {review.name[0]}
          </span>
        </div>
        <div>
          <p className="font-body text-xs font-semibold text-brand-white">{review.name}</p>
          <p className="font-body text-[10px] text-brand-muted">{review.handle}</p>
        </div>
        {/* Verified badge */}
        <div className="ml-auto flex items-center gap-1">
          <svg className="w-3 h-3 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-body text-[9px] text-brand-accent tracking-wide uppercase">Verificado</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 overflow-hidden" style={{ background: '#0d0d0d', borderTop: '1px solid #D4621A' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-14">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs tracking-mega text-brand-accent uppercase mb-4"
        >
          — Lo que dicen
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {['Clientes que', 'ya visten STYLUM.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className="font-display text-4xl md:text-6xl font-900 text-brand-white uppercase leading-none tracking-tight"
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 border border-brand-border px-6 py-4"
          >
            <div className="text-center">
              <p className="font-display text-4xl font-900 text-brand-accent">5.0</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 fill-brand-accent" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[10px] text-brand-dim mt-1 tracking-wide uppercase">+200 reseñas</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Row 1: izquierda → derecha ── */}
      <div className="relative mb-4">
        <div className="flex" style={{ width: 'max-content' }}>
          <motion.div
            className="flex"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
          >
            {ALL.map((r, i) => <ReviewCard key={`a-${i}`} review={r} />)}
          </motion.div>
        </div>
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-black to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-black to-transparent pointer-events-none z-10" />
      </div>

      {/* ── Row 2: derecha → izquierda ── */}
      <div className="relative">
        <div className="flex" style={{ width: 'max-content' }}>
          <motion.div
            className="flex"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          >
            {ALL.map((r, i) => <ReviewCard key={`b-${i}`} review={r} />)}
          </motion.div>
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-black to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-black to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
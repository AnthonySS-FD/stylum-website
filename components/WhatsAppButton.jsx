'use client';

// ─────────────────────────────────────────────────────────────────────────
// components/WhatsAppButton.jsx
// Botón flotante de WhatsApp — siempre visible, con pulse y tooltip
// ─────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ✏️ Cambia estos datos por los tuyos
const WHATSAPP_NUMBER = '51934357309'; // Tu número sin + ni espacios
const WHATSAPP_MESSAGE = '¡Hola STYLUM! 👋 Quiero info sobre sus polos BOXYFIT';

export default function WhatsAppButton() {
  const [visible,     setVisible]     = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBubble,  setShowBubble]  = useState(false);

  // Aparece después de 2s de scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // También aparece después de 3s aunque no hagan scroll
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  // Muestra la burbuja de mensaje después de 5s
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setShowBubble(true);
      // La oculta después de 6s
      setTimeout(() => setShowBubble(false), 6000);
    }, 2000);
    return () => clearTimeout(timer);
  }, [visible]);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

          {/* ── Burbuja de mensaje ─────────────────────────────── */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0,  scale: 1   }}
                exit={{    opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white text-brand-black rounded-2xl rounded-br-sm px-4 py-3 shadow-2xl max-w-[220px]"
              >
                {/* Flecha */}
                <div className="absolute -bottom-2 right-4 w-0 h-0"
                  style={{
                    borderLeft:  '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop:   '8px solid white',
                  }}
                />
                {/* Avatar inicial */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">S</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-800">STYLUM</span>
                  <span className="text-[9px] text-gray-400 ml-auto">ahora</span>
                </div>
                <p className="text-xs text-gray-700 leading-snug">
                  ¡Hola! 👋 ¿Buscas tu polo BOXYFIT? Escríbenos, te ayudamos 🔥
                </p>
                {/* Cierre */}
                <button
                  onClick={() => setShowBubble(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <svg className="w-2.5 h-2.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Botón principal ────────────────────────────────── */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{    scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative"
          >
            {/* Pulse ring animado */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"
              style={{ animationDelay: '0.4s' }}
            />

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0  }}
                  exit={{    opacity: 0, x: 10  }}
                  className="absolute right-16 top-1/2 -translate-y-1/2 bg-brand-black text-brand-white font-body text-xs tracking-wide whitespace-nowrap px-3 py-1.5 rounded-sm border border-brand-border pointer-events-none"
                >
                  ¿Dudas? Escríbenos 💬
                </motion.span>
              )}
            </AnimatePresence>

            {/* Botón */}
            <motion.button
              onClick={handleClick}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{   scale: 0.95 }}
              className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:bg-[#20c05a] transition-colors duration-300 cursor-pointer"
              aria-label="Contactar por WhatsApp"
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.button>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
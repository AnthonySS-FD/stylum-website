'use client';

// components/Cart.jsx
// Sidebar del carrito con formulario y envio por WhatsApp

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

var WHATSAPP_NUMBER = '51934357309'; // Cambia por tu numero real

function buildWhatsAppMessage(items, totalPrice, name, address) {
  var lines = [];
  lines.push('Hola STYLUM! Quiero hacer el siguiente pedido:');
  lines.push('');
  lines.push('🛒 MI PEDIDO:');
  items.forEach(function(item) {
    lines.push('• ' + item.quantity + 'x ' + item.name + ' - Talla ' + item.size + ' - ' + item.price);
  });
  lines.push('');
  lines.push('💰 TOTAL: S/. ' + totalPrice.toFixed(2));
  lines.push('');
  lines.push('👤 Nombre: ' + name);
  lines.push('📍 Direccion: ' + address);
  lines.push('');
  lines.push('Quiero coordinar la entrega. Gracias!');
  return lines.join('\n');
}

function CartItem({ item }) {
  var cart = useCart();
  return (
    <div className="flex gap-4 py-4 border-b border-brand-border">
      {/* Imagen */}
      <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-brand-border">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-1">
        <p className="font-display text-sm font-900 text-brand-white uppercase tracking-tight leading-tight">
          {item.name}
        </p>
        <p className="font-body text-xs text-brand-dim">
          Talla: <span className="text-brand-accent font-semibold">{item.size}</span>
        </p>
        <p className="font-body text-sm font-semibold text-brand-accent">
          {item.price}
        </p>

        {/* Controles cantidad */}
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center border border-brand-border">
            <button
              onClick={function() { cart.updateQuantity(item.id, item.size, -1); }}
              className="w-7 h-7 flex items-center justify-center text-brand-dim hover:text-brand-white hover:bg-brand-border transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <span className="w-8 text-center font-body text-sm text-brand-white">
              {item.quantity}
            </span>
            <button
              onClick={function() { cart.updateQuantity(item.id, item.size, 1); }}
              className="w-7 h-7 flex items-center justify-center text-brand-dim hover:text-brand-white hover:bg-brand-border transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          {/* Subtotal */}
          <span className="font-body text-xs text-brand-dim ml-auto">
            S/. {(item.priceNumber * item.quantity).toFixed(2)}
          </span>

          {/* Eliminar */}
          <button
            onClick={function() { cart.removeItem(item.id, item.size); }}
            className="text-brand-muted hover:text-red-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  var cart = useCart();
  var [name,    setName]    = useState('');
  var [address, setAddress] = useState('');
  var [step,    setStep]    = useState('cart'); // 'cart' | 'form' | 'success'
  var [errors,  setErrors]  = useState({});

  function handleSendOrder() {
    var errs = {};
    if (!name.trim())    errs.name    = 'Ingresa tu nombre';
    if (!address.trim()) errs.address = 'Ingresa tu direccion';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    var msg = buildWhatsAppMessage(cart.items, cart.totalPrice, name.trim(), address.trim());
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
    setStep('success');
    setTimeout(function() {
      cart.clearCart();
      cart.setIsOpen(false);
      setStep('cart');
      setName('');
      setAddress('');
      setErrors({});
    }, 3000);
  }

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={function() { cart.setIsOpen(false); }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-surface border-l border-brand-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
              <div>
                <h2 className="font-display text-xl font-900 text-brand-white uppercase tracking-tight">
                  Mi carrito
                </h2>
                <p className="font-body text-xs text-brand-dim mt-0.5">
                  {cart.totalItems} {cart.totalItems === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              <button
                onClick={function() { cart.setIsOpen(false); }}
                className="w-9 h-9 flex items-center justify-center border border-brand-border text-brand-dim hover:text-brand-white hover:border-brand-muted transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notificacion ultimo agregado */}
            <AnimatePresence>
              {cart.lastAdded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mx-4 mt-3 px-4 py-2.5 bg-brand-accent/10 border border-brand-accent/30 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="font-body text-xs text-brand-accent">
                    Agregado: {cart.lastAdded}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contenido segun step */}
            {step === 'success' ? (
              /* Pantalla de exito */
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-[#25D366]/20 border-2 border-[#25D366] flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </motion.div>
                <div className="text-center">
                  <p className="font-display text-2xl font-900 text-brand-white uppercase">
                    Pedido enviado!
                  </p>
                  <p className="font-body text-sm text-brand-dim mt-2">
                    WhatsApp se abrio con tu pedido completo. Te respondemos pronto.
                  </p>
                </div>
              </div>

            ) : step === 'form' ? (
              /* Formulario de datos */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {/* Resumen rapido */}
                  <div className="bg-brand-black border border-brand-border p-4 mb-6">
                    <p className="font-body text-xs text-brand-dim uppercase tracking-wider mb-3">
                      Resumen del pedido
                    </p>
                    {cart.items.map(function(item, i) {
                      return (
                        <div key={i} className="flex justify-between items-center py-1">
                          <p className="font-body text-xs text-brand-dim">
                            {item.quantity}x {item.name} ({item.size})
                          </p>
                          <p className="font-body text-xs text-brand-white">
                            S/. {(item.priceNumber * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                    <div className="border-t border-brand-border mt-3 pt-3 flex justify-between">
                      <span className="font-body text-sm font-semibold text-brand-white">Total</span>
                      <span className="font-body text-sm font-semibold text-brand-accent">
                        S/. {cart.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Campos del formulario */}
                  <div className="flex flex-col gap-4">
                    <p className="font-body text-xs text-brand-dim uppercase tracking-wider">
                      Datos de entrega
                    </p>

                    {/* Nombre */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body text-xs text-brand-dim uppercase tracking-wider">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={function(e) {
                          setName(e.target.value);
                          setErrors(function(prev) { return Object.assign({}, prev, { name: null }); });
                        }}
                        placeholder="Ej: Carlos Rodriguez"
                        className={
                          'w-full bg-brand-black border px-4 py-3 font-body text-sm text-brand-white placeholder:text-brand-muted outline-none transition-colors ' +
                          (errors.name ? 'border-red-500' : 'border-brand-border focus:border-brand-accent')
                        }
                      />
                      {errors.name && (
                        <p className="font-body text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Direccion */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body text-xs text-brand-dim uppercase tracking-wider">
                        Direccion de entrega *
                      </label>
                      <textarea
                        value={address}
                        onChange={function(e) {
                          setAddress(e.target.value);
                          setErrors(function(prev) { return Object.assign({}, prev, { address: null }); });
                        }}
                        placeholder="Ej: Av. Larco 456, Miraflores, Lima"
                        rows={3}
                        className={
                          'w-full bg-brand-black border px-4 py-3 font-body text-sm text-brand-white placeholder:text-brand-muted outline-none transition-colors resize-none ' +
                          (errors.address ? 'border-red-500' : 'border-brand-border focus:border-brand-accent')
                        }
                      />
                      {errors.address && (
                        <p className="font-body text-xs text-red-400">{errors.address}</p>
                      )}
                    </div>

                    <p className="font-body text-xs text-brand-muted leading-relaxed">
                      Tu pedido completo se enviara por WhatsApp. Nos contactaremos para confirmar la entrega y el pago.
                    </p>
                  </div>
                </div>

                {/* Footer del form */}
                <div className="px-6 py-4 border-t border-brand-border flex flex-col gap-3">
                  <button
                    onClick={handleSendOrder}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-black font-body text-sm font-bold tracking-wider uppercase py-4 hover:bg-[#20c05a] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enviar pedido por WhatsApp
                  </button>
                  <button
                    onClick={function() { setStep('cart'); }}
                    className="w-full font-body text-xs text-brand-dim hover:text-brand-white transition-colors uppercase tracking-wider py-2"
                  >
                    Volver al carrito
                  </button>
                </div>
              </div>

            ) : (
              /* Vista principal del carrito */
              <>
                {cart.items.length === 0 ? (
                  /* Carrito vacio */
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                    <div className="w-16 h-16 border border-brand-border flex items-center justify-center">
                      <svg className="w-8 h-8 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-lg font-900 text-brand-white uppercase">
                        Tu carrito esta vacio
                      </p>
                      <p className="font-body text-xs text-brand-dim mt-1">
                        Agrega polos desde la coleccion
                      </p>
                    </div>
                    <button
                      onClick={function() { cart.setIsOpen(false); }}
                      className="mt-2 bg-brand-accent text-brand-black font-body text-xs font-bold tracking-wider uppercase px-6 py-3 hover:bg-brand-white transition-colors"
                    >
                      Ver coleccion
                    </button>
                  </div>

                ) : (
                  <>
                    {/* Lista de items */}
                    <div className="flex-1 overflow-y-auto px-6">
                      {cart.items.map(function(item, i) {
                        return <CartItem key={i} item={item} />;
                      })}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-brand-border">
                      {/* Total */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-body text-sm text-brand-dim uppercase tracking-wider">Total</span>
                        <div className="text-right">
                          <span className="font-display text-2xl font-900 text-brand-accent">
                            S/. {cart.totalPrice.toFixed(2)}
                          </span>
                          <p className="font-body text-xs text-brand-muted">
                            Envio a coordinar
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={function() { setStep('form'); }}
                        className="w-full flex items-center justify-center gap-3 bg-brand-accent text-brand-black font-body text-sm font-bold tracking-wider uppercase py-4 hover:bg-brand-white transition-colors group"
                      >
                        Continuar pedido
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </button>

                      <button
                        onClick={cart.clearCart}
                        className="w-full mt-2 font-body text-xs text-brand-muted hover:text-red-400 transition-colors uppercase tracking-wider py-2"
                      >
                        Vaciar carrito
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

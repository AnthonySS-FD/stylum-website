'use client';

// components/CartPage.jsx
// Carrito de compras tipo pagina completa — estilo profesional
// Mantiene el tema oscuro de STYLUM

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

var WHATSAPP_NUMBER = '51934357309';

var PAYMENT_METHODS = [
  {
    id: 'yape',
    label: 'Yape / Plin',
    desc: 'Te enviamos el numero al confirmar tu pedido.',
    icon: '📱',
  },
  {
    id: 'transferencia',
    label: 'Transferencia bancaria',
    desc: 'BCP o Interbank. Te damos los datos por WhatsApp.',
    icon: '🏦',
  },
  {
    id: 'efectivo',
    label: 'Pago en efectivo',
    desc: 'Coordinas el pago al momento de la entrega.',
    icon: '💵',
  },
];

function buildMessage(items, total, data) {
  var lines = [];
  lines.push('Hola STYLUM! Quiero hacer el siguiente pedido:');
  lines.push('');
  lines.push('MI PEDIDO:');
  items.forEach(function(item) {
    lines.push('- ' + item.quantity + 'x ' + item.name + ' | Talla ' + item.size + ' | ' + item.price);
  });
  lines.push('');
  lines.push('TOTAL: S/. ' + total.toFixed(2));
  lines.push('');
  lines.push('Nombre: ' + data.nombre + ' ' + data.apellido);
  lines.push('Telefono: ' + data.telefono);
  lines.push('Direccion: ' + data.direccion + ', ' + data.distrito + ', ' + data.departamento);
  lines.push('Metodo de pago: ' + data.pago);
  lines.push('');
  lines.push('Quedo atento. Gracias!');
  return lines.join('\n');
}

// ── Tabla de tallas ──────────────────────────────────────────────────
var SIZE_CHART = [
  { talla: 'S',  pecho: '102', largo: '68', hombro: '47' },
  { talla: 'M',  pecho: '108', largo: '71', hombro: '50' },
  { talla: 'L',  pecho: '114', largo: '74', hombro: '53' },
];

function SizeChartModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-brand-surface border border-brand-border z-10 p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-2xl font-900 text-brand-white uppercase tracking-tight">
              Guia de tallas
            </h3>
            <p className="font-body text-xs text-brand-muted mt-1">Corte BOXYFIT — medidas en centimetros</p>
          </div>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-hidden border border-brand-border">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-accent">
                <th className="font-body text-xs font-semibold tracking-wider uppercase p-3 text-left text-brand-black">Talla</th>
                <th className="font-body text-xs font-semibold tracking-wider uppercase p-3 text-center text-brand-black">Pecho (cm)</th>
                <th className="font-body text-xs font-semibold tracking-wider uppercase p-3 text-center text-brand-black">Largo (cm)</th>
                <th className="font-body text-xs font-semibold tracking-wider uppercase p-3 text-center text-brand-black">Hombro (cm)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map(function(row, i) {
                return (
                  <tr key={row.talla} className={i % 2 === 0 ? 'bg-brand-surface' : 'bg-brand-black'}>
                    <td className="font-display text-xl font-900 text-brand-white p-3">{row.talla}</td>
                    <td className="font-body text-sm text-brand-dim p-3 text-center">{row.pecho}</td>
                    <td className="font-body text-sm text-brand-dim p-3 text-center">{row.largo}</td>
                    <td className="font-body text-sm text-brand-dim p-3 text-center">{row.hombro}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-5 p-4 bg-brand-black border border-brand-border">
          <p className="font-body text-xs text-brand-dim leading-relaxed">
            <span className="font-semibold text-brand-white">Corte BOXYFIT:</span> Silueta cuadrada y suelta. Si dudas entre tallas, elige la menor. El polo tiene caida amplia por diseno.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Fila de producto en el carrito ───────────────────────────────────
function CartRow({ item }) {
  var cart = useCart();
  return (
    <tr className="border-b border-brand-border group">
      {/* Producto */}
      <td className="py-5 pr-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-brand-border border border-brand-border">
            <img
              src={item.image || item.front || '/LOGO STYLUM.png'}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-display text-sm font-900 text-brand-white uppercase tracking-tight leading-tight">
              {item.name}
            </p>
            <p className="font-body text-xs text-brand-muted mt-1">
              Talla: <span className="text-brand-accent font-semibold">{item.size}</span>
            </p>
            <p className="font-body text-xs text-brand-dim mt-0.5">{item.price}</p>
          </div>
        </div>
      </td>

      {/* Cantidad */}
      <td className="py-5 px-4 text-center">
        <div className="flex items-center justify-center border border-brand-border w-fit mx-auto">
          <button
            onClick={function() { cart.updateQuantity(item.id, item.size, -1); }}
            className="w-8 h-8 flex items-center justify-center text-brand-dim hover:text-brand-white hover:bg-brand-border transition-colors font-bold text-lg"
          >
            −
          </button>
          <span className="w-10 text-center font-body text-sm font-semibold text-brand-white">
            {item.quantity}
          </span>
          <button
            onClick={function() { cart.updateQuantity(item.id, item.size, 1); }}
            className="w-8 h-8 flex items-center justify-center text-brand-dim hover:text-brand-white hover:bg-brand-border transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>
      </td>

      {/* Subtotal */}
      <td className="py-5 px-4 text-right">
        <span className="font-body text-sm font-semibold text-brand-white">
          S/. {(item.priceNumber * item.quantity).toFixed(2)}
        </span>
      </td>

      {/* Eliminar */}
      <td className="py-5 pl-4 text-right">
        <button
          onClick={function() { cart.removeItem(item.id, item.size); }}
          className="text-brand-muted hover:text-red-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

// ── Pagina principal del carrito ─────────────────────────────────────
export default function CartPage() {
  var cart = useCart();
  var [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  var [showSizeChart, setShowSizeChart] = useState(false);
  var [selectedPayment, setSelectedPayment] = useState('yape');
  var [errors, setErrors] = useState({});
  var [form, setForm] = useState({
    nombre: '', apellido: '', telefono: '',
    direccion: '', distrito: '', departamento: 'Lima',
  });

  function updateForm(field, value) {
    setForm(function(prev) { return Object.assign({}, prev, { [field]: value }); });
    setErrors(function(prev) { return Object.assign({}, prev, { [field]: null }); });
  }

  function handleCheckout() {
    var errs = {};
    if (!form.nombre.trim())    errs.nombre    = 'Requerido';
    if (!form.apellido.trim())  errs.apellido  = 'Requerido';
    if (!form.telefono.trim())  errs.telefono  = 'Requerido';
    if (!form.direccion.trim()) errs.direccion = 'Requerido';
    if (!form.distrito.trim())  errs.distrito  = 'Requerido';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    var paymentLabel = PAYMENT_METHODS.find(function(p) { return p.id === selectedPayment; }).label;
    var data = Object.assign({}, form, { pago: paymentLabel });
    var msg = buildMessage(cart.items, cart.totalPrice, data);
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
    setStep('success');
  }

  // ── Carrito vacio ────────────────────────────────────────────────
  if (cart.items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center gap-6 px-6 pt-20">
        <div className="w-20 h-20 border border-brand-border flex items-center justify-center">
          <svg className="w-10 h-10 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-display text-3xl font-900 text-brand-white uppercase">Tu carrito esta vacio</p>
          <p className="font-body text-sm text-brand-dim mt-2">Agrega polos desde nuestra coleccion</p>
        </div>
        <Link
          href="/#coleccion"
          className="bg-brand-accent text-brand-black font-body text-sm font-bold tracking-wider uppercase px-8 py-4 hover:bg-brand-white transition-colors"
        >
          Ver coleccion
        </Link>
      </div>
    );
  }

  // ── Pantalla de exito ────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center gap-6 px-6 pt-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-[#25D366]/20 border-2 border-[#25D366] flex items-center justify-center"
        >
          <svg className="w-12 h-12 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.div>
        <div className="text-center">
          <p className="font-display text-4xl font-900 text-brand-white uppercase">Pedido enviado!</p>
          <p className="font-body text-sm text-brand-dim mt-3 max-w-sm leading-relaxed">
            WhatsApp se abrio con tu pedido completo. Nos comunicaremos contigo para confirmar el pago y la entrega.
          </p>
        </div>
        <Link
          href="/"
          onClick={function() { cart.clearCart(); }}
          className="mt-4 font-body text-sm text-brand-dim hover:text-brand-white transition-colors uppercase tracking-wider border-b border-brand-muted hover:border-brand-white pb-0.5"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black pt-20">

      {/* ── Breadcrumb header ──────────────────────────────────────── */}
      <div className="bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-900 text-brand-white uppercase tracking-tight">
              {step === 'cart' ? 'Tu cesta' : 'Finalizar pedido'}
            </h1>
            <p className="font-body text-sm text-brand-dim mt-1">
              {step === 'cart'
                ? 'Gestiona tus prendas antes de finalizar la compra.'
                : 'Completa tus datos para recibir tu pedido.'}
            </p>
            <div className="w-12 h-0.5 bg-brand-accent mt-3" />
          </div>

          {/* Steps indicator */}
          <div className="hidden md:flex items-center gap-3">
            {['Carrito', 'Datos', 'Confirmacion'].map(function(s, i) {
              var stepIndex = step === 'cart' ? 0 : step === 'checkout' ? 1 : 2;
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className={
                    'flex items-center gap-2 ' +
                    (i <= stepIndex ? 'opacity-100' : 'opacity-30')
                  }>
                    <span className={
                      'w-6 h-6 rounded-full flex items-center justify-center font-body text-xs font-bold ' +
                      (i < stepIndex
                        ? 'bg-brand-accent text-brand-black'
                        : i === stepIndex
                          ? 'bg-brand-white text-brand-black'
                          : 'bg-brand-border text-brand-muted')
                    }>
                      {i < stepIndex ? '✓' : i + 1}
                    </span>
                    <span className="font-body text-xs text-brand-dim uppercase tracking-wider">{s}</span>
                  </div>
                  {i < 2 && <div className="w-8 h-px bg-brand-border" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

        {/* ── STEP 1: CARRITO ───────────────────────────────────────── */}
        {step === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Tabla de productos */}
            <div className="lg:col-span-2">
              <div className="bg-brand-surface border border-brand-border overflow-hidden">
                {/* Header tabla */}
                <div className="grid grid-cols-4 bg-brand-black px-6 py-3 border-b border-brand-border">
                  <span className="font-body text-xs font-semibold tracking-wider uppercase text-brand-dim col-span-2">Producto</span>
                  <span className="font-body text-xs font-semibold tracking-wider uppercase text-brand-dim text-center">Cantidad</span>
                  <span className="font-body text-xs font-semibold tracking-wider uppercase text-brand-dim text-right">Subtotal</span>
                </div>

                {/* Filas */}
                <div className="px-6">
                  <table className="w-full">
                    <tbody>
                      {cart.items.map(function(item, i) {
                        return <CartRow key={i} item={item} />;
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Footer tabla */}
                <div className="px-6 py-4 border-t border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    onClick={function() { setShowSizeChart(true); }}
                    className="flex items-center gap-2 font-body text-xs text-brand-accent hover:text-brand-white transition-colors uppercase tracking-wider"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                    Guia de tallas BOXYFIT
                  </button>
                  <button
                    onClick={cart.clearCart}
                    className="font-body text-xs text-brand-muted hover:text-red-400 transition-colors uppercase tracking-wider"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>

              {/* Boton continuar comprando */}
              <Link
                href="/#coleccion"
                className="inline-flex items-center gap-2 mt-4 font-body text-sm text-brand-dim hover:text-brand-white transition-colors uppercase tracking-wider"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Seguir comprando
              </Link>
            </div>

            {/* Resumen lateral */}
            <div className="lg:col-span-1">
              <div className="bg-brand-surface border border-brand-border p-6 sticky top-24">
                <h3 className="font-display text-xl font-900 text-brand-white uppercase tracking-tight mb-5">
                  Resumen
                </h3>

                {/* Items resumen */}
                <div className="flex flex-col gap-3 mb-5">
                  {cart.items.map(function(item, i) {
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-14 overflow-hidden bg-brand-border border border-brand-border">
                            <img src={item.image || item.front || '/LOGO STYLUM.png'} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-accent text-brand-black font-bold rounded-full flex items-center justify-center" style={{ fontSize: '10px' }}>
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-body text-xs font-semibold text-brand-white leading-tight">{item.name}</p>
                          <p className="font-body text-xs text-brand-muted">Talla: {item.size}</p>
                        </div>
                        <p className="font-body text-sm font-semibold text-brand-white">
                          S/. {(item.priceNumber * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-brand-border pt-4 flex flex-col gap-2 mb-5">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-brand-dim">Subtotal</span>
                    <span className="font-body text-sm text-brand-white">S/. {cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-brand-dim">Envio</span>
                    <span className="font-body text-sm text-brand-accent font-semibold">A coordinar</span>
                  </div>
                  <div className="flex justify-between border-t border-brand-border pt-3 mt-1">
                    <span className="font-display text-lg font-900 text-brand-white uppercase">Total</span>
                    <span className="font-display text-2xl font-900 text-brand-accent">S/. {cart.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={function() { setStep('checkout'); window.scrollTo(0, 0); }}
                  className="w-full flex items-center justify-center gap-3 bg-brand-accent text-brand-black font-body text-sm font-bold tracking-wider uppercase py-4 hover:bg-brand-white transition-colors duration-300 group"
                >
                  Realizar pedido
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                {/* Metodos de pago iconos */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  {['Yape', 'Plin', 'BCP', 'Efectivo'].map(function(m) {
                    return (
                      <span key={m} className="font-body text-xs text-brand-muted border border-brand-border px-2 py-1">
                        {m}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: CHECKOUT ──────────────────────────────────────── */}
        {step === 'checkout' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Formulario */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Informacion de contacto */}
              <div className="bg-brand-surface border border-brand-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-7 h-7 rounded-full bg-brand-accent text-brand-black font-display font-900 text-sm flex items-center justify-center">1</span>
                  <h2 className="font-display text-xl font-900 text-brand-white uppercase tracking-tight">
                    Datos personales
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { field: 'nombre',   label: 'Nombre *',   placeholder: 'Tu nombre',   type: 'text' },
                    { field: 'apellido', label: 'Apellido *',  placeholder: 'Tu apellido', type: 'text' },
                    { field: 'telefono', label: 'Telefono *',  placeholder: '987 654 321', type: 'tel', full: true },
                  ].map(function(f) {
                    return (
                      <div key={f.field} className={f.full ? 'sm:col-span-2' : ''}>
                        <label className="font-body text-xs text-brand-dim uppercase tracking-wider mb-1.5 block">{f.label}</label>
                        <input
                          type={f.type}
                          value={form[f.field]}
                          onChange={function(e) { updateForm(f.field, e.target.value); }}
                          placeholder={f.placeholder}
                          className={'w-full bg-brand-black border px-4 py-3 font-body text-sm text-brand-white placeholder:text-brand-muted outline-none transition-colors ' + (errors[f.field] ? 'border-red-500' : 'border-brand-border focus:border-brand-accent')}
                        />
                        {errors[f.field] && <p className="font-body text-xs text-red-400 mt-1">{errors[f.field]}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direccion de envio */}
              <div className="bg-brand-surface border border-brand-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-7 h-7 rounded-full bg-brand-accent text-brand-black font-display font-900 text-sm flex items-center justify-center">2</span>
                  <h2 className="font-display text-xl font-900 text-brand-white uppercase tracking-tight">
                    Direccion de envio
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="font-body text-xs text-brand-dim uppercase tracking-wider mb-1.5 block">Direccion completa *</label>
                    <input
                      type="text"
                      value={form.direccion}
                      onChange={function(e) { updateForm('direccion', e.target.value); }}
                      placeholder="Av. ejemplo 123, Miraflores"
                      className={'w-full bg-brand-black border px-4 py-3 font-body text-sm text-brand-white placeholder:text-brand-muted outline-none transition-colors ' + (errors.direccion ? 'border-red-500' : 'border-brand-border focus:border-brand-accent')}
                    />
                    {errors.direccion && <p className="font-body text-xs text-red-400 mt-1">{errors.direccion}</p>}
                  </div>

                  <div>
                    <label className="font-body text-xs text-brand-dim uppercase tracking-wider mb-1.5 block">Departamento</label>
                    <select
                      value={form.departamento}
                      onChange={function(e) { updateForm('departamento', e.target.value); }}
                      className="w-full bg-brand-black border border-brand-border px-4 py-3 font-body text-sm text-brand-white outline-none focus:border-brand-accent transition-colors"
                    >
                      {['Lima', 'Arequipa', 'Cusco', 'La Libertad', 'Piura', 'Lambayeque', 'Ica', 'Junin', 'Ancash', 'Loreto', 'Otro'].map(function(d) {
                        return <option key={d} value={d} className="bg-brand-black">{d}</option>;
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-xs text-brand-dim uppercase tracking-wider mb-1.5 block">Distrito *</label>
                    <input
                      type="text"
                      value={form.distrito}
                      onChange={function(e) { updateForm('distrito', e.target.value); }}
                      placeholder="Ej: Miraflores"
                      className={'w-full bg-brand-black border px-4 py-3 font-body text-sm text-brand-white placeholder:text-brand-muted outline-none transition-colors ' + (errors.distrito ? 'border-red-500' : 'border-brand-border focus:border-brand-accent')}
                    />
                    {errors.distrito && <p className="font-body text-xs text-red-400 mt-1">{errors.distrito}</p>}
                  </div>
                </div>
              </div>

              {/* Metodo de pago */}
              <div className="bg-brand-surface border border-brand-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-7 h-7 rounded-full bg-brand-accent text-brand-black font-display font-900 text-sm flex items-center justify-center">3</span>
                  <h2 className="font-display text-xl font-900 text-brand-white uppercase tracking-tight">
                    Metodo de pago
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {PAYMENT_METHODS.map(function(pm) {
                    return (
                      <button
                        key={pm.id}
                        onClick={function() { setSelectedPayment(pm.id); }}
                        className={'flex items-start gap-4 p-4 border-2 text-left transition-all duration-200 ' + (selectedPayment === pm.id ? 'border-brand-accent bg-brand-black' : 'border-brand-border bg-brand-black hover:border-brand-muted')}
                      >
                        <div className={'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ' + (selectedPayment === pm.id ? 'border-brand-accent' : 'border-brand-muted')}>
                          {selectedPayment === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                        </div>
                        <div>
                          <p className="font-body text-sm font-semibold text-brand-white">{pm.icon} {pm.label}</p>
                          <p className="font-body text-xs text-brand-dim mt-1 leading-relaxed">{pm.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="font-body text-xs text-brand-muted mt-4 leading-relaxed">
                  🔒 Tu pedido se enviara por WhatsApp. Nos contactamos para coordinar el pago y la entrega de forma segura.
                </p>
              </div>

              <button
                onClick={function() { setStep('cart'); window.scrollTo(0, 0); }}
                className="self-start flex items-center gap-2 font-body text-sm text-brand-dim hover:text-brand-white transition-colors uppercase tracking-wider"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Regresar al carrito
              </button>
            </div>

            {/* Resumen lateral */}
            <div className="lg:col-span-1">
              <div className="bg-brand-surface border border-brand-border p-6 sticky top-24">
                <h3 className="font-display text-xl font-900 text-brand-white uppercase tracking-tight mb-5">
                  Resumen de compra
                </h3>

                <div className="flex flex-col gap-4 mb-5">
                  {cart.items.map(function(item, i) {
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-16 overflow-hidden bg-brand-border border border-brand-border">
                            <img src={item.image || item.front || '/LOGO STYLUM.png'} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-accent text-brand-black font-bold rounded-full flex items-center justify-center" style={{ fontSize: '10px' }}>
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-body text-xs font-semibold text-brand-white leading-tight">{item.name}</p>
                          <p className="font-body text-xs text-brand-muted">Talla: {item.size}</p>
                          <p className="font-body text-sm font-semibold text-brand-white mt-0.5">S/. {(item.priceNumber * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-brand-border pt-4 flex flex-col gap-2 mb-6">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-brand-dim">Subtotal</span>
                    <span className="font-body text-sm text-brand-white">S/. {cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-brand-dim">Envio</span>
                    <span className="font-body text-sm text-brand-accent">A coordinar</span>
                  </div>
                  <div className="flex justify-between border-t border-brand-border pt-3 mt-1">
                    <span className="font-display text-lg font-900 text-brand-white uppercase">Total a pagar</span>
                    <span className="font-display text-2xl font-900 text-brand-accent">S/. {cart.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-body text-sm font-bold tracking-wider uppercase py-4 hover:bg-[#20c05a] transition-colors duration-300 group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Finalizar mi compra
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                <p className="font-body text-xs text-brand-muted text-center mt-3">
                  🔒 Transaccion 100% segura
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal tabla de tallas */}
      <AnimatePresence>
        {showSizeChart && <SizeChartModal onClose={function() { setShowSizeChart(false); }} />}
      </AnimatePresence>
    </div>
  );
}

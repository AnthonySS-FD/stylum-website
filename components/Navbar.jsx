'use client';

// components/Navbar.jsx — con link a pagina /nosotros

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

var navLinks = [
  { label: 'Coleccion',    href: '/#coleccion',    external: false },
  { label: 'Como comprar', href: '/#como-comprar', external: false },
  { label: 'Nosotros',     href: '/nosotros',       external: false },
  { label: 'Estilo',       href: '/#estilo',        external: false },
  { label: 'Contacto',     href: '/#contacto',      external: false },
];

function CartIcon() {
  var cart = useCart();
  return (
    <button
      onClick={function() { cart.setIsOpen(true); }}
      className="relative flex items-center justify-center w-10 h-10 border border-brand-border text-brand-dim hover:text-brand-white hover:border-brand-muted transition-all duration-300"
      aria-label="Abrir carrito"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      {cart.totalItems > 0 && (
        <motion.span
          key={cart.totalItems}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-accent text-brand-black font-body font-bold rounded-full flex items-center justify-center"
          style={{ fontSize: '10px' }}
        >
          {cart.totalItems > 9 ? '9+' : cart.totalItems}
        </motion.span>
      )}
    </button>
  );
}

export default function Navbar() {
  var [scrolled, setScrolled] = useState(false);
  var [menuOpen, setMenuOpen] = useState(false);
  var cart = useCart();

  useEffect(function() {
    var onScroll = function() { setScrolled(window.scrollY > 60); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(function() {
    var onResize = function() { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return function() { window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ' +
          (scrolled ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-border' : 'bg-transparent')
        }
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center">
            <img
              src="/LOGO STYLUM.png"
              alt="STYLUM"
              className="h-10 w-auto brightness-0 invert"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(function(link) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    'font-body text-xs font-medium tracking-wider uppercase transition-colors duration-300 relative group ' +
                    (link.label === 'Drop'
                      ? 'text-brand-accent hover:text-brand-white'
                      : 'text-brand-dim hover:text-brand-accent')
                  }
                >
                  {link.label === 'Drop' && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent mr-1.5 animate-pulse" />
                  )}
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <CartIcon />
            <Link
              href="/#coleccion"
              className="hidden md:inline-flex items-center gap-2 bg-brand-accent text-brand-black font-body text-xs font-bold tracking-wider uppercase px-5 py-2.5 hover:bg-brand-white transition-colors duration-300"
            >
              Shop
            </Link>

            {/* Hamburger */}
            <button
              onClick={function() { setMenuOpen(!menuOpen); }}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-1.5 p-1"
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-brand-white origin-center" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-brand-white" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-brand-white origin-center" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map(function(link, i) {
              return (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.1 }}>
                  <Link
                    href={link.href}
                    onClick={function() { setMenuOpen(false); }}
                    className={
                      'font-display text-4xl font-900 tracking-ultra uppercase transition-colors ' +
                      (link.label === 'Drop' ? 'text-brand-accent' : 'text-brand-white hover:text-brand-accent')
                    }
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.button
              onClick={function() { cart.setIsOpen(true); setMenuOpen(false); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2 border border-brand-accent text-brand-accent font-body text-sm font-semibold tracking-wider uppercase px-6 py-3"
            >
              Carrito
              {cart.totalItems > 0 && (
                <span className="bg-brand-accent text-brand-black font-bold w-5 h-5 rounded-full flex items-center justify-center" style={{ fontSize: '10px' }}>
                  {cart.totalItems}
                </span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

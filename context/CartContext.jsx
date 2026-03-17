'use client';

// context/CartContext.jsx
// Estado global del carrito — disponible en toda la app

import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items,       setItems]       = useState([]);
  const [isOpen,      setIsOpen]      = useState(false);
  const [lastAdded,   setLastAdded]   = useState(null);

  // Agregar producto (o sumar cantidad si ya existe con misma talla)
  const addItem = useCallback(function(product, size, quantity) {
    var qty = quantity || 1;
    setItems(function(prev) {
      var existing = prev.find(function(i) {
        return i.id === product.id && i.size === size;
      });
      if (existing) {
        return prev.map(function(i) {
          if (i.id === product.id && i.size === size) {
            return Object.assign({}, i, { quantity: i.quantity + qty });
          }
          return i;
        });
      }
      return prev.concat([{
        id: product.id,
        name: product.name,
        price: product.price,
        priceNumber: product.priceNumber,
        image: product.image,
        size: size,
        quantity: qty,
      }]);
    });
    setLastAdded(product.name + ' - Talla ' + size);
    setIsOpen(true);
    // Limpiar notificacion despues de 3s
    setTimeout(function() { setLastAdded(null); }, 3000);
  }, []);

  // Eliminar item
  const removeItem = useCallback(function(id, size) {
    setItems(function(prev) {
      return prev.filter(function(i) {
        return !(i.id === id && i.size === size);
      });
    });
  }, []);

  // Cambiar cantidad
  const updateQuantity = useCallback(function(id, size, delta) {
    setItems(function(prev) {
      return prev.map(function(i) {
        if (i.id === id && i.size === size) {
          var newQty = i.quantity + delta;
          if (newQty <= 0) return null;
          return Object.assign({}, i, { quantity: newQty });
        }
        return i;
      }).filter(Boolean);
    });
  }, []);

  // Vaciar carrito
  const clearCart = useCallback(function() {
    setItems([]);
  }, []);

  // Total de items (suma de cantidades)
  var totalItems = items.reduce(function(acc, i) { return acc + i.quantity; }, 0);

  // Total en soles
  var totalPrice = items.reduce(function(acc, i) { return acc + (i.priceNumber * i.quantity); }, 0);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      setIsOpen,
      lastAdded,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  var ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}

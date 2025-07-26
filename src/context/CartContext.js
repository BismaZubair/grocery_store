import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
  const updatedCart = [...cart];
  const existingItemIndex = updatedCart.findIndex((p) => p.id === item.id);

  if (existingItemIndex >= 0) {
    updatedCart[existingItemIndex].quantity += item.quantity;
  } else {

    updatedCart.push({ ...item });
  }

  setCart(updatedCart);
};


  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

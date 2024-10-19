// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const clearCart = () => {
    setCartItems([]); // Limpia el carrito
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

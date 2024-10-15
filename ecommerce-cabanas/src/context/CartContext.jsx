import React, { createContext, useReducer, useEffect } from 'react';

// Crear contexto del carrito
const CartContext = createContext();

// Reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.findIndex(item => item._id === action.payload._id);
      if (existingItemIndex >= 0) {
        // Incrementa la cantidad si el artículo ya está en el carrito
        const updatedItems = [...state];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return updatedItems;
      }
      return [...state, { ...action.payload, quantity: 1 }]; // Agregar nuevo artículo
    }
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item._id !== action.payload);
    case 'CLEAR_CART':
      return []; // Limpiar el carrito
    default:
      return state;
  }
};

// Proveedor del contexto del carrito
const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    // Cargar el carrito desde localStorage al iniciar
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      dispatch({ type: 'SET_CART', payload: storedCart });
    }
  }, []);

  useEffect(() => {
    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };

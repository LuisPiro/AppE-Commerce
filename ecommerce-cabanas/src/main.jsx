import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import './index.css';
import { CartProvider } from './context/CartContext';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);

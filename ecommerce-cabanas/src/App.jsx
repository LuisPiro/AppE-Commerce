// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; 
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage"; 
import PaymentPage from "./pages/PaymentPage"; 
import CartPage from "./pages/CartPage"; // Asegúrate de importar CartPage
import { AuthProvider } from "./context/AuthContext"; 
import { CartProvider } from "./context/CartContext"; 

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/cart" element={<CartPage />} /> {/* Ruta para el carrito */}
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Verifica que tengas este componente correctamente importado
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage"; // Importa la página de reservas correctamente
import PaymentPage from "./pages/PaymentPage"; // Importa la nueva página de pagos
import { AuthProvider } from "./context/AuthContext"; // Mantén el contexto de autenticación si lo estás usando

function App() {
  return (
    <AuthProvider> {/* Mantén el proveedor de autenticación alrededor de la app */}
      <Navbar /> {/* Navbar debería estar fuera de las rutas para que siempre esté visible */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* La ruta raíz es la página de inicio */}
        <Route path="/register" element={<RegisterPage />} /> {/* Página de registro */}
        <Route path="/login" element={<LoginPage />} /> {/* Página de inicio de sesión */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Página de perfil del usuario */}
        <Route path="/booking" element={<BookingPage />} /> {/* Página de reservas */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Página de pagos */}
      </Routes>
    </AuthProvider>
  );
}

export default App;

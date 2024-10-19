// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importar el contexto del carrito
import './Navbar.css'; // Asegúrate de tener un archivo CSS para estilos de Navbar

const Navbar = () => {
  const { cartItems } = useCart(); // Obtener la cantidad de items en el carrito

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <a href="#caracteristicas">Características</a>
        </li>
        <li>
          <a href="#galeria">Galería</a>
        </li>
        <li>
          <a href="#servicios">Servicios</a>
        </li>
        <li>
          <a href="#testimonios">Testimonios</a>
        </li>
        <li>
          <a href="#contacto">Contacto</a>
        </li>
        <li>
          <Link to="/booking">Reservas</Link>
        </li>
        <li>
          <Link to="/cart" className="cart-link">Carrito ({cartItems.length})</Link> {/* Mostrar cantidad de items en el carrito */}
        </li>
        {/* Nuevos enlaces para iniciar sesión y registrarse */}
        <li>
          <Link to="/login" className="auth-link">Iniciar Sesión</Link>
        </li>
        <li>
          <Link to="/register" className="auth-link">Registrar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

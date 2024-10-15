// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener React Router instalado
import "./Navbar.css"; // Importa el CSS de la barra de navegación

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="../Imgn/logo.jpg" alt="Logo" /> {/* Reemplaza con la ruta de tu logo */}
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/about">Acerca de</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
        <li>
          <Link to="/gallery">Galería</Link>
        </li>
        <li>
          <Link to="/register">Registrar</Link> {/* Enlace para registrar */}
        </li>
        <li>
          <Link to="/login">Ingresar</Link> {/* Enlace para ingresar */}
        </li>
        <li>
          <Link to="/profile">Perfil</Link> {/* Enlace para perfil */}
        </li>
      </ul>
      <div className="btn-container">
        <Link to="/booking" className="btn-reservar"> {/* Cambié el enlace de crear orden de PayPal a reservar */}
          Reservar
        </Link> {/* Enlace para reservar */}
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de tener un archivo CSS para estilos

const Navbar = () => {
  return (
    <nav>
      <h1>Mi Aplicación</h1>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/catalog">Catálogo</Link>
        </li>
        <li>
          <Link to="/cart">Carrito</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

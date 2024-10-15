// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axiosInstance from '../axiosConfig'; // Asegúrate de que este archivo esté configurado correctamente
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/login', formData);
      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', response.data.token);
      // Redirigir a una página después de iniciar sesión
      navigate('/profile'); // o cualquier página a la que quieras redirigir tras el login exitoso
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Error al iniciar sesión.";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;

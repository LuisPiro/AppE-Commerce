// src/pages/ProfilePage.jsx
import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../axiosConfig';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put('/auth/profile', formData);
      // Manejar actualización exitosa
    } catch (err) {
      setError(err.response.data.message || "Error al actualizar el perfil.");
    }
  };

  return (
    <div>
      <h2>Perfil</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default ProfilePage;

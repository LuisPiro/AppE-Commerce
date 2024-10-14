// src/components/CabinCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CabinCard = ({ cabin }) => {
  return (
    <div className="cabin-card">
      <img src={cabin.image} alt={cabin.name} style={{ width: '100%', borderRadius: '10px' }} />
      <h2>{cabin.name}</h2>
      <p>{cabin.description}</p>
      <p>Capacidad: {cabin.capacity} personas</p>
      <Link to="/booking">
        <button>Reservar</button>
      </Link>
    </div>
  );
};

export default CabinCard;

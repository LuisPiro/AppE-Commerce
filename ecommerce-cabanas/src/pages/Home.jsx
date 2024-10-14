// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import CabinCard from '../components/CabinCard'; // Asegúrate de crear este componente
import './Home.css';

const cabins = [
  {
    id: 1,
    name: 'Cabaña 1',
    capacity: 6,
    description: 'Cabaña acogedora para 6 personas, ideal para familias.',
    image: 'ruta-a-la-imagen-1.jpg',
  },
  {
    id: 2,
    name: 'Cabaña 2',
    capacity: 6,
    description: 'Cabaña moderna con vista al lago, capacidad para 6 personas.',
    image: 'ruta-a-la-imagen-2.jpg',
  },
  {
    id: 3,
    name: 'Cabaña 3',
    capacity: 5,
    description: 'Cabaña cómoda para 5 personas, perfecta para grupos.',
    image: 'ruta-a-la-imagen-3.jpg',
  },
  {
    id: 4,
    name: 'Cabaña 4',
    capacity: 5,
    description: 'Cabaña rústica con encanto, para 5 personas.',
    image: 'ruta-a-la-imagen-4.jpg',
  },
  {
    id: 5,
    name: 'Cabaña 5',
    capacity: 5,
    description: 'Cabaña familiar ideal para escapadas.',
    image: 'ruta-a-la-imagen-5.jpg',
  },
  {
    id: 6,
    name: 'Cabaña 6',
    capacity: 5,
    description: 'Cabaña acogedora con todas las comodidades.',
    image: 'ruta-a-la-imagen-6.jpg',
  },
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Bienvenidos a Nuestras Cabañas</h1>
      <div className="cabin-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </div>
  );
};

export default Home;

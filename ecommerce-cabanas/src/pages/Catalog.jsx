import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import './Catalog.css';
import { CartContext } from '../context/CartContext';

const Catalog = () => {
  const [cabanas, setCabanas] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCabanas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cabanas');
        setCabanas(response.data);
      } catch (error) {
        console.error("Error al obtener las cabañas", error);
      }
    };

    fetchCabanas();
  }, []);

  return (
    <div>
      <h1>Catálogo de Cabañas</h1>
      <div className="cabana-list">
        {cabanas.map((cabana) => (
          <div key={cabana._id} className="cabana-item">
            <img src={cabana.imageUrl} alt={cabana.title} />
            <h3>{cabana.title}</h3>
            <p>{cabana.description}</p>
            <p>Precio: ${cabana.price}</p>
            <button onClick={() => addToCart(cabana)}>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

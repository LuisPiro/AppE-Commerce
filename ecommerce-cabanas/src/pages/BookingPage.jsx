import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importa el contexto de carrito
import AuthContext from '../context/AuthContext'; // Importa el contexto de autenticación
import axiosInstance from '../utils/axiosConfig'; // Importa la instancia de Axios
import './BookingPage.css';

const prices = {
  5: 45000, // Precio por día para cabaña de 5 personas
  6: 60000, // Precio por día para cabaña de 6 personas
};

const BookingPage = () => {
  const [cabinType, setCabinType] = useState('');
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Obtiene la función para agregar al carrito
  const { user } = useContext(AuthContext); // Obtén el usuario del contexto

  useEffect(() => {
    setError('');
    if (startDate && endDate && cabinType) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end > start) {
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const pricePerDay = prices[cabinType];
        const calculatedPrice = diffDays * pricePerDay;

        setTotalPrice(calculatedPrice);
      } else {
        setError('La fecha de fin debe ser posterior a la fecha de inicio.');
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, cabinType]);

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (numOfGuests > cabinType) {
      setError('El número de huéspedes excede la capacidad de la cabaña.');
      return;
    }

    if (totalPrice > 0) {
      const item = {
        totalAmount: totalPrice,
        cabinDetails: { name: `Cabaña para ${cabinType} personas` },
        startDate,
        endDate,
        cabinType,
      };

      addToCart(item); // Agrega el ítem al carrito
      navigate('/cart'); // Redirige al carrito
    } else {
      setError('Por favor, asegúrate de seleccionar todos los campos correctamente.');
    }
  };

  const handlePayPal = async () => {
    const reservation = {
      cabinType,
      numOfGuests,
      startDate,
      endDate,
      totalPrice,
      userId: user.token, // Usa el ID del usuario desde el contexto
    };

    try {
      // Enviar la reserva al servidor
      const response = await axiosInstance.post('/reservations', reservation); // Asegúrate de que la ruta sea correcta
      console.log('Reserva guardada:', response.data);
      
      // Aquí podrías implementar la lógica de PayPal, si es necesario
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  return (
    <div className="booking-page">
      <h1>Reservar Cabaña</h1>
      <form onSubmit={handleAddToCart}>
        <label>
          Tipo de Cabaña:
          <select value={cabinType} onChange={(e) => setCabinType(e.target.value)}>
            <option value="">Selecciona una cabaña</option>
            <option value="5">Cabaña para 5 personas</option>
            <option value="6">Cabaña para 6 personas</option>
          </select>
        </label>
        <label>
          Número de Huéspedes:
          <input
            type="number"
            min="1"
            value={numOfGuests}
            onChange={(e) => setNumOfGuests(e.target.value)}
          />
        </label>
        <label>
          Fecha de Inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Fecha de Fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <p className="total-price">
          Precio Total: ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p> 
        {error && <p className="error-message">{error}</p>} 
        <button type="submit">Agregar al Carrito de Compras</button>
      </form>
      <button onClick={handlePayPal} className="paypal-button">Pagar con PayPal</button>
    </div>
  );
};

export default BookingPage;

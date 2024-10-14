import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleCalculatePrice = () => {
    if (startDate && endDate && cabinType) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Validar que endDate sea posterior a startDate
      if (end <= start) {
        alert('La fecha de fin debe ser posterior a la fecha de inicio.');
        return 0;
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir milisegundos a días
      const pricePerDay = prices[cabinType];
      const calculatedPrice = diffDays * pricePerDay;
      
      setTotalPrice(calculatedPrice); // Actualizar el precio total
      return calculatedPrice; // Retorna el precio calculado
    }
    return 0; // Retorna 0 si no hay fechas o tipo de cabaña
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedPrice = handleCalculatePrice(); // Calcula el precio antes de redirigir
    if (calculatedPrice > 0) {
      // Redirigir a la página de pago solo si el precio es mayor a 0
      navigate('/payment', { state: { totalPrice: calculatedPrice } });
    }
  };

  return (
    <div>
      <h1>Reservar Cabaña</h1>
      <form onSubmit={handleSubmit}>
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
        <p>Precio Total: ${totalPrice}</p> {/* Muestra el precio total */}
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default BookingPage;

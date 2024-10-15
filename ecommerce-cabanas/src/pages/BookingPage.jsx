import React, { useState, useEffect } from 'react';
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setError(''); // Resetea el error al cambiar cualquiera de los valores
    if (startDate && endDate && cabinType) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end > start) { // Verifica que endDate sea posterior a startDate
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Convertir milisegundos a días
        const pricePerDay = prices[cabinType];
        const calculatedPrice = diffDays * pricePerDay;

        setTotalPrice(calculatedPrice); // Actualiza el precio total
      } else {
        setError('La fecha de fin debe ser posterior a la fecha de inicio.');
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0); // Si faltan datos, establece el precio en 0
    }
  }, [startDate, endDate, cabinType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica el número de huéspedes
    if (numOfGuests > cabinType) {
      setError('El número de huéspedes excede la capacidad de la cabaña.');
      return;
    }

    // Redirigir a la página de pago solo si el precio es mayor a 0
    if (totalPrice > 0) {
      navigate('/payment', {
        state: {
          totalAmount: totalPrice,
          cabinDetails: { name: `Cabaña para ${cabinType} personas` },
          startDate,
          endDate,
          cabinType
        }
      });
    } else {
      setError('Por favor, asegúrate de seleccionar todos los campos correctamente.');
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
        <p>Precio Total: ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p> {/* Formatear el precio */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default BookingPage;

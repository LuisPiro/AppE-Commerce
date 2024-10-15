// src/pages/PaymentPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount, cabinDetails, startDate, endDate, cabinType } = location.state || { totalAmount: 0, cabinDetails: { name: '' }, startDate: '', endDate: '', cabinType: '' };

  const handlePayment = async () => {
    try {
      // Envía las fechas y tipo de cabaña junto con el totalAmount
      const response = await axios.post('http://localhost:5000/my-server/capture-paypal-order', {
        orderID: 'ID_DE_LA_ORDEN', // Aquí deberías obtener el ID de la orden que generaste
        totalAmount,
        cabinType,
        startDate,
        endDate,
      });
  
      const { id } = response.data;
  
      // Redirigir al usuario a la página de pago de PayPal
      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${id}`;
    } catch (error) {
      console.error('Error al capturar la orden de PayPal:', error);
    }
  };
  

  return (
    <div>
      <h1>Confirmación de Reserva</h1>
      <p>{cabinDetails.name}</p>
      <p>Desde: {startDate} hasta {endDate}</p> {/* Mostrar las fechas seleccionadas */}
      <p>Total a pagar: ${totalAmount}</p>
      <button onClick={handlePayment}>Pagar con PayPal</button>
    </div>
  );
};

export default PaymentPage;

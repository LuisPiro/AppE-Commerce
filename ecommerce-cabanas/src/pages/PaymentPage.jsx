// src/pages/PaymentPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount, cabinDetails } = location.state || { totalAmount: 0, cabinDetails: { name: '' } };

  const handlePayment = async () => {
    try {
      // Crea la orden de PayPal con el totalAmount
      const response = await axios.post('http://localhost:5000/my-server/create-paypal-order', {
        totalAmount: totalAmount,
      });
      const { id } = response.data;

      // Redirigir al usuario a la página de pago de PayPal
      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${id}`;
    } catch (error) {
      console.error('Error al crear la orden de PayPal:', error);
    }
  };

  return (
    <div>
      <h1>Confirmación de Reserva</h1>
      <p>{cabinDetails.name}</p>
      <p>Total a pagar: ${totalAmount}</p>
      <button onClick={handlePayment}>Pagar con PayPal</button>
    </div>
  );
};

export default PaymentPage;

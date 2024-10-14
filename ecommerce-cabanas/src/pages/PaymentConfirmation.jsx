// src/pages/PaymentConfirmation.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import PayPalCheckout from '../components/PayPalCheckout';

const PaymentConfirmation = () => {
  const location = useLocation();
  const { totalAmount, cabinDetails } = location.state || {};

  if (!totalAmount) {
    return <h1>Error: No se proporcionó el monto total</h1>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Confirmación de Pago</h1>
      <p>Detalles de tu Reserva:</p>
      <p><strong>Cabaña:</strong> {cabinDetails.name}</p>
      <p><strong>Total a Pagar:</strong> ${totalAmount}</p>
      <h2>Realiza tu Pago</h2>
      <PayPalCheckout />
    </div>
  );
};

export default PaymentConfirmation;

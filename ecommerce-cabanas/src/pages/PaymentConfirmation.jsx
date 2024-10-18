// src/pages/PaymentConfirmation.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import PayPalCheckout from '../components/PayPalCheckout';

const PaymentConfirmation = () => {
  const location = useLocation();
  const { totalAmount, cabinDetails } = location.state || {};

  if (!totalAmount || !cabinDetails) {
    return <h1>Error: Faltan detalles de la reserva o el monto total</h1>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Confirmación de Pago</h1>
      <p>Detalles de tu Reserva:</p>
      <p><strong>Cabaña:</strong> {cabinDetails.name || 'N/A'}</p>
      <p><strong>Desde:</strong> {cabinDetails.startDate || 'N/A'}</p>
      <p><strong>Hasta:</strong> {cabinDetails.endDate || 'N/A'}</p>
      <p><strong>Total a Pagar:</strong> ${totalAmount}</p>

      <h2>Realiza tu Pago</h2>
      {/* Pasar el monto total como prop al componente PayPalCheckout */}
      <PayPalCheckout totalAmount={totalAmount} cabinDetails={cabinDetails} />
    </div>
  );
};

export default PaymentConfirmation;

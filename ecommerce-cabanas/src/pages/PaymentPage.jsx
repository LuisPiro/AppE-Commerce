// src/pages/PaymentPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const { state } = useLocation();
  const totalPrice = state?.totalPrice || 0;

  const handlePayment = () => {
    // Aquí puedes manejar la lógica de pago
    console.log(`Procesando pago por: $${totalPrice}`);
    // Redirigir o mostrar un mensaje de confirmación
  };

  return (
    <div>
      <h1>Pagar Reserva</h1>
      <p>Total a pagar: ${totalPrice}</p>
      <button onClick={handlePayment}>Confirmar Pago</button>
    </div>
  );
};

export default PaymentPage;

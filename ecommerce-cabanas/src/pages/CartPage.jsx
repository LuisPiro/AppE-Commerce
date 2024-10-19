// src/pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, clearCart } = useCart(); // Obtén los elementos del carrito y la función clearCart
  const navigate = useNavigate();
  const [paypalInitialized, setPaypalInitialized] = useState(false); // Estado para controlar la inicialización de PayPal

  const handleContinueShopping = () => {
    navigate('/'); // Redirige a la página de inicio
  };

  const handleCheckout = () => {
    if (!paypalInitialized && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          const totalAmount = cartItems.reduce((total, item) => total + item.totalAmount, 0); // Suma los precios de todos los elementos en el carrito

          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalAmount.toFixed(2) // Asegúrate de que totalAmount se está obteniendo correctamente
              },
              description: cartItems.map(item => item.cabinDetails.name).join(', '), // Descripción de todos los productos en el carrito
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Pago exitoso: ${details.payer.name.given_name}`);
            clearCart(); // Limpia el carrito después del pago exitoso
            navigate('/'); // Redirige a la página de inicio después de la compra
          });
        },
        onError: (err) => {
          console.error(err);
          alert('Ocurrió un error con el pago. Por favor, inténtalo de nuevo.');
        },
      }).render('#paypal-button-container'); // Renderiza el botón en este contenedor

      setPaypalInitialized(true); // Marca que PayPal ha sido inicializado
    }
  };

  const handleClearCart = () => {
    clearCart(); // Limpia el carrito
    navigate('/'); // Redirige a la página de inicio
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      handleCheckout(); // Inicia el proceso de checkout si hay elementos en el carrito
    }
  }, [cartItems]);

  return (
    <div className="cart-page">
      <h1>Tu Carrito</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <h2>{item.cabinDetails.name}</h2>
                <p>Precio Total: ${item.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                <p>Fecha de Inicio: {item.startDate}</p>
                <p>Fecha de Fin: {item.endDate}</p>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <button className="btn-continue" onClick={handleContinueShopping}>
              Seguir Comprando
            </button>
            <button className="btn-clear" onClick={handleClearCart}>
              Limpiar Carrito
            </button> {/* Botón para limpiar el carrito */}
          </div>
          <div id="paypal-button-container" className="paypal-buttons-container"></div> {/* Contenedor para los botones de PayPal */}
        </div>
      )}
    </div>
  );
};

export default CartPage;

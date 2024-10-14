// src/pages/Checkout.jsx
import React from 'react';
import PayPalCheckout from '../components/PayPalCheckout';

const Checkout = () => {
    return (
        <div>
            <h1>Checkout</h1>
            <PayPalCheckout />
        </div>
    );
};

export default Checkout;

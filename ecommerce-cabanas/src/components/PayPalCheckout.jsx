import React, { useState } from 'react';
import axios from 'axios';

const PayPalCheckout = () => {
    const [totalAmount, setTotalAmount] = useState('');
    const [orderID, setOrderID] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    // Función para crear la orden de PayPal
    const createOrder = async () => {
        try {
            const response = await axios.post('/my-server/create-paypal-order', {
                totalAmount: totalAmount // Total de la compra
            });

            setOrderID(response.data.id); // Guardamos el ID de la orden de PayPal
            setStatusMessage('Orden creada exitosamente, por favor captura la orden.');
        } catch (error) {
            setStatusMessage('Error al crear la orden: ' + error.message);
        }
    };

    // Función para capturar la orden de PayPal
    const captureOrder = async () => {
        if (!orderID) {
            setStatusMessage('Primero debes crear una orden.');
            return;
        }

        try {
            const response = await axios.post('/my-server/capture-paypal-order', {
                orderID: orderID // ID de la orden creada
            });

            setStatusMessage('Orden capturada exitosamente: ' + JSON.stringify(response.data));
        } catch (error) {
            setStatusMessage('Error al capturar la orden: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Checkout de PayPal</h2>
            <div>
                <label>Total a pagar (USD):</label>
                <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    placeholder="Introduce el total"
                />
            </div>

            <button onClick={createOrder}>Crear Orden de PayPal</button>

            {orderID && (
                <>
                    <p>ID de la Orden: {orderID}</p>
                    <button onClick={captureOrder}>Capturar Orden de PayPal</button>
                </>
            )}

            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default PayPalCheckout;

// src/components/PayPalCheckout.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
    clientId: "YOAdmfYhb0BU9KA45xzoaD9eKEteKjbz2M5oS_ORmRm3YZ2n_Z8xyR7zrtOItAd2haIBrw8N4-zvzMOSosUR_CLIENT_ID", // Reemplaza con tu Client ID real
    currency: "USD",
    intent: "capture",
};

const PayPalCheckout = () => {
    const createOrder = () => {
        // Aquí deberías llamar a tu backend para crear la orden
        return fetch("/my-server/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // Puedes pasar información adicional aquí
                cart: [
                    {
                        id: "YOUR_PRODUCT_ID",
                        quantity: 1, // O la cantidad que necesites
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };

    const onApprove = (data) => {
        return fetch("/my-server/capture-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            }),
        })
        .then((response) => response.json())
        .then((orderData) => {
            const name = orderData.payer.name.given_name;
            alert(`Transacción completada por ${name}`);
        });
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalCheckout;

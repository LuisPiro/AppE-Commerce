import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const PayPalCheckout = ({ totalAmount, cabinDetails }) => {
    const [orderID, setOrderID] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false); // Estado para el indicador de carga

    // Memoriza la función para evitar que se redefina en cada render
    const createOrder = useCallback(async () => {
        if (!totalAmount || !cabinDetails) {
            setStatusMessage('Faltan detalles para crear la orden.');
            return;
        }

        setLoading(true); // Mostrar indicador de carga
        try {
            const response = await axios.post('/my-server/create-paypal-order', {
                totalAmount,
                cabinDetails
            });

            setOrderID(response.data.id);
            setStatusMessage('Orden creada exitosamente. Captura la orden para completar el pago.');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setStatusMessage('Error al crear la orden: ' + errorMessage);
        } finally {
            setLoading(false); // Ocultar indicador de carga
        }
    }, [totalAmount, cabinDetails]);

    useEffect(() => {
        if (totalAmount) {
            createOrder();
        }
    }, [totalAmount, createOrder]); // Se incluye createOrder en las dependencias

    const captureOrder = async () => {
        if (!orderID) {
            setStatusMessage('Primero debes crear una orden.');
            return;
        }

        setLoading(true); // Mostrar indicador de carga
        try {
            const response = await axios.post('/my-server/capture-paypal-order', {
                orderID,
                totalAmount,
                cabinDetails
            });

            setStatusMessage('Orden capturada exitosamente: ' + JSON.stringify(response.data));
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setStatusMessage('Error al capturar la orden: ' + errorMessage);
        } finally {
            setLoading(false); // Ocultar indicador de carga
        }
    };

    return (
        <div>
            <div>
                {loading && <p>Cargando...</p>} {/* Indicador de carga */}

                <button onClick={createOrder} disabled={loading}>Crear Orden de PayPal</button>

                {orderID && (
                    <>
                        <p>ID de la Orden: {orderID}</p>
                        <button onClick={captureOrder} disabled={loading}>Capturar Orden de PayPal</button>
                    </>
                )}

                {statusMessage && <p>{statusMessage}</p>}
            </div>
        </div>
    );
};

PayPalCheckout.propTypes = {
    totalAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    cabinDetails: PropTypes.shape({
        name: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string
    }).isRequired
};

export default PayPalCheckout;

const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Obtener las credenciales de PayPal del archivo .env
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

// Crear una orden de pago en PayPal
router.post('/create-paypal-order', async (req, res) => {
  const { cartItems } = req.body;

  // Calcular el total del carrito
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  try {
    // Obtener token de acceso desde PayPal
    const authResponse = await axios({
      url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_CLIENT_SECRET,
      },
      data: 'grant_type=client_credentials',
    });

    const accessToken = authResponse.data.access_token;

    // Crear la orden de PayPal
    const orderResponse = await axios.post(
      'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalAmount,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Enviar la ID de la orden al frontend
    res.json({ id: orderResponse.data.id });
  } catch (error) {
    console.error('Error al crear la orden de PayPal:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Hubo un problema con PayPal' });
  }
});

// Capturar una orden de PayPal
router.post('/capture-paypal-order', async (req, res) => {
  const { orderID } = req.body;

  try {
    // Obtener token de acceso desde PayPal
    const authResponse = await axios({
      url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_CLIENT_SECRET,
      },
      data: 'grant_type=client_credentials',
    });

    const accessToken = authResponse.data.access_token;

    // Capturar la orden de PayPal
    const captureResponse = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Enviar la respuesta de captura al frontend
    res.json(captureResponse.data);
  } catch (error) {
    console.error('Error al capturar la orden de PayPal:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Hubo un problema al capturar la orden de PayPal' });
  }
});

module.exports = router;

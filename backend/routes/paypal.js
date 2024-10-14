const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const PAYPAL_API_URL = process.env.PAYPAL_API_URL;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

// Función para obtener el token de acceso de PayPal
const getPayPalAccessToken = async () => {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await axios({
    url: `${PAYPAL_API_URL}/v1/oauth2/token`,
    method: 'post',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=client_credentials',
  });

  return response.data.access_token;
};

// Endpoint para crear la orden
router.post('/create-paypal-order', async (req, res) => {
  const { totalAmount } = req.body;

  try {
    const accessToken = await getPayPalAccessToken();
    const response = await axios({
      url: `${PAYPAL_API_URL}/v2/checkout/orders`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
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
    });

    res.json({ id: response.data.id });
  } catch (error) {
    console.error('Error al crear la orden de PayPal:', error.message);
    res.status(500).send('Error creando la orden de PayPal');
  }
});

// Endpoint para capturar la orden
router.post('/capture-paypal-order', async (req, res) => {
  const { orderID } = req.body;

  try {
    const accessToken = await getPayPalAccessToken();
    const response = await axios({
      url: `${PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al capturar la orden de PayPal:', error.message);
    res.status(500).send('Error capturando la orden de PayPal');
  }
});

module.exports = router;

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Middleware para manejar CORS (opcional pero recomendable)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Función para obtener el token de acceso de PayPal
const getPayPalAccessToken = async () => {
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios({
            url: `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
            method: 'post',
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: 'grant_type=client_credentials',
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error al obtener el token de PayPal:', error.message);
        throw new Error('Error al autenticar con PayPal');
    }
};

// Endpoint para crear una orden de PayPal
app.post('/my-server/create-paypal-order', async (req, res) => {
    const { totalAmount } = req.body;

    try {
        const accessToken = await getPayPalAccessToken();
        const response = await axios.post(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: totalAmount.toString(), // Asegúrate de convertir a string
                }
            }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.json({ id: response.data.id });
    } catch (error) {
        console.error('Error al crear la orden de PayPal:', error.message);
        res.status(500).send('Error creando la orden de PayPal');
    }
});

// Endpoint para capturar una orden de PayPal
app.post('/my-server/capture-paypal-order', async (req, res) => {
    const { orderID } = req.body;

    try {
        const accessToken = await getPayPalAccessToken();
        const response = await axios.post(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error al capturar la orden de PayPal:', error.message);
        res.status(500).send('Error capturando la orden de PayPal');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

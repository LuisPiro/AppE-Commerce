require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const paypal = require('@paypal/checkout-server-sdk');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error al conectar a MongoDB:", err));

// Configuración de PayPal
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Crear la orden de PayPal
app.post('/api/payment/create', async (req, res) => {
    const orderRequest = new paypal.orders.OrdersCreateRequest();
    orderRequest.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: req.body.amount, // Monto que envías desde el frontend
            },
        }],
    });

    try {
        const order = await client.execute(orderRequest);
        res.json({ id: order.result.id }); // Devuelve el ID de la orden
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al crear la orden de PayPal');
    }
});

// Capturar la orden de PayPal
app.post('/api/payment/capture', async (req, res) => {
    const captureRequest = new paypal.orders.OrdersCaptureRequest(req.body.orderID);
    captureRequest.requestBody({});

    try {
        const capture = await client.execute(captureRequest);
        res.json(capture.result); // Devuelve los detalles de la captura
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al capturar la orden de PayPal');
    }
});

// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Cabañas de Veraneo");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

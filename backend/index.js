// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');// Asegúrate de tener este paquete instalado

dotenv.config();

// Importar el modelo de Reservation y User
const Reservation = require('./models/Reservation'); // Asegúrate de que la ruta sea correcta
const User = require('./models/User'); // Modelo para el registro de usuarios

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Middleware nativo de Express para procesar JSON
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('/api/auth/register', cors()); // Permitir todas las opciones de CORS

// Precios por tipo de cabaña (deberían coincidir con los del frontend)
const prices = {
  5: 45000, // Precio por día para cabaña de 5 personas
  6: 60000, // Precio por día para cabaña de 6 personas
};

// Función para calcular el total basado en fechas y tipo de cabaña
function calculateTotal(startDate, endDate, cabinType) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const pricePerDay = prices[cabinType];

  return diffDays * pricePerDay;
}

// Endpoint para registrar un nuevo usuario
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validar los datos del usuario
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Por favor, completa todos los campos." });
  }

  // Intentar guardar el nuevo usuario
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado." });
    }
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario." });
  }
});

// Endpoint para crear una orden de PayPal
app.post('/my-server/create-paypal-order', async (req, res) => {
  const { startDate, endDate, cabinType } = req.body;

  if (!startDate || !endDate || !cabinType) {
    return res.status(400).send('Faltan datos para calcular el precio.');
  }

  const totalAmount = calculateTotal(startDate, endDate, cabinType);

  try {
    const response = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, {
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
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al crear la orden de PayPal:', error);
    res.status(500).send('Error al crear la orden de PayPal');
  }
});

// Endpoint para capturar una orden de PayPal
app.post('/my-server/capture-paypal-order', async (req, res) => {
  const { orderID, cabinType, startDate, endDate, totalAmount } = req.body;

  try {
    const response = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`
      }
    });

    if (response.data.status === 'COMPLETED') {
      const newReservation = new Reservation({
        cabinType,
        startDate,
        endDate,
        totalAmount,
        paymentStatus: 'completed'
      });

      await newReservation.save();

      res.json({ message: 'Pago capturado y reserva creada', reservation: newReservation });
    } else {
      res.status(400).json({ message: 'Pago no completado' });
    }
  } catch (error) {
    console.error('Error al capturar la orden de PayPal:', error);
    res.status(500).send('Error al procesar el pago');
  }
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

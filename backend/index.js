// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Cargar rutas
const authRoutes = require('./routes/auth');
const paypalRoutes = require('./routes/paypalRoutes'); // Rutas de PayPal

dotenv.config();

// Modelos
const User = require('./models/User');
const Reservation = require('./models/Reservation');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/paypal', paypalRoutes);

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

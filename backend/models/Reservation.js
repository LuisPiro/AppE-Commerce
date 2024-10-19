// src/routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const Reservation = require('./Reservation'); // Modelo de la reserva

// Ruta para crear una nueva reserva
router.post('/', async (req, res) => {
  const { cabinType, numOfGuests, startDate, endDate, totalPrice, userId } = req.body;
  
  try {
    const newReservation = new Reservation({
      cabinType,
      numOfGuests,
      startDate,
      endDate,
      totalPrice,
      userId, // Aquí guardas el ID del usuario
    });
    
    await newReservation.save();
    res.status(201).json(newReservation); // Devuelve la reserva creada
  } catch (error) {
    console.error('Error al guardar la reserva:', error);
    res.status(500).json({ message: 'Error al guardar la reserva' });
  }
});

module.exports = router;

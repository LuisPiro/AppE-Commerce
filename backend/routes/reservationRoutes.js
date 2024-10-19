// src/models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  cabinType: { type: String, required: true },
  numOfGuests: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al modelo de usuario
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;

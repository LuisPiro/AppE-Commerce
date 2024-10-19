const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Almacenar el correo en minúsculas para evitar duplicados
    trim: true, // Eliminar espacios en blanco
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Establecer la fecha de creación por defecto
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Establecer la fecha de actualización por defecto
  },
});

// Middleware para actualizar la fecha de actualización antes de guardar
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now(); // Actualizar la fecha de modificación
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

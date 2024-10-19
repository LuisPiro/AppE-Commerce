// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).send({ message: "Usuario registrado exitosamente." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error en el registro." });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({ message: "Usuario no encontrado." });
  }

  // Comparar contraseñas
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Contraseña incorrecta." });
  }

  // Aquí puedes generar un token y enviarlo al cliente
  res.status(200).send({ message: "Inicio de sesión exitoso.", userId: user._id });
});

module.exports = router;

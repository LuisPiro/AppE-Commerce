const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
require('dotenv').config();

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validar campos requeridos
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Por favor completa todos los campos' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'El correo electrónico ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar el token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      msg: 'Usuario registrado con éxito',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error en el servidor' });
  }
});

// Iniciar sesión
router.post('/login', (req, res) => {
  // Lógica de autenticación
  res.send('Login exitoso');
});


module.exports = router;

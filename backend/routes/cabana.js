const express = require('express');
const router = express.Router();
const Cabana = require('../models/Cabana');

// Crear una nueva cabaña
router.post('/add', async (req, res) => {
  const { title, description, price, imageUrl, available } = req.body;
  try {
    const newCabana = new Cabana({ title, description, price, imageUrl, available });
    await newCabana.save();
    res.status(201).json(newCabana);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las cabañas
router.get('/', async (req, res) => {
  try {
    const cabanas = await Cabana.find();
    res.json(cabanas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

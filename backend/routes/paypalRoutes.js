const express = require('express');
const { createPayPalOrder, capturePayPalOrder } = require('../controllers/paypalController');
const router = express.Router();

router.post('/create-paypal-order', createPayPalOrder);
router.post('/capture-paypal-order', capturePayPalOrder);

module.exports = router;

const axios = require('axios');
const Reservation = require('../models/Reservation'); // Modelo de Reservaciones

const prices = {
  5: 45000, // Precio por día para cabaña de 5 personas
  6: 60000, // Precio por día para cabaña de 6 personas
};

function calculateTotal(startDate, endDate, cabinType) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const pricePerDay = prices[cabinType];

  return diffDays * pricePerDay;
}

// Crear orden de PayPal
exports.createPayPalOrder = async (req, res) => {
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
          value: totalAmount.toString(),
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
};

// Capturar orden de PayPal
exports.capturePayPalOrder = async (req, res) => {
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
};

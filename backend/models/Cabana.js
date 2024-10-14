const mongoose = require('mongoose');

const CabanaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Cabana = mongoose.model("Cabana", CabanaSchema);
module.exports = Cabana;

const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  name: String,
  description: String,
  params: Object, // Guarda todos los parámetros de la calculadora
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Config', ConfigSchema);
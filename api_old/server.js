require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Config = require('./Config');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Guardar configuración
app.post('/api/configs', async (req, res) => {
  try {
    const config = new Config(req.body);
    await config.save();
    res.status(201).json(config);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las configuraciones
app.get('/api/configs', async (req, res) => {
  const configs = await Config.find().sort({ createdAt: -1 });
  res.json(configs);
});

// Obtener una configuración por ID
app.get('/api/configs/:id', async (req, res) => {
  const config = await Config.findById(req.params.id);
  if (!config) return res.status(404).json({ error: 'No encontrada' });
  res.json(config);
});

// Eliminar una configuración
app.delete('/api/configs/:id', async (req, res) => {
  await Config.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
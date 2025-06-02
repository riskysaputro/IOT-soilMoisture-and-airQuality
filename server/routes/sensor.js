const express = require('express');
const router = express.Router();
const db = require('../db');

// POST data sensor dari ESP32
router.post('/', async (req, res) => {
  const { soil, air } = req.body;
  try {
    await db.query('INSERT INTO sensor_data (soil_moisture, air_quality) VALUES (?, ?)', [soil, air]);
    res.json({ message: 'Data inserted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB insert failed' });
  }
});

// GET semua data sensor (untuk dashboard)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM sensor_data ORDER BY created_at DESC LIMIT 5');
  res.json(rows);
});

module.exports = router;

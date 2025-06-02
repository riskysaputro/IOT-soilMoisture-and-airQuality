const express = require('express');
const router = express.Router();
const db = require('../db');

// GET status kontrol aktuator (ESP32 ambil data)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM device_status WHERE id = 1');
  res.json(rows[0]);
});

// POST untuk update kontrol (mode, pompa, fan)
router.post('/', async (req, res) => {
  const { mode, pump, fan } = req.body;
  try {
    await db.query('UPDATE device_status SET mode = ?, pump_status = ?, fan_status = ? WHERE id = 1', [mode, pump, fan]);
    res.json({ message: 'Control updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;

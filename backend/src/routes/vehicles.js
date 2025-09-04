// routes/vehicles.js
const express = require('express');
const router = express.Router();
const { Vehicle } = require('../models'); // Sequelize model

// GET /api/vehicles?typeId=1
router.get('/', async (req, res) => {
  try {
    const { typeId } = req.query;
    if (!typeId) return res.status(400).json({ error: 'typeId required' });

    const vehicles = await Vehicle.findAll({ where: { vehicleTypeId: Number(typeId) } });
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

module.exports = router;

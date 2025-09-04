const express = require('express');
const router = express.Router();
const { VehicleType } = require('../models'); 
router.get('/', async (req, res) => {
  try {
    const { wheels } = req.query;
    const where = wheels ? { wheels: Number(wheels) } : {};
    const types = await VehicleType.findAll({ where });
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

module.exports = router;

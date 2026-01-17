const express = require('express');
const router = express.Router();
const Role = require('../models/Role.model');

// GET /api/roles - Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find().sort({ roleId: 1 });
    res.json({
      success: true,
      data: roles,
      count: roles.length
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch roles',
      message: error.message
    });
  }
});

module.exports = router;


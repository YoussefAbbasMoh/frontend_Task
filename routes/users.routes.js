const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Role = require('../models/Role.model');

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

// POST /api/users - Add a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, roleId } = req.body;

    // Validation
    if (!name || !email || !roleId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and roleId are required'
      });
    }

    // Check if role exists
    const role = await Role.findOne({ roleId });
    if (!role) {
      return res.status(400).json({
        success: false,
        error: `Role with roleId ${roleId} does not exist`
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      roleId
    });

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create user',
      message: error.message
    });
  }
});

module.exports = router;


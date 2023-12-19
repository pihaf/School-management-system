const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const Admin = require('../models/Admin');

// Create a new admin
router.post('/api/admin/register', authenticateToken, async (req, res) => {
    // Allow access only to admins
  if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
  }
  const { name, email, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const admin = await Admin.create({
      name,
      email,
      username,
      password: hashedPassword
    });

    // Generate JWT token for the admin
    const newToken = admin.generateAuthToken();

    res.status(201).json({ admin, token: newToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Admin login
router.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin by username
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = admin.generateAuthToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get admin profile
router.get('/api/admin/profile', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.verifyAuthToken(req.token);
    res.json(admin);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Update admin profile
router.put('/api/admin/profile', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.verifyAuthToken(req.token);

    // Update the admin information
    admin.name = req.body.name;
    admin.email = req.body.email;
    admin.username = req.body.username;

    await admin.save();

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
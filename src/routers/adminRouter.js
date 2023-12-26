const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const Admin = require('../models/Admin');

const adminController = require('../controllers/adminController');

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
    // const passwordMatch = await bcrypt.compare(password, admin.password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ error: 'Invalid username or password' });
    // }
    if (password !== admin.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = admin.generateAuthToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout
router.post('/api/admin/logout', authenticateToken, (req, res) => {
  try {
    // may need additional logic
    
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new admin
router.post('/api/admin/register', authenticateToken, adminController.createAdmin);

// Get admin profile
router.get('/api/admin/profile', authenticateToken, adminController.getAdminProfile);

// Update admin profile
router.put('/api/admin/profile', authenticateToken, adminController.updateAdminProfile);

module.exports = router;
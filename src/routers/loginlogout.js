const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/auth');
const Student = require('../models/Student');
const Lecturer = require('../models/Lecturer');
const { check, validationResult } = require('express-validator');

// Login
router.post('/api/login', [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
  ], async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await Student.findOne({ where: { username } });
      if (!user) {
        user = await Lecturer.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = user.generateAuthToken();
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
   
// Logout
router.post('/api/logout', authenticateToken, (req, res) => {
    try {
      res.json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
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
        //Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        console.log(req.body);
        const {username, password} = req.body;
    
        if (!username) {
          return res.status(400).json({ error: 'Username is required' });
        }

        // Find the user by username
        let user = await Student.findOne({ where: { username } });
        let model = 'student'; // Set the default model to 'student'
        let id = null;

        if (!user) {
          user = await Lecturer.findOne({ where: { username } });
          model = 'lecturer'; // Set the model to 'lecturer' if user is not found as a student
          id = user.lecturer_id;
        }

        if (!user) {
          return res.status(401).json({ error: 'Invalid username' });
        }
        
        id = user.student_id || user.lecturer_id;

        if (password !== user.password) {
          return res.status(401).json({ error: 'Invalid password' });
        }
        // Compare the password
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //   return res.status(401).json({ error: 'Invalid username or password' });
        // }
    
        // Generate JWT token
        const token = user.generateAuthToken();
    
        res.json({ token, model, id });
    } catch (error) {
        console.error(error);
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
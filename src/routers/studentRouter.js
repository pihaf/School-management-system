const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const Student = require('../models/Student');
const { check, validationResult } = require('express-validator');

// Register
router.post('/api/students/register', [
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

    // Check if student with the same username already exists
    const existingStudent = await Student.findOne({ where: { username } });
    if (existingStudent) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const student = await Student.create({ username, password: hashedPassword });

    // Generate JWT token
    const token = student.generateAuthToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/api/students/login', [
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

    // Find the student by username
    const student = await Student.findOne({ where: { username } });
    if (!student) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = student.generateAuthToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
 
// Logout
router.post('/api/students/logout', authenticateToken, (req, res) => {
  try {
    // may need additional logic
    
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get student profile
router.get('/api/students/profile', authenticateToken, async (req, res) => {
  try {
    if (req.model !== 'student') {
       return res.status(403).json({ error: 'Forbidden' });
    }

    const student = req.user;
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update student profile
router.put('/api/students/profile', authenticateToken, async (req, res) => {
  try {
    if (req.model !== 'student') {
      return res.status(403).json({ error: 'Forbidden' });
   }

    const student = req.user;

    // Update the student information
    student.class = req.body.class || student.class;
    student.name = req.body.name || student.name;
    student.date_of_birth = req.body.date_of_birth || student.date_of_birth;
    student.gender = req.body.gender || student.gender;
    student.place_of_birth = req.body.place_of_birth || student.place_of_birth;
    student.citizen_id = req.body.citizen_id || student.citizen_id;
    student.email = req.body.email || student.email;
    student.phone_number = req.body.phone_number || student.phone_number;
    student.profile_image = req.body.profile_image || student.profile_image;

    await student.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update student password
router.put('/api/students/password', authenticateToken, async (req, res) => {
  try {
    if (req.model !== 'student') {
      return res.status(403).json({ error: 'Forbidden' });
   }

    const student = req.user;

    const { currentPassword, newPassword } = req.body;

    // Check if the current password matches
    const passwordMatch = await bcrypt.compare(currentPassword, student.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: 'New password must be different from the current password' });
    }

    // Update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
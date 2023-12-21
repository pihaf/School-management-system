const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const Student = require('../models/Student');
const { check, validationResult } = require('express-validator');

const studentController = require('../controllers/studentController');

// Register
// router.post('/api/students/register', [
//   check('username').notEmpty().withMessage('Username is required'),
//   check('password').notEmpty().withMessage('Password is required'),
// ], async (req, res) => {
//   try {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     // Check if student with the same username already exists
//     const existingStudent = await Student.findOne({ where: { username } });
//     if (existingStudent) {
//       return res.status(400).json({ error: 'Username is already taken' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new student
//     const student = await Student.create({ username, password: hashedPassword });

//     // Generate JWT token
//     const token = student.generateAuthToken();

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

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
router.get('/api/students/profile', authenticateToken, studentController.getStudentProfile);

// Update student profile
router.put('/api/students/profile', authenticateToken, studentController.updateStudentProfile);

// Update student password
router.put('/api/students/password', authenticateToken, studentController.updateStudentPassword);

// For admins
// Get all students
router.get('/api/admin/students', authenticateToken, studentController.getAllStudents);

// Get a specific student
router.get('/api/admin/students/:id', authenticateToken, studentController.getStudentById);

// Create a new student
router.post('/api/admin/students', authenticateToken, studentController.createStudent);

// Update a student
router.put('/api/admin/students/:id', authenticateToken, studentController.updateStudent);

// Update password
router.put('/api/admin/students/:id/update-password', authenticateToken, studentController.updateStudentPasswordAdmin);

// Delete a student
router.delete('/api/admin/students/:id', authenticateToken, studentController.deleteStudent);

module.exports = router;
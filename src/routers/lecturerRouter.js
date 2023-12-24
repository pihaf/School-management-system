const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const Lecturer = require('../models/Lecturer');
const { check, validationResult } = require('express-validator');

const lecturerController = require('../controllers/lecturerController');

// Register
// router.post('/api/lecturers/register', [
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

//     // Check if Lecturer with the same username already exists
//     const existingLecturer = await Lecturer.findOne({ where: { username } });
//     if (existingLecturer) {
//       return res.status(400).json({ error: 'Username is already taken' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new Lecturer
//     const lecturer = await Lecturer.create({ username, password: hashedPassword });

//     // Generate JWT token
//     const token = lecturer.generateAuthToken();

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Login
// router.post('/api/lecturers/login', [
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

//     // Find the Lecturer by username
//     const lecturer = await Lecturer.findOne({ where: { username } });
//     if (!lecturer) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Compare the password
//     const isMatch = await bcrypt.compare(password, lecturer.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Generate JWT token
//     const token = lecturer.generateAuthToken();

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });
 
// // Logout
// router.post('/api/lecturers/logout', authenticateToken, (req, res) => {
//   try {
//     // may need additional logic
    
//     res.json({ message: 'Logout successful' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Get Lecturer profile
router.get('/api/lecturers/profile', authenticateToken, lecturerController.getLecturerProfile);

// Update Lecturer profile
router.put('/api/lecturers/profile', authenticateToken, lecturerController.updateLecturerProfile);

// Update Lecturer password
router.put('/api/lecturers/password', authenticateToken, lecturerController.updateLecturerPassword);


// For admins

// Get all lecturers
router.get('/api/admin/lecturers', authenticateToken, lecturerController.getAllLecturers);

// Get a specific lecturer
router.get('/api/admin/lecturers/:id', authenticateToken, lecturerController.getLecturerById);

// Create a new lecturer
router.post('/api/admin/lecturers', authenticateToken, lecturerController.createLecturer);

// Update a lecturer
router.put('/api/admin/lecturers/:id', authenticateToken, lecturerController.updateLecturer);

// Update password
router.put('/api/admin/lecturers/:id/update-password', authenticateToken, lecturerController.updateLecturerPasswordAdmin);

// Delete a lecturer
router.delete('/api/admin/lecturers/:id', authenticateToken, lecturerController.deleteLecturer);

module.exports = router;
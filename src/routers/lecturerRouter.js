const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const Lecturer = require('../models/Lecturer');
const { check, validationResult } = require('express-validator');

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
router.post('/api/lecturers/login', [
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

    // Find the Lecturer by username
    const lecturer = await Lecturer.findOne({ where: { username } });
    if (!lecturer) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, lecturer.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = lecturer.generateAuthToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
 
// Logout
router.post('/api/lecturers/logout', authenticateToken, (req, res) => {
  try {
    // may need additional logic
    
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Lecturer profile
router.get('/api/lecturers/profile', authenticateToken, async (req, res) => {
  try {
    if (req.model !== 'lecturer') {
       return res.status(403).json({ error: 'Forbidden' });
    }

    const lecturer = req.user;
    res.json(lecturer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Lecturer profile
router.put('/api/lecturers/profile', authenticateToken, async (req, res) => {
  try {
    if (req.model !== 'lecturer') {
      return res.status(403).json({ error: 'Forbidden' });
   }

    const lecturer = req.user;

    // Update the Lecturer information
    lecturer.name = req.body.name || lecturer.name;
    lecturer.email = req.body.email || lecturer.email;
    lecturer.department = req.body.department || lecturer.department;
    lecturer.subject_lab = req.body.subject_lab || lecturer.subject_lab;
    lecturer.job_title = req.body.job_title || lecturer.job_title;
    lecturer.phone_number = req.body.phone_number || lecturer.phone_number;
    lecturer.profile_image = req.body.profile_image || lecturer.profile_image;

    await lecturer.save();

    res.json(lecturer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Lecturer password
router.put('/api/lecturers/password', authenticateToken, async (req, res) => {
  try {
    if (req.model !== 'lecturer') {
      return res.status(403).json({ error: 'Forbidden' });
   }

    const lecturer = req.user;

    const { currentPassword, newPassword } = req.body;
    
    // Check if the current password matches
    const passwordMatch = await bcrypt.compare(currentPassword, lecturer.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: 'New password must be different from the current password' });
    }

    // Update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    lecturer.password = hashedPassword;
    await lecturer.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// For admins

// Get all lecturers
router.get('/api/admin/lecturers', authenticateToken, async (req, res) => {
  try {
    // Allow access only to admins
    if (req.model !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
    }
    const lecturers = await Lecturer.findAll();
    res.json(lecturers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific lecturer
router.get('/api/admin/lecturers/:id', authenticateToken, async (req, res) => {
  try {
      // Allow access only to admins
      if (req.model !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
      }
      const { id } = req.params;
      const lecturer = await lecturer.findByPk(id);

      if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer not found' });
      }

      res.json(lecturer);
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

// Create a new lecturer
router.post('/api/admin/lecturers', authenticateToken, async (req, res) => {
  // Allow access only to admins
  if (req.model !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { name, email, department, subject_lab, job_title, phone_number, profile_image, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingLecturer = await Lecturer.findOne({ where: { username } });
    if (existingLecturer) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the lecturer
    const lecturer = await Lecturer.create({
      name,
      email,
      department,
      subject_lab,
      job_title,
      phone_number,
      profile_image,
      username,
      password: hashedPassword
    });

    // Generate JWT token for the lecturer
    const token = lecturer.generateAuthToken();

    res.status(201).json({ lecturer, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lecturer' });
  }
});


// Update a lecturer
router.put('/api/admin/lecturers/:id', authenticateToken, async (req, res) => {
  try {
      // Allow access only to admins
      if (req.model !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
      }
      const { id } = req.params;
      const lecturer = await Lecturer.findByPk(id);

      if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer not found' });
      }

      // Update the lecturer information
      lecturer.name = req.body.name || lecturer.name;
      lecturer.email = req.body.email || lecturer.email;
      lecturer.department = req.body.department || lecturer.department;
      lecturer.subject_lab = req.body.subject_lab || lecturer.subject_lab;
      lecturer.job_title = req.body.job_title || lecturer.job_title;
      lecturer.phone_number = req.body.phone_number || lecturer.phone_number;
      lecturer.profile_image = req.body.profile_image || lecturer.profile_image; 

      await lecturer.save();

      res.json(lecturer);
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

// Update password
router.put('/api/admin/lecturers/:id/update-password', authenticateToken, async (req, res) => {
  try {
      // Allow access only to admins
      if (req.model !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
      }
      const { id } = req.params;
      const lecturer = await Lecturer.findByPk(id);

      if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer not found' });
      }

      const { currentPassword, newPassword } = req.body;

      // Validate the current password
      const passwordMatch = await bcrypt.compare(currentPassword, lecturer.password);
      if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid current password' });
      }

      if (currentPassword === newPassword) {
          return res.status(400).json({ error: 'New password must be different from the current password' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      lecturer.password = hashedPassword;
      await lecturer.save();

      res.json({ message: 'Password updated successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

// Delete a lecturer
router.delete('/api/admin/lecturers/:id', authenticateToken, async (req, res) => {
  try {
      // Allow access only to admins
      if (req.model !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
      }
      const { id } = req.params;
      const lecturer = await Lecturer.findByPk(id);

      if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer not found' });
      }
      
      await lecturer.destroy();

      res.json({ message: 'Lecturer deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Lecturer = require('../models/Lecturer');

// Register a new admin
router.post('/api/admins/register', async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Check if the username is already taken
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const admin = await Admin.create({
      name,
      email,
      username,
      password: hashedPassword
    });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin login
router.post('/api/admins/login', async (req, res) => {
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
router.get('/api/admins/profile', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.verifyAuthToken(req.token);
    res.json(admin);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Update admin profile
router.put('/api/admins/profile', authenticateToken, async (req, res) => {
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

//
// System management
//


//Students

// Get all students
router.get('/api/admins/students', authenticateToken, async (req, res) => {
    try {
      // Allow access only to admins
      if (req.model !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
      }
      const students = await Student.findAll();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get a specific student
router.get('/api/admins/students/:id', authenticateToken, async (req, res) => {
    try {
        // Allow access only to admins
        if (req.model !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const { id } = req.params;
        const student = await Student.findByPk(id);

        if (!student) {
        return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
  });

// Update a student
router.put('/api/admins/students/:id', authenticateToken, async (req, res) => {
    try {
        // Allow access only to admins
        if (req.model !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const { id } = req.params;
        const student = await Student.findByPk(id);

        if (!student) {
        return res.status(404).json({ error: 'Student not found' });
        }

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

// Update password
router.put('/api/admins/students/:id/update-password', authenticateToken, async (req, res) => {
    try {
        // Allow access only to admins
        if (req.model !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const { id } = req.params;
        const student = await Student.findByPk(id);

        if (!student) {
        return res.status(404).json({ error: 'Student not found' });
        }

        const { currentPassword, newPassword } = req.body;

        // Validate the current password
        const passwordMatch = await bcrypt.compare(currentPassword, student.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ error: 'New password must be different from the current password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.password = hashedPassword;
        await student.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a student
router.delete('/api/admins/students/:id', authenticateToken, async (req, res) => {
    try {
        // Allow access only to admins
        if (req.model !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const { id } = req.params;
        const student = await Student.findByPk(id);

        if (!student) {
        return res.status(404).json({ error: 'Student not found' });
        }
        
        await student.destroy();

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

//Lecturers

// Get all lecturers
router.get('/api/admins/lecturers', authenticateToken, async (req, res) => {
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
router.get('/api/admins/lecturers/:id', authenticateToken, async (req, res) => {
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

// Update a lecturer
router.put('/api/admins/lecturers/:id', authenticateToken, async (req, res) => {
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
router.put('/api/admins/lecturers/:id/update-password', authenticateToken, async (req, res) => {
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
router.delete('/api/admins/lecturers/:id', authenticateToken, async (req, res) => {
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
const Lecturer = require('../models/Lecturer');

// Get Lecturer profile
exports.getLecturerProfile = async (req, res) => {
    try {
      if (req.model !== 'lecturer') {
         return res.status(403).json({ error: 'Forbidden' });
      }
  
      const lecturer = req.user;
      res.json(lecturer);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Update Lecturer profile
exports.updateLecturerProfile = async (req, res) => {
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
  };
  
  // Update Lecturer password
exports.updateLecturerPassword = async (req, res) => {
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
  };
  
  
  // For admins
  
  // Get all lecturers
exports.getAllLecturers = async (req, res) => {
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
  };
  
  // Get a specific lecturer
exports.getLecturerById = async (req, res) => {
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
  };
  
  // Create a new lecturer
exports.createLecturer = async (req, res) => {
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
  };
  
  
  // Update a lecturer
exports.updateLecturer = async (req, res) => {
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
  };
  
  // Update password
exports.updateLecturerPasswordAdmin = async (req, res) => {
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
  };
  
  // Delete a lecturer
exports.deleteLecturer = async (req, res) => {
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
  };
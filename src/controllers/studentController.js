const Student = require('../models/Student');

// Get student profile
exports.getStudentProfile = async (req, res) => {
    try {
      if (req.model !== 'student') {
         return res.status(403).json({ error: 'Forbidden' });
      }
  
      const student = req.user;
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Update student profile
exports.updateStudentProfile = async (req, res) => {
    try {
      if (req.model !== 'student') {
        return res.status(403).json({ error: 'Forbidden' });
     }
  
      const student = req.user;
  
      // Update the student information
      student.student_class = req.body.student_class || student.student_class;
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
  };
  
  // Update student password
exports.updateStudentPassword = async (req, res) => {
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
  };
  
  // For admins
  // Get all students
exports.getAllStudents = async (req, res) => {
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
  };
  
  // Get a specific student
exports.getStudentById = async (req, res) => {
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
  };
  
  // Create a new student
exports.createStudent = async (req, res) => {
    // Allow access only to admins
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { student_id, student_class, name, date_of_birth, gender, place_of_birth, citizen_id, email, phone_number, profile_image, username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingStudent = await Student.findOne({ where: { username } });
      if (existingStudent) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the student
      const student = await Student.create({
        student_id,
        student_class,
        name,
        date_of_birth,
        gender,
        place_of_birth,
        citizen_id,
        email,
        phone_number,
        profile_image,
        username,
        password: hashedPassword
      });
  
      // Generate JWT token for the student
      const token = student.generateAuthToken();
  
      res.status(201).json({ student, token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create student' });
    }
  };
  
  // Update a student
exports.updateStudent = async (req, res) => {
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
        student.student_class = req.body.student_class || student.student_class;
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
  };
  
  // Update password
exports.updateStudentPasswordAdmin = async (req, res) => {
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
  };
  
  // Delete a student
exports.deleteStudent = async (req, res) => {
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
  };
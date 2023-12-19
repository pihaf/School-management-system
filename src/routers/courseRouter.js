const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const Course = require('../models/Course');
const StudentCourse = require('../models/StudentCourse');
const Student = require('../models/Student');

// Get all courses
router.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific course by ID
router.get('/api/courses/:id', async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findByPk(courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new course
router.post('/api/admin/courses', authenticateToken, async (req, res) => {
    // Allow access only to admins
    if (req.model !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    const { course_class_code, course_code, course_name, credits, number_of_students, time, day, periods, location, group, semester } = req.body;
    try {
        const course = await Course.create({
        course_class_code,
        course_code,
        course_name,
        credits,
        number_of_students,
        time,
        day,
        periods,
        location,
        group,
        semester
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create course' });
    }
});

// Update a course by ID
router.put('/api/admin/courses/:id', authenticateToken, async (req, res) => {
    // Allow access only to admins
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const courseId = req.params.id;
    const { course_class_code, course_code, course_name, credits, number_of_students, time, day, periods, location, group, semester } = req.body;
    try {
      const course = await Course.findByPk(courseId);
      if (course) {
        course.course_class_code = course_class_code || course.course_class_code;
        course.course_code = course_code || course.course_code;
        course.course_name = course_name || course.course_name;
        course.credits = credits || course.credits;
        course.number_of_students = number_of_students || course.number_of_students;
        course.time = time || course.time;
        course.day = day || course.day;
        course.periods = periods || course.periods;
        course.location = location || course.location;
        course.group = group || course.group;
        course.semester = semester || course.semester;
        await course.save();
        res.json(course);
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update course' });
    }
  });
  
  // Delete a course by ID
  router.delete('/api/admin/courses/:id', authenticateToken, async (req, res) => {
    // Allow access only to admins
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const courseId = req.params.id;
    try {
      const course = await Course.findByPk(courseId);
      if (course) {
        await course.destroy();
        res.json({ message: 'Course deleted successfully' });
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete course' });
    }
  });

// Enroll a student in a course
router.post('/api/course/:id/enroll', async (req, res) => {
    if (req.model !== 'admin' || req.model !== 'lecturer') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    const courseId = req.params.id;
    const { student_id, notes } = req.body;
    try {
        const studentCourse = await StudentCourse.create({
        student_id,
        course_id: courseId,
        notes
        });
        res.status(201).json(studentCourse);
    } catch (error) {
        res.status(500).json({ error: 'Failed to enroll student in course' });
    }
});

// Get all enrolled students in a course
router.get('/api/course/:id/students', async (req, res) => {
    const courseId = req.params.id;
    try {
      const enrolledStudents = await StudentCourse.findAll({
        where: { course_id: courseId },
        include: Student // Include the Student model in the query
      });
  
      // Extract relevant student information
      const students = enrolledStudents.map(enrolledStudent => {
        const { student_id, student_class, name, date_of_birth, email} = enrolledStudent.Student;
        return {
          student_id,
          student_class,
          name,
          date_of_birth,
          email
        };
      });
  
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve enrolled students' });
    }
  });

module.exports = router;
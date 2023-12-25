const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');

const courseController = require('../controllers/courseController');

// Get all courses
router.get('/api/courses', authenticateToken, courseController.getAllCourses);

// Get a specific course by ID
router.get('/api/courses/:id', authenticateToken, courseController.getCourseById);

// Get all courses a student is enrolled in
router.get('/api/courses/students/:studentId', authenticateToken, courseController.getAllCoursesEnrolledByStudent);

// Enroll a student in a course
router.post('/api/courses/:id/enroll', authenticateToken, courseController.enrollStudentInCourse);

// Get all enrolled students in a course
router.get('/api/courses/:id/students', authenticateToken, courseController.getAllStudentsInCourse);

// Route to get all courses taught by a lecturer
router.get('/api/courses/lecturers/:lecturerId', authenticateToken, courseController.getAllCoursesByLecturer);

// For admins

// Create a new course
router.post('/api/admin/courses', authenticateToken, courseController.createCourse);

// Update a course by ID
router.put('/api/admin/courses/:id', authenticateToken, courseController.updateCourse);
  
// Delete a course by ID
router.delete('/api/admin/courses/:id', authenticateToken, courseController.deleteCourse);

module.exports = router;
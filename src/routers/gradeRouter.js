const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const gradeController = require('../controllers/gradeController');
  
// Get a specific grade
router.get('/api/grades/:gradeId', authenticateToken, gradeController.getGradeById);

// Get all grades of a student
router.get('/api/grades/students/:studentId', authenticateToken, gradeController.getAllGradesOfStudent);
  
// Get all grades of a course
router.get('/api/grades/courses/:courseId', authenticateToken, gradeController.getAllGradesOfCourse);

// Create a new grade
router.post('/api/grades', authenticateToken, gradeController.createGrade);
  
  // Update a grade
router.put('/api/grades/:gradeId', authenticateToken, gradeController.updateGrade);
  
  // Delete a grade
router.delete('/api/grades/:gradeId', authenticateToken, gradeController.deleteGrade);
  
// For admins

// Get all grades
router.get('/api/admin/grades', authenticateToken, gradeController.getAllGrades);

// Create a new grade
router.post('/api/admin/grades', authenticateToken, gradeController.createGradeAdmin);
  
// Update a grade
router.put('/api/admin/grades/:gradeId', authenticateToken, gradeController.updateGradeAdmin);
  
// Delete a grade
router.delete('/api/admin/grades/:gradeId', authenticateToken, gradeController.deleteGradeAdmin);

module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Admin = require('../models/Admin');
const Grade = require('../models/Grade');
const Student = require('../models/Student');
const Course = require('../models/Course');
const LecturerCourse = require('../models/LecturerCourse');
  
// Get a specific grade
router.get('/api/grades/:gradeId', authenticateToken, async (req, res) => {
    const { gradeId } = req.params;
  
    try {
      const grade = await Grade.findByPk(gradeId, {
        include: [
            {
              model: Course,
              attributes: ['course_id', 'course_class_code', 'course_name'],
            },
            {
              model: Student,
              attributes: ['student_id', 'name', 'email'],
            }
          ],
      });
  
      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }
  
      res.json(grade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch grade' });
    }
});

// Get all grades of a student
router.get('/api/grades/students/:studentId', authenticateToken, async (req, res) => {
    const { studentId } = req.params;
    if ((req.model === 'student' && studentId !== req.user.id) || req.model === 'lecturer') {
        return res.status(403).json({ error: 'Not authorized' });
      }

    try {
      const grades = await Grade.findAll({
        where: { student_id: studentId },
        include: [
            {
              model: Course,
              attributes: ['course_id', 'course_class_code', 'course_name'],
            },
            {
              model: Student,
              attributes: ['student_id', 'name', 'email'],
            }
          ],
      });
  
      res.json(grades);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch grades' });
    }
  });
  
// Get all grades of a course
router.get('/api/grades/courses/:courseId', authenticateToken, async (req, res) => {
    const { courseId } = req.params;

    try {
        if (req.model === 'lecturer') {
          const lecturerId = req.user.id;
          const lecturerCourse = await LecturerCourse.findOne({
            where: {
              lecturer_id: lecturerId,
              course_id: courseId,
            },
          });
          if (!lecturerCourse) {
            return res.status(403).json({ error: 'Not authorized' });
          }
    
        } else if (req.model === 'student') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const grades = await Grade.findAll({
        where: { course_id: courseId },
        include: [
            {
              model: Course,
              attributes: ['course_id', 'course_class_code', 'course_name'],
            },
            {
              model: Student,
              attributes: ['student_id', 'name', 'email'],
            }
          ],
        });

        res.json(grades);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch grades' });
    }
});

// Create a new grade
router.post('/api/grades', authenticateToken, async (req, res) => {
    if (req.model === 'student') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { studentId, courseId, componentScore, midtermScore, finaltermScore, overallScore } = req.body;
  
    try {
      const lecturerCourse = await LecturerCourse.findOne({
            where: { lecturer_id: req.user.id, course_id: courseId },
        });
    
        if (!lecturerCourse) {
            return res.status(403).json({ error: 'Forbidden' });
        }
      const grade = await Grade.create({
        student_id: studentId,
        course_id: courseId,
        component_score: componentScore,
        midterm_score: midtermScore,
        finalterm_score: finaltermScore,
        overall_score: overallScore,
      });
  
      res.json(grade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create grade' });
    }
  });
  
  // Update a grade
  router.put('/api/grades/:gradeId', authenticateToken, async (req, res) => {
    if (req.model === 'student') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { gradeId } = req.params;
    const { studentId, courseId, componentScore, midtermScore, finaltermScore, overallScore } = req.body;
  
    try {
        const lecturerCourse = await LecturerCourse.findOne({
            where: { lecturer_id: req.user.id, course_id: courseId },
        });

        if (!lecturerCourse) {
            return res.status(403).json({ error: 'Forbidden' });
        }
      const grade = await Grade.findByPk(gradeId);
  
      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }
  
      grade.student_id = studentId;
      grade.course_id = courseId;
      grade.component_score = componentScore;
      grade.midterm_score = midtermScore;
      grade.finalterm_score = finaltermScore;
      grade.overall_score = overallScore;
  
      await grade.save();
  
      res.json(grade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update grade' });
    }
  });
  
  // Delete a grade
  router.delete('/api/grades/:gradeId', authenticateToken, async (req, res) => {
    if (req.model === 'student') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { gradeId } = req.params;
  
    try {
      const lecturerCourse = await LecturerCourse.findOne({
            where: { lecturer_id: req.user.id, course_id: courseId },
      });

      if (!lecturerCourse) {
            return res.status(403).json({ error: 'Forbidden' });
      }
      const grade = await Grade.findByPk(gradeId);
  
      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }
  
      await grade.destroy();
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete grade' });
    }
  });
  
// For admins

// Get all grades
router.get('/api/admin/grades', authenticateToken, async (req, res) => {
    if (req.model !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
    try {
        const grades = await Grade.findAll({
        include: [
            {
                model: Course,
                attributes: ['course_id', 'course_class_code', 'course_name'],
            },
            {
                model: Student,
                attributes: ['student_id', 'name', 'email'],
            }
            ],
        });

        res.json(grades);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch grades' });
    }
});

// Create a new grade
router.post('/api/admin/grades', authenticateToken, async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { studentId, courseId, componentScore, midtermScore, finaltermScore, overallScore } = req.body;
  
    try {
      const grade = await Grade.create({
        student_id: studentId,
        course_id: courseId,
        component_score: componentScore,
        midterm_score: midtermScore,
        finalterm_score: finaltermScore,
        overall_score: overallScore,
      });
  
      res.json(grade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create grade' });
    }
});
  
// Update a grade
router.put('/api/admin/grades/:gradeId', authenticateToken, async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { gradeId } = req.params;
    const { studentId, courseId, componentScore, midtermScore, finaltermScore, overallScore } = req.body;
  
    try {
      const grade = await Grade.findByPk(gradeId);
  
      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }
  
      grade.student_id = studentId;
      grade.course_id = courseId;
      grade.component_score = componentScore;
      grade.midterm_score = midtermScore;
      grade.finalterm_score = finaltermScore;
      grade.overall_score = overallScore;
  
      await grade.save();
  
      res.json(grade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update grade' });
    }
  });
  
// Delete a grade
router.delete('/api/admin/grades/:gradeId', authenticateToken, async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { gradeId } = req.params;
  
    try {
      const grade = await Grade.findByPk(gradeId);
  
      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }
  
      await grade.destroy();
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete grade' });
    }
  });

module.exports = router;
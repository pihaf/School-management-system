const Admin = require('../models/Admin');
const Grade = require('../models/Grade');
const Student = require('../models/Student');
const Course = require('../models/Course');
const LecturerCourse = require('../models/LecturerCourse');

// Get a specific grade
exports.getGradeById = async (req, res) => {
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
};

// Get all grades of a student
exports.getAllGradesOfStudent = async (req, res) => {
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
  };
  
// Get all grades of a course
exports.getAllGradesOfCourse = async (req, res) => {
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
};

// Create a new grade
exports.createGrade = async (req, res) => {
    if (req.model === 'student') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { student_id, course_id, component_score, midterm_score, finalterm_score, overall_score } = req.body;
  
    try {
      const lecturerCourse = await LecturerCourse.findOne({
            where: { lecturer_id: req.user.lecture_id, course_id: course_id },
        });
    
        if (!lecturerCourse) {
            return res.status(403).json({ error: 'Forbidden' });
        }
      const grade = await Grade.create({
        student_id: student_id,
        course_id: course_id,
        component_score: component_score,
        midterm_score: midterm_score,
        finalterm_score: finalterm_score,
        overall_score: overall_score,
      });
  
      const populatedGrade = await grade.reload({
        include: [
          {
            model: Course,
            attributes: ['course_id', 'course_class_code', 'course_name'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
        ],
      });
      
      res.json(populatedGrade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create grade' });
    }
  };
  
  // Update a grade
exports.updateGrade = async (req, res) => {
    if (req.model === 'student') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { gradeId } = req.params;
    const { student_id, course_id, component_score, midterm_score, finalterm_score, overall_score } = req.body;
  
    try {
        const lecturerCourse = await LecturerCourse.findOne({
            where: { lecturer_id: req.user.lecturer_id, course_id: course_id },
        });

        if (!lecturerCourse) {
            return res.status(403).json({ error: 'Forbidden' });
        }
      const grade = await Grade.findByPk(gradeId);
  
      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }
  
      grade.student_id = student_id;
      grade.course_id = course_id;
      grade.component_score = component_score;
      grade.midterm_score = midterm_score;
      grade.finalterm_score = finalterm_score;
      grade.overall_score = overall_score;
  
      await grade.save();
  
      const populatedGrade = await grade.reload({
        include: [
          {
            model: Course,
            attributes: ['course_id', 'course_class_code', 'course_name'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
        ],
      });
      
      res.json(populatedGrade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update grade' });
    }
  };
  
  // Delete a grade
exports.deleteGrade = async (req, res) => {
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
  };
  
// For admins

// Get all grades
exports.getAllGrades = async (req, res) => {
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
};

// Create a new grade
exports.createGradeAdmin = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { student_id, course_id, component_score, midterm_score, finalterm_score, overall_score} = req.body;
  
    try {
      const grade = await Grade.create({
        student_id: student_id,
        course_id: course_id,
        component_score: component_score,
        midterm_score: midterm_score,
        finalterm_score: finalterm_score,
        overall_score: overall_score,
      });
      
      const populatedGrade = await grade.reload({
        include: [
          {
            model: Course,
            attributes: ['course_id', 'course_class_code', 'course_name'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
        ],
      });
      
      res.json(populatedGrade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create grade' });
    }
};
  
// Update a grade
exports.updateGradeAdmin = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { gradeId } = req.params;
    const { student_id, course_id, component_score, midterm_score, finalterm_score, overall_score } = req.body;
  
    try {
      const grade = await Grade.findByPk(gradeId);
  
      if (!grade) {
        return res.status(404).json({ error: 'Grade not found' });
      }
  
      grade.student_id = student_id;
      grade.course_id = course_id;
      grade.component_score = component_score;
      grade.midterm_score = midterm_score;
      grade.finalterm_score = finalterm_score;
      grade.overall_score = overall_score;
  
      await grade.save();
  
      const populatedGrade = await grade.reload({
        include: [
          {
            model: Course,
            attributes: ['course_id', 'course_class_code', 'course_name'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
        ],
      });
      
      res.json(populatedGrade);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update grade' });
    }
  };
  
// Delete a grade
exports.deleteGradeAdmin = async (req, res) => {
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
  };
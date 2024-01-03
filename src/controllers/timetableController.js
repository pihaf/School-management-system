const Course = require('../models/Course');
const StudentCourse = require('../models/StudentCourse');
const LecturerCourse = require('../models/LecturerCourse');
const Student = require('../models/Student');

// get timetable of a student
exports.getTimetableStudent = async (req, res) => {
    if (req.model !== 'student') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const studentId = req.params.studentId;
    console.log("StudentId: ");
    console.log(studentId);
  
    try {
      const enrolledCourses = await StudentCourse.findAll({
        where: { student_id: studentId },
        include: Course 
      });
      //console.log("enrolled courses:", enrolledCourses);
        // Extract the course IDs from the enrolled courses
        const courseClassCodes = enrolledCourses.map(enrolledCourse => enrolledCourse.Course.course_class_code);
        //console.log("course class codes: ", courseClassCodes);
        // Find all the courses with the extracted course IDs
        const courses = await Course.findAll({
            where: { course_class_code: courseClassCodes },
            attributes: ['course_id', 'course_class_code', 'course_name', 'day', 'time', 'periods']
        });
        //console.log("courses:", courses);
      res.json(courses);
    } catch (error) {
      console.error('Error retrieving enrolled courses:', error);
      res.status(500).json({ error: 'Failed to retrieve enrolled courses' });
    }
  };

// get timetable of a lecturer
exports.getTimetableLecturer = async (req, res) => {
    if (req.model !== 'admin' && req.model !== 'lecturer') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    const { lecturerId } = req.params;
  
    try {
      const lecturerCourses = await LecturerCourse.findAll({
        where: { lecturer_id: lecturerId },
        include: Course 
      });
  
        const courseClassCodes = lecturerCourses.map(enrolledCourse => enrolledCourse.Course.course_class_code);

        const courses = await Course.findAll({
            where: { course_class_code: courseClassCodes }
        });
    
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve courses' });
    }
  };
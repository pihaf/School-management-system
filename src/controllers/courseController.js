const Course = require('../models/Course');
const StudentCourse = require('../models/StudentCourse');
const LecturerCourse = require('../models/LecturerCourse');
const Student = require('../models/Student');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Course.findAll();
      //console.log(courses);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// Get a specific course by ID
exports.getCourseById = async (req, res) => {
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
  };
  
// Get all courses enrolled by a student
exports.getAllCoursesEnrolledByStudent = async (req, res) => {
  if (req.model !== 'student') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const studentId = req.params.studentId;
  console.log("StudentId: ");
  console.log(studentId);

  try {
    const enrolledCourses = await StudentCourse.findAll({
      where: { student_id: studentId },
      include: Course // Include the Course model to get course details
    });
    console.log("EnrolledCourses: ");
    console.log(enrolledCourses);
    // Extract the course details from the enrolledCourses
    const courses = enrolledCourses.map(enrolledCourse => enrolledCourse.Course);

    res.json(courses);
  } catch (error) {
    console.error('Error retrieving enrolled courses:', error);
    res.status(500).json({ error: 'Failed to retrieve enrolled courses' });
  }
};

  // Enroll a student in a course
exports.enrollStudentInCourse = async (req, res) => {
    if (req.model !== 'admin' && req.model !== 'lecturer') {
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
  };
  
  // Get all enrolled students in a course
exports.getAllStudentsInCourse = async (req, res) => {
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
  };
  
// Route to get all courses taught by a lecturer
exports.getAllCoursesByLecturer = async (req, res) => {
    if (req.model !== 'admin' && req.model !== 'lecturer') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    const { lecturerId } = req.params;
  
    try {
      const lecturerCourses = await LecturerCourse.findAll({
        where: { lecturer_id: lecturerId },
        include: Course // Include the Course model to get course details
      });
  
      // Extract the course details from the lecturerCourses
      const courses = lecturerCourses.map(lecturerCourse => lecturerCourse.Course);
  
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve courses' });
    }
  };
  
  // For admins
  
  // Create a new course
exports.createCourse = async (req, res) => {
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
  };
  
  // Update a course by ID
exports.updateCourse = async (req, res) => {
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
    };
    
    // Delete a course by ID
exports.deleteCourse = async (req, res) => {
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
    };
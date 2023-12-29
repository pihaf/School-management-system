// const Notification = require('../models/Notification');
const LecturerNotification = require('../models/LecturerNotification');
const AdminNotification = require('../models/AdminNotification');
const Lecturer = require('../models/Lecturer');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Course = require('../models/Course');
const LecturerCourse = require('../models/LecturerCourse');
const StudentCourse = require('../models/StudentCourse');

// Route to get all notifications sent by a lecturer
exports.getAllNotificationsByLecturer = async (req, res) => {
    const { lecturerId } = req.params;
    console.log(lecturerId);
    if (req.model !== 'lecturer' || lecturerId != req.user.lecturer_id) {
      return res.status(403).json({ error: 'You are not authorized' });
    }
  
    try {
      const notifications = await LecturerNotification.findAll({
        where: {
          lecturer_id: lecturerId,
        },
        attributes: ["notification_id", 'lecturer_id', 'course_id', 'title', 'details', 'status', 'created_at'],
        include: [
          {
            model: Course,
            attributes: ['course_class_code', 'course_name'],
          },
          {
            model: Lecturer,
            attributes: ['name', 'email'],
          },
          {
            model: Student,
            attributes: ['name', 'email']
          },
        ],
      });
      //console.log("Noti from get sent:", notifications);
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
  };
  
// Route to get all notifications sent by a lecturer sent to a course
exports.getAllNotificationsByLecturerSentToCourse = async (req, res) => {
  const { lecturerId, courseId } = req.params;
  if (req.model !== 'lecturer' || lecturerId != req.user.lecturer_id) {
    return res.status(403).json({ error: 'You are not authorized' });
  }

  try {
    const notifications = await LecturerNotification.findAll({
      where: {
        lecturer_id: lecturerId,
        '$course.course_id$': courseId,
      },
      attributes: ['notification_id', 'course_id', 'title', 'details', 'status', 'created_at'],
      include: [
        {
          model: Course,
          attributes: ['course_class_code', 'course_name'],
        },
        {
          model: Lecturer,
          attributes: ['name', 'email'],
        },
        {
          model: Student,
          through: { attributes: [] }, // Exclude join table attributes (e.g., student_id)
          attributes: [], // Exclude all attributes of the Student model
        },
      ],
      distinct: true,
    });

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
};

  exports.getAllNotificationsToLecturer = async (req, res) => {
    // console.log("req.params:", req.params);
    // console.log("req.user.lecturer_id", req.user.lecturer_id);
    // console.log(req.model);
    const { lecturerId } = req.params;
    // console.log(lecturerId==req.user.lecturer_id);
  
    if (req.model !== 'lecturer' || lecturerId != req.user.lecturer_id) {
      return res.status(403).json({ error: 'You are not authorized' });
    }
  
    try {
      const notifications = await AdminNotification.findAll({
        where: {
          lecturer_id: lecturerId,
        },
        include: [
          {
            model: Lecturer,
            attributes: ['name', 'email'],
          },
          {
            model: Admin,
            attributes: ['admin_id', 'email'],
          },
        ],
      });
  
      res.json(notifications);
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
  };
  
  exports.getAllNotificationsToStudent = async (req, res) => {
    const { studentId } = req.params;
  
    if (req.model !== 'student' || studentId !== req.user.student_id) {
      return res.status(403).json({ error: 'You are not authorized' });
    }
  
    try {
      const lecturerNotifications = await LecturerNotification.findAll({
        where: {
          student_id: studentId,
        },
        include: [
          {
            model: Course,
            attributes: ['course_class_code', 'course_name'],
          },
          {
            model: Lecturer,
            attributes: ['name', 'email'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
        ],
      });

      const adminNotifications = await AdminNotification.findAll({
        where: {
          student_id: studentId,
        },
        include: [
          {
            model: Course,
            attributes: ['course_class_code', 'course_name'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
          {
            model: Admin,
            attributes: ['admin_id', 'email'],
          },
        ]
      });

      res.json({ lecturerNotifications, adminNotifications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
  };

// Route to get a specific notification by ID
exports.getNotificationById = async (req, res) => {
    const { notificationId } = req.params;
  
    try {
      const notification = await Notification.findByPk(notificationId, {
        include: [
          {
            model: Lecturer,
            attributes: ['name', 'email'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
          {
            model: Admin,
            attributes: ['admin_id', 'email'],
          },
        ],
      });
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve notification' });
    }
  };
  
  // Route for lecturers to send a notification to all students in a course
exports.createNotificationForAllStudentsInCourse = async (req, res) => {
    if (req.model !== 'lecturer') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    const { course_id } = req.body;
    const { details, status, title } = req.body;
    const lecturerId = req.user.lecturer_id;
  
    try {
      // Check if the logged-in lecturer is assigned to the specified course
      const lecturerCourse = await LecturerCourse.findOne({
        where: {
          lecturer_id: lecturerId,
          course_id: course_id,
        },
      });
  
      if (!lecturerCourse) {
        return res.status(403).json({ error: 'You are not assigned to this course' });
      }
  
      // Retrieve all student IDs enrolled in the course
      const studentIds = await StudentCourse.findAll({
        where: {
          course_id: course_id,
        },
        attributes: ['student_id'],
      });
  
      // Create a new notification for each student
      const notifications = await Promise.all(
        studentIds.map(async (student) => {
          const notification = await LecturerNotification.create({
            lecturer_id: lecturerId,
            course_id: course_id,
            student_id: student.student_id,
            title,
            details,
            status,
          });
          return notification;
        })
      );
  
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  };

  // For admins
  
  // Route to get all notifications
exports.getAllNotifications = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    try {
      const adminNotifications = await AdminNotification.findAll({
        include: [
          {
            model: Lecturer,
            attributes: ['name', 'email'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
          {
            model: Admin,
            attributes: ['admin_id', 'email'],
          },
        ],
      });
      const lecturerNotifications = await LecturerNotification.findAll({
        include: [
          {
            model: Lecturer,
            attributes: ['name', 'email'],
          },
          {
            model: Course,
            attributes: ['course_class_code', "course_name"],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          },
        ],
      });
      res.json({ lecturerNotifications, adminNotifications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
  };
  
  // Route for admin to send notifications to all students
exports.createNotificationForAllStudentsSystem = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { details, status, title } = req.body;
  
    try {
      // Retrieve all student IDs
      const studentIds = await Student.findAll({
        attributes: ['student_id'],
      });
  
      // Create a new notification for each student
      const notifications = await Promise.all(
        studentIds.map(async (student) => {
          const notification = await AdminNotification.create({
            admin_id: req.user.admin_id,
            student_id: student.student_id,
            title,
            details,
            status,
          });
          return notification;
        })
      );
  
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  };
  
  // Route for admin to send notifications to all lecturers
exports.createNotificationForAllLecturers = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { details, status, title } = req.body;
  
    try {
      // Retrieve all lecturer IDs
      const lecturerIds = await Lecturer.findAll({
        attributes: ['lecturer_id'],
      });
  
      // Create a new notification for each lecturer
      const notifications = await Promise.all(
        lecturerIds.map(async (lecturer) => {
          const notification = await AdminNotification.create({
            admin_id: req.user.admin_id,
            lecturer_id: lecturer.lecturer_id,
            title,
            details,
            status,
          });
          return notification;
        })
      );
  
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  };
  
  exports.createNotificationForAllUsers = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { details, status, title } = req.body;
  
    try {
      // Retrieve all student and lecturer IDs
      const studentIds = await Student.findAll({
        attributes: ['student_id'],
      });
  
      const lecturerIds = await Lecturer.findAll({
        attributes: ['lecturer_id'],
      });
  
      // Create a new notification for each user
      const notifications = await Promise.all([
        ...studentIds.map(async (student) => {
          const notification = await AdminNotification.create({
            admin_id: req.user.admin_id,
            student_id: student.student_id,
            title,
            details,
            status,
          });
          return notification;
        }),
        ...lecturerIds.map(async (lecturer) => {
          const notification = await AdminNotification.create({
            admin_id: req.user.admin_id,
            lecturer_id: lecturer.lecturer_id,
            title,
            details,
            status,
          });
          return notification;
        }),
      ]);
  
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  };  

  exports.createNotificationForCourse = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { courseId } = req.params;
    const { details, status, title } = req.body;
  
    try {
      // Retrieve all student IDs enrolled in the course
      const studentIds = await StudentCourse.findAll({
        attributes: ['student_id'],
        where: { course_id: courseId },
      });
  
      // Create a new notification for each student
      const notifications = await Promise.all(
        studentIds.map(async (student) => {
          const notification = await AdminNotification.create({
            admin_id: req.user.admin_id,
            student_id: student.student_id,
            course_id: courseId,
            title,
            details,
            status,
          });
          return notification;
        })
      );

      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  };

  // Route for admins to send a notification to a specific lecturer
exports.createNotificationForLecturerById = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { lecturerId } = req.params;
    const { details, status, title } = req.body;

    try {
      // Create a new notification for the specific lecturer
      const notification = await AdminNotification.create({
        admin_id: req.user.admin_id,
        lecturer_id: lecturerId,
        title,
        details,
        status,
      });
  
      res.json(notification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  };
  
  // Route for admins to send a notification to a specific student
exports.createNotificationForStudentById = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    const { studentId } = req.params;
    const { details, status, title } = req.body;

    try {
      // Create a new notification for the specific student
      const notification = await AdminNotification.create({
        admin_id: req.user.admin_id,
        student_id: studentId,
        title,
        details,
        status,
      });
  
      res.json(notification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  };
  
  // Route to update a notification
exports.updateNotification = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { notificationId } = req.params;
    const { admin_id, student_id, lecturer_id, details, status, title } = req.body;
  
    try {
      const notification = await AdminNotification.findByPk(notificationId);
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      notification.admin_id = admin_id || notification.admin_id;
      notification.student_id = student_id || notification.student_id;
      notification.lecturer_id = lecturer_id || notification.lecturer_id;
      notification.details = details || notification.details;
      notification.status = status || notification.status;
      notification.title = title || notification.title;
  
      await notification.save();
  
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update notification' });
    }
  };
  
  // Route to delete a notification
exports.deleteNotification = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { notificationId } = req.params;
  
    try {
      const notification = await AdminNotification.findByPk(notificationId);
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      await notification.destroy();
  
      res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  };
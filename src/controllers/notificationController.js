const Notification = require('../models/Notification');
const Lecturer = require('../models/Lecturer');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const LecturerCourse = require('../models/LecturerCourse');
const StudentCourse = require('../models/StudentCourse');

// Route to get all notifications sent by a lecturer
exports.getAllNotificationsByLecturer = async (req, res) => {
    const { lecturerId } = req.params;
    if (req.model !== 'lecturer' || lecturerId !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized' });
    }
  
    try {
      const notifications = await Notification.findAll({
        where: {
          sender_id: lecturerId,
          sender_type: 'lecturer',
        },
        include: [
          {
            model: Lecturer,
            attributes: ['name', 'email'],
          },
          {
            model: Student,
            attributes: ['student_id', 'name', 'email'],
          }
        ],
      });
  
      res.json(notifications);
    } catch (error) {
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
  
    const { courseId } = req.params;
    const { details, status, title } = req.body;
    const lecturerId = req.user.id;
  
    try {
      // Check if the logged-in lecturer is assigned to the specified course
      const lecturerCourse = await LecturerCourse.findOne({
        where: {
          lecturer_id: lecturerId,
          course_id: courseId,
        },
      });
  
      if (!lecturerCourse) {
        return res.status(403).json({ error: 'You are not assigned to this course' });
      }
  
      // Retrieve all student IDs enrolled in the course
      const studentIds = await StudentCourse.findAll({
        where: {
          course_id: courseId,
        },
        attributes: ['student_id'],
      });
  
      // Create a new notification for each student
      const notifications = await Promise.all(
        studentIds.map(async (studentId) => {
          const notification = await Notification.create({
            sender_id: lecturerId,
            sender_type: 'lecturer',
            recipient_student_id: studentId,
            details,
            status,
            title,
          });
          return notification;
        })
      );
  
      res.json(notifications);
    } catch (error) {
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
      const notifications = await Notification.findAll({
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
      res.json(notifications);
    } catch (error) {
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
        studentIds.map(async (studentId) => {
          const notification = await Notification.create({
            sender_id: req.user.id,
            sender_type: 'admin',
            recipient_student_id: studentId,
            details,
            status,
            title,
          });
          return notification;
        })
      );
  
      res.json(notifications);
    } catch (error) {
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
        lecturerIds.map(async (lecturerId) => {
          const notification = await Notification.create({
            sender_id: req.user.id,
            sender_type: 'admin',
            recipient_lecturer_id: lecturerId,
            details,
            status,
            title,
          });
          return notification;
        })
      );
  
      res.json(notifications);
    } catch (error) {
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
      const notification = await Notification.create({
        sender_id: req.user.id,
        sender_type: 'admin',
        recipient_lecturer_id: lecturerId,
        details,
        status,
        title,
      });
  
      res.json(notification);
    } catch (error) {
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
      const notification = await Notification.create({
        sender_id: req.user.id,
        sender_type: 'admin',
        recipient_student_id: studentId,
        details,
        status,
        title,
      });
  
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send notification' });
    }
  };
  
  // Route to update a notification
exports.updateNotification = async (req, res) => {
    if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { notificationId } = req.params;
    const { sender_id, sender_type, recipient_student_id, recipient_lecturer_id, details, status, title } = req.body;
  
    try {
      const notification = await Notification.findByPk(notificationId);
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      notification.sender_id = sender_id || notification.sender_id;
      notification.sender_type = sender_type || notification.sender_type;
      notification.recipient_student_id = recipient_student_id || notification.recipient_student_id;
      notification.recipient_lecturer_id = recipient_lecturer_id || notification.recipient_lecturer_id;
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
      const notification = await Notification.findByPk(notificationId);
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      await notification.destroy();
  
      res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  };
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const notificationController = require('../controllers/notificationController');

// Route to get all notifications sent by a lecturer
router.get('/api/notifications/lecturer/:lecturerId', authenticateToken, notificationController.getAllNotificationsByLecturer);

// Route to get a specific notification by ID
router.get('/api/notifications/:notificationId', authenticateToken, notificationController.getNotificationById);

// Route for lecturers to send a notification to all students in a course
router.post('/api/notifications/lecturers/course/:courseId', authenticateToken, notificationController.createNotificationForAllStudentsInCourse);

// For admins

// Route to get all notifications
router.get('/api/admin/notifications', authenticateToken, notificationController.getAllNotifications);

// Route for admin to send notifications to all students
router.post('/api/admin/notifications/students', authenticateToken, notificationController.createNotificationForAllStudentsSystem);

// Route for admin to send notifications to all lecturers
router.post('/api/admin/notifications/lecturers', authenticateToken, notificationController.createNotificationForAllLecturers);

// Route for admins to send a notification to a specific lecturer
router.post('/api/admin/notifications/lecturers/:lecturerId', authenticateToken, notificationController.createNotificationForLecturerById);

// Route for admins to send a notification to a specific student
router.post('/api/admin/notifications/students/:studentId', authenticateToken, notificationController.createNotificationForStudentById);

// Route to update a notification
router.put('/api/admin/notifications/:notificationId',authenticateToken, notificationController.updateNotification);

// Route to delete a notification
router.delete('/api/admin/notifications/:notificationId', authenticateToken, notificationController.deleteNotification);

module.exports = router;
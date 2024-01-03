const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const timetableController = require('../controllers/timetableController');

router.get('/api/timetable/students/:studentId', authenticateToken, timetableController.getTimetableStudent);
router.get('/api/timetable/lecturers/:lecturerId', authenticateToken, timetableController.getTimetableLecturer);

module.exports = router;
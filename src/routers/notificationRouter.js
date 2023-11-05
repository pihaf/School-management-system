const express = require('express');
const router = express.Router();

// Admin send notification to teachers and students route
router.post('/admin/notifications', (req, res) => {
  const { title, content } = req.body;
  // Code to send the notification 
  //

  res.send('Notification sent successfully');
});

// Teacher send notification to students route
router.post('/teachers/:teacherId/notifications', (req, res) => {
  const teacherId = req.params.teacherId;
  const { title, content } = req.body;
  // Code to send the notification
  //

  res.send(`Notification sent by teacher ${teacherId} successfully`);
});

module.exports = router;
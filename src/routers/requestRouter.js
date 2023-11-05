const express = require('express');
const router = express.Router();

// Student request form route
router.get('/requests', (req, res) => {
  res.send('This is the student request form');
});

// Handle student request route
router.post('/requests', (req, res) => {
  res.send('Your request has been submitted');
});

// Admin request handling route
router.get('/admin/requests', (req, res) => {
  res.send('This is the admin request handling page');
});

router.post('/admin/requests/:requestId', (req, res) => {
  const requestId = req.params.requestId;
  res.send(`Admin request handling for request ID: ${requestId}`);
});

module.exports = router;
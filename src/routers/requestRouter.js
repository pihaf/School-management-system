const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Request = require('../models/Request');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

// Route to get all requests
router.get('/api/admin/requests', authenticateToken, async (req, res) => {
  if (req.model !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const requests = await Request.findAll({
      include: [
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
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve requests' });
  }
});

// Route to get a specific request by ID
router.get('/api/requests/:requestId', authenticateToken, async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await Request.findByPk(requestId, {
      include: [
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

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve request' });
  }
});

// Route to get all requests of a specific student
router.get('/api/requests/students/:studentId', authenticateToken, async (req, res) => {
  const { studentId } = req.params;
  if (studentId !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to get this request' });
  }

  try {
    const requests = await Request.findAll({
      where: { student_id: studentId },
      include: [
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

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve requests' });
  }
});

// Route to create a new request
router.post('/api/requests', authenticateToken, async (req, res) => {
  // Extract request details from the request body
  const { student_id, admin_id, type, details, status } = req.body;
  if (student_id !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to create this request' });
  }
  try {
    const request = await Request.create({
      student_id,
      admin_id,
      type,
      details,
      status,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create request' });
  }
});

// For admins

router.put('/api/admin/requests/:requestId', authenticateToken, async (req, res) => {
  if (req.model !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { requestId } = req.params;
  const { student_id, admin_id, type, details, status } = req.body;

  try {
    const request = await Request.findByPk(requestId);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.student_id = student_id || request.student_id;
    request.admin_id = admin_id || request.admin_id;
    request.type = type || request.type;
    request.details = details || request.details;
    request.status = status || request.status;

    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request' });
  }
});

// Route to delete a request
router.delete('/api/admin/requests/:requestId', authenticateToken, async (req, res) => {
  if (req.model !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { requestId } = req.params;

  try {
    const request = await Request.findByPk(requestId);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    await request.destroy();

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete request' });
  }
});

module.exports = router;
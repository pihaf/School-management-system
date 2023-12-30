const Request = require('../models/Request');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
  
// Route to get a specific request by ID
exports.getRequestById = async (req, res) => {
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
  };
  
// Route to get all requests of a specific student
exports.getAllRequestsOfAStudent = async (req, res) => {
    const studentId  = req.params.studentId;
    // console.log(studentId);
    // console.log(req.user.student_id);
    if (studentId !== req.user.student_id) {
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
  };
  
// Route to create a new request
exports.createRequest = async (req, res) => {
  if (req.model !== 'student') {
    return res.status(403).json({ error: 'Only students can send requests' });
  }
    // Extract request details from the request body
    const { student_id, admin_id, type, details, status } = req.body;
    if (student_id !== req.user.student_id) {
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
  };
  
// For admins

// Route to get all requests
exports.getAllRequests = async (req, res) => {
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
  };

exports.updateRequestById = async (req, res) => {
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
  };
  
// Route to delete a request
exports.deleteRequest = async (req, res) => {
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
  };
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const requestController = require('../controllers/requestController');

// Route to get a specific request by ID
router.get('/api/requests/:requestId', authenticateToken, requestController.getRequestById);

// Route to get all requests of a specific student
router.get('/api/requests/students/:studentId', authenticateToken, requestController.getAllRequestsOfAStudent);

// Route to create a new request
router.post('/api/requests', authenticateToken, requestController.createRequest);

// For admins
// Route to get all requests
router.get('/api/admin/requests', authenticateToken, requestController.getAllRequests);

router.put('/api/admin/requests/:requestId', authenticateToken, requestController.updateRequestById);

// Route to delete a request
router.delete('/api/admin/requests/:requestId', authenticateToken, requestController.deleteRequest);

module.exports = router;
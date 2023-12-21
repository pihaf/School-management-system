const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Lecturer = require('../models/Lecturer');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { model, id } = decoded; 

    let Model;
    switch (model) {
      case 'student':
        Model = Student;
        break;
      case 'lecturer':
        Model = Lecturer;
        break;
      case 'admin':
        Model = Admin;
        break;
      default:
        throw new Error('Invalid model');
    }

    const user = Model.verifyAuthToken(token);
    if (user.id !== id) {
      throw new Error('Invalid token');
    }

    req.user = user;
    req.model = model;
    req.token = token;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = authenticateToken;
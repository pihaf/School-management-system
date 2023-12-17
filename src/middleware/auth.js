const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
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
      case 'teacher':
        Model = Teacher;
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
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
}
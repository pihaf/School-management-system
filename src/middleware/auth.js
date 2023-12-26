const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Lecturer = require('../models/Lecturer');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Token from authenticateToken: ");
  console.log(token);
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

    const user = await Model.verifyAuthToken(token);
    console.log("User from authenticateToken: ");
    console.log(user);
    switch (model) {
      case 'student':
        // console.log("User.id: ");
        // console.log(user.student_id);
        console.log("id: ");
        console.log(id);
        if (user.student_id !== id) {
          throw new Error('Invalid token');
        }
        break;
      case 'lecturer':
        // console.log("User.id: ");
        // console.log(user.student_id);
        console.log("id: ");
        console.log(id);
        if (user.lecturer_id !== id) {
          throw new Error('Invalid token');
        }
        break;
      case 'admin':
        // console.log("User.id: ");
        // console.log(user.student_id);
        console.log("id: ");
        console.log(id);
        if (user.admin_id !== id) {
          throw new Error('Invalid token');
        }        
        break;
      default:
    }

    req.user = user;
    req.model = model;
    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = authenticateToken;
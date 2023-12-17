const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const jwt = require('jsonwebtoken');

const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  class: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  place_of_birth: {
    type: DataTypes.STRING,
    allowNull: true
  },
  citizen_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profile_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'students',
  timestamps: false
});
  
// Generate JWT token for the student
Student.prototype.generateAuthToken = function () {
  const payload = { model: 'student', id: this.student_id }; 
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey);
  return token;
};

// Verify and decode JWT token
Student.verifyAuthToken = function (token) {
  const secretKey = process.env.SECRET_KEY;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = Student;
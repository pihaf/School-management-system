const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const jwt = require('jsonwebtoken');

const Lecturer = sequelize.define('Lecturer', {
  lecturer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  'subject/lab': {
    type: DataTypes.STRING,
    allowNull: true
  },
  job_title: {
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
  tableName: 'lecturers',
  timestamps: false
});

// Generate JWT token for the student
Lecturer.prototype.generateAuthToken = function () {
  const payload = { model: 'lecturer', id: this.lecturer_id }; 
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey);
  return token;
};

// Verify and decode JWT token
Lecturer.verifyAuthToken = function (token) {
  const secretKey = process.env.SECRET_KEY;
  try {
    const decoded = jwt.verify(token, secretKey);
    const { model, id } = decoded;
    const user = Lecturer.findByPk(id);

    if (model !== 'lecturer') {
      throw new Error('Invalid token');
    }

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = Lecturer;
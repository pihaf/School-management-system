const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');

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
  subject_lab: {
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
  
module.exports = Lecturer;
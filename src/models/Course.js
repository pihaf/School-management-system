const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');

const Course = sequelize.define('Course', {
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  course_class_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  number_of_students: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true
  },
  day: {
    type: DataTypes.STRING,
    allowNull: true
  },
  periods: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  group: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'courses',
  timestamps: false
});
  
module.exports = Course;
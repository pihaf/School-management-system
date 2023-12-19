const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');

const StudentCourse = sequelize.define('student_course', {
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'students',
        key: 'student_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'courses',
        key: 'course_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'student_courses',
    timestamps: false
  });
  
  module.exports = StudentCourse;
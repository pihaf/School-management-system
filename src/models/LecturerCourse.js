const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const Course = require('../models/Course');

const LecturerCourse = sequelize.define('lecturer_course', {
    lecturer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'lecturers',
        key: 'lecturer_id',
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
    }
  }, {
    tableName: 'lecturer_courses',
    timestamps: false
  });
  
  LecturerCourse.belongsTo(Course, { foreignKey: 'course_id' });

  module.exports = LecturerCourse;
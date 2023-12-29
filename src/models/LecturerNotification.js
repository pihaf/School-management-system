const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const Lecturer = require('./Lecturer');
const Admin = require('./Admin');
const Student = require('./Student');
const Course = require('./Course');

const LecturerNotification = sequelize.define('LecturerNotification', {
    notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lecturer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lecturer',
        key: 'lecturer_id'
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Course',
        key: 'course_id'
      }
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Student',
        key: 'student_id'
      }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'lecturer_notifications',
    timestamps: false
  });
  
  LecturerNotification.belongsTo(Lecturer, {
    foreignKey: 'lecturer_id',
  });
  
  LecturerNotification.belongsTo(Student, {
    foreignKey: 'student_id',
  });
  
  LecturerNotification.belongsTo(Course, {
    foreignKey: 'course_id',
  });
  
  Lecturer.hasMany(LecturerNotification, {
    foreignKey: 'lecturer_id',
  });
  
  Student.hasMany(LecturerNotification, {
    foreignKey: 'student_id',
  });
  
  Course.hasMany(LecturerNotification, {
    foreignKey: 'course_id',
  });

  module.exports = LecturerNotification;
const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const Lecturer = require('./Lecturer');
const Admin = require('./Admin');
const Student = require('./Student');
const Course = require('./Course');

const AdminNotification = sequelize.define('AdminNotification', {
  notification_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Admin',
      key: 'admin_id'
    }
  },
  student_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Student',
      key: 'student_id'
    }
  },
  lecturer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Lecturer',
      key: 'lecturer_id'
    }
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Course',
      key: 'course_id'
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
  tableName: 'admin_notifications',
  timestamps: false
});

AdminNotification.belongsTo(Admin, {
  foreignKey: 'admin_id',
});

AdminNotification.belongsTo(Student, {
  foreignKey: 'student_id',
});

AdminNotification.belongsTo(Lecturer, {
  foreignKey: 'lecturer_id',
});

AdminNotification.belongsTo(Course, {
  foreignKey: 'course_id',
});

Lecturer.hasMany(AdminNotification, {
  foreignKey: 'lecturer_id',
});

Student.hasMany(AdminNotification, {
  foreignKey: 'student_id',
});

Admin.hasMany(AdminNotification, {
  foreignKey: 'admin_id',
});

module.exports = AdminNotification;
const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const Lecturer = require('./Lecturer');
const Admin = require('./Admin');
const Student = require('./Student');

const Notification = sequelize.define('Notification', {
    notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sender_lecturer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    recipient_student_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    recipient_lecturer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'notifications',
    timestamps: false
  });
  
  Notification.belongsTo(Lecturer, { foreignKey: 'sender_lecturer_id', as: 'senderLecturer', onDelete: 'CASCADE' });
  Notification.belongsTo(Lecturer, { foreignKey: 'recipient_lecturer_id', as: 'recipientLecturer', onDelete: 'CASCADE' });
  Notification.belongsTo(Admin, { foreignKey: 'admin_id', as: 'senderAdmin', onDelete: 'SET NULL' });
  Notification.belongsTo(Student, { foreignKey: 'recipient_student_id', onDelete: 'CASCADE' });

module.exports = Notification;
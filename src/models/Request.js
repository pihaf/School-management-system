const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const Student = require('./Student');
const Admin = require('./Admin');

const Request = sequelize.define('Request', {
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'requests',
  timestamps: false,
});

Request.belongsTo(Student, { foreignKey: 'student_id' });
Request.belongsTo(Admin, { foreignKey: 'admin_id' });

module.exports = Request;
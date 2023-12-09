const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');

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
  
module.exports = Student;
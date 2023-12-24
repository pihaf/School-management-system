const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const jwt = require('jsonwebtoken');

const Admin = sequelize.define('Admin', {
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  },
}, {
  tableName: 'admins',
  timestamps: false
});
  
// Generate JWT token for the admin
Admin.prototype.generateAuthToken = function () {
  const payload = { model: 'admin', id: this.admin_id }; 
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey);
  return token;
};

// Verify and decode JWT token
Admin.verifyAuthToken = function (token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    const { model, id } = decoded;
    const user = Admin.findByPk(id);

    if (model !== 'admin') {
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

module.exports = Admin;


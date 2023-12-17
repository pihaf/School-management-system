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
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sender_type: {
        type: DataTypes.ENUM('lecturer', 'admin'),
        allowNull: false
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
    timestamps: false,
});

Notification.belongsTo(Lecturer, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
Notification.belongsTo(Admin, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
Notification.belongsTo(Student, { foreignKey: 'recipient_student_id', onDelete: 'CASCADE' });
Notification.belongsTo(Lecturer, { foreignKey: 'recipient_lecturer_id', onDelete: 'CASCADE' });

module.exports = Notification;
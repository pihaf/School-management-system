const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const Admin = require('./Admin');

const News = sequelize.define('News', {
    new_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
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
    tableName: 'news',
    timestamps: false
});

News.belongsTo(Admin, { foreignKey: 'admin_id' });

module.exports = News;
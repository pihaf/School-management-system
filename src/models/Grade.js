const { DataTypes } = require('sequelize');
const sequelize = require('../models/DB');
const Student = require('./Student');
const Course = require('./Course');

const Grade = sequelize.define('Grade', {
  grade_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  component_score: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  midterm_score: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  finalterm_score: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  overall_score: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
}, {
  tableName: 'grades',
  timestamps: false
});

Grade.belongsTo(Student, { foreignKey: 'student_id' });
Grade.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = Grade;
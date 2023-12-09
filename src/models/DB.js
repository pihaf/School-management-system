//import sequelize and env config
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

//initialize 
const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  port: dbConfig.PORT
});

module.exports = { sequelize };
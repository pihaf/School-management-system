//import sequelize and env config
const Sequelize = require('sequelize');
const config = require('../config/config.js');

//initialize 
const sequelize = new Sequelize(config.NAME, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  dialect: 'mysql',
  port: config.PORT
});

module.exports = { sequelize };
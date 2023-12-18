//import sequelize and env config
const Sequelize = require('sequelize');
const dbconfig = require('../config/config');

//initialize 
const sequelize = new Sequelize(dbconfig.NAME, dbconfig.USERNAME, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: 'mysql',
  port: dbconfig.PORT
});

module.exports = sequelize;
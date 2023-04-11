'use strict';

require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);

const createUsers = require('./user-model');

const User = createUsers(sequelize);

module.exports = {
  sequelize,
  User
}
'use strict';

require('dotenv').config();
const server = require('./src/server');
const { sequelize } = require('./src/auth/models/index');

sequelize.sync()
  .then(() => {
    server.start(process.env.PORT || 3005)
  }).catch(e => {
    console.error('Could not start server', e.message);
  });
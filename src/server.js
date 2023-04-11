'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./auth/router');
const basicAuth = require('./auth/middleware/basic');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  }
}
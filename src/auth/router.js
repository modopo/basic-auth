'use strict';

const express = require('express');
const router = express.Router();
const { User } = require('./models');
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');

router.post('/signup', signup);
router.post('/signin', basicAuth);

async function signup(request, response, next) {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);
    const record = await User.create(request.body);
    response.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
}

module.exports = router;
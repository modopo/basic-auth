'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { User } = require('../models');

async function basicAuth(request, response, next) {
  // ['Basic', 'am9objpmb28=']
  let basicHeaderParts = request.headers.authorization.split(' '); 
  let encodedString = basicHeaderParts.pop();  // am9objpmb28=
  let decodedString = base64.decode(encodedString); // "username:password"

  let [username, password] = decodedString.split(':'); // username, password

  try {
    const user = await User.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      response.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    response.status(403).send('Invalid Login');
  }
}

module.exports = basicAuth;
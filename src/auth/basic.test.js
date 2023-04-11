'use strict'

const base64 = require('base-64');
const basicAuth = require('./middleware/basic');
const { User } = require('./models');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  await User.sync();
  await User.create({
    username: 'test',
    password: await bcrypt.hash('test', 10)
  })
});

afterAll(async () => {
  await User.drop({});
});

describe('Testing basic authentication middleware', () => {
  test('Querying the DB to check if user and password are correct ', async () => {
    let credential = base64.encode("test:test");

    let request = {
      headers: {
        authorization: 'Basic ' + credential
      }
    }

    let response = {
      status: jest.fn(() => response),
      send: jest.fn(() => response),
      json: jest.fn(() => response),
    }
    let next = jest.fn();
    await basicAuth(request, response, next);

    expect(response.status).toBeCalledWith(200);
    expect(response.json)
      .toBeCalledWith(expect.objectContaining({ id: 1})
      );
  });
});
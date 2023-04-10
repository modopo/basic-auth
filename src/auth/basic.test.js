'use strict'

const base64 = require('base-64');
const basicAuth = require('./middleware/basic');

describe('Testing basic authentication middleware', () => {
  test('POSTing ', async () => {
    let credential = base64.encode("test:secret");

    let expectedJSON = {
      username: 'test',
      password: 'secret'
    }

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
      .toBeCalledWith(expect.objectContaining({ password: '$2b$10$HhTEL1fbaeZhMULASrWGN./rXltU71WlY/K7G.a4DgyCJYFbjYMY2' })
      );
  });
});
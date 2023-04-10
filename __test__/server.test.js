'use strict';

const { User } = require('../src/auth/models');
const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

beforeAll(async () => {
  await User.sync();
});

afterAll(async () => {
  await User.drop({});
});

describe('Testing endpoints', () => {
  test("Signup should be in DB", async () => {
    let data = {
      username: 'newtest',
      password: 'test'
    }
    let response = await request.post('/signup').send(data);
    expect(response.body.username).toEqual('newtest');
  });

  test("Check signin works as intended with correct credentials", async () => {
    let response = await request.post('/signin').auth('newtest', 'test');

    expect(response.body.username).toEqual('newtest');
    expect(response.status).toEqual(200);
  });

  test("Fail signing with incorrect credentials", async () => {
    let response = await request.post('/signin').auth('newtest', 'wrong');
    expect(response.status).toEqual(403);
  });
});
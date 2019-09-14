const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig.js');

describe('Auth Server', () => {
  test('tests are running with DB_ENV set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  const user = {
    username: 'testuser',
    password: '1qaz@WSX3edc$RFV'
  };

  let token;

  describe('POST /register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    test('no password, should return status 500', () => {
      return request(server)
        .post('/api/auth/register')
        .send(user.username)
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
    test('username and pass provided, \nshould returns status 201', () => {
      return request(server)
        .post('/api/auth/register')
        .send(user)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('POST /login', () => {
    test('should return a JWT ', () => {
      return request(server)
        .post('/api/auth/login')
        .send(user)
        .then(res => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('token');
          token = res.body.token;
        });
    });
    test('incorrect pass supplied, should return status 402', () => {
      const incorrectUser = {
        username: 'testuser',
        password:
          'asfbasifb0iqbw0ib1w0ibfan0ifa0fbasuifb0b120ibf10un10ifbw0sbfi0nbu3bf-1nifna'
      };
      return request(server)
        .post('/api/auth/login')
        .send(incorrectUser)
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });

  describe('GET /users', () => {
    test('should use the token to access the protected jokes route \nand have correct response', () => {
      return request(server)
        .get('/api/jokes')
        .set('Authorization', token)
        .send(user)
        .then(res => {
          expect(res.status).toBe(200);
          expect(res).toHaveProperty('text');
        });
    });
    test('no token, should be denied access to the route', () => {
      return request(server)
        .get('/api/jokes')
        .send(user)
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.text).toBe('{"message":"No token provided"}');
        });
    });
  });
});

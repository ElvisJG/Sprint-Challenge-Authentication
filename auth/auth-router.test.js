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
    test('should returns status 201', () => {
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
  });
});

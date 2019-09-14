const Users = require('./user-model.js');
const db = require('../database/dbConfig.js');

describe('The Users Model', () => {
  test('tests are running with DB_ENV set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  const userData = {
    username: 'testuser',
    password: '1qaz@WSX3edc$RFV'
  };

  describe('the add function', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    test('should add a new user', async () => {
      // Test Setup
      await Users.add(userData);

      // Assertion
      const users = await db('users');
      expect(users.length).toBe(1);
      expect(users[0].username).toBe('testuser');
      expect(users[0].password).toBe('1qaz@WSX3edc$RFV');
    });

    test('should return newly created user', async () => {
      // Test Setup
      const user = await Users.add(userData);

      // Assertions
      expect(user).toEqual({
        id: 1,
        username: 'testuser',
        password: '1qaz@WSX3edc$RFV'
      });
    });
  });

  describe('the findBy function', () => {
    test('should insert a new user', async () => {
      // Test Setup

      try {
        const { username } = userData;
        const user = await Users.findBy({ username });
        const { tId, tUsername, tPassword } = user;
        expect(tId).toBe(1);
        expect(tUsername).toBe('testuser');
        expect(tPassword).toBe('1qaz@WSX3edc$RFV');
      } catch (error) {}
    });
  });
});

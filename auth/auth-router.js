const router = require('express').Router();
const bcrypt = require('bcrypt');

const middleware = require('./authenticate-middleware');
const Users = require('../models/user-model');

router.post('/register', (req, res) => {
  // Destructures body into user
  const user = req.body;
  // Takes users password and encrypts
  user.password = bcrypt.hashSync(user.password, 12);
  // Generates a token using the user
  const token = middleware.generator(user);
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;

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

  // Using the helper function add, we send the user object to the database, then we send the user a response
  // Introducing them to our dadjoke hellscape
  Users.add(user)
    .then(savedUser => {
      const { username } = savedUser;
      res
        .status(201)
        .json({ message: `I hope you enjoy our punny jokes, ${username}` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = middleware.generator(user);
        res
          .status(200)
          .json({ message: `Welcome Back ${user.username}`, token });
      } else {
        res.status(401).json({ message: 'You shall not pass! 🧙‍' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;

const jwt = require('jsonwebtoken');

module.exports = {
  generator,
  restrict
};

function generator(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '8h'
  };
  return jwt.sign(payload, process.env.SECRET, options);
}

function restrict(req, res, next) {
  const token = req.authorization.token;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(401).json({ message: 'YOU SHALL NOT PASS! 🧙‍' });
      } else {
        req.decode;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
}

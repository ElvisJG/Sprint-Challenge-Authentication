const jwt = require('jsonwebtoken');

module.exports = {
  generator,
  restrict
};

// Sets our payload and options then signs a token using the payload, our environment secret, and options.
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

// Middleware function, takes a token and attempts to verify it - if an error occurs, it sends an error message
// if no error occurs and the token is verified it sends a decoded token to the user and moves next.
// If there is no token at all, an error message tells the user no token was provided.
function restrict(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'YOU SHALL NOT PASS! 🧙‍' });
      } else {
        req.decoded = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
}

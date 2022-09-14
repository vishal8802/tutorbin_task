const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const createJWT = ({ data }) => {
  const token = jwt.sign(data, SECRET_KEY, {
    expiresIn: '12h',
  });
  return token;
};

const authenticate = (req, res, next) => {
  try {
    const { headers } = req;
    const token = headers.authorization;

    if (!token) return res.status(400).send({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: 'Invalid Token' });
  }
};

module.exports = { createJWT, authenticate };

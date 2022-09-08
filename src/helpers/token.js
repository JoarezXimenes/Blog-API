const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || null;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};

module.exports = { generateToken, verifyToken };
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const JWT_SECRET = process.env.JWT_SECRET || null;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const verifyToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new UnauthorizedError('Token not found');
  try {
    jwt.verify(authorization, JWT_SECRET);
    next();
  } catch (error) {
    throw new UnauthorizedError('Expired or invalid token');
  }
};

module.exports = { generateToken, verifyToken };
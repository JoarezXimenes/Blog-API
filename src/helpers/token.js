const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');

const JWT_SECRET = process.env.JWT_SECRET || null;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const verifyToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(401, 'Token not found');
  try {
    const data = jwt.verify(authorization, JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    throw new CustomError(401, 'Expired or invalid token');
  }
};

module.exports = { generateToken, verifyToken };
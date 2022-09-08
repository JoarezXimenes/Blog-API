const Joi = require('joi');
const { User } = require('../database/models');
const runSchema = require('../helpers/runSchema');
const Conflict = require('../errors/Conflict');
const { generateToken } = require('../helpers/token');

const userService = {
  validateUserBody: runSchema(Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  })),

  async verifyIfEmailExists(email) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new Conflict('User already registered');
    }
  },

  async createUser({ displayName, email, password, image }) {
    const result = await User.create({ displayName, email, password, image });
    if (!result) throw new Error();
    const userObject = result.dataValues;
    delete userObject.password;
    const token = generateToken(userObject);
    return token;
  },

  async getAllUsers() {
    const result = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    const users = result.map((user) => user.dataValues);
    return users;
  },
};

module.exports = userService;
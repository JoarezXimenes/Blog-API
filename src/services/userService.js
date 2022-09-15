const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { User } = require('../database/models');
const runSchema = require('../helpers/runSchema');
const CustomError = require('../errors/CustomError');
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
      throw new CustomError(409, 'User already registered');
    }
  },

  async createUser({ displayName, email, password, image }) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const result = await User.create({ displayName, email, password: passwordHash, image });
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

  async getUserById(id) {
    const result = await User.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['password'] },
    });
    if (!result) throw new CustomError(404, 'User does not exist');
    const user = result.dataValues;
    return user;
  },

  async deleteUser(id) {
    const result = await User.destroy({
      where: {
        id,
      },
    });

    if (!result) throw new CustomError(500, 'server error');
  },
};

module.exports = userService;
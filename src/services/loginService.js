const bcrypt = require('bcryptjs');
const { User } = require('../database/models');
const CustomError = require('../errors/CustomError');
const { generateToken } = require('../helpers/token');

const loginService = {
  validateLoginBody({ email, password }) {
    if (!email || !password) {
      throw new CustomError(400, 'Some required fields are missing');
    }
  },

  async login({ email, password }) {
    const verified = await User.findOne({
      where: {
        email,
      },
    });
    if (!verified) {
      throw new CustomError(400, 'Invalid fields');
    }
    const user = verified.dataValues;
    if (!bcrypt.compareSync(password, user.password)) {
      throw new CustomError(400, 'Invalid fields');
    }
    delete user.password;
    console.log(user);
    const token = generateToken(user);
    return token;
  },
};

module.exports = loginService;
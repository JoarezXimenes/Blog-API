const { User } = require('../database/models');
const Error400 = require('../errors/Error400');
const { generateToken } = require('../helpers/token');

const loginService = {
  validateLoginBody({ email, password }) {
    if (!email || !password) {
      throw new Error400('Some required fields are missing');
    }
  },

  async login({ email, password }) {
    const verified = await User.findOne({
      where: {
        email,
        password,
      },
      attributes: { exclude: ['password'] },
    });
    if (!verified) {
      throw new Error400('Invalid fields');
    }

    const token = generateToken(verified.dataValues);
    return token;
  },
};

module.exports = loginService;
const { User } = require('../database/models');
const Error400 = require('../errors/Error400');

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
    });
    if (!verified) {
      throw new Error400('Invalid fields');
    }
  },
};

module.exports = loginService;
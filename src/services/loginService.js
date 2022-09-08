const { User } = require('../database/models');
const BadRequest = require('../errors/BadRequest');
const { generateToken } = require('../helpers/token');

const loginService = {
  validateLoginBody({ email, password }) {
    if (!email || !password) {
      throw new BadRequest('Some required fields are missing');
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
      throw new BadRequest('Invalid fields');
    }

    const token = generateToken(verified.dataValues);
    return token;
  },
};

module.exports = loginService;
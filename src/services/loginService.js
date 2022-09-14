const bcrypt = require('bcryptjs');
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
      },
    });
    if (!verified) {
      throw new BadRequest('Invalid fields');
    }
    const user = verified.dataValues;
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequest('Invalid fields');
    }
    delete user.password;
    console.log(user);
    const token = generateToken(user);
    return token;
  },
};

module.exports = loginService;
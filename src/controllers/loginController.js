const loginService = require('../services/loginService');

const loginController = {
  async login(req, res) {
    const { email, password } = req.body;
    await loginService.validateLoginBody({ email, password });
    const token = await loginService.login({ email, password });
    res.status(200).json({ token });
  },
};

module.exports = loginController;
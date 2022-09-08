const userService = require('../services/userService');

const userController = {
  async createUSer(req, res) {
    const { displayName, email, password, image } = req.body;
    await userService.validateUserBody({ displayName, email, password, image });
    await userService.verifyIfEmailExists(email);
    const token = await userService.createUser({ displayName, email, password, image });
    res.status(201).json({ token });
  },

  async getAllUsers(_req, res) {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  },
};

module.exports = userController;
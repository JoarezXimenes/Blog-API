const userService = require('../services/userService');
const NotFoundError = require('../errors/NotFoundError');

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

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    if (!user) throw new NotFoundError('User does not exist');
    res.status(200).json(user);
  },

  async deleteUser(req, res) {
    const { id } = req.user;
    await userService.deleteUser(id);
    res.status(204).end();
  },
};

module.exports = userController;
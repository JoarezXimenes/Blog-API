const { Router } = require('express');
const { verifyToken } = require('../helpers/token');

const userController = require('../controllers/userController');

const userRoutes = Router();

userRoutes.post('/', userController.createUSer);
userRoutes.get('/', verifyToken, userController.getAllUsers);
userRoutes.get('/:id', verifyToken, userController.getUserById);
userRoutes.delete('/me', verifyToken, userController.deleteUser);

module.exports = userRoutes;
const { Router } = require('express');
const { verifyToken } = require('../helpers/token');

const userController = require('../controllers/userController');

const userRoutes = Router();

userRoutes.post('/', userController.createUSer);
userRoutes.get('/', verifyToken, userController.getAllUsers);

module.exports = userRoutes;
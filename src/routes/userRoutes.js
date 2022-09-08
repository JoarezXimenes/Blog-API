const { Router } = require('express');

const userController = require('../controllers/userController');

const userRoutes = Router();

userRoutes.post('/', userController.createUSer);

module.exports = userRoutes;
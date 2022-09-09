const { Router } = require('express');
const { verifyToken } = require('../helpers/token');

const categoryController = require('../controllers/categoryController');

const categoryRoutes = Router();

categoryRoutes.post('/', verifyToken, categoryController.createCategory);

module.exports = categoryRoutes;
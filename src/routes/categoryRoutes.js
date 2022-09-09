const { Router } = require('express');
const { verifyToken } = require('../helpers/token');

const categoryController = require('../controllers/categoryController');

const categoryRoutes = Router();

categoryRoutes.post('/', verifyToken, categoryController.createCategory);
categoryRoutes.get('/', verifyToken, categoryController.getAllCategories);

module.exports = categoryRoutes;
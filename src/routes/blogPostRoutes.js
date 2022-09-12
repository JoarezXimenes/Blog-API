const { Router } = require('express');
const { verifyToken } = require('../helpers/token');

const blogPostController = require('../controllers/blogPostController');

const blogPostRoutes = Router();

blogPostRoutes.post('/', verifyToken, blogPostController.createPost);
blogPostRoutes.get('/', verifyToken, blogPostController.getAllPosts);
blogPostRoutes.get('/:id', verifyToken, blogPostController.getPostById);
blogPostRoutes.put('/:id', verifyToken, blogPostController.updatePost);

module.exports = blogPostRoutes;
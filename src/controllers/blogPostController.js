const blogPostService = require('../services/blogPostService');
const categoryService = require('../services/categoryService');

const blogPostController = {
  async createPost(req, res) {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    await blogPostService.validatePostBody({ title, content, categoryIds });
    await categoryService.checkCategoriesById(categoryIds);
    const post = await blogPostService.createPost({ title, content, categoryIds, id });
    res.status(201).json(post);
  },

  async getAllPosts(_req, res) {
    const posts = await blogPostService.getAllPosts();
    res.status(200).json(posts);
  },
};

module.exports = blogPostController;
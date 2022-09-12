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

  async getPostById(req, res) {
    const { id } = req.params;
    const post = await blogPostService.getPostById(id);
    res.status(200).json(post);
  },

  async updatePost(req, res) {
    const postId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;
    await blogPostService.verifyUserPostId({ postId, userId });
    await blogPostService.validateUpdateBody({ title, content });
    await blogPostService.updatePost({ title, content, postId });
    const updatedPost = await blogPostService.getPostById(postId);
    res.status(200).json(updatedPost);
  },
};

module.exports = blogPostController;
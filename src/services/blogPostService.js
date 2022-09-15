const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const config = require('../database/config/config');
const CustomError = require('../errors/CustomError');

const sequelize = new Sequelize(config.development);

const blogPostService = {
  validatePostBody({ title, content, categoryIds }) {
    if (!title || !content || !categoryIds) {
      throw new CustomError(400, 'Some required fields are missing');
    }
  },
  validateUpdateBody({ title, content }) {
    if (!title || !content) {
      throw new CustomError(400, 'Some required fields are missing');
    }
  },

  async createPost({ title, content, categoryIds, id }) {
    const t = await sequelize.transaction();

    try {
      const result = await BlogPost.create({
        title,
        content,
        userId: id,
      });
      const post = result.dataValues;
      const bulkIds = categoryIds.map((catId) => ({ categoryId: catId, postId: post.id }));
      await PostCategory.bulkCreate(bulkIds);
      return post;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async getAllPosts() {
    const result = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category,
        as: 'categories',
      }],
    });
    const posts = result.map((post) => post.dataValues);

    return posts;
  },

  async getPostById(id) {
    const result = await BlogPost.findOne({
      where: { id },
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category,
        as: 'categories',
      }],
    });
    if (!result) throw new CustomError(404, 'Post does not exist');

    const post = result.dataValues;
    return post;
  },

  async verifyUserPostId({ postId, userId }) {
    const result = await BlogPost.findOne({
      where: { id: postId },
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    if (!result) throw new CustomError(404, 'Post does not exist');
    const user = result.dataValues.user.dataValues;
    if (user.id !== userId) throw new CustomError(401, 'Unauthorized user');
  },

  async updatePost({ postId, title, content }) {
    const result = await BlogPost.update({ title, content }, {
      where: { id: postId },
    });
    if (!result) throw new CustomError(500, 'server error');
    return result;
  },

  async deletePost(id) {
    const result = await BlogPost.destroy({
      where: { id },
    });
    if (!result) throw new CustomError(500, 'server error');
  },
};

module.exports = blogPostService;
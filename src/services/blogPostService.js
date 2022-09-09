const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../database/models');
const config = require('../database/config/config');
const BadRequest = require('../errors/BadRequest');

const sequelize = new Sequelize(config.development);

const blogPostService = {
  validatePostBody({ title, content, categoryIds }) {
    if (!title || !content || !categoryIds) {
      throw new BadRequest('Some required fields are missing');
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
      console.log(post);
      const bulkIds = categoryIds.map((catId) => ({ categoryId: catId, postId: post.id }));
      console.log(bulkIds);
      await PostCategory.bulkCreate(bulkIds);
      return post;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};

module.exports = blogPostService;
const Joi = require('joi');
const { Category } = require('../database/models');
const runSchema = require('../helpers/runSchema');
const BadRequest = require('../errors/BadRequest');

const categoryService = {
  validateCategoryBody: runSchema(Joi.object({
    name: Joi.string().required(),
  })),

  async createCategory(name) {
    const result = await Category.create({ name });
    const category = result.dataValues;
    return category;
  },

  async getAllCategories() {
    const result = await Category.findAll();
    const categories = result.map((cat) => cat.dataValues);
    return categories;
  },

  async checkCategoriesById(array) {
    const result = await Category.findAll({
      where: {
        id: array,
      },
    });
    const categories = result.map((cat) => cat.dataValues);
    if (categories.length !== array.length) {
      throw new BadRequest('"categoryIds" not found');
    }
  },
};

module.exports = categoryService;
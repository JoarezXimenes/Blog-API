const Joi = require('joi');
const { Category } = require('../database/models');
const runSchema = require('../helpers/runSchema');

const categoryService = {
  validateCategoryBody: runSchema(Joi.object({
    name: Joi.string().required(),
  })),

  async createCategory(name) {
    const result = await Category.create({ name });
    const category = result.dataValues;
    return category;
  },
};

module.exports = categoryService;
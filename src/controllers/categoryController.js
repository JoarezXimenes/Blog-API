const categoryService = require('../services/categoryService');

const categoryController = {
  async createCategory(req, res) {
    const { name } = req.body;
    await categoryService.validateCategoryBody({ name });
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  },

  async getAllCategories(_req, res) {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  },
};

module.exports = categoryController;
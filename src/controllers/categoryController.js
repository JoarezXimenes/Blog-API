const categoryService = require('../services/categoryService');

const categoryController = {
  async createCategory(req, res) {
    const { name } = req.body;
    await categoryService.validateCategoryBody({ name });
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  },
};

module.exports = categoryController;
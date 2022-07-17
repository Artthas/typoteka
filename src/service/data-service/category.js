'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = this._articles.map((item) => item.сategory);
    const categoriesSet = new Set(categories);
    return [...categoriesSet];
  }
}

module.exports = CategoryService;

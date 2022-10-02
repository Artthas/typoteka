'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = [];
    for (const article of this._articles) {
      categories.push(...article.category);
    }
    const categoriesSet = new Set(categories);
    return [...categoriesSet];
  }
}

module.exports = CategoryService;

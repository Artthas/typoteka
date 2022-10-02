'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  async findAll(searchText) {
    const searchedArticles = this._articles.filter((item) => item.title.includes(searchText));
    return searchedArticles;
  }

}

module.exports = SearchService;

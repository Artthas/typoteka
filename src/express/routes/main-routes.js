'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`main`, {articles});
});

mainRouter.get(`/search`, async (req, res) => {
  try {
    const {query} = req.query;
    const results = await api.search({query});

    res.render(`search-result`, {
      results
    });
  } catch (error) {
    res.render(`search-error`, {
      results: []
    });
  }
});

module.exports = mainRouter;

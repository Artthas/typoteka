'use strict';

const {Router} = require(`express`);
const upload = require(`../middlewares/upload`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articlesRouter.get(`/add`, (req, res) => res.render(`article-add`));

articlesRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {

    const {body, file} = req;

    const category = [];
    for (const key in body) {
      if (body[key] === "on") category.push(key);
    }
    
    const articleData = {
      title: body.title,
      createdDate: body.createdDate,
      category: category,
      img: file ? file.filename : ``,
      announce: body.announce,
      fullText: body.fullText,
      comments: [],
    };

    try {
      await api.createArticle({data: articleData});
      res.redirect(`/my`);
    } catch (error) {
      res.redirect(`/articles/add`);
    }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);
  res.render(`article-detail`, {article});
});

module.exports = articlesRouter;

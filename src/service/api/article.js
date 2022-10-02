'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleExists = require(`../middlewares/article-exists`);
const articleValidator = require(`../middlewares/article-validator`);
const commentValidator = require(`../middlewares/comment-validator`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await articleService.findAll();
    return res.status(HttpCode.OK).json(articles);
  });

  route.get(`/mother`, (req, res) => {
    let {counter = 0} = req.session;
    counter++;

    const welcomeText = `Это ваш первый визит на наш сайт.`;
    const text = `Вы посетили наш сайт уже ${counter} раз`;

    const message = counter === 1 ? welcomeText : text;
    req.session.counter = counter;
    console.log(req.session.counter);

    res.send(message);
  });

  route.get(`/:articleId`, articleExists(articleService), (req, res) => {
    const article = res.locals.article;

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, articleExists(articleService), (req, res) => {
    const {articleId} = req.params;

    const comments = commentService.findAll(articleId);

    res.status(HttpCode.OK)
      .json(comments);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, articleValidator, async (req, res) => {
    const {articleId} = req.params;

    const updated = await articleService.update(articleId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }
    return res.status(HttpCode.OK)
      .send(`Updated`);
  });

  route.delete(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;

    const article = await articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    const deletedArticle = await articleService.drop(articleId);

    if (!deletedArticle) {
      return res.status(HttpCode.FORBIDDEN)
        .send(`Forbidden`);
    }

    return res.status(HttpCode.OK)
      .json(deletedArticle);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExists(articleService), async (req, res) => {
    const {articleId, commentId} = req.params;

    const comment = await commentService.findOne(articleId, commentId);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    const deletedComment = await commentService.drop(articleId, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.FORBIDDEN)
        .send(`Forbidden`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], async (req, res) => {
    const {articleId} = req.params;

    const comment = await commentService.create(articleId, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};

'use strict';

const {customAlphabet} = require(`nanoid`);

const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }

  create(articleId, comment) {
    const article = this._articles.find((item) => item.id === articleId);

    const newComment = {id: customAlphabet('1234567890', MAX_ID_LENGTH)(), ...comment};

    article.comments.push(newComment);
    return newComment;
  }

  drop(articleId, commentId) {
    const article = this._articles.find((item) => item.id === articleId);
    const comment = article.comments.find((item) => item.id === commentId);

    if (!article || !comment) {
      return null;
    }

    article.comments = article.comments.filter((item) => item.id !== commentId);
    return comment;
  }

  findAll(articleId) {
    const article = this._articles.find((item) => item.id === articleId);
    return article.comments;
  }

  findOne(articleId, commentId) {
    const article = this._articles.find((item) => item.id === articleId);
    const comment = article.comments.find((item) => item.id === commentId);
    return comment;
  }
}

module.exports = CommentService;
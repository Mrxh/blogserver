'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/IndexArticleList', controller.home.IndexArticleList);

  router.post('/articleCreate', controller.article.create);

  router.post('/articleList', controller.article.articleList);
  router.get('/RecommendArticleList', controller.article.RecommendArticleList);
  router.get('/OrderArticleList', controller.article.OrderArticleList);
  router.get('/ArticleDetail/:id', controller.article.ArticleDetail);
  router.post('/LabelsArticle', controller.article.LabelsArticleList);

  router.post('/recomCreate', controller.recomlink.create);

  router.get('/recomList', controller.recomlink.RecomList);
  router.get('/labelsList', controller.labels.labelsList);

  router.post('/comCreate', controller.comment.create);
  router.get('/comList/:id', controller.comment.CommentList);

  router.post('/createMessage', controller.message.create);
  router.get('/MessageList', controller.message.MessageList);
};

'use strict';

const BaseController = require('./base');

class HomeController extends BaseController {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  // 查询主页相关
  async IndexArticleList() {
    const { ctx } = this;
    const { pageCount, arttype } = ctx.request.body;
    const LinkList = await ctx.model.Recomlink.find();
    let artList = [];
    let RecommendList = [];
    let OrderList = [];
    if (pageCount) {
      artList = await ctx.model.Article.find({ isRaise: 1, arttype }).limit(pageCount);
      RecommendList = await ctx.model.Article.find({ isRaise: 1, isRecommend: 1, arttype }).limit(5);
      OrderList = await ctx.model.Article.find({ isRaise: 1, arttype }).sort({ views: -1 }).limit(5);
    } else {
      artList = await ctx.model.Article.find({ isRaise: 1 }).skip(5).limit(10);
      RecommendList = await ctx.model.Article.find({ isRaise: 1, isRecommend: 1 }).skip(2).limit(5);
      OrderList = await ctx.model.Article.find({ isRaise: 1 }).sort({ views: -1 }).skip(5)
        .limit(5);
    }

    const LabelsList = await ctx.model.Labels.find().limit(10);
    let pages = 1;
    await ctx.model.Article.find({ isRaise: 1, arttype }).count({}, (err, count) => {
      pages = Math.ceil(count / pageCount);
    });
    const AllList = { LinkList, artList, RecommendList, OrderList, LabelsList, pages };
    this.success(AllList);
  }
}

module.exports = HomeController;

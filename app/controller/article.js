'use strict';
const BaseController = require('./base');
const marked = require('marked');
class ArticleController extends BaseController {
  // 查询主页文章
  async articleList() {
    const { ctx } = this;
    const { pageCount, page, aid, arttype } = ctx.request.body;
    let list = [];
    if (aid) {
      const reg = new RegExp(aid, 'i');
      list = await ctx.model.Article.find({ isRaise: 1, arttype }).where('label').regex(reg)
        .skip(pageCount * (page - 1))
        .limit(pageCount);
    } else {
      list = await ctx.model.Article.find({ isRaise: 1, arttype }).skip(pageCount * (page - 1)).limit(pageCount);
    }
    this.success(list);
  }
  // 查询推荐文章
  async RecommendArticleList() {
    const { ctx } = this;
    const list = await ctx.model.Article.find({ isRaise: 1, isRecommend: 1 }).limit(5);
    this.success(list);
  }
  // 查询排行榜文章
  async OrderArticleList() {
    const { ctx } = this;
    const list = await ctx.model.Article.find({ isRaise: 1 }).sort({ views: -1 }).limit(5);
    this.success(list);
  }
  // 查询文章内容
  async ArticleDetail() {
    const { ctx } = this;
    const { id } = ctx.params;
    const detail = await ctx.model.Article.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } });
    const ComList = await ctx.model.Comment.find({ articleId: id });
    const detailList = { detail, ComList };
    this.success(detailList);
  }
  // 查询标签文章
  async LabelsArticleList() {
    const { ctx } = this;
    const { aid, pageCount } = ctx.request.body;
    const reg = new RegExp(aid, 'i');
    const artlist = await ctx.model.Article.find({ isRaise: 1 }).where('label').regex(reg)
      .limit(pageCount);
    let pages = 1;
    await await ctx.model.Article.find({ isRaise: 1 }).where('label').regex(reg)
      .count({}, (err, count) => {
        pages = Math.ceil(count / pageCount);
      });
    this.success({ artlist, pages });
  }
  //
  // 创建文章
  async create() {
    const { ctx } = this;
    const { title, author, keywords, cover, tags, content, scontent, intro, arttype, isRaise, isRecommend } = ctx.request.body;
    const ccontent = scontent ? scontent : content;
    const obj = {
      title,
      author,
      label: tags,
      article: ccontent,
      article_html: marked(ccontent),
      intro,
      keywords,
      title_page_img: cover,
      arttype,
      isRaise: isRaise ? 1 : 0,
      isRecommend: isRecommend ? 1 : 0,
    };
    const ret = await ctx.model.Article.create(obj);

    tags.split(',').forEach(async item => {
      const findres = await ctx.model.Labels.find({ typename: item });
      if (findres.length === 0) {
        await ctx.model.Labels.create({ typename: item });
      } else {
        await ctx.model.Labels.update({ typename: item }, { $inc: { artnum: 1 } });
      }
    });
    if (ret._id) {
      this.success({
        id: ret._id,
        title: obj.title,
      });
    } else {
      this.error('创建失败');
    }
  }
}

module.exports = ArticleController;

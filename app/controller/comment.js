'use strict';

const BaseController = require('./base');

class CommentController extends BaseController {
  // 提交评论
  async create() {
    const { ctx } = this;
    const { nickname, email, content, articleId } = ctx.request.body;
    const obj = {
      nickname,
      email,
      content,
      articleId,
    };
    const ret = await ctx.model.Comment.create(obj);
    if (ret._id) {
      this.success({
        id: ret._id,
        nickname: obj.nickname,
      });
    } else {
      this.error('评论失败');
    }
  }
  // 查询评论相关
  async CommentList() {
    const { ctx } = this;
    const { id } = ctx.params;
    const ComList = await ctx.model.Comment.find({ articleId: id }).sort({ updatedAt: -1 });
    this.success(ComList);
  }
}

module.exports = CommentController;

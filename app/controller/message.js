'use strict';
const BaseController = require('./base');
class MessageController extends BaseController {
  async MessageList() {
    const { ctx } = this;
    const list = await ctx.model.Message.find();
    this.success(list);
  }
  async create() {
    const { ctx } = this;
    const { nickname, avtar, message } = ctx.request.body;
    const obj = {
      nickname,
      avtar,
      message,
    };
    const ret = await ctx.model.Message.create(obj);

    if (ret._id) {
      this.success({
        id: ret._id,
        nickname: obj.nickname,
      });
    } else {
      this.error('创建失败');
    }
  }
}

module.exports = MessageController;

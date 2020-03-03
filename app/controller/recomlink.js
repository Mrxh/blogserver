'use strict';
const BaseController = require('./base');
class RecomController extends BaseController {
  async RecomList() {
    const { ctx } = this;
    const list = await ctx.model.Recomlink.find();
    this.success(list);
  }
  async create() {
    const { ctx } = this;
    const obj = {
      title: '明天会更好',
      linkUrl: 'https://blog.csdn.net/qq_36538012/article/details/80177162',
      linkImg: 'img/carousel/Carousel_0004.jpg',
    };
    const ret = await ctx.model.Recomlink.create(obj);

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

module.exports = RecomController;

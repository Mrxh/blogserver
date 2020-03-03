'use strict';
const BaseController = require('./base');
class LabelsController extends BaseController {
  // 查询主页文章
  async labelsList() {
    const { ctx } = this;
    const list = await ctx.model.Labels.find().limit(10);
    this.success(list);
  }
}

module.exports = LabelsController;

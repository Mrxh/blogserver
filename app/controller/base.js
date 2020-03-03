'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  // 提供成功数据
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  // 成功消息
  message(msg) {
    this.ctx.body = {
      code: 0,
      message: msg,
    };
  }
  // 失败消息
  error(msg, code = -1) {
    this.ctx.body = {
      code,
      message: msg,
    };
  }
}

module.exports = BaseController;

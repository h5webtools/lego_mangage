'use strict';

const Service = require('egg').Service;

class ActDetailService extends Service {
  async aisleService(url, data) {
    // 获取目标环境IP和微服务信息
    let result = await this.ctx.helper.sendNormalRequest(url, data);
    return result;
  }
}

module.exports = ActDetailService;

'use strict';

const Service = require('egg').Service;

class ActDetailService extends Service {
  async aisleService(url, data) {
    // 获取目标环境IP和微服务信息
    let result = await this.ctx.helper.sendNormalRequest(url, data);
    return result;
  }
  async GetActivityDraftConfig(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actLegoConfig', 'GetActivityDraftConfig');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }
}

module.exports = ActDetailService;

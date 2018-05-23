'use strict';

const Service = require('egg').Service;

class CmdListService extends Service {
  async aisleService(url, data) {
    // 获取目标环境IP和微服务信息
    let result = await this.ctx.helper.sendNormalRequest(url, data);
    return result;
  }
  async GetEvent(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actLegoConfig', 'GetEvent');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }
  async AddOrUpdateEvent(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actLegoConfig', 'AddOrUpdateEvent');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }
  async GetActEvent(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actLegoConfig', 'GetActEvent');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }
}

module.exports = CmdListService;

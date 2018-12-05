'use strict';

const Service = require('egg').Service;

class EntryService extends Service {
  async getUserGroup(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'userGroupList');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }
}

module.exports = EntryService;

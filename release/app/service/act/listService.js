'use strict';

const Service = require('egg').Service;

class ActListService extends Service {
  async aisleService(url, data) {
    let result = await this.ctx.helper.sendNormalRequest(url, data);
    return result;
  }
}

module.exports = ActListService;

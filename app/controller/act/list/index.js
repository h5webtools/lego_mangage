'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

class ActListController extends Controller {
  async getActList() {
    let actList = await this.service.act.listService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = actList;
  }
  async updateActStatus() {
    let statusRet = await this.service.act.listService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async manual() {
    let manual = await this.service.act.listService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = manual;
  }
  async getShowList() {
    let getShowList = await this.service.act.listService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = getShowList;
  }
}

module.exports = ActListController;
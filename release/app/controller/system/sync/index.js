'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

class SystemListController extends Controller {
  async getSyncList() {
    let getSyncList = await this.service.system.systemService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = getSyncList;
  }
  async savePostSync() {
    let savePostSync = await this.service.system.systemService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = savePostSync;
  }
  async tblSync() {
    let tblSync = await this.service.system.systemService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = tblSync;
  }
}

module.exports = SystemListController;
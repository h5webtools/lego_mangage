'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

class CmdListController extends Controller {
  async getCmdList() {
    let cmdListRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = cmdListRet;
  }
  async saveCmd() {
    let saveRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveRet;
  }
}

module.exports = CmdListController;
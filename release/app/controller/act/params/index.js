'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

class CmdListController extends Controller {
  async getFilterList() {
    let filterListRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = filterListRet;
  }
  async saveParam() {
    let saveRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveRet;
  }
  async deleteParam() {
    let deleteRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = deleteRet;
  }
  async saveFilter() {
    let saveRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveRet;
  }
  async queryGetComponentTemplate() {
    let queryGetComponentTemplate = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = queryGetComponentTemplate;
  }
  async saveComponentTemplate() {
    let saveComponentTemplate = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveComponentTemplate;
  }
  async queryGetCmds() {
    let queryGetCmds = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = queryGetCmds;
  }
  async savePostCmd() {
    let savePostCmd = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = savePostCmd;
  }
  async hideLogicItem() {
    let hideLogicItem = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = hideLogicItem;
  }
}

module.exports = CmdListController;
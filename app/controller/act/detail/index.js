'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

class ActDetailController extends Controller {
  async getActDetail() {
    let actDetailRet = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = actDetailRet;
  }
  async getTestEngineer() {
    let testEngine = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = testEngine;
  }
  async saveActDetail() {
    let saveRet = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveRet;
  }
  async getActChannels() {
    let channelRet = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = channelRet;
  }
  async saveActChannel() {
    let saveRet = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveRet;
  }
  async relateActAndPage() {
    let relateRet = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = relateRet;
  }
}

module.exports = ActDetailController;
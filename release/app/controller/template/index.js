'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../constant/errCode');

class TempChainController extends Controller {
  async getLegoChains() {
    let getLegoChains = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = getLegoChains;
  }
  async SaveChainsByComponentTemplate() {
    let statusRet = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async saveComponentTemplateChains() {
    let statusRet = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async getComponentTemplateChains() {
    let statusRet = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async getCmdList() {
    let statusRet = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async getRuleActionList() {
    let statusRet = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async getChainTree() {
    let statusRet = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async getActTrees() {
    let statusRet = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async saveCmdChains() {
    let statusRet = await this.service.template.tempService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
}

module.exports = TempChainController;
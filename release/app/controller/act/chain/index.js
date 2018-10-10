'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

class ActChainController extends Controller {
  async getLegoChains() {
    let legoChainRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = legoChainRet;
  }
  async saveChainsByComponentTemplate() {
    let saveRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveRet;
  }
  async postComponentTemplateChains() {
    let postRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = postRet;
  }
  async getComponentTemplateChains() {
    let getCTCRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = getCTCRet;
  }
  async getCmds() {
    let cmdListRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = cmdListRet;
  }
  async getRulesAndActions() {
    let ruleactionList = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = ruleactionList;
  }
  async getActTrees() {
    let actTree = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = actTree;
  }
  async saveCmdChains() {
    let saveRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveRet;
  }
  async getChains() {
    let chainRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = chainRet;
  }
  async getComponentTemplates() {
    let chainRet = await this.service.cmd.cmdService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = chainRet;
  }
}

module.exports = ActChainController;
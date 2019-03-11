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
  async getSingles() {
    this.ctx.body = await this.service.act.detailService.legoMicroService(this.ctx.request.rawBody, 'GetSingleFiles');
  }

  async PutSingles() {
    if(this.ctx.request.rawBody instanceof Object){
      this.ctx.request.rawBody.creator = this.ctx.session.userid;
    }
    this.ctx.body = await this.service.act.detailService.legoMicroService(this.ctx.request.rawBody, 'PutSingleFiles');
  }

  async GetSingleParams() {
  this.ctx.body = await this.service.act.detailService.legoMicroService(this.ctx.request.rawBody, 'GetSingleParams');
  }

  async PutSingleParams() {
      this.ctx.body = await this.service.act.detailService.legoMicroService(this.ctx.request.rawBody, 'PutSingleParams');
  }

  async GetActSingleConfig() {
      this.ctx.body = await this.service.act.detailService.legoMicroService(this.ctx.request.rawBody, 'GetActSingleConfig');
  }

  async PostSingleConf() {
      this.ctx.body = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
  }

  async saveActChannel() {
    let saveRet = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = saveRet;
  }
  async relateActAndPage() {
    let relateRet = await this.service.act.detailService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = relateRet;
  }
  //获取副本信息
  async GetActivityDraftConfig() {
    let activityConfigRet = await this.service.act.detailService.GetActivityDraftConfig(this.ctx.request.rawBody);
    this.ctx.body = activityConfigRet;
  }
}

module.exports = ActDetailController;

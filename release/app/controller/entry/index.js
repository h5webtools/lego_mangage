'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../constant/errCode');

class EntryModuleController extends Controller {

  async getUserGroup(data) {
    let rawBody = this.ctx.request.rawBody;
    let userGroupListsRet = await this.service.entry.entryService.getUserGroup(this.ctx.request.rawBody);
    this.ctx.body = userGroupListsRet;
  }

  async getEntranceConf() {
      let entranceConfRet = await this.service.entry.entryService.getEntranceConf({});
      this.ctx.body = entranceConfRet;
    }
    //获取活动信息
  async getActivityConfig() {
    let activityConfigRet = await this.service.entry.entryService.getActivityConfig(this.ctx.request.rawBody);
    this.ctx.body = activityConfigRet;
  }

  //删除候补计划
  async deleteEntrancePlan() {
    let deleteEntrancePlanRet = await this.service.entry.entryService.deleteEntrancePlan(this.ctx.request.rawBody);
    this.ctx.body = deleteEntrancePlanRet;
  }

  //获取入口配置详情
  async getEntranceDetail() {
    let getEntranceDetailRet = await this.service.entry.entryService.getEntranceDetail(this.ctx.request.rawBody);
    this.ctx.body = getEntranceDetailRet;
  }

  //修改候补计划
  async postEntrancePlan() {
    let postEntrancePlanRet = await this.service.entry.entryService.postEntrancePlan(this.ctx.request.rawBody);
    this.ctx.body = postEntrancePlanRet;
  }

  //修改候补计划
  async putEntrancePlan() {
    let putEntrancePlanRet = await this.service.entry.entryService.putEntrancePlan(this.ctx.request.rawBody);
    this.ctx.body = putEntrancePlanRet;
  }

  //获取候补计划
  async getEntrancePlanList() {
    let getEntrancePlanListRet = await this.service.entry.entryService.getEntrancePlanList(this.ctx.request.rawBody);
    this.ctx.body = getEntrancePlanListRet;
  }

  //下架入口
  async postEntranceShelves() {
    let postEntranceShelvesRet = await this.service.entry.entryService.postEntranceShelves(this.ctx.request.rawBody);
    this.ctx.body = postEntranceShelvesRet;
  }

  //获取icon列表
  async getIconEntranceDetail() {
    let iconEntranceDetailRet = await this.service.entry.entryService.getIconEntranceDetail({});
    this.ctx.body = iconEntranceDetailRet;
  }


}

module.exports = EntryModuleController;

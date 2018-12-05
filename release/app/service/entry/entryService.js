'use strict';

const Service = require('egg').Service;

class EntryService extends Service {
  async getUserGroup(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'userGroupList');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }

  async getEntranceConf(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'entranceConf');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }

  async getActivityConfig(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'activityConfig');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }

  async deleteEntrancePlan(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'deleteEntrancePlan');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }

  async getEntranceDetail(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'getEntranceDetail');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }

  async putEntrancePlan(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'putEntrancePlan');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }

  async postEntrancePlan(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'postEntrancePlan');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }


  /**
   * 
   * @param {*} param 
   */
  async getEntrancePlanList(param) {
      // 获取目标环境IP和微服务信息
      let env = await this.ctx.helper.envHelper('actEntryConfig', 'getEntrancePlanList');
      let result = await this.ctx.helper.sendRequest(env, param);
      return result;
    }
    /*
     */
  async postEntranceShelves(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'postEntranceShelves');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }

  async getIconEntranceDetail(param) {
    // 获取目标环境IP和微服务信息
    let env = await this.ctx.helper.envHelper('actEntryConfig', 'getIconEntranceDetail');
    let result = await this.ctx.helper.sendRequest(env, param);
    return result;
  }

}

module.exports = EntryService;

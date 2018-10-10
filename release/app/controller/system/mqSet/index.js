'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

class MqListController extends Controller {
    //获取mq列表
    async GetEvent() {
      let GetEvent = await this.service.system.systemService.GetEvent(this.ctx.request.rawBody);
      this.ctx.body = GetEvent;
    }
    //mq事件添加、编辑
    async AddOrUpdateEvent() {
      let AddOrUpdateEvent = await this.service.system.systemService.AddOrUpdateEvent(this.ctx.request.rawBody);
      this.ctx.body = AddOrUpdateEvent;
    }
    //活动MQ事件管理
    async GetActEvent() {
      let GetActEvent = await this.service.system.systemService.GetActEvent(this.ctx.request.rawBody);
      this.ctx.body = GetActEvent;
    }
}

module.exports = MqListController;
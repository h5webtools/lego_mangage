'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../constant/errCode');

class CommonModuleController extends Controller {
  async getUserList() {
    try {
      let userListRet = await this.service.common.commonService.queryUserList();
      this.ctx.body = {
        code: 0,
        data: userListRet
      }
    } catch(e) {
      this.ctx.body = {
        code: errCode.GET_USER_LIST_FAILED,
        msg: e.message
      }
    }
  }
  async getCouponList() {
    let couponListRet = await this.service.common.commonService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = couponListRet;
  }
  async getOptLogs() {
    let getOptLogs = await this.service.common.commonService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = getOptLogs;
  }
}

module.exports = CommonModuleController;
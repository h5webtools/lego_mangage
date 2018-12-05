'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../constant/errCode');

class EntryModuleController extends Controller {
  async getUserGroup(data) {
    let rawBody = this.ctx.request.rawBody;
    let userGroupListsRet = await this.service.entry.actlistService.getUserGroup({});
    this.ctx.body = userGroupListsRet;
  }
}

module.exports = EntryModuleController;

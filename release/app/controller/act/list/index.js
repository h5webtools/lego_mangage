'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

const SYNC_FAILED = 150010;

class ActListController extends Controller {
  async getActList() {
    let actList = await this.service.act.listService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = actList;
  }
  async updateActStatus() {
    let statusRet = await this.service.act.listService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = statusRet;
  }
  async manual() {
    let raw = this.ctx.request.rawBody;
    let page_id = raw.page_id;
    let promiseAll = [];

    if(page_id.length > 0) {
      page_id.forEach(page => {
        promiseAll.push(Promise.resolve(this.service.act.listService.aisleService('/ActivitySynConf/LegoPage', {
          page_id: page
        })));
      });
    }
    promiseAll.push(Promise.resolve(this.service.act.listService.aisleService(this.ctx.request.url, this.ctx.request.rawBody)));
    let result = await Promise.all(promiseAll);
    let success = result.filter(ret => {
      return ret.code == 0;
    })
    if(success.length == result.length) {
      this.ctx.body = {
        code: 0,
        msg: '同步成功'
      }
    } else if(success.length != 0) {
      this.ctx.body = {
        code: SYNC_FAILED,
        msg: '页面同步部分成功，请重试'
      }
    }
  }
  async getShowList() {
    let getShowList = await this.service.act.listService.aisleService(this.ctx.request.url, this.ctx.request.rawBody);
    this.ctx.body = getShowList;
  }
}

module.exports = ActListController;
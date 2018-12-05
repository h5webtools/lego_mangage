'use strict';

const Service = require('egg').Service;

class CommonModuleService extends Service {
  async aisleService(url, data) {
    // 获取目标环境IP和微服务信息
    let result = await this.ctx.helper.sendNormalRequest(url, data);
    return result;
  }
  async queryUserList() {
    const queryResult = await this.app.mysql.get('dbMain').select('t_user', {
      columns: ['user_id', 'user_account', 'user_name']
    });
    return queryResult;
  }
  async insertOperateLog(pageId, msg) {
    let insertRet = await this.app.mysql.get('dbLego').insert('tb_log', {
      user_name: this.ctx.session.userAccount,
      page_id: pageId,
      action_opt: msg,
      time: this.app.mysql.literals.now
    });
    return insertRet.affectedRows == 1;
  }
}

module.exports = CommonModuleService;

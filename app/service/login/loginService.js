'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(user, pwd) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const queryResult = await this.app.mysql.get('dbMain').get('t_user', {user_account: user, user_pwd: pwd});
    return queryResult;
  }
}

module.exports = UserService;

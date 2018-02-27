'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(user, pwd) {
    const queryResult = await this.app.mysql.get('dbMain').get('t_user', {user_account: user, user_pwd: pwd});
    return queryResult;
  }
  /**
   * @description 查询用户角色
   * @param {*} userId 
   */
  async findRole(userId) {
    const queryResult = await this.app.mysql.get('dbMain').get('t_user_role', {user_id: userId});
    return queryResult;
  }
}

module.exports = UserService;

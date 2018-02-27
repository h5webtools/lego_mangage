'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../constant/errCode');

class AuthController extends Controller {
  async loginPage() {
    await this.ctx.render('login/login', {
      keywords: '加油宝,乐高,管理系统',
      description: '加油宝乐高配置管理系统',
      title: '登录'
    });
  }
  async doLogin() {
    let rawBody = this.ctx.request.rawBody;
    const user = rawBody.username;
    const pwd = rawBody.password;
    const match = await this.service.login.loginService.find(user, pwd);
    if(match) {
      try {
        const role = await this.service.login.loginService.findRole(match.user_id);
        if(role) {
          // 刷新csrftoken的值
          this.ctx.rotateCsrfSecret();
          // 写session
          this.ctx.session.userid = match.user_id;
          this.ctx.session.userName = match.user_name;
          this.ctx.session.userAccount = match.user_account;
          this.ctx.session.role = role.role_id;
          // 登录成功
          this.ctx.body = errCode.LOGIN_SUCCESS;
        }
      } catch(e) {
        this.ctx.logger.error('查询用户角色失败'+ e.message);
        this.ctx.body = errCode.ROLE_FAILED;
      }
    } else {
      // 登录失败，用户名密码错误
      this.ctx.body = errCode.LOGIN_INVALID_PARAM;
    }
  }
  async loginOut() {
    this.ctx.session = null;
    this.ctx.redirect('/login');
  }
}

module.exports = AuthController;

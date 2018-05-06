'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../constant/errCode');

class AuthController extends Controller {
  async loginPage() {
    if(this.ctx.session.passportJyb && this.ctx.session.passportJyb.user_id) {
      this.ctx.redirect('/');
      return;
    }

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
    // const match = await this.service.login.loginService.find(user, pwd);

    const match = await this.ctx.passportLogin({
      username: user,
      password: pwd
    })
    if(match) {
      const operateUser = match.operateUser;
      try {
        const roleList = await this.service.login.loginService.findRole(operateUser.userId);
        if(roleList) {
          // 刷新csrftoken的值
          this.ctx.rotateCsrfSecret();
          // 写session， 兼容老版本中用的session
          this.ctx.session.userid = operateUser.userId;
          this.ctx.session.userName = operateUser.userName;
          this.ctx.session.userAccount = operateUser.userAccount;
          this.ctx.session.userEmail = operateUser.email;
          this.ctx.logger.info('用户信息：'+ JSON.stringify(match));
          this.ctx.session.roles = roleList.map(role => {
            return role.role_id;
          });
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

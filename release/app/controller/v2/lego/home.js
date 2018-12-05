"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    // const userId = this.ctx.session.userid;
    // const userName = this.ctx.session.userName;
    // if (!userId || !userName) {
    //   this.ctx.redirect("/login");
    //   return;
    // }
    const operateUser = this.ctx.session.passportJyb.operateUser;
    
    const menu = await this.ctx.passportGetMenu(); 
    


    if(!this.ctx.session.userid) {
      this.ctx.session.userid = operateUser.userId;
      this.ctx.session.userName = operateUser.userName;
      this.ctx.session.userAccount = operateUser.userAccount;
      this.ctx.session.userEmail = operateUser.email;
    }

    if(!this.ctx.session.roles) {
      const roleList = await this.service.login.loginService.findRole(operateUser.userId);
      if(roleList) {
        this.ctx.session.roles = roleList.map(role => {
          return role.role_id;
        });
      }
    }

    let roleMap = this.config.userRole,
        userRoles = this.ctx.session.roles || [],
        userInfo = {
          userid: operateUser.userId,
          userName: operateUser.userName,
          userAccount: operateUser.userAccount,
          email: operateUser.email
        };
    
    // 遍历角色
    for (let role in roleMap) {
      userInfo["is" + role.replace(/\w/, ($1, $2, $3, $4) => $1.toUpperCase())] = userRoles.some(ur => {
        return roleMap[role].indexOf(Number(ur)) != -1
      })
    }
    await this.ctx.render('legoEditV2/edit.html', {
      keywords: '加油宝,乐高,编辑页面',
      description: '加油宝,乐高,编辑页面',
      title: '乐高管理系统',
      userInfo: JSON.stringify(userInfo),
      env: this.app.config.env
    });
  }
}

module.exports = HomeController;

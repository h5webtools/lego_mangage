"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const passportJyb = this.ctx.session.passportJyb;
    if (passportJyb) {
      const portUserId = passportJyb.user_id;
      const operateUser = await this.ctx.service.portal.user.findByPortalUserId(portUserId);
      this.ctx.logger.info(operateUser,'--------------------------->operateUser');

      const userMenuData = await this.ctx.service.portal.auth.getUserMenu(passportJyb.ticket.ticket);
      let userMenu = [];
      if (userMenuData.code == 0) {
        userMenu = userMenuData.data;
      }

      if(!this.ctx.session.userid) {
        this.ctx.session.userid = operateUser.user_id;
        this.ctx.session.userName = operateUser.user_name;
        this.ctx.session.userAccount = operateUser.user_account;
        this.ctx.session.userEmail = operateUser.mail;
      }

      if(!this.ctx.session.roles) {
        const roleList = await this.service.login.loginService.findRole(operateUser.user_id);
        if(roleList) {
          this.ctx.session.roles = roleList.map(role => {
            return role.role_id;
          });
        }
      }

      let roleMap = this.config.userRole,
          userRoles = this.ctx.session.roles || [],
          userInfo = {
            userid: operateUser.user_id,
            userName: operateUser.user_name,
            userAccount: operateUser.user_account,
            email: operateUser.mail
          };
      
      // 遍历角色
      for (let role in roleMap) {
        userInfo["is" + role.replace(/\w/, ($1, $2, $3, $4) => $1.toUpperCase())] = userRoles.some(ur => {
          return roleMap[role].indexOf(Number(ur)) != -1
        })
      }
      await this.ctx.render("layout/layout", {
        keywords: "加油宝,乐高,管理系统",
        description: "加油宝乐高管理系统",
        title: "乐高管理系统",
        menuList: JSON.stringify(userMenu),
        userInfo: JSON.stringify(userInfo),
        env: this.app.config.env
      });
    }
    
  }
}



module.exports = HomeController;

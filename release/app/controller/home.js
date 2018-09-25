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

    /* const menu = [
      {
        // TODO 这个菜单从运营系统获取
        menu_name: "活动配置管理",
        icon: "iconfont icon-lihe",
        children: [
          {
            menu_name: "活动列表",
            menu_url: "/act/list",
            menu_id: "101"
          },
          {
            menu_name: "新增活动",
            menu_url: "/act/edit",
            menu_id: "102"
          },
          {
            menu_name: "命令字管理",
            menu_url: "/act/cmdList",
            menu_id: "103"
          },
          {
            menu_name: "规则/动作管理",
            menu_url: "/act/paramsList",
            menu_id: "104"
          }
        ]
      },
      {
        menu_name: "页面配置管理",
        icon: "iconfont icon-wenjian",
        children: [
          {
            menu_name: "乐高页面列表",
            menu_url: "/lego/pageList",
            menu_id: "701"
          },
          {
            menu_name: "乐高组件集合",
            menu_url: "/lego/componentList",
            menu_id: "702"
          }
        ]
      },
      {
        menu_name: "组件模板管理",
        icon: "iconfont icon-guanzhu",
        children: [
          //   {
          //   menu_name: '活动模板',
          //   menu_url: '/template/actList',
          //   menu_id: '201'
          // },
          {
            menu_name: "规则树模板",
            menu_url: "/template/templateList",
            menu_id: "202"
          }
          // , {
          //   menu_name: '新增规则模板',
          //   menu_url: '/template/newTree',
          //   menu_id: '203'
          // }
        ]
      },
      {
        menu_name: "活动入口配置",
        icon: "iconfont icon-ziyouhuodong",
        children: [
          {
            menu_name: "入口配置列表",
            menu_url: "/entry/list",
            menu_id: "401"
          },
          {
            menu_name: "入口活动列表",
            menu_url: "/entry/entryActList",
            menu_id: "402"
          }
        ]
      }
    ]; */
    // menu.push({
    //   menu_name: "系统设置",
    //   icon: "iconfont icon-shezhi",
    //   children: [
    //     {
    //       menu_name: "MQ配置",
    //       menu_url: "/system/setMQ",
    //       menu_id: "502"
    //     }
    //   ]
    // });

    if (this.ctx.session.passportJyb) {

      const portUserId = this.ctx.session.passportJyb.user_id;
    
      const menu = await this.ctx.passportGetMenu('', '', 3, portUserId); 
      // 自定义修改需要加入的路由
      if (this.app.config.env == "sit" || this.app.config.env == "local") {
        let  find = false;
        menu.forEach((item) => {
          if (item.menu_code == 'legoSystem'){
            find = true;
            item.children.push({
                menu_name: "同步配置",
                menu_url: "/system/sync",
                menu_id: "501"
              });
          }
        })


        if(!find) {
          menu.push({
            menu_name: "系统设置",
            icon: "iconfont icon-shezhi",
            children: [
              {
                menu_name: "同步配置",
                menu_url: "/system/sync",
                menu_id: "501"
              }
            ]
          });
        }

      }

    

      if(!this.ctx.session.userid) {
        this.ctx.session.userid = this.ctx.session.passportJyb.user_id;
        this.ctx.session.userName = this.ctx.session.passportJyb.name;
        this.ctx.session.userAccount = this.ctx.session.passportJyb.userAccount;
        this.ctx.session.userEmail = this.ctx.session.passportJyb.email;
      }

      if(!this.ctx.session.roles) {
        const roleList = await this.service.login.loginService.findRole(portUserId);
        if(roleList) {
          this.ctx.session.roles = roleList.map(role => {
            return role.role_id;
          });
        }
      }

      let roleMap = this.config.userRole,
          userRoles = this.ctx.session.roles || [],
          userInfo = {
            userid: this.ctx.session.passportJyb.user_id,
            userName: this.ctx.session.passportJyb.name,
            userAccount: this.ctx.session.passportJyb.userAccount,
            email: this.ctx.session.passportJyb.email
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
        menuList: JSON.stringify(menu),
        userInfo: JSON.stringify(userInfo),
        env: this.app.config.env
      });
    }
    
  }
}

module.exports = HomeController;

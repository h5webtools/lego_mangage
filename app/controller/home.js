'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const userId = this.ctx.session.userid;
    const userName = this.ctx.session.userName;
    if(!userId || !userName) {
      this.ctx.redirect('/login');
      return;
    }
    await this.ctx.render('layout/layout', {
      keywords: '加油宝,乐高,管理系统',
      description: '加油宝乐高管理系统',
      title: '乐高管理系统',
      menuList: JSON.stringify([{   // TODO 这个菜单从运营系统获取
        menu_name: '活动管理',
        icon: 'glyphicon glyphicon-th-list',
        children: [{
          menu_name: '活动列表',
          menu_url: '/act/list',
          menu_id: '101'
        }, {
          menu_name: '新增活动',
          menu_url: '/act/edit',
          menu_id: '102'
        }, {
          menu_name: '命令字管理',
          menu_url: '/act/cmdList',
          menu_id: '103'
        }, {
          menu_name: '规则/动作管理',
          menu_url: '/act/paramsList',
          menu_id: '104'
        }]
      }, {  
        menu_name: '模板管理',
        icon: 'glyphicon glyphicon-copy',
        children: [
        //   {
        //   menu_name: '活动模板',
        //   menu_url: '/template/actList',
        //   menu_id: '201'
        // }, 
        {
          menu_name: '规则树模板',
          menu_url: '/template/templateList',
          menu_id: '202'
        }
        // , {
        //   menu_name: '新增规则模板',
        //   menu_url: '/template/newTree',
        //   menu_id: '203'
        // }
      ]
      }, {   
        menu_name: '乐高资源管理',
        icon: 'glyphicon glyphicon-list-alt',
        children: [{
          menu_name: '乐高页面列表',
          menu_url: '/lego/pageList',
          menu_id: '701'
        }, {
          menu_name: '乐高组件集合',
          menu_url: '/lego/componentList',
          menu_id: '702'
        }]
      }, {   
        menu_name: '活动入口配置',
        icon: 'glyphicon glyphicon-tasks',
        children: [{
          menu_name: '入口配置列表',
          menu_url: '/entry/list',
          menu_id: '401'
        }, {
          menu_name: '新增入口配置',
          menu_url: '/entry/new',
          menu_id: '402'
        }, {
          menu_name: '入口审批列表',
          menu_url: '/entry/audit',
          menu_id: '403'
        }]
      }, {
        menu_name: '系统设置',
        icon: 'glyphicon glyphicon-wrench',
        children: [{
          menu_name: '同步配置',
          menu_url: '/system/sync',
          menu_id: '501'
        }]
      }]),
      userInfo: JSON.stringify({
        userid: this.ctx.session.userid,
        userName: this.ctx.session.userName,
        userAccount: this.ctx.session.userAccount
      })
    });
  }
}

module.exports = HomeController;
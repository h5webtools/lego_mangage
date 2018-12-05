'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');
const path = require('path');
const fs = require('fs-extra');
const packageJson = require('../lego/template/package.json');

const QUERY_DATABASE_FAILED = 720010; // 查询数据库失败
const INSERT_DATABASE_FAILD = 720011; // 插入数据库失败

class LegoEditController extends Controller {
  async index() {
    // const user_id = this.ctx.session.user_id;
    // const userName = this.ctx.session.userName;
    // if (!user_id || !userName) {
    //   this.ctx.redirect("/login");
    //   return;
    // }
    console.log('--+++', JSON.stringify(this.ctx.session));
    //const operateUser = this.ctx.session.passportJyb.operateUser;

    const portUserId = this.ctx.session.passportJyb.user_id;
    const operateUser = await this.ctx.service.portal.user.findByPortalUserId(portUserId);
    this.ctx.logger.info(operateUser,'--------------------------->operateUser');

    if(!this.ctx.session.user_id) {
      this.ctx.session.userId = operateUser.user_id;
      this.ctx.session.userName = operateUser.user_name;
      this.ctx.session.userAccount = operateUser.user_account;
      this.ctx.session.userEmail = operateUser.email;
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
          user_id: operateUser.user_id,
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
      env: this.app.config.env,
    });
  }
  // 重新写package.json
  async rewritePackage(actPath) {
    // 读取package.json
    try {
      this.ctx.logger.info('写入package.json文件');
      let writeRet = fs.writeFileSync(`${actPath}/package.json`, JSON.stringify(packageJson), 'utf-8');
      // 写文件有问题
      if(writeRet) {
        this.ctx.logger.error('创建package.json文件失败');
        this.ctx.body = {
          code: WRITE_DEPENDENCYFILE_FAILED,
          msg: '创建package.json文件失败'
        }
        return;
      }
    } catch(e) {
      this.ctx.logger.error('生成package.json文件失败 '+ e.message);
      this.ctx.body = {
        code: WRITE_DEPENDENCYFILE_FAILED,
        msg: e.message
      }
      return;
    }
  }
  async savePageBasicInfo() {
    this.ctx.logger.info(this.ctx.request.rawBody);
    
    let raw = this.ctx.request.rawBody,
        pageMenu = raw.pageMenu,
        pageTitle = raw.pageTitle,
        now = await this.ctx.helper.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        dateFolder = await this.ctx.helper.dateFormat('yyyyMM00', new Date());
        packageJson.name = pageMenu;
        packageJson.description = pageTitle;
    try {
      let ret;
      if(raw.pageId) {
        ret = await this.service.lego.legoV2Service.updatePageBasicInfo({
          pageId: raw.pageId,
          pageMenu: raw.pageMenu,
          pageTitle: raw.pageTitle,
          updateTime: await this.ctx.helper.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
          user: this.ctx.session.userAccount
        });
        this.rewritePackage(`${this.config.legoConfigV2.LegoActPath}/development/${dateFolder}/${pageMenu}/`);
        fs.copySync(`${this.config.legoConfigV2.LegoManagerPath}/legoTemplate`,
         `${this.config.legoConfigV2.LegoActPath}/development/${dateFolder}/${pageMenu}/`);

        this.ctx.body = {
          code: ret ? 0 : INSERT_DATABASE_FAILD,
          msg: ret ? '' : '更新基本信息失败'
        }

      } else {
        ret = await this.service.lego.legoV2Service.insertPageBasicInfo({
          pageTitle: pageTitle,
          pageMenu: pageMenu,
          dateFolder: dateFolder,
          updateTime: await this.ctx.helper.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
          user: this.ctx.session.userAccount
        });
        //  初始化工程项目 复制模板结构到指定的目录
        fs.copySync(`${this.config.legoConfigV2.LegoManagerPath}/legoTemplate`,
         `${this.config.legoConfigV2.LegoActPath}/development/${dateFolder}/${pageMenu}/`);
        //  初始化package.json数据
        //rewritePackage(`${this.config.legoConfigV2.LegoActPath}/development/${dateFolder}/${pageMenu}/`);
        //fs.copySync(path.resolve(__dirname, '..' , 'legoTemplate'), `/Users/zhaoshali/work/www/lego/ lego_act/development/${dateFolder}/${pageMenu}/`);
        this.ctx.body = {
          code: 0,
          data: {
            pageId: ret.insertId,
            dateFolder: dateFolder
          }
        }

      }


    } catch(e) {
      this.ctx.logger.info('更新页面配置失败'+ e.message);
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: e.message()
      }
    }
  }
}

module.exports = LegoEditController;
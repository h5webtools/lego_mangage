'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');
const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');



const DELETE_LOCK_KEY_FAILED = 610007;    // redis删除锁失败
const EMPTY_LOCK_DATA = 610008; // 没有获取到锁
const EMPTY_ACT_ID = 610009;    // 活动号为空
const INSTALL_FAILED = 610010; // 安装依赖失败
const INSTALL_FILE_NOT_EXIST = 610011; // package.json文件不存在
const READ_TEMPLATE_FAILED = 610012; // 读取模板文件失败
const WRITE_ACT_ENTRYFILE_FAILED = 610013; // 写js文件模板失败
const WRITE_DEPENDENCYFILE_FAILED = 610021; // 写package.json依赖文件失败
const CREATE_WEBPACK_ENV_FAILED = 610014; // 创建webpack指定环境
const MKDIR_FAILED = 610015; // 创建目录失败
const TRANSLATE_OLD_PATH_FAILED = 610016; // 迁移老文件失败
const CREATE_ACT_PAGE_FAILED = 610017; // 创建活动页面失败
const WEBPACK_CPMPILE_FAILED = 610018; // jfet编译失败
const SUBMIT_GIT_FAILED = 610019; // 提交git仓库失败
const CREATE_RELEASETASK_FAILED = 610020; // 创建发布单失败
const QUERY_DATABASE_FAILED = 710010; // 查询数据库失败
const INSERT_DATA_FAILED = 710011;    // 插入数据库失败
const UPDATE_DATA_FAILED = 710012;    // 更新数据失败
const ACT_DIR_EXIST = 710013;         // 活动目录有冲突
const COPY_ACT_PAGE_FAILED = 710014;  // 拷贝新页面失败
const RELATE_PAGE_ACT_FAILED = 810010;  // 关联页面和活动号失败
const PAGE_ID_NOT_EXIST = 810011;       // 活动页面不存在

const globalReg = {
  errBeginReg : /===== ERROR_START =====/g,
  errEndReg : /===== ERROR_END =====/g
}

class LegoIndexController extends Controller {
  async index() {
    // 菜单暂时不做缓存， 因为可能被修改， 到时候不同步

    const operateUser = this.ctx.session.passportJyb.operateUser;
    if(!this.ctx.session.userid) {
      this.ctx.session.userid = operateUser.userId;
      this.ctx.session.userName = operateUser.userName;
      this.ctx.session.userAccount = operateUser.userAccount;
      this.ctx.session.userEmail = operateUser.email;
    }
    
    await this.ctx.render('legoEditV2/demo', {
      keywords: '加油宝,乐高,编辑页面',
      description: '加油宝,乐高,编辑页面',
      title: '乐高管理系统',
      userInfo: JSON.stringify(userInfo)
    });
  }

  async getLegoThemeColor() {
    this.ctx.logger.info('获取乐高颜色主题配置');
    try {
      let themeList = await this.service.lego.legoService.queryThemeList();
      this.ctx.body = {
        code: 0,
        data: {
          theme_list: themeList
        }
      }
    } catch(e) {
      this.ctx.logger.info('获取乐高颜色主题配置失败'+ e.message());
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: e.message()
      }
    }
  }

  async publishSit() { // 乐高打包
    this.ctx.logger.info(this.config.legoConfigV2.path);
    let raw = this.ctx.request.rawBody;
    let pageContent = raw.pageContent;

    this.ctx.logger.info(raw);
    
    //let previewTem = fs.readFileSync(`${this.config.legoConfigV2.path}/pages/index/index.js`);

    //let replacePreviewData = previewTem.toString().replace("LEGOCONFIG", pageContent);

    //this._replaceJsTemplate(`${this.config.legoConfigV2.path}/pages/index/`,pageContent );
    this._replaceJsTemplate(`${this.config.legoConfigV2.LegoActPath}/development/${raw.dateFolder}/${raw.pageMenu}/pages/index/`,pageContent );

    this._replaceJfetConfig(`${this.config.legoConfigV2.LegoActPath}/development/${raw.dateFolder}/${raw.pageMenu}/`,
    `../../../release/${raw.dateFolder}/${raw.pageMenu}`);

    this._replacePagenameConfig(`${this.config.legoConfigV2.LegoActPath}/development/${raw.dateFolder}/${raw.pageMenu}/pages/index/`,raw.pageTitle);

    //this.ctx.logger.info(replacePreviewData);

    //let actPageRet = fs.writeFileSync(`${this.config.legoConfigV2.path}/pages/index/index.js`, replacePreviewData, 'utf-8');//要删除
    
    try {
      var output = execSync('jfet build', {
        cwd:`${this.config.legoConfigV2.LegoActPath}/development/${raw.dateFolder}/${raw.pageMenu}/`
      }).toString();

      this.ctx.logger.info('----begin----');
      this.ctx.logger.info(output);
      this.ctx.logger.info('----end-----');

      if(globalReg.errBeginReg.test(output) && globalReg.errEndReg.test(output)){
        this.ctx.body = {
          code: WEBPACK_CPMPILE_FAILED,
          msg:'编译失败'
        }
      }else{
        this.ctx.body = {
          code:0,
          msg:'编译成功'
        }
      }
      
      // const std = await execSync('jfet build', {
      //   cwd:this.config.legoConfigV2.path
      //   //cwd: path.resolve(__dirname, '..', '..', '..', '..', 'build_static')
      // },(err, stdout, stderr) => {
      //   this.ctx.logger.info(err);
      //   this.ctx.logger.info(stdout);
      //   this.ctx.logger.info(stderr);
      //   if (err) {
      //     this.ctx.logger.info(err);
      //     this.ctx.body = {
      //       code:1
      //     }
      //   }else{
      //     this.ctx.body = {
      //       code:0
      //     }
      //   }
      //   this.ctx.body = {
      //     code:0
      //   }
      // });
      // this.ctx.body = {
      //   code:0
      // }
    } catch (error) {
      // todo
      this.ctx.logger.info(error);
      this.ctx.body = {
        code:1
      }
    }
  }

  async _replacePagenameConfig(dir, title) {
    this.ctx.logger.info(`读取模板并替换{{pageTitle}}关键字`);
    let templateJs;
    try {
      templateJs = fs.readFileSync(`${__dirname}/template/${this.config.legoConfigV2.hbsTjs}`);
    } catch (e) {
      this.ctx.logger.error(`读取模板文件失败`);
      return {
        code: READ_TEMPLATE_FAILED,
        msg: '读取js模板文件失败'
      }
    }
    let replaceData = templateJs.toString().replace(/{{pageTitle}}/g, title);
    let writeRet = fs.writeFileSync(`${dir}/${this.config.legoConfigV2.hbs}`, replaceData, 'utf-8');

    if (!writeRet) {
      this.ctx.logger.info(`在${dir}下创建脚本文件成功`);
      return {
        code: 0
      }
    } else {
      this.ctx.logger.info(`在${dir}下创建脚本文件失败`);
      return {
        code: WRITE_ACT_ENTRYFILE_FAILED,
        msg: `写${this.config.legoConfigV2.actJs}文件失败`
      }
    }
  }


  async _replaceJfetConfig(dir, outputPath) {
    this.ctx.logger.info(`读取模板并替换{{outputPath}}关键字`);
    let templateJs;
    try {
      templateJs = fs.readFileSync(`${__dirname}/template/${this.config.legoConfigV2.jfetconfig}`);
    } catch (e) {
      this.ctx.logger.error(`读取模板文件失败`);
      return {
        code: READ_TEMPLATE_FAILED,
        msg: '读取js模板文件失败'
      }
    }
    let replaceData = templateJs.toString().replace("{{outputPath}}", outputPath);
    let writeRet = fs.writeFileSync(`${dir}/${this.config.legoConfigV2.jfetJs}`, replaceData, 'utf-8');

    if (!writeRet) {
      this.ctx.logger.info(`在${dir}下创建脚本文件成功`);
      return {
        code: 0
      }
    } else {
      this.ctx.logger.info(`在${dir}下创建脚本文件失败`);
      return {
        code: WRITE_ACT_ENTRYFILE_FAILED,
        msg: `写${this.config.legoConfigV2.actJs}文件失败`
      }
    }
  }

  async _replaceJsTemplate(dir, legoConfig) {
    this.ctx.logger.info(`读取模板并替换LEGOCONFIG关键字`);
    let templateJs;
    try {
      templateJs = fs.readFileSync(`${__dirname}/template/${this.config.legoConfigV2.templateJs}`);
    } catch (e) {
      this.ctx.logger.error(`读取模板文件失败`);
      return {
        code: READ_TEMPLATE_FAILED,
        msg: '读取js模板文件失败'
      }
    }
    let replaceData = templateJs.toString().replace("LEGOCONFIG", legoConfig);
    let writeRet = fs.writeFileSync(`${dir}/${this.config.legoConfigV2.actJs}`, replaceData, 'utf-8');

    if (!writeRet) {
      this.ctx.logger.info(`在${dir}下创建脚本文件成功`);
      return {
        code: 0
      }
    } else {
      this.ctx.logger.info(`在${dir}下创建脚本文件失败`);
      return {
        code: WRITE_ACT_ENTRYFILE_FAILED,
        msg: `写${this.config.legoConfigV2.actJs}文件失败`
      }
    }
  }

}

module.exports = LegoIndexController;
'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');
const { exec, execSync ,spawnSync} = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const simpleGit = require("simple-git");
const qs = require('querystring');
const packageJson = require('./template/package.json');


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

  // 重新写package.json
  async rewritePackage() {
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

  async publishSit() { // 乐高打包
    this.ctx.logger.info(this.config.legoConfigV2.path);
    let raw = this.ctx.request.rawBody;
    let pageContent = raw.pageContent,
        comConfig = raw.comConfig;

    this.ctx.logger.info(raw);
    
    //let previewTem = fs.readFileSync(`${this.config.legoConfigV2.path}/pages/index/index.js`);

    //let replacePreviewData = previewTem.toString().replace("LEGOCONFIG", pageContent);

    //this._replaceJsTemplate(`${this.config.legoConfigV2.path}/pages/index/`,pageContent );
    this._replaceJsTemplate(`${this.config.legoConfigV2.LegoActPath}/development/${raw.dateFolder}/${raw.pageMenu}/pages/index/`
        ,pageContent , comConfig);

    this._replaceJfetConfig(`${this.config.legoConfigV2.LegoActPath}/development/${raw.dateFolder}/${raw.pageMenu}/`,
    `release/act/${raw.dateFolder}/${raw.pageMenu}`);

    this._replacePagenameConfig(`${this.config.legoConfigV2.LegoActPath}/development/${raw.dateFolder}/${raw.pageMenu}/pages/index/`,raw.pageTitle);

    //this.ctx.logger.info(replacePreviewData);

    //let actPageRet = fs.writeFileSync(`${this.config.legoConfigV2.path}/pages/index/index.js`, replacePreviewData, 'utf-8');//要删除
    // 执行依赖安装
    let templateRet = await Promise.all([this._installNpmPackages(`${this.config.legoConfigV2.LegoActPath}/development/${raw.dateFolder}/${raw.pageMenu}/`)]);
    this.ctx.logger.info('执行依赖安装')
    if (templateRet[0].code == 0) {
      try {
        var output = execSync('../../../node_modules/.bin/jfet build', {
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
          //this._submitGit(raw.dateFolder, raw.pageMenu , raw.pageName);
           // 要执行提交发布的动作
           if (true) {
             let _this = this;
            await this._submitGit(raw.dateFolder, raw.pageMenu , raw.pageName).then(async (commitId, preCommitId) => {
              // 提交git仓库成功，创建发布单
              _this.ctx.logger.info('publishRet-------------------->',commitId,preCommitId);
              let publishRet = await _this._createPublishTask(commitId, preCommitId, raw);


              _this.ctx.logger.info('publishRet-------------------->',publishRet);
              // 发布失败
              if(!publishRet) {
                _this.ctx.body = {
                  code: 0,
                  msg: 'success'
                }
                _this.ctx.logger.info('创建发布单成功-------------------->');
              } else {
                _this.ctx.body = {
                  code: CREATE_RELEASETASK_FAILED,
                  msg: '创建发布单失败，请重试，如果仍然失败请联系开发'
                }
              }
            }).catch((error) => {
              _this.ctx.logger.error('提交GIT失败：' + error);
              _this.ctx.body = {
                code: SUBMIT_GIT_FAILED,
                msg: error
              }
            });
          } else {
            // 不需要指定提交和发布，直接返回
            _this.ctx.body = {
              code: 0,
              msg: 'success'
            }
          }
          this.ctx.body = {
            code:0,
            msg:'编译成功'
          }
        }
      } catch (error) {
        // todo
        this.ctx.logger.info(error);
        this.ctx.body = {
          code:1
        }
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

  async _replaceJsTemplate(dir, legoConfig , comConfig) {
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
        replaceData = replaceData.replace('COMFLEX_COMPONENTS' , comConfig);
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

    /**
   * 根据package.json安装npm依赖
   * @param {*} installPath 
   */
  async _installNpmPackages(installPath) {
    this.ctx.logger.info(`在${installPath}执行依赖安装`)
    this.ctx.logger.info(`---${installPath}---`)
      // 判断package.json是否存在
    if (!fs.pathExistsSync(`${installPath}/package.json`)) {
      return {
        code: INSTALL_FILE_NOT_EXIST,
        msg: 'package.json文件不存在'
      }
    }
    let installOptions = {
      cwd: installPath
    };
    let command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    let install = spawnSync(command, ['install', '--registry=http://npm.jyblife.com'], installOptions);
    if (install.status == 0) {
      this.ctx.logger.info(`在${installPath}安装依赖成功`);
      return {
        code: 0
      };
    } else {
      this.ctx.logger.error(`在${installPath}安装依赖失败${install.stderr.toString()}`);
      return {
        code: INSTALL_FAILED,
        msg: '安装依赖失败'
      };
    }
  }

    /**
   * 提交GIT仓库
   * @param {*} monthDir  当前月份目录
   * @param {*} folder    活动目录
   * @param {*} actName   活动名
   */
  async _submitGit(monthDir, folder, actName) {
    let name = this.ctx.session.userName || 'system-async',
        targetDir = `${this.config.legoConfigV2.LegoActPath}/development/${monthDir}/${folder}`;
    return new Promise((resolve, reject) => {
      simpleGit(this.config.legoConfigV2.LegoActPath).add(['development/' + monthDir + '/'+ folder , 
      `release/act/${monthDir}/${folder}`], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          this.ctx.logger.info(targetDir + '添加git仓库成功');
        }
      }).pull('origin', this.config.legoConfigV2.branchName, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          this.ctx.logger.info(targetDir + ' pull成功');
        }
      }).commit(`feature:${name}修改活动${actName}，目录为${folder}`, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          this.ctx.logger.info(targetDir + '提交git仓库成功');
        }
      }).push('origin', this.config.legoConfigV2.branchName, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          this.ctx.logger.info(targetDir + ' push成功');
        }
      }).log((err, res) => {
        this.ctx.logger.info(err);
        this.ctx.logger.info(res);
        if(err) {
          return reject(err); 
        } else {
          return resolve(res.all[0].hash, res.all[1].hash);
        }
      });
    })
  }
  /**
   * 创建发布任务单
   * @param {*} commitId      本次提交的hash
   * @param {*} preCommitId   上次提交的hash
   * @param {object}  rawBody http请求的参数对象
   */
  async _createPublishTask(commitId, preCommitId, rawBody) {
    this.ctx.logger.info('创建发布单'+ commitId);
    this.ctx.logger.info('创建发布单'+ JSON.stringify(rawBody));
    // 根据flag判断发布目标环境
    //let project_level = publishMap[rawBody.publishflag] || publishMap.sit
    let project_level = [4];
    let releaseData = {
      project_name: "h5_web.actpage", 
      project_level: JSON.stringify(project_level), 
      title: `${rawBody.pageTitle}_${rawBody.pageId}_${rawBody.dateFolder}`,
      commit_id: commitId,
      pre_commit_id: preCommitId || commitId,
      branch: this.config.legoConfigV2.branchName,
      email: this.ctx.session.userEmail,
      file_transmission_mode: 2,
      file_list: ["release/act/" + rawBody.dateFolder + "/" + rawBody.pageMenu]
    };
    try {
      // 调用发布系统接口创建发布单
      let releaseRet = await this.ctx.helper.get(this.config.envConfig.RELEASE_PATH + '?' + qs.stringify(releaseData));
      this.ctx.logger.info('发布结果：'+ JSON.stringify(releaseRet));
      if(releaseRet.code == 0) {
        if (rawBody.publishflag == 'prepublish') {
          let deleteRet = await this.app.redis.del(`lego_manage_previewLock_${rawBody.pageid}`);
        }
        return '';
      } else {
        return CREATE_RELEASETASK_FAILED;
      }
    } catch(e) {
      this.ctx.logger.error('创建发布单失败 ' + e.message);
      return CREATE_RELEASETASK_FAILED;
    }
  }


}

module.exports = LegoIndexController;
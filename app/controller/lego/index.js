'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../constant/errCode');
const fs = require('fs-extra')
const childProcess = require('child_process');
const UglifyJS = require("uglify-js");
const webpack = require("webpack");
const simpleGit = require("simple-git");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const qs = require('querystring');
const packageJson = require('./template/package.json');


const INSTALL_FAILED = 610010; // 安装依赖失败
const INSTALL_FILE_NOT_EXIST = 610011; // package.json文件不存在
const READ_TEMPLATE_FAILED = 610012; // 读取模板文件失败
const WRITE_ACT_ENTRYFILE_FAILED = 610013; // 写js文件模板失败
const WRITE_DEPENDENCYFILE_FAILED = 610021; // 写package.json依赖文件失败
const CREATE_WEBPACK_ENV_FAILED = 610014; // 创建webpack指定环境
const MKDIR_FAILED = 610015; // 创建目录失败
const TRANSLATE_OLD_PATH_FAILED = 610016; // 迁移老文件失败
const CREATE_ACT_PAGE_FAILED = 610017; // 创建活动页面失败
const WEBPACK_CPMPILE_FAILED = 610018; // WEBPACK编译失败
const SUBMIT_GIT_FAILED = 610019; // 提交git仓库失败
const CREATE_RELEASETASK_FAILED = 610020; // 创建发布单失败
const QUERY_DATABASE_FAILED = 710010; // 查询数据库失败
const INSERT_DATA_FAILED = 710011;    // 插入数据库失败
const UPDATE_DATA_FAILED = 710012;    // 更新数据失败
const ACT_DIR_EXIST = 710013;         // 活动目录有冲突
const COPY_ACT_PAGE_FAILED = 710014;  // 拷贝新页面失败
const PAGE_TYPE_COMMON = 1;
const PAGE_TYPE_SHARE = 2;
const PAGE_TYPE_PAY = 3;

const publishMap = {
  publish: ['2'],
  prepublish: ['2', '3'],
  sit: ['4']
}


class LegoController extends Controller {
  /**
   * 创建活动，生成活动脚手架
   */
  async packageActPage() {
    const _this = this;
    const ctx = _this.ctx;
    let rawBody = ctx.request.rawBody,
      _folder = rawBody.folder,
      _comConfig = rawBody.comConfig,
      _oldPagePath = rawBody.oldPagePath,
      _content = rawBody.content,
      _extendJS = rawBody.extendJS,
      _datefolder = rawBody.datefolder,
      _mpmPageContent = rawBody.mpmPageContent,
      _publishflag = rawBody.publishflag,
      _pagename = rawBody.pagename,
      _pageid = rawBody.pageid,
      _fileName = "index.html",
      actFolder = `${this.config.legoConfig.path}/${_datefolder}/${_folder}`;
    // 判断是否执行提交GIT动作
    const doSubmit = _publishflag == 'preview' || _publishflag == 'publish' || _publishflag == 'prepublish';
    if (_oldPagePath) { //迁移链接存在的话
      ctx.logger.info(`迁移老连接${_oldPagePath}`);
      try {
        var pathArr = _oldPagePath.split("/"),
          colName1 = pathArr[0],
          colName2 = pathArr[1],
          fileName = pathArr[2];
        _datefolder = colName1;
        _folder = colName2;
        _fileName = fileName || "index.html";
      } catch (e) {
        ctx.logger.error("迁移路径有错误");
        ctx.body = {
          code: TRANSLATE_OLD_PATH_FAILED,
          msg: '迁移路径有错误'
        }
        return;
      }
    }
    // 替换index.html文件数据
    if (this.config.legoConfig.minifyJs) {
      _content = _content.replace("{{[extendJS]}}", UglifyJS.minify(_extendJS).code).replace("{{[data]}}", UglifyJS.minify(_mpmPageContent).code);
    } else {
      _content = _content.replace("{{[extendJS]}}", _extendJS).replace("{{[data]}}", _mpmPageContent);
    }
    // 执行依赖安装和JS模板替换
    let templateRet = await Promise.all([this._installNpmPackages(actFolder), this._replaceJsTemplate(_comConfig, actFolder)]);
    // 两步动作都成功
    if (templateRet[0].code == 0 && templateRet[1].code == 0) {
      // 执行nodejs的webpack打包命令
      await this._createWebpackConfig(actFolder).then(async (data) => {
        // 替换指定文件的hash值
        _content = _content.replace(/{{timestamp}}/, data.hash);
        // 写index.html文件
        ctx.logger.info(`文件打包成功，文件hash：${data.hash}，写${_fileName}`);
        let actPageRet = fs.writeFileSync(`${actFolder}/${_fileName}`, _content, 'utf-8');
        // 写文件失败
        if (actPageRet) {
          ctx.body = {
            code: CREATE_ACT_PAGE_FAILED,
            msg: '创建活动页面失败，请重新尝试保存，仍未成功请联系开发检查'
          }
        } else {
          // 要执行提交发布的动作
          if (doSubmit) {
            await _this._submitGit(_datefolder, _folder, _pagename).then(async (commitId, preCommitId) => {
              // 提交git仓库成功，创建发布单
              let publishRet = await _this._createPublishTask(commitId, preCommitId);
              // 发布失败
              if(!publishRet) {
                ctx.body = {
                  code: 0,
                  msg: 'success'
                }
              } else {
                ctx.body = {
                  code: CREATE_RELEASETASK_FAILED,
                  msg: '创建发布单失败，请重试，如果仍然失败请联系开发'
                }
              }
            }).catch((error) => {
              ctx.logger.error('提交GIT失败：' + error);
              ctx.body = {
                code: SUBMIT_GIT_FAILED,
                msg: error
              }
            });
          } else {
            // 不需要指定提交和发布，直接返回
            ctx.body = {
              code: 0,
              msg: 'success'
            }
          }
        }
      }).catch((error) => {
        ctx.logger.error(error);
        ctx.body = {
          code: WEBPACK_CPMPILE_FAILED,
          msg: 'webpack编译失败，请重新尝试保存，仍未成功请联系开发检查'
        };
      });
    } else {
      ctx.body = {
        code: CREATE_WEBPACK_ENV_FAILED,
        msg: '创建webpack执行环境失败，请重新尝试保存，仍未成功请联系开发检查'
      }
    }
  }
  /**
   * 创建活动页面
   */
  async createActPage() {
    let raw = this.ctx.request.rawBody,
        actName = raw.pageName,
        folder = raw.folder,
        now = await this.ctx.helper.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        dateFolder = await this.ctx.helper.dateFormat('yyyyMM00', new Date());
    // 要创建的活动目录
    let actPath = `${this.config.legoConfig.path}/${dateFolder}/${folder}`;
    this.ctx.logger.info('初始化活动目录'+ folder);
    try {
      await this.makeDirectory(actPath);
      await this.makeDirectory(`${actPath}/assets/js`);
      await this.makeDirectory(`${actPath}/assets/image`);
    } catch(e) {
      this.ctx.logger.error('初始化活动目录失败 '+ e.message);
      this.ctx.body = {
        code: MKDIR_FAILED,
        msg: e.message
      }
      return;
    }
    try {
      packageJson.name = folder;
      packageJson.description = actName;
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
    // 插入数据库
    try {
      let insertInfo = await this.service.lego.legoService.insertPageInfo({
        actName: actName,
        folder: folder,
        dateFolder: dateFolder,
        page_expire_time: raw.expireTime,
        page_expire_url: raw.expireUrl,
        templateId: raw.templateId,
        author: this.ctx.session.userName,
        shareImage: raw.shareImage,
        shareTitle: raw.shareTitle,
        shareDesc: raw.shareDesc,
        type: raw.type,
        createTime: now,
        extra: raw.extraData ? JSON.stringify(raw.extraData) : '',
      });
      this.ctx.body = {
        code: 0,
        data: {
          pageId: insertInfo.insertId
        }
      };
    } catch(e) {
      this.ctx.body = {
        code: INSERT_DATA_FAILED,
        msg: '创建新活动失败 ' + e.message
      };
    }
  }
  /**
   * 按条件查询活动列表
   */
  async getActPages() {
    let rawBody = this.ctx.request.rawBody,
        pageIndex = rawBody.pageIndex,          // 页码
        pageOwner = rawBody.pageOwner,          // 页面作者
        pageSize = rawBody.pageSize,            // 每页查询数量
        pageName = rawBody.pageName,            // 活动名称
        createStartTime = rawBody.create_start_time,          // 创建时间
        createEndTime = rawBody.create_end_time,          // 创建时间
        expireTime = rawBody.expireTime,
        count = 0;
    if(createStartTime) {
      createStartTime += ' 00:00:00';
    }
    if(createEndTime) {
      createEndTime += ' 23:59:59';
    }
    let queryCondition = {
      pageSize,
      pageOwner,
      createStartTime,
      createEndTime,
      expireTime,
      start: (pageIndex -1) * pageSize,
      offset: pageIndex * pageSize
    }
    let queryRet = await this.service.lego.legoService.queryPagesByCondition(queryCondition);
    if(!queryRet) {
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: '查询数据库失败'
      }
    } else {
      this.ctx.body = {
        code: 0,
        data: {
          total_count: queryRet[0][0].total_count,
          page_list: queryRet[1]
        }
      }
    }
  }
  /**
   * 查询乐高组件列表
   */
  async getComponents() {
    let rawBody = this.ctx.request.rawBody,
        ctype = rawBody.ctype,
        pageIndex = rawBody.pageIndex,
        pageSize = rawBody.pageSize,
        cname = rawBody.cname;
    let cresult = await this.service.lego.legoService.queryComponents(ctype, cname, pageIndex, pageSize);
    if(!cresult) {
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: '数据库查询失败'
      }
    } else {
      this.ctx.body = {
        code: 0,
        data: {
          total_count: cresult[0][0].total_count,
          component_list: cresult[1]
        }
      }
    }
  }
  /**
   * 查询活动页面配置详情
   */
  async getPageBaseInfoById() {
    let pageId = this.ctx.request.rawBody.pageId;
    if(!pageId) {
      this.ctx.body = errCode.INVALID_PARAM_FORMAT;
    } else {
      this.ctx.logger.info('查询活动页面详情'+ pageId);
      try {
        let baseInfo = await this.service.lego.legoService.queryPageDetail(pageId);
        this.ctx.body = {
          code: 0,
          data: baseInfo
        }
      } catch(e) {
        this.ctx.logger.error('查询活动详情失败 '+ e.message);
        this.ctx.body = {
          code: QUERY_DATABASE_FAILED,
          msg: '查询数据库失败'+e.message
        }
      }
    }
  }
  /**
   * 查询组件样式
   */
  async getSelectedComponentStyles() {
    let componentId = this.ctx.request.rawBody.comid;
    if(!componentId) {
      this.ctx.body = errCode.INVALID_PARAM_FORMAT;
    } else {
      this.ctx.logger.info('获取选定组件的样式列表 '+ componentId);
      try {
        let styleInfo = await this.service.lego.legoService.queryComponentStyle(componentId);
        this.ctx.body = {
          code: 0,
          data: styleInfo
        }
      } catch(e) {
        this.ctx.logger.error('查询组件样式失败 '+ e.message);
        this.ctx.body = {
          code: QUERY_DATABASE_FAILED,
          msg: '查询数据库失败'+e.message
        }
      }
    }
  }
  /**
   * @description         检查目录是否冲突
   * @param dateFoler     活动日期目录
   * @param folder        活动目录
   * @returns             Boolean     true:有冲突|false:无冲突
   */
  async checkActDirNameExist() {
    let raw = this.ctx.request.rawBody,
        dateFolder = await this.helper.dateFormat('yyyyMM00', new Date()),
        folder = raw.folder;
    try {
      this.ctx.logger.info('检查活动目录是否冲突 '+ JSON.stringify(raw));
      let pathExist = await this.service.lego.legoService.queryInfoByPath(folder, dateFolder);
      this.ctx.body = {
        code: 0,
        data: !!pathExist
      }
    } catch(e) {
      this.ctx.logger.error('查询目录冲突失败 '+ e.message);
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: `查询目录冲突失败 ${e.message}`
      }
    }
  }

  /**
   * @description         批量获取多个活动页面详情
   * @param pageId        Array 活动页面ID列表
   * @returns             Array 多个页面详情数组
   */
  async getMultiplePage() {
    let raw = this.ctx.request.rawBody,
        idList = raw.pageId;
    if(!(idList instanceof Array)) {
      this.ctx.body = errCode.INVALID_PARAM_FORMAT;
      return;
    }
    idList = idList.join(',')
    this.ctx.logger.info('批量查询活动页面信息 '+ idList);
    try {
      let multiPages = await this.service.lego.legoService.queryMultiplePage(idList);
      this.ctx.body = {
        code: 0,
        data: multiPages
      }
    } catch(e) {
      this.ctx.logger.error('批量查询活动页面信息失败 '+ e.message);
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: `批量查询活动页面信息失败 ${e.message}`
      }
    }
    
    
  }
  /**
   * 更新页面配置内容
   * @param id  页面iD
   * @param content 更新后的页面配置json串
   */
  async updatePageContent() {
    let raw = this.ctx.request.rawBody;
    if(!raw.content) {
      this.ctx.body = errCode.INVALID_PARAM_FORMAT;
    } else {
      this.ctx.logger.info('更新页面配置内容 '+ raw.pageId);
      try {
        let ret = await this.service.lego.legoService.updatePageInfo({
          pageId: raw.pageId,
          pageContent: raw.content,
          updateTime: await this.ctx.helper.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
          user: this.ctx.session.userAccount
        });
        this.ctx.logger.info('更新页面配置内容结果 '+ JSON.stringify(ret));
        if(ret) {
          this.ctx.body = {
            code: 0,
            msg: 'success'
          }
        } else {
          this.ctx.body = {
            code: UPDATE_DATA_FAILED,
            msg: '更新页面配置内容失败' + ret
          }
        }
      } catch(e) {
        this.ctx.logger.error('更新页面配置内容失败 '+ e.message);
        this.ctx.body = {
          code: UPDATE_DATA_FAILED,
          msg: '更新页面配置内容失败'+ e.message
        }
      }
    }
  }
  /**
   * 更新活动基本信息
   */
  async updateBaseInfo() {
    let raw = this.ctx.request.rawBody, error = '';
    let pageName = raw.pageName,
        pageId = raw.pageId,
        folder = raw.folder,
        pageType = raw.type,
        shareImage = raw.shareImage || '',
        shareDesc = raw.shareDesc || '',
        shareTitle = raw.shareTitle || '';
    this.ctx.logger.info('更新活动基本配置信息 '+ JSON.stringify(raw));
    // 检查必要的参数
    if(!pageName) {
      error = '缺少活动名称';
    } else if(!folder) {
      error = '活动目录不能为空';
    } else if(!pageType) {
      error = '活动模板类型不能为空';
    } else if(pageType == PAGE_TYPE_COMMON) {
      if(!shareImage || !shareDesc || !shareTitle) {
        error = '分享参数不能为空';
      }
    }
    if(error) {
      this.ctx.body = {
        code: errCode.INVALID_PARAM_FORMAT.code,
        msg: error
      };
      return;
    }
    try {
      let ret = await this.service.lego.legoService.updateBaseInfo({
        pageId,
        pageType,
        folder,
        pageName,
        shareImage,
        shareTitle,
        shareDesc,
        extra: raw.extraData ? JSON.stringify(raw.extraData) : '',
        oldUrl: raw.oldPageUrl || '',
        expireTime: raw.expireTime || '',
        expireUrl: raw.expireUrl || ''
      });
      this.ctx.logger.info('更新活动基本配置信息结果 '+ ret);
      if(ret) {
        this.ctx.body = {
          code: 0,
          msg: 'success'
        }
      } else {
        this.ctx.body = {
          code: UPDATE_DATA_FAILED,
          msg: '更新活动基本配置信息失败' + ret
        }
      }
    } catch(e) {
      this.ctx.logger.error('更新活动基本配置信息失败 '+ e.message);
      this.ctx.body = {
        code: UPDATE_DATA_FAILED,
        msg: '更新活动基本配置信息'+ e.message
      }
    }
  }
  /**
   * 获取乐高页面公告
   */
  async getLegoNotice() {
    let now = await this.ctx.helper.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
    try {
      let noticeRet = await this.service.lego.legoService.queryLegoNotice(now);
      this.ctx.logger.info('查询乐高最新公告'+JSON.stringify(noticeRet));
      if(noticeRet) {
        this.ctx.body = {
          code: 0,
          data: noticeRet
        }
      } else {
        this.ctx.body = {
          code: QUERY_DATABASE_FAILED,
          msg: '查询公告失败'
        }
      }
    } catch(e) {
      this.ctx.logger.error('查询公告失败'+ e.message);
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: '查询公告失败'+ e.message
      }
    }
  }
  /**
   * @description 拷贝新页面
   * @param from      从哪个页面ID拷贝
   * @param folder    拷贝后的目录名
   */
  async copyPage() {
    let raw = this.ctx.request.rawBody,
        fromPage = raw.from,
        folder = raw.folder,
        time = await this.ctx.helper.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        dateFolder = await this.ctx.helper.dateFormat('yyyyMM00');
    if(!fromPage || isNaN(fromPage)) {
      this.ctx.body = errCode.INVALID_PARAM_FORMAT;
      return;
    }
    this.ctx.logger.info('复制页面'+ JSON.stringify(raw));
    // 检测目录是否有冲突
    try {
      let pathExist = await this.service.lego.legoService.queryInfoByPath(folder, dateFolder);
      if(pathExist) {
        this.ctx.body = {
          code: ACT_DIR_EXIST,
          msg: '当前活动路径下已经存在相同名字的目录'
        }
        return;
      }
      let copyRet = await this.service.lego.legoService.insertCopyPage(fromPage, folder, dateFolder, time);
      this.ctx.logger.info('复制页面结果'+ copyRet);
      if(copyRet) {
        this.ctx.body = {
          code: 0,
          data: {
            page_id: copyRet.insertId
          }
        }
      } else {
        this.ctx.body = {
          code: COPY_ACT_PAGE_FAILED,
          msg: '复制页面失败'+ copyRet
        }
      }
    } catch(e) {
      this.ctx.logger.error('复制页面失败' + e.message);
      this.ctx.body = {
        code: COPY_ACT_PAGE_FAILED,
        msg: '复制页面失败' + e.message
      }
    }
  }
  /**
   * 根据package.json安装npm依赖
   * @param {*} installPath 
   */
  async _installNpmPackages(installPath) {
    this.ctx.logger.info(`在${installPath}执行依赖安装`)
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
    let install = childProcess.spawnSync(command, ['install', '--registry=http://npm.jyblife.com'], installOptions);
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
   * 读取js模板文件，做关键字替换
   * @param {*} template 
   */
  async _replaceJsTemplate(template, dir) {
    this.ctx.logger.info(`读取模板并替换pagebegin关键字${template}`);
    let templateJs;
    try {
      templateJs = fs.readFileSync(`${__dirname}/template/${this.config.legoConfig.templateJs}`);
    } catch (e) {
      this.ctx.logger.error(`读取模板文件失败`);
      return {
        code: READ_TEMPLATE_FAILED,
        msg: '读取js模板文件失败'
      }
    }
    let replaceData = templateJs.toString().replace("pagebegin", template);
    let writeRet = fs.writeFileSync(`${dir}/${this.config.legoConfig.actJs}`, replaceData, 'utf-8');
    if (!writeRet) {
      this.ctx.logger.info(`在${dir}下创建脚本文件成功`);
      return {
        code: 0
      }
    } else {
      this.ctx.logger.info(`在${dir}下创建脚本文件失败`);
      return {
        code: WRITE_ACT_ENTRYFILE_FAILED,
        msg: `写${this.config.legoConfig.actJs}文件失败`
      }
    }
  }
  /**
   * 创建webpack配置文件
   * @param {*} actFolder   活动目录，打包动作在该目录下进行
   */
  async _createWebpackConfig(actFolder) {
    const ctx = this.ctx;
    ctx.logger.info('创建webpack配置');
    var webPackConfig = {
      entry: actFolder + "/index.js",
      //输出的文件名 合并以后的js会命名为bundle.js
      output: {
        path: actFolder + "/assets/js/",
        filename: 'index.bundle.js'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: [require.resolve('babel-preset-es2015')]
          }
        }]
      }
    };
    if (this.config.legoConfig.minifyJs == 0) {
      webPackConfig["devtool"] = 'eval-source-map';
    }
    return new Promise(function(resolve, reject) {
      webpack(webPackConfig, (err, stats) => {
        let info = stats.toJson();
        if (err || stats.hasErrors()) {
          ctx.logger.error('执行webpack编译失败' + info.errors);
          return reject(info.errors);
        } else {
          ctx.logger.info('执行webpack编译成功');
          return resolve(info);
        }
      })
    })
  }
  /**
   * 创建指定目录
   * @param {*} dir 
   */
  async makeDirectory(dir) {
    // ctx.logger.info(`创建压缩脚本目录：${actFolder}`);
    // try {
    //   await this.makeDirectory(`${actFolder}/assets/js/`);
    // } catch (e) {
    //   ctx.body = {
    //     code: MKDIR_FAILED,
    //     msg: '创建压缩脚本目录失败' + e.message
    //   }
    //   return;
    // }
    // ctx.logger.info(`创建压缩脚本目录：${actFolder}成功`);
    let exist = fs.existsSync(dir);
    if (!exist) {
      let mkret = fs.mkdirsSync(dir);
      if (!mkret) {
        throw new Error(`创建${dir}目录失败`);
      }
    }
    return true;
  }
  /**
   * 提交GIT仓库
   * @param {*} monthDir  当前月份目录
   * @param {*} folder    活动目录
   * @param {*} actName   活动名
   */
  async _submitGit(monthDir, folder, actName) {
    let name = this.ctx.session.userName,
        targetDir = `${this.config.legoConfig.path}/${monthDir}/${folder}`;
    return new Promise((resolve, reject) => {
      simpleGit(this.config.legoConfig.path + '/' + monthDir).add([folder], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          this.ctx.logger.info(targetDir + '添加git仓库成功');
        }
      }).pull('origin', this.config.legoConfig.branchName, (err, res) => {
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
      }).push('origin', this.config.legoConfig.branchName, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          this.ctx.logger.info(targetDir + ' push成功');
        }
      }).log((err, res) => {
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
   */
  async _createPublishTask(commitId, preCommitId) {
    this.ctx.logger.info('创建发布单');
    let rawBody = this.ctx.request.rawBody;
    // 根据flag判断发布目标环境
    let project_level = publishMap[rawBody.publishflag] || publishMap.sit
    let releaseData = {
      project_name: "h5_web.actpage", 
      project_level: projLevel, 
      title: `${rawBody.pagename}_${rawBody.pageid}_${rawBody.folder}`,
      commit_id: commitId,
      pre_commit_id: preCommitId,
      branch: this.config.legoConfig.branchName,
      user_id: this.ctx.session.userid || 63,
      file_transmission_mode: 2,
      file_list: ["release/act/" + rawBody.datefolder + "/" + rawBody.folder]
    };
    try {
      // 调用发布系统接口创建发布单
      let releaseRet = await this.ctx.helper.get(this.config.envConfig.RELEASE_PATH + '?' + qs.stringify(releaseData));
      this.ctx.logger.info('发布结果：'+ JSON.stringify(releaseRet));
      if(releaseRet.code == 0) {
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

module.exports = LegoController;

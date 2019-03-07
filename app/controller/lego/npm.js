'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../constant/errCode');
const fs = require("fs");
const childProcess = require('child_process');

class NpmController extends Controller {
  /**
   * @description 1、获取指定npm包的版本列表，并用最新的版本号生成package.json文件
   *              2、迭代--如果已经有包则不重新写入，如果是来自copy页面则使用最新的版本 
   * @param  npmName  指定的npm包名称
   * @param  actPath  活动目录名称
   */
  async getPackageVersions() {
    let rawBody = this.ctx.request.rawBody,
        npmName = rawBody.npmName,
        versionList = [],
        actPath = rawBody.folder;
    var patternsNpmV = /[0-9]{1,}.[0-9]{1,}.[0-9]{1,}/i;   
    if(!npmName || !actPath) {
      this.ctx.body = errCode.INVALID_PARAM_FORMAT;
      return;
    }
    // 拼装页面路径
    actPath = this.config.legoConfig.path + actPath;
    this.ctx.logger.info(`查询组件${npmName}的版本信息`);
    let url = this.config.npmConfig.host + `/${encodeURIComponent(npmName)}`;
    try {
      // 读取npm包信息
      let npmInfo = await this.ctx.helper.get(url);
      this.ctx.logger.info('fetch npm package info success: '+ JSON.stringify(npmInfo));
      // 获取npm数据成功
      if(npmInfo.name && npmInfo.versions) {
        for(let version in npmInfo.versions) {
          versionList.push({
            version,
            desc: npmInfo.versions[version].versionDesc || npmInfo.versions[version].description,
            name: npmInfo.versions[version].name
          })
        }
        versionList.sort(function(prev, next) {
          return prev.version > next.version;
        })
        // 获取最新的版本号
        let latestVersion = versionList[versionList.length - 1].version;
        // 读取活动目录下的package.json文件
        let packageFile = JSON.parse(fs.readFileSync(`${actPath}package.json`, 'utf-8'));
        // 更新指定包的最新版本号
        if(patternsNpmV.test(packageFile.dependencies[npmName])){ //已经存在npm
          this.ctx.logger.info(`已经存在npm包${npmName}:${packageFile.dependencies[npmName]}`);
        }else{
          packageFile.dependencies[npmName] = latestVersion;
        }
        // 回写package.json文件
        let writeRet = await this.writePackageFile(`${actPath}package.json`, JSON.stringify(packageFile), 1);
        if(writeRet == errCode.ACTION_SUCCESS) {
          // 响应数据
          this.ctx.body = {
            code: 0,
            data: {
              version_list: versionList,
              latest: latestVersion
            }
          }
          // 启动子进程安装npm包
          var installOptions = {
            cwd: actPath
          };
          let command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
          let installRet = childProcess.spawnSync(command, ['install', '--save', '--registry=http://npm.jyblife.com'], installOptions);
          this.ctx.logger.info(`安装依赖包“${npmName}”${installRet.status == 0 ? '成功' : '失败'}`);
        } else {
          this.ctx.logger.error('反复写package.json文件失败，请检查权限配置');
          this.ctx.body = {
            code: errCode.WRITE_FILE_FAILED,
            msg: '反复写package.json文件失败，请刷新页面重试，如果仍然报错请联系开发'
          }
        }
      } else {
        this.ctx.logger.error(`获取指定包${npmName}信息失败`);
          this.ctx.body = {
            code: errCode.GET_DATA_FAILDED,
            msg: `获取指定包${npmName}信息失败，请刷新页面重试，如果仍然报错请联系开发`
          }
      }
    } catch(e) {
      this.ctx.logger.error('获取npm包信息失败'+e.message);
      this.ctx.body = {
        code: errCode.GET_DATA_FAILDED,
        msg: '获取npm包信息失败' + e.message+ '请刷新页面重试，如果仍然报错请联系开发'
      }
    }
  }
  /**
   * 写package.json文件
   * @param {*} filePath 
   * @param {*} fileContent 
   * @param {*} times 
   */
  async writePackageFile(filePath, fileContent, times) {
    let result = fs.writeFileSync(filePath, fileContent, 'utf-8');
    if(!result) {
      return errCode.ACTION_SUCCESS;
    } else {
      if(times >= 3) {
        return errCode.ACTION_FAILED;
      }
      return await this.writePackageFile(filePath, fileContent, times++);
    }
  }
  /**
   * 更新版本号
   */
  async updatePackageVersion() {
    let rawBody = this.ctx.request.rawBody,
        npmName = rawBody.npmName,
        npmVersion = rawBody.npmVersion,
        actFolder = rawBody.folder;
    // 拼装页面路径
    actFolder = this.config.legoConfig.path + actFolder;
    // 读取活动目录下的package.json文件
    let packageFile = JSON.parse(fs.readFileSync(`${actFolder}/package.json`, 'utf-8'));
    this.ctx.logger.info(`更新${npmName}包版本=${npmVersion}`);
    packageFile.dependencies[npmName] = npmVersion;
    this.ctx.logger.info(`更新之后包的信息${JSON.stringify(packageFile)}`);
    let writeRet = await this.writePackageFile(`${actFolder}/package.json`, JSON.stringify(packageFile), 1);
    if(writeRet == errCode.ACTION_SUCCESS) {
      this.ctx.logger.info(`更新${npmName}包版本成功，准备安装包`);
      // 响应数据
      this.ctx.body = {
        code: 0,
        msg: '更新包版本成功'
      }
      let installOptions = {
        cwd: actFolder
      };
      let command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
      let install = childProcess.spawnSync(command, ['install' ,  `${npmName}@${npmVersion}`, '-E'], installOptions);
      if(install.status == 0) {
        this.ctx.logger.info(`安装${npmName}包版本${npmVersion}成功`);
      } else {
        this.ctx.logger.error(`安装${npmName}包版本${npmVersion}失败${install.stderr.toString()}`);
      }
    } else {
      this.ctx.logger.error(`更新${npmName}包版本失败`);
      this.ctx.body = {
        code: errCode.WRITE_FILE_FAILED,
        msg: '更新package.json依赖版本号失败'
      }
    }
  }
}

module.exports = NpmController;
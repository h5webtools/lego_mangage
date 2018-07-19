'use strict';

const Controller = require('egg').Controller;
const errCode = require('../../../constant/errCode');

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
const WEBPACK_CPMPILE_FAILED = 610018; // WEBPACK编译失败
const SUBMIT_GIT_FAILED = 610019; // 提交git仓库失败
const CREATE_RELEASETASK_FAILED = 610020; // 创建发布单失败
const QUERY_DATABASE_FAILED = 710010; // 查询数据库失败
const INSERT_DATA_FAILED = 710011;    // 插入数据库失败
const UPDATE_DATA_FAILED = 710012;    // 更新数据失败
const ACT_DIR_EXIST = 710013;         // 活动目录有冲突
const COPY_ACT_PAGE_FAILED = 710014;  // 拷贝新页面失败
const RELATE_PAGE_ACT_FAILED = 810010;  // 关联页面和活动号失败
const PAGE_ID_NOT_EXIST = 810011;       // 活动页面不存在

class ThemeController extends Controller {

  async getLegoThemeStyle() {
    this.ctx.logger.info('获取乐高颜色主题配置');
    try {
      let themeList = await this.service.lego.legoV2Service.queryThemeList();
      this.ctx.body = {
        code: 0,
        data: {
          theme_list: themeList
        }
      }
    } catch(e) {
      this.ctx.logger.info('获取乐高颜色主题配置失败'+ e.message);
      this.ctx.body = {
        code: QUERY_DATABASE_FAILED,
        msg: e.message()
      }
    }
  }
}

module.exports = ThemeController;
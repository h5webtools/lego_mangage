'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.login.index.loginPage);
  router.post('/login/doLogin', controller.login.index.doLogin);
  router.get('/login/loginOut', controller.login.index.loginOut);

  // 获取用户列表
  router.post('/common/users', app.controller.common.index.getUserList);
  // 获取红包列表
  router.post('/common/coupons', app.controller.common.index.getCouponList);
  // 获取日志流水
  router.post('/common/GetOptLogs', app.controller.common.index.getOptLogs);
  // 活动相关
  require('./route/actList')(app);
  // 命令字相关
  require('./route/cmd')(app);
  // 规则动作参数相关路由 || 模板列表相关路由
  require('./route/params')(app);
  // 活动配置树相关
  require('./route/chain')(app);
  // 模板配置相关路由
  require('./route/template/tree')(app);
  //系统设置相关路由
  require('./route/system')(app);
  // 乐高npm包管理相关路由
  require('./route/lego/npm')(app);
  // 乐高活动页面相关接口
  require('./route/lego/index')(app);
  // app入口相关
  require('./route/entry/index')(app);

  // v2 
  require('./route/v2')(app);
};

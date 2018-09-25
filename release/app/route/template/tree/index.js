// app/router/news.js
module.exports = app => {
  // 获取活动列表
  app.router.post('/act/GetLegoChains', app.controller.template.index.getLegoChains);
  // 更新活动状态
  app.router.post('/act/SaveChainsByComponentTemplate', app.controller.template.index.SaveChainsByComponentTemplate);
  // 获取测试人员列表
  app.router.post('/act/postComponentTemplateChains', app.controller.template.index.saveComponentTemplateChains);
  // 获取活动详情
  app.router.post('/act/getComponentTemplateChains', app.controller.template.index.getComponentTemplateChains);
  // 保存活动基本信息配置
  app.router.post('/act/getCmds', app.controller.template.index.getCmdList);
  // 获取活动渠道列表
  app.router.post('/act/getRulesAndActions', app.controller.template.index.getRuleActionList);
  // 保存新增的活动渠道
  app.router.post('/act/GetChains', app.controller.template.index.getChainTree);
  // 保存新增的活动渠道
  app.router.post('/act/GetActTrees', app.controller.template.index.getActTrees);
  // 保存新增的活动渠道
  app.router.post('/act/saveCmdChains', app.controller.template.index.saveCmdChains);
 
};
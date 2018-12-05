// app/router/news.js
module.exports = app => {
  // 获取乐高对应的配置模板列表
  app.router.post('/act/GetLegoChains', app.controller.act.chain.index.getLegoChains);
  // 乐高规则树数据
  app.router.post('/act/SaveChainsByComponentTemplate', app.controller.act.chain.index.saveChainsByComponentTemplate);
  // 获取规则树
  app.router.post('/act/postComponentTemplateChains', app.controller.act.chain.index.postComponentTemplateChains);
  // 获取规则树
  app.router.post('/act/getComponentTemplateChains', app.controller.act.chain.index.getComponentTemplateChains);
  // 获取命令字列表
  app.router.post('/act/getCmds', app.controller.act.chain.index.getCmds);
  // 获取规则动作列表
  app.router.post('/act/getRulesAndActions', app.controller.act.chain.index.getRulesAndActions);
  // 根据活动号获取活动配置树
  app.router.post('/act/GetActTrees', app.controller.act.chain.index.getActTrees);
  // 保存命令字对应的配置树
  app.router.post('/act/saveCmdChains', app.controller.act.chain.index.saveCmdChains);
  // 获取活动规则树
  app.router.post('/act/GetChains', app.controller.act.chain.index.getChains);
  // 获取组件对应的规则模板配置
  app.router.post('/act/getComponentTemplates', app.controller.act.chain.index.getComponentTemplates);
};
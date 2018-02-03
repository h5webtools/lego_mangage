// app/router/news.js
module.exports = app => {
  // 获取规则动作列表
  app.router.post('/act/getFilters', app.controller.act.params.index.getFilterList);
  // 保存动作规则配置信息
  app.router.post('/act/postFilterParam', app.controller.act.params.index.saveParam);
  // 删除规则/动作参数
  app.router.post('/act/deleteFilterParam', app.controller.act.params.index.deleteParam);
  // 保存规则动作
  app.router.post('/act/postFilter', app.controller.act.params.index.saveFilter);
  // 查询模板列表
  app.router.post('/act/getComponentTemplates', app.controller.act.params.index.queryGetComponentTemplate);
  // 保存模板信息
  app.router.post('/act/postComponentTemplate', app.controller.act.params.index.saveComponentTemplate);
  // 查询命令字
  app.router.post('/act/getCmds', app.controller.act.params.index.queryGetCmds);
  // 新建或者修改命令字
  app.router.post('/act/postCmd', app.controller.act.params.index.savePostCmd);
  // 删除
  app.router.post('/act/deleteFilterParam', app.controller.act.params.index.hideLogicItem);
};
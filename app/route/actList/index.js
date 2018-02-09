// app/router/news.js
module.exports = app => {
  // 获取活动列表
  app.router.post('/act/getActs', app.controller.act.list.index.getActList);
  // 更新活动状态
  app.router.post('/act/UpdateActStatus', app.controller.act.list.index.updateActStatus);
  // 获取测试人员列表
  app.router.post('/common/getTestEngineer', app.controller.act.detail.index.getTestEngineer);
  // 获取活动详情
  app.router.post('/act/getActDetail', app.controller.act.detail.index.getActDetail);
  // 保存活动基本信息配置
  app.router.post('/act/postAct', app.controller.act.detail.index.saveActDetail);
  // 获取活动渠道列表
  app.router.post('/act/GetChannels', app.controller.act.detail.index.getActChannels);
  // 保存新增的活动渠道
  app.router.post('/act/PostChannel', app.controller.act.detail.index.saveActChannel);
  // 手动触发同步
  app.router.post('/ActivitySynConf/manual', app.controller.act.list.index.manual);
  // 获取活动列表展示
  app.router.post('/ActParam/do', app.controller.act.list.index.getShowList);
  // 保存乐高活动配置页面和活动号的关联



  app.router.post('/act/SavePageActRelation', app.controller.act.detail.index.relateActAndPage);
 
};
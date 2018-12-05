// app/router/news.js
module.exports = app => {
    // 获取同步配置列表
    app.router.post('/ActivitySynConf/index', app.controller.system.sync.index.getSyncList);
    app.router.post('/ActivitySynConf/store', app.controller.system.sync.index.savePostSync);
    app.router.post('/ActivitySynConf/TblSyn', app.controller.system.sync.index.tblSync);
    // mq配置相关
    app.router.post('/act/GetEvent', app.controller.system.mqSet.index.GetEvent);
    app.router.post('/act/AddOrUpdateEvent', app.controller.system.mqSet.index.AddOrUpdateEvent);
    app.router.post('/act/GetActEvent', app.controller.system.mqSet.index.GetActEvent);
  };
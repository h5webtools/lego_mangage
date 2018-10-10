// app/router/news.js
module.exports = app => {
  // 获取命令字列表
  app.router.post('/act/getCmds', app.controller.act.cmd.index.getCmdList);
  // 更新/新增命令字
  app.router.post('/act/postCmd', app.controller.act.cmd.index.saveCmd);
};
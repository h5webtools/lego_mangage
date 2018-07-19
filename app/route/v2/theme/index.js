// app/router/news.js
module.exports = app => {

  const {
    router,
    controller,
    config
  } = app;
  
  // const version = config.legoConfigV2.version  
  const version = 'v2'
  const routerPrefix = '/' + version

  // 获取乐高主题色配置
  app.router.post(routerPrefix +  '/lego/getLegoThemeColor', controller[version].lego.index.getLegoThemeColor);
};
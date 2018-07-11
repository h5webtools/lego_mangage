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
  app.router.get(routerPrefix , controller[version].lego.home.index);
  app.router.get(routerPrefix +  '/lego', controller[version].lego.home.index);
  app.router.get(routerPrefix +  '/lego/pageEdit', controller[version].lego.home.index);
  // 获取乐高主题色配置
  app.router.post(routerPrefix +  '/lego/getLegoThemeColor', controller[version].lego.index.getLegoThemeColor);
};
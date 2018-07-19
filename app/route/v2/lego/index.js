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
  // app.router.get(routerPrefix , controller[version].lego.home.index);
  app.router.redirect(routerPrefix, routerPrefix +  '/legoEdit', 302);

};
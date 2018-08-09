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
  // 打包
  app.router.post(routerPrefix +  '/publishSit', controller[version].lego.index.publishSit);

  // 获取npm包
  app.router.post(routerPrefix +  '/getPackageVersions', controller[version].lego.npm.getPackageVersions);

  // 更新npm包
  app.router.post(routerPrefix +  '/updatePackageVersion', controller[version].lego.npm.updatePackageVersion);
  

};
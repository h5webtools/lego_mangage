// app/router/news.js
module.exports = app => {
  // 获取指定包的npm版本列表
  app.router.post('/lego/getPackageVersion', app.controller.lego.npm.getPackageVersions);
  // 更新指定包的npm版本号
  app.router.post('/lego/updatePackageVersion', app.controller.lego.npm.updatePackageVersion);
};
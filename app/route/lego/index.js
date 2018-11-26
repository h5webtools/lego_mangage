// app/router/news.js
module.exports = app => {
  // 创建乐高活动目录，生成文件等
  app.router.post('/lego/packageAct', app.controller.lego.index.packageActPage);
  // 获取所有的活动列表
  app.router.post('/lego/getActPageList', app.controller.lego.index.getActPages);
  // 获取组件列表
  app.router.post('/lego/getComponentList', app.controller.lego.index.getComponents);
  // 查询活动详情信息
  app.router.post('/lego/getPageBaseInfo', app.controller.lego.index.getPageBaseInfoById);
  // 获取选定组件的样式
  app.router.post('/lego/getSelectedComponentStyles', app.controller.lego.index.getSelectedComponentStyles);
  // 检查活动目录是否有冲突
  app.router.post('/lego/checkActDirNameExist', app.controller.lego.index.checkActDirNameExist);
  // 批量查询活动页面信息
  app.router.post('/lego/getMultiplePage', app.controller.lego.index.getMultiplePage);
  // 创建活动页面
  app.router.post('/lego/createPage', app.controller.lego.index.createActPage);
  // 更新页面内容配置
  app.router.post('/lego/updatePageContent', app.controller.lego.index.updatePageContent);
  // 更新活动基本配置 分享一类的数据
  app.router.post('/lego/updateBaseInfo', app.controller.lego.index.updateBaseInfo);
  // 查询乐高在当前时间下的公告
  app.router.post('/lego/getLegoNotice', app.controller.lego.index.getLegoNotice);
  // 拷贝新页面
  app.router.post('/lego/copyPage', app.controller.lego.index.copyPage);
  // 保存乐高组件
  app.router.post('/lego/saveComponent', app.controller.lego.index.saveComponent);
  // 保存乐高组件样式
  app.router.post('/lego/saveComponentStyle', app.controller.lego.index.saveComponentStyle);
  // 更新乐高组件
  app.router.post('/lego/updateComponent', app.controller.lego.index.updateComponent);
  // 更新乐高组件样式
  app.router.post('/lego/updateComponentStyle', app.controller.lego.index.updateComponentStyle);
  // 释放页面锁
  app.router.post('/lego/releaseLock', app.controller.lego.index.releaseLock);
  // 页面编辑页
  app.router.get('/lego/editPage', app.controller.legoPage.index.editPage);
  // 乐高配置页面主页
  app.router.get('/lego/homePage', app.controller.legoPage.index.homePage);
  // 乐高调试页面
  app.router.get('/lego/debug', app.controller.legoPage.index.debugPage);
  // 同步文件回调
  app.router.post('/lego/syncCallback', app.controller.lego.index.syncResultCallback);
  // 预览
  app.router.post('/lego/previewLock', app.controller.lego.index.changePreviewLock);
  // 保存页面后更改为预览状态
  app.router.post('/lego/setPreviewLock', app.controller.lego.index.setPreviewLock);
  // 获取乐高主题色配置
  app.router.post('/lego/getLegoThemeColor', app.controller.lego.index.getLegoThemeColor);
  // 乐高打包
  // app.router.post('/lego/legoPackage', app.controller.lego.index.legoPackage);
  // app.router.post('/lego/publishSit', app.controller.lego.index.publishSit);
};
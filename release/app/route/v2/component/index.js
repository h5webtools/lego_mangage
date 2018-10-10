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
  
    // 获取编辑页的组件列表
    app.router.post(routerPrefix +  '/getWidgetList', controller[version].component.index.getWidgetList);
  };
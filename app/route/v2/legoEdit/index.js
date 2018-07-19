module.exports = app => {

  const {
    router,
    controller,
    config
  } = app;
  
  // const version = config.legoConfigV2.version  
  const version = 'v2'
  const routerPrefix = '/' + version
  app.router.get(routerPrefix +  '/legoEdit', controller[version].legoEdit.index.index);

};
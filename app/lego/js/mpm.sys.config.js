define(function(require, exports, module) {
  var cfg = {
    root: '/',
    phpRoot: '/lego',
    actHost: '/',
    tplUrl: '/act/getComponentTemplates',
    savePageRelaction: '/act/SavePageActRelation',
    defaultShareImg: 'https://cdn.jyblife.com/static/style/app/publish/img/nocard/logo.png'
  };

  for (var o in cfg) {
    exports[o] = cfg[o];
  }

});

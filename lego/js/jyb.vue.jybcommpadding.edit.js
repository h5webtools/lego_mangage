define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.commontag");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybcommpadding/edit.html';


  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'commontag',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "bgcolor": "",
      "conheight": "",
      "outterwidth": "",
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/commontag",
    },
    watch: ['data.styleKey', "data.bgcolor", "data.conheight"]
  });



  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    if (!component.config.obj.bgcolor) {
      component.config.obj.bgcolor = '';
      component.config.obj.conheight = '';
    }
    return component;
  };

});


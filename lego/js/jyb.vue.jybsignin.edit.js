
define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybsignin");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybsignin/edit.html';

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */


  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybsignin',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "npmversion":"",
      "npmversionArr":[],
      "npmname":"@lego/jybsignin",
      "actid":"",
      "eventid":"",
      "queryCmd":"",
      "signCmd":""
    },
    watch: ['data.styleKey', "data.actid","data.queryCmd" ,"data.signCmd"]
  });



  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    return component;
};

});


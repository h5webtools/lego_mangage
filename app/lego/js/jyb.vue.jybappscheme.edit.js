define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.commontag");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybappscheme/edit.html';
  var moduleDataCenter = require('./mpm.sys.dataCenter');
  var commonUtil = require('./common.util');
  // 页面ID
  var pageID = commonUtil.getUrlQuery('page_id');

  var scriptTemplate = function scriptTemplate(appid, linkType, url) {
    return ";(function() {\n\t  \n    var link = ".concat(linkType, " == 1 ? \"jiayoubao://web?url=\" + encodeURIComponent(location.href) : \"").concat(url, "\";\n    // do something\n    var meta = document.createElement(\"meta\");\n      meta.name = \"apple-itunes-app\";\n      meta.content = \"app-id=").concat(appid, ",app-argument=\" + link + \";\n      document.getElementsByTagName('head')[0].appendChild(meta);\n\n    location.href = link;\n  })()");
  };

  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'commonTag',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "appid": "909606737", // 加油宝appid
      "linkType": "1",
      "code": "",
      "externalLink": "jiayoubao://jtjr.jiayoubao/openwith", // app首页
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/commontag"
    },
    watch: ['data.styleKey']
  });

  //线上页面，获取html 模板片段
  _Class.prototype.getHTMLString = function () {
    var div = $('<div>');
    var HTMLString = this._getStyle().template;
    var dom = $(HTMLString).attr('uid', this.obj.uid).html('<div></div>');
    var html;
    div.append(dom);
    html = div.html();
    div.remove();
    return html;
  };

  _Class.prototype._appendEditDom = function () {
    var that = this;
    var config = this.config;
    var styleObj = this._getStyle();
    var editDom = $('#editbox_' + this.obj.uid).append($(that.tplEdit))[0];

    //编辑
    this.domEdit = new Vue({
      el: editDom,
      data: {
        obj: that.obj,
        arrStyle: that.arrStyle,
        showStyle: true,
        showProperty: false,
        oldObj: {
          data: {}
        }
      },
      created: function () {
        // `this` 指向 vm 实例
        Object.assign(this.oldObj.data, this.obj.data);
        this.getScriptCode();
      },
      watch: {
        'obj.data.appid': function (val) {
          this.getScriptCode();
        },
        'obj.data.linkType': function () {
          this.getScriptCode();
        },
        'obj.data.externalLink': function () {
          this.getScriptCode();
        },
      },
      methods: {
        show: function (index) {
          if (index == 0) {
            this.showStyle = true;
            this.showProperty = false;
          } else {
            this.showStyle = false;
            this.showProperty = true;
          }
        },
        selectNpmVersion: function () { /* npm管理 */
        },
        getScriptCode() {
          this.obj.data.code = scriptTemplate(this.obj.data.appid, this.obj.data.linkType, this.obj.data.externalLink);
        }
      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);


  };

  //和线上展示的页面数据结构对应起来 window._componentConfig[]
  _Class.prototype.getData = function () {
    var obj = this.getMPMData();
    delete obj.data.code;

    var string = JSON.stringify(obj, null, '    ');
    string = string.replace(/"#fnObj#"/ig, 'window.vueFnObj.fn_' + this.config.obj.data.styleKey);
    var string = JSON.stringify(obj, null, '    ');
    return string;
  };

  //获取存在存在数据库中的数据
  _Class.prototype.getMPMData = function () {
    this.obj.data.uid = this.obj.uid;
    this.obj.data.didTrigger = false;
    this.obj.data.didFinish = false;

    var obj = {};

    obj = Object.assign(obj, this.obj);

    delete obj['itemList'];
    delete obj['_itemList'];
    delete obj['com_extend'];

    obj.data = Object.assign({}, obj.data);
    obj.data._itemList = [];
    obj.data.itemList = [];
    obj.data.fnObj = '#fnObj#';
    delete obj.data.pageConfig;
    obj.data.code = obj.data.code.replace('!--', '! --');
    return obj;
  };

  exports.getComponent = function (config) {
    var component = new _Class(config);
    config.obj.data.code = (config.obj.data.code || '').replace('! --', '!--');

    return component;
  };

});


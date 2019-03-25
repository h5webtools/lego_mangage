define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.commontag");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybappscheme/edit.html';
  var moduleDataCenter = require('./mpm.sys.dataCenter');
  var commonUtil = require('./common.util');
  // 页面ID
  var pageID = commonUtil.getUrlQuery('page_id');

  var scriptTemplate = function scriptTemplate(appid, linkType, url) {
    return ";(function() {\n    var ua = navigator.userAgent.toLowerCase();\n    var isJyb = ua.indexOf('jiayoubao') != -1;\n\n\t if (!isJyb) {\n    var link = '';\n    if (".concat(!url, ") {\n\t\tlink = \"jiayoubao://web?url=\" + encodeURIComponent(location.href); \n    } else {\n\t\tif (").concat(linkType == 1, ") {\n\t\t\tlink = \"jiayoubao://web?url=").concat(encodeURIComponent(url), "\"; \n      } else {\n        link = \"").concat(url, "\";\n      }\n    }\t  \n\n    var el = document.getElementsByClassName('smartbanner-wrapper')[0];\n    el.style.display = 'block';\n    el.addEventListener('click', function () {\n       invokeOnApp();\n    });\n\n    setTimeout(function () {\n      location.href = link;\t\t \n    }, 0);\n\n\t function invokeOnApp() {\n      setTimeout(function () {\n        location.href = link;\t\t \n      }, 0);\n\n      setTimeout(function() {\n        location.href = 'https://jyb.jyblife.com/d'\n      }, 300)\n    }    \n   }  \n  })()");
  };

  var code = '<div class="smartbanner-wrapper"></div>'
  var styleCode = '.smartbanner-wrapper {'
      + 'display: none;'
      + 'position: fixed;'
      + 'z-index: 1000;'
      + 'right: 10px;'
      + 'bottom: 150px;'
      + 'width: .96rem;'
      + 'height: 1.28rem;'
      + 'background-size: contain;'
      + 'background-position: center;'
    + '};';

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
      "code": code,
      "scriptCode": "",
      "styleCode": styleCode,
      "webURL": "",
      "appURL": "jiayoubao://jtjr.jiayoubao/openwith", // app首页
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
        'obj.data.webURL': function () {
          this.getScriptCode();
        },
        'obj.data.appURL': function () {
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
          var link = this.obj.data.linkType == 1 ? this.obj.data.webURL : this.obj.data.appURL;
          this.obj.data.scriptCode = scriptTemplate(this.obj.data.appid, this.obj.data.linkType, link);
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
    config.obj.data.styleCode = config.obj.data.styleCode || '';
    config.obj.data.scriptCode = config.obj.data.scriptCode || '';

    return component;
  };

});


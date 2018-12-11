define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.commontag");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/customcode/edit.html';
  var moduleDataCenter = require('./mpm.sys.dataCenter');
  var commonUtil = require('./common.util');
  // 页面ID
  var pageID = commonUtil.getUrlQuery('page_id');
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
      "code": "", // html代码
      "styleCode": "", // css代码
      "scriptCode": "", // js代码
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
        showEditDebug: function() {
          var that = this;
          moduleDataCenter.getPageBasicInfo(pageID, function (json) {
            if (json.code != 0) {
              commonUtil.alert('页面数据获取失败');
              return;
            }
            if (json.data && json.data.page_content) {
              that.showEditDebugPanel();
            } else {
              window.LegoEditor.preview.saveAndCreatePage(function() {
                that.showEditDebugPanel();
              }, 'debug');
            }
          });
        },
        showEditDebugPanel: function() {
          var that = this;
          // 显示调试编辑器
          window.debugEditor.show({
            codeHtmlString: that.obj.data.code,
            codeStyleString: that.obj.data.styleCode,
            codeScriptString: that.obj.data.scriptCode,
            // 这里引入mpm.sys.preview模块有循环依赖问题，先这样处理了
            frameUrl: window.LegoEditor.preview.getPreviewURL()
          });
          window.debugEditor.off('save').on('save', function (code) {
            console.log(code);
            that.obj.data.code = code.html;
            that.obj.data.styleCode = code.style;
            that.obj.data.scriptCode = code.script;
          });
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
    obj.data.code = obj.data.code.replace(/\\n/g, "").replace(/\\/g, "").replace(/\\t/g, "");
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


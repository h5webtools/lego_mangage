define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.commontag");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybrules/edit.html';
  var wangEditor = require('./lib/wangeditor');

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */


  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'commontag',
    data: {
      styleKey: '',
      "_itemList": [],
      "itemList": [],
      "combo": 0,
      "didTrigger": false, //生成页面的时候，这里为False
      "didFinish": false, //生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "showMore": false,
      "rulesTitle": '',
      "rulesTitleColor": '',
      "rulesContent": [],
      "rulesOutterBgColor": "",
      "rulesBgColor": "",
      "rulesContentColor": "",
      "npmversion": "",
      "npmversionArr": [],
      'rulesContentHtml':'',
      "npmname": "@lego/commontag",
      "showTipsFlag": false
    },
    watch: ['data.showTipsFlag', 'data.styleKey', "data.rulesTitle", "data.rulesBgColor", "data.rulesContent", "data.rulesContentColor", "data.rulesOutterBgColor", "data.rulesTitleColor"]
  });


  //编辑功能
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
        },
        showRichEditor: false,

        editor: null,
      },
      computed: {
        useRichTextEditor() {
          var that = this;
          var style = this.arrStyle.find(function(i) {
            return i.id == that.obj.data.styleKey;
          });

          return style.tpl_url.indexOf('show.4.html') > -1;
        }
      },
      created: function () {
        // `this` 指向 vm 实例
        Object.assign(this.oldObj.data, this.obj.data);
        //this.loadActRule(false);
      },
      mounted: function () {
        if (this.useRichTextEditor) {
          this.showRichEditor = true;
          this.$nextTick(function () {
            this.initWangEditor();
          });
        }
      },
      events: {},
      watch: {

        'obj.data.styleKey': {
          handler: function (val, oldVal) {
            var that = this;
            if (that.useRichTextEditor) {
              that.showRichEditor = true;
              this.$nextTick(function () {
                this.initWangEditor();
              });
            } else {
              that.destroyEditor();
              that.showRichEditor = false;
            }
          },
          deep: false
        }
      },
      methods: {
        change: function () { //点击保存
          for (var i = 0; i < that.__config.watch.length; i++) {
            var arr = that.__config.watch[i].split('.');
            if (arr[1] == 'styleKey') {
              continue;
            }
            this.oldObj.data[arr[1]] = this.obj.data[arr[1]];
          }
          that.rebuildShowComponent();
        },
        chancel: function () {
          for (var i = 0; i < that.__config.watch.length; i++) {
            var arr = that.__config.watch[i].split('.');
            if (arr[1] == 'styleKey') {
              continue;
            }

            this.obj.data[arr[1]] = this.oldObj.data[arr[1]];
          }
        },
        show: function (index) {
          if (index == 0) {
            this.showStyle = true;
            this.showProperty = false;
          } else {
            this.showStyle = false;
            this.showProperty = true;
          }
          this.$nextTick(function () {


          })
        },


        addRulespoint: function () {
          this.obj.data.rulesContent.push({
            rulesTitle: '', //
            rulesDes: ''

          });

          this.$nextTick(function () {

          });
        },
        deleteRulespoint: function (index) {
          var deleteItem = this.obj.data.rulesContent.splice(index - 0, 1);
        },
        loadActRule: function(tipsFlag) {
          var actDetail = window.ACT_DETAIL;
          var actDetailHTML = '';
          if(!actDetail.rule_description) {
            !!tipsFlag && alert('活动规则配置为空');
            return;
          }
          var htmlEncode = actDetail.rule_description.replace("{{begin_time}}" , actDetail.effect_time).replace("{{end_time}}" , actDetail.expire_time);
          this.obj.data.rulesContentHtml = htmlEncode;
          if (this.editor) {
            this.editor.txt.html(htmlEncode);
          }
          !!tipsFlag && alert('活动规则加载成功');
        },
        selectNpmVersion: function () { /* npm管理 */
          console.info("切换到活动规则的版本是", this.obj.data.npmversion);
          require.async('./mpm.sys.dataCenter', function (module) {
            moduleDataCenter = module;
          });
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path =  pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/commontag', path, function () {
            console.log("update ok ");
          });
        },
        initWangEditor() {
          var E = wangEditor || window.wangEditor;

          this.editor = new E(this.$refs.wangeditor);
          this.editor.customConfig.menus = [
              'head',  // 标题
              'bold',  // 粗体
              'fontSize',  // 字号
              'fontName',  // 字体
              'italic',  // 斜体
              'underline',  // 下划线
              'strikeThrough',  // 删除线
              'foreColor',  // 文字颜色
              'backColor',  // 背景颜色
              'link',  // 插入链接
              'list',  // 列表
              'justify',  // 对齐方式
              'quote',  // 引用
              'table',  // 表格
              'lineHeight', // 行高
          ];

          this.editor.customConfig.onchange = function (html) {
            that.obj.data.rulesContentHtml = html;
          };

          this.editor.create();
          this.editor.txt.html(this.obj.data.rulesContentHtml);
        },
        destroyEditor() {
          if (this.editor) {
            this.editor.$textContainerElem.remove();
            this.editor.$toolbarElem.remove();
            this.editor = null;
          }
        }
      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);


  };

  function loadExternalScript(url, callback) {
    window.EXTERNAL_SCRIPT = window.EXTERNAL_SCRIPT || {}
    if (window.EXTERNAL_SCRIPT[url]) {
      return setTimeout(function () {
        callback && callback();
      })
    }

    var script = document.createElement('script');
    script.onload = function () {
      window.EXTERNAL_SCRIPT[url] = true;
      callback && callback();
    }

    script.onerror = function () {
      console.error('load script failed', url);
    }

    document.body.appendChild(script);
    script.src = url;
  }

  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    if (!component.config.obj.data.rulesTitle) {

    }
    return component;
  };
});

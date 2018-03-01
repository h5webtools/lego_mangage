define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybranklist");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybranklist/edit.html';

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */


  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybranklist',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "rankpadding": "", //padding
      "headbgcolor": "",//背景色
      "headwordColor": "",//字体颜色
      "contentbgcolor": "",//背景色
      "contentwordColor": "",//字体颜色
      "footbgcolor": "",//背景色
      "footwordColor": "",//字体颜色
      'borderradiusval': "",//圆角
      'evencolumncolor': "",//奇数行背景
      "tableContentArr": [],//表格内容
      "pdTop": "",
      "outterwidth": "",
      "outterbgcolor": "",
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybranklist",
    },
    watch: ['data.styleKey', "data.rankpadding", "data.headbgcolor", "data.headwordColor", "data.contentbgcolor",
      "data.contentwordColor", "data.footbgcolor", "data.footwordColor", "data.tableContentArr", "data.borderradiusval",
      "data.evencolumncolor"]
  });

  _Class.prototype.showCB = function () {
    var that = this;
    var config = this.config;
    var styleObj = this._getStyle();

    /* 模板 */
    require.async('./mpm.sys.dataCenter', function (module) {
      moduleDataCenter = module;
    });
    require.async('./mpm.sys.basicInfo', function (module) {
      moduleBasicInfo = module;
    });

    var pageInfo = moduleBasicInfo.showMePageInfo();
    var folderSet = moduleBasicInfo.showMeFolderName();

    var path = pageInfo.datefolder + '/' + folderSet.sub + '/';

    this.obj.data.isShowNpmVersions = USER_INFOR.isAdmin;
    moduleDataCenter.getnodeversions('@lego/jybranklist', path, function (json) {
      if(json.code == 0){
        var _data = json.data.version_list;
        that.obj.data.npmversionArr = _data;
        if (!that.obj.data.npmversion) {
          that.obj.data.npmversion = _data[_data.length - 1].version;
        }
      }
    });

    moduleDataCenter.getTplList('4', function (json) {
      if (json.code == 0) {
        that.obj.data.tplList = json.data.data;
      }
    });

    /* 模板 */

    this.extendObj(styleObj.com_extend);
    this.obj.data.fnObj = window.vueFnObj['fn_' + this.obj.data.styleKey];
    this.domStyle = this.addCssByStyle(styleObj.com_css);

    this._showRightList();
    this._appendShowDom();
    this._appendEditDom();
  };

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
        }
      },
      created: function () {
        // `this` 指向 vm 实例
        Object.assign(this.oldObj.data, this.obj.data);
      },
      events: {},
      watch: {

        'obj.data.styleKey': {
          handler: function (val, oldVal) {
            this.$nextTick(function () {

            })
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
        addtableContent: function () {
          this.obj.data.tableContentArr.push({
            tabContentItem: "",
            tabListWidth: "",
            rankkey: ""
          });
          this.$nextTick(function () {

          });
        },
        deletetableContent: function (index) {
          var deleteItem = this.obj.data.tableContentArr.splice(index - 0, 1);
        },
        selectNpmVersion: function () { /* npm管理 */

          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          require.async('./mpm.sys.dataCenter', function (module) {
            moduleDataCenter = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybranklist', path, function () {
            console.log("update ok ");
          });
        },
        toConfigTree: function () {
          var moduleUtil, me = this;
          require.async('./mpm.sys.util', function (module) {
            moduleUtil = module;
          });
          var divComponentIframe = $("#divComponentIframe");
          var _pageid = moduleBasicInfo.showMePageInfo().id,
            _tpl_id = this.obj.data.tplid,
            _act_id = moduleUtil.getUrlQuery('act_id'),
            _comid = this.obj.uid.replace("com_", "");
          if (!_tpl_id) {
            alert("请先选择对应的模板");
            return;
          }
          // /ConfigTreeLego/:tpl_id/:pageid/:comid/:act_id
          var _url = location.origin + '/#/ConfigTreeLego/' + 
                    _tpl_id + '/' + 
                    _pageid + '/' + 
                    _comid + '/' + 
                    _act_id,
            key = _pageid + "_" + _comid + "_" + _tpl_id + "_" + _act_id;

          divComponentIframe.find("iframe")[0].src = _url;
          divComponentIframe.show();

          window.addEventListener("message", function (e) {
            var json = JSON.parse(e.data);
            if (json[key]) {
              var cmds = JSON.parse(json[key]);
                // me.obj.data.gridcmd = cmds[0];
                // me.obj.data.gridactid = _act_id;
            }
          }, true);
        }

      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);


  };

  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    if (!component.config.obj.title) {
      component.config.obj.title = '';
      component.config.obj.subTitle = '';
      component.config.obj.color = '';
    }
    return component;
  };

});


define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybfigure");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybfigure/edit.html';


  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybfigure',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "descContent": [],
      "tplid": "", //模板ID 
      'comTplId': '6',//组件ID
      "cmd": "",
      "img": "",
      "actid": "",
      "bgcolor": "",
      "outterwidth": "",
      "totop": "",
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybfigure"
    },
    watch: ['data.styleKey', "desfontsize", "color", "backgroundcolor", "subTitle", "title"]
  });

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


        addDescpoint: function () {
          this.obj.data.descContent.push({
            desc: '', //
            color: '',
            desfontsize: '', //
            backgroundcolor: ''
          });

          this.$nextTick(function () {

          });
        },
        deleteDescpoint: function (index) {
          var deleteItem = this.obj.data.descContent.splice(index - 0, 1);
        },
        selectNpmVersion: function () { /* npm管理 */

          require.async('./mpm.sys.dataCenter', function (module) {
            moduleDataCenter = module;
          });
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybfigure', path, function () {
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
                me.obj.data.cmd = cmds[0];
                me.obj.data.actid = _act_id;
            }
          }, true);
        }
      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);
  };

  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    if (component.config.obj.data.descContent.length == 0) {
      component.config.obj.data.descContent = [];
    }
    return component;
  };

});


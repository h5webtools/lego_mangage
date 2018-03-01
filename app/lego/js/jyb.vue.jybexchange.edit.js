define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybexchange");
  var Factory = require('./jyb.vue.edit.factory');
  var DateInputLib = require('./mpm.sys.calendar').mpmDateInputLib;
  var defaultTplEdit = '/public/template/new/jybexchange/edit.html';

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */

  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybexchange',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "cmd": "",
      "exchangecmd": "",
      "actId": "",
      "actType": "",
      "bgcolor": "", //背景色
      "LRpadding": "",//左右边距
      "TopPadding": "",//上边距
      "DownPadding": "",//下边距
      "buiedcolor": "",
      "bottomdesc": "",
      "buiedsize": "",
      "buieddesc": "",
      "exchagetime": "",
      "exchangeItem": [],//
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybexchange",
    },
    watch: ['data.styleKey', 'data.bgcolor', 'data.exchangeItem', 'data.TopPadding', 'data.DownPadding', "data.cmd",
      "data.actId", "data.actType"]
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
    moduleDataCenter.getnodeversions('@lego/jybexchange', path, function (json) {
      if(json.code == 0){
        var _data = json.data.version_list;
        that.obj.data.npmversionArr = _data;
        if (!that.obj.data.npmversion) {
          that.obj.data.npmversion = _data[_data.length - 1].version;
        }
      }
    });

    moduleDataCenter.getTplList('3', function (json) {
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
            var today = new Date();
            DateInputLib($("#editbox_" + that.obj.uid).find(".selecttime[settime!='1']"), {
              chosendate: today,
              //开始年份
              startdate: today.getFullYear(),
              //结束年份
              enddate: today.getFullYear() + 3,
              //时间格式
              timeFormat: 'hh:ii:ss', //hh:ii:ss
              hasTime: true,
              x: 0,
              y: -240,
              //选择完成后的回调事件
              callback: function (datepicker) {
                that.obj.data.exchagetime = datepicker.value;
                console.log('选定日期', datepicker.value);
              }
            })
          })
        },
        addExchangeItem: function () {
          this.obj.data.exchangeItem.push({
            topDes: "",
            awardImg: "",
            exchangeDes: "",
            exchangelevel: "",
            imgtype: 0,
            awardFlag: 0 // 0:未满额 1:已兑换 2:未兑换
          });

          this.$nextTick(function () {

          });
        },
        deleteExchangeItem: function (index) {
          var deleteItem = this.obj.data.exchangeItem.splice(index - 0, 1);
        },
        selectNpmVersion: function () { /* npm管理 */
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybexchange', path, function () {
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
                me.obj.data.gridcmd = cmds[0];
                me.obj.data.gridactid = _act_id;
            }
          }, true);
        }

      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);
  };

  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    if (component.config.obj.exchangeItem && component.config.obj.exchangeItem.length > 0) {
      component.config.obj.exchangeItem = [];
      component.config.obj.bgcolor = "";
    }
    return component;
  };

});


define(function (require, exports, module) {
  var vueComponent = require("./jyb.vue.jybcoupon");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybcoupon/edit.html';

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */

  exports.getComponent = function (config, callback) {
  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybcoupon',
    data: {
      styleKey: '',
      "_itemList": [],
      "itemList": [],
      "combo": 0,
      "didTrigger": false, //生成页面的时候，这里为False
      "didFinish": false, //生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybcoupon",
      "couponBg":'',
      "couponDialogBg":'',
      "DialogBtnBg":'',
      "couponList":[],
      "endTime":'',
      "cuttimetype":0,
      "tplid": '', //模板ID
      'comTplId': '',//组件ID
    },
    watch: ['data.styleKey', "data.headmapsrc"]
  });

  _Class.prototype.showCB = function () {
    var that = this;
    var config = this.config;
    var styleObj = this._getStyle();

    /* npm管理 */
    that.obj.data.isShowNpmVersions = USER_INFOR.isAdmin;
    require.async('./mpm.sys.dataCenter', function (module) {
      moduleDataCenter = module;
    });
    require.async('./mpm.sys.basicInfo', function (module) {
      moduleBasicInfo = module;
    });

    var pageInfo = moduleBasicInfo.showMePageInfo();
    var folderSet = moduleBasicInfo.showMeFolderName();

    var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

    moduleDataCenter.getnodeversions("@lego/jybcoupon", path, function (json) {
      if(json.code == 0){
        var _data = json.data.version_list;
        that.obj.data.npmversionArr = _data;
        if (!that.obj.data.npmversion) {
          that.obj.data.npmversion = _data[_data.length - 1].version;
        }
      }
    });

    /* npm管理 */

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
      computed: {
        currentStyle() {
          var that = this;
          return this.arrStyle.find(function(i) {
            return i.id == that.obj.data.styleKey;
          });
        },
        extraProps() {
          if (!this.currentStyle) {
            return {};
          }

          if (this.currentStyle.tpl_url.indexOf('show.1.html') > -1) {
            return {
              bgcolor: true,
            }
          }

          if (this.currentStyle.tpl_url.indexOf('show.2.html') > -1) {
            return {
              bgcolor: true
            }
          }

          if (this.currentStyle.tpl_url.indexOf('show.4.html') > -1) {
            return {
              bgcolor: true,
              desc1Color: true,
              desc2Color: true,
              desc3Color: true,
              desc3: true,
              btnColor: true,
              btndescColor: true,
              leftBgcolor: true,
              msgColor: true,
              drawbtndesc: true,
            }
          }

          if (this.currentStyle.tpl_url.indexOf('show.3.html') > -1) {
            return {
              bgcolor: true,
              desc1Color: true,
              desc2Color: true,
              btndescColor: true,
              drawbtndesc: true,
            };
          }

          if (this.currentStyle.tpl_url.indexOf('show.5.html') > -1) {
            return {
              desc1Color: true,
              desc2Color: true,
              btndescColor: true,
              drawbtndesc: true,
              endTime: true,
              bgURL: true,
            };
          }

          return {};
        }
      },
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
        checkShowProp: function (propName) {
          return this.extraProps[propName];
        },
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
        },
        addExchangeItem: function () {
          this.obj.data.couponList.push({
            "desc1":'',
            "desc1Color": '',
            'desc2':'',
            "desc2Color": '',
            'desc3':'',
            "desc3Color": '',
            'drawTime':'',
            'bgcolor':'',
            "awardhref":'',
            "drawbtndesc": "立即领取",
            "btndescColor": '',
            "awarddes1":'',
            "awarddes2":'',
            "btndesc":'立即抢购',
            "status":2,
            "unreachType": '0',
            "unreachbtndesc" : '',
            "unreachdes": '',
            "unreachhref": '',
            "mtaunreach": '',
            "endTime": '',
            "bgURL": '',
          });

          this.$nextTick(function () {

          });
        },
        deleteExchangeItem: function (index) {
          var deleteItem = this.obj.data.couponList.splice(index - 0, 1);
        },
        selectNpmVersion: function () { /* npm管理 */
          console.info("切换到头图的版本是", this.obj.data.npmversion);
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();
          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";
          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybcoupon', path, function () {

          });
        }
      }
    });
    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);
  };

    var component = new _Class(config, callback);
    if (!component.config.obj.data.headmapsrc) {
      component.config.obj.data.headmapsrc = "https://cdn.jyblife.com/static/style/act/publish/img/txauto0804/banner_txvideo.png";
    }
    return component;
  };
});

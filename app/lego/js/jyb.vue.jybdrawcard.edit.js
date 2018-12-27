define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybdrawcard");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybdrawcard/edit.html';

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */

  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybdrawcard',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "cmd": "",
      "actId": "",
      "cardHeight":"263", //牌面高度
      "backgroundcolor": "",//背景色
      "rotateType": "1",//翻转形式
      "areaType": "1",//排列方式
      "paddingLeft": "",//左间距
      "paddingRight": "",//右间距
      "activeColor": "",//高亮颜色
      "rotateList": [],//卡片列表
      "lotteryContent": '剩余抽奖次数：',//抽奖次数文案
      "isShowLottery": '1', //是否展示抽奖次数
      "isShowCoupon": '1', // 是否展示查看红包
      "lotteryContentColor": '',// 字体颜色
      "lotteryContentFont": '24', // 字体大小
      "lotteryNum": '0', // 抽奖次数
      "lotteryCmd": '', // 抽奖命令字
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybdrawcard",
      "tplid": '38', //模板ID 
      'comTplId': '',//组件ID
    },
    watch: ['data.styleKey', "desfontsize","cardHeight", "backgroundcolor", "rotateType", "areaType", "paddingLeft", "paddingRight", "activeColor", "rotateList", "lotteryContent", "isShowCoupon", "isShowLottery", "lotteryContentColor", "lotteryContentFont", "lotteryNum","lotteryCmd"]
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
    moduleDataCenter.getnodeversions('@lego/jybdrawcard', path, function (json) {
      if(json.code == 0){
        var _data = json.data.version_list;
        that.obj.data.npmversionArr = _data;
        if (!that.obj.data.npmversion) {
          that.obj.data.npmversion = _data[_data.length - 1].version;
        }
      }
    });

    moduleDataCenter.getTplList( that.obj.data.comTplId || '38', function (json) { // 由组件ID获取对应组件的所有模板
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
        console.log('a is: ' + this.obj);
        Object.assign(this.oldObj.data, this.obj.data);
        console.log(this.oldObj);
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
        selectNpmVersion: function () { /* npm管理 */
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybdrawcard', path, function () {
            console.log("update ok ");
          });
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
        addCard: function () {
          if (this.obj.data.rotateList.length > 0) {
            this.obj.data.rotateList.push(this.obj.data.rotateList[0])
          } else {
            this.obj.data.rotateList.push({
              frontImg: '',
              backImg: '',
              backbgc: '',
              backContent: '',
              backTitleContent: '',
              backTitleColor: '',
              backTitlefontSize: '',
              backContentColor: '',
              backContentfontSize: '',
              backDesc: '',
              backDescColor: '',
              backDescfontSize: '',
              rotateStatus:'0',
              activeStatus: '0',
              eventid: ''
            });
          }
          
        },
        deleteCard: function (index) {
          var deleteItem = this.obj.data.rotateList.splice(index - 0, 1);
        },
        addHighlight: function (index) {
          this.obj.data.tabIndex = index;
        },
        toConfigTree: function () {
          var moduleUtil, me = this;
          require.async('./mpm.sys.util', function (module) {
            moduleUtil = module;
          });
          var divComponentIframe = $("#divComponentIframe");
          var _pageid = moduleBasicInfo.showMePageInfo().id,
            _tpl_id = this.obj.data.tplid,
            _act_id = encodeURIComponent(moduleUtil.getUrlQuery('act_id')),
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
            key = _pageid + "_" + _comid + "_" + _tpl_id + "_" + decodeURIComponent(_act_id);

          divComponentIframe.find("iframe")[0].src = _url;
          divComponentIframe.show();

          window.addEventListener("message", function (e) {
            var json = JSON.parse(e.data);
            if (json[key]) {
              var cmds = JSON.parse(json[key]);
                me.obj.data.cmdid = cmds[0];
                cmds.length > 1 ? (me.obj.data.areacmdid = cmds[1]) : '';
                me.obj.data.activeid = decodeURIComponent(_act_id);
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
      component.config.obj.groupList = [];
      component.config.obj.newsList = [];
    }
    return component;
  };

});


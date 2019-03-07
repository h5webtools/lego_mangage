define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybcouponrain");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybcouponrain/edit.html';

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */

  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybcouponrain',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "cmd": "",//领奖命令字
      "listCmd": "",//获取奖池命令字
      "numberCmd": "",//抽奖次数命令字
      "actId": "",
      "backgroundcolor": "",//背景色
      "bgImg": "", // 背景图片
      "bgTop": "", // 顶部图片
      "bgTopHeight": "193", // 顶部图片高度
      "bgBottom": "", // 底部图片
      "bgBottomHeight": "251", // 底部图片高度
      "couponImg": "", // 红包icon
      "duration": "20", // 倒计时时间
      "durTime": "2", // 下落时间
      "maxNum": 100, // 最多生成icon数
      "isSeq": "1", // 有奖红包
      "dialogImg": "", // 弹窗背景图
      "dialogHeight": "670", // 弹窗背景高度
      "dialogFailTitle": "", // 弹窗未中奖标题
      "dialogFailContent": "", // 弹窗未中奖文案
      "dialogBtnList": [], // 弹窗按钮
      "durationFs": 22, // 倒计时字体大小
      "durationColor": "", // 倒计时字体颜色
      "durationTop": 200, // 倒计时距离顶部距离
      "durationBottom": null, // 倒计时距离底部距离
      "durationLeft": null, // 倒计时距离左边距离
      "durationRight": 30, // 倒计时距离右边距离
      "couponList": [], // 红包列表  **********用于数据操作，不做配置展示************
      // "randomList": [],
      // "couponImgList": [],
      // "timer": null,
      // "couponNum": 0, // 生成总红包数
      // "randomNum": 0, // 有奖红包数
      // "max_reward": 16, // 最多有奖红包数
      // "checkCoupon": 0, // 点中有奖红包数  *************用于数据操作，不做配置展示*****************
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybcouponrain",
      "tplid": '', //模板ID 
      'comTplId': '40',//组件ID
    },
    watch: ['data.styleKey', "desfontsize", "backgroundcolor", "bgImg", "bgTop", "bgTopHeight", "bgBottom", "bgBottomHeight", "couponImg", "duration", "durTime","maxNum", "isSeq","dialogImg", "dialogHeight","dialogBtnList","durationFs","durationColor","durationTop","durationBottom","durationLeft","durationRight","cmd","listCmd","numberCmd","dialogFailTitle", "dialogFailContent"]
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
    moduleDataCenter.getnodeversions('@lego/jybcouponrain', path, function (json) {
      if(json.code == 0){
        var _data = json.data.version_list;
        that.obj.data.npmversionArr = _data;
        if (!that.obj.data.npmversion) {
          that.obj.data.npmversion = _data[_data.length - 1].version;
        }
      }
    });

    moduleDataCenter.getTplList( that.obj.data.comTplId, function (json) { // 由组件ID获取对应组件的所有模板
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
                me.obj.data.cmd = cmds[0];
                cmds.length > 1 ? (me.obj.data.listCmd = cmds[1]) : '';
                cmds.length > 2 ? (me.obj.data.numberCmd = cmds[2]) : '';
                me.obj.data.activeid = decodeURIComponent(_act_id);
            }
          }, true);
        },
        selectNpmVersion: function () { /* npm管理 */
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybcouponrain', path, function () {
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
        addbutton: function () {
          this.obj.data.dialogBtnList.push({
            img: '',
            bgColor: '',//按钮背景色
            fontSize: '', // 字体大小
            fsColor: '', // 字体颜色
            content: '',
            flag: 2 ,// 1为带剩余次数。2为不带剩余次数
            btnClick: 'reload', // reload刷新，gotoLink跳转链接，close关闭
            link: ''
          });
        },
        deleteButton: function (index) {
          var deleteItem = this.obj.data.dialogBtnList.splice(index - 0, 1);
        },
        addHighlight: function (index) {
          this.obj.data.tabIndex = index;
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


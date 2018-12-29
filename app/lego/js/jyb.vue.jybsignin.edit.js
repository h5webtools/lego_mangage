
define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybsignin");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybsignin/edit.html';

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */


  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybsignin',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "npmversion":"",
      "npmversionArr":[],
      "npmname":"@lego/jybsignin",
      "actid":"",
      "eventid":"",
      "queryCmd":"",
      "signCmd":"",
      "backgroundImage": "https://images.jyblife.com/act/201812/sign/sign_bg.png",
      "rewardList": "",
      "padding": "",
      "paddingRem": "",
      "progressBarBgColor": "",
      "progressBgColor": "",
      "btnBackColor": "",
      "totalSignInDays": "",
      "rewardList": [{
        "desc_color": "",
        "reward_desc": "",
        "reward_image": "",
        "reward_days": ""
      }]
    },
    watch: ['data.styleKey', "data.progressBarBgColor", "data.progressBgColor", "data.paddingRem", "data.actid","data.queryCmd" ,"data.signCmd", "data.backgroundImage", "data.btnBackColor", "data.rewardList"]
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
        Object.assign(this.oldObj.data, this.obj.data);
      },
      watch: {
        'obj.data.padding': function(val) {
          this.obj.data.paddingRem = val/100;
          console.log(this.obj.data.paddingRem)
        }
      },
      events: {},
      methods: {
        selectNpmVersion: function () { /* npm管理 */
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybnews', path, function () {
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
        addSignReward: function () {
          console.log(this.obj.data.rewardList)
          this.obj.data.rewardList.unshift({
            'desc_color': '',
            'reward_desc': '',
            'reward_image': '',
            'reward_days': ''
          });
        },
        deleteReward: function (index) {
          this.obj.data.rewardList.splice(index - 0, 1);
        }
      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);
  }

  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    return component;
};

});


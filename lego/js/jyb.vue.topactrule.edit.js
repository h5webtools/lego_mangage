define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.commontag");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/topactrule/edit.html';
  var moduleDataCenter = require('./mpm.sys.dataCenter');
  var moduleBasicInfo = "";


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
      "leftrem": "",
      "toprem": "",
      "imgurl": "",
      "isShowDialog": true,
      "rulesContent": [],
      "rulesContentHtml":"",
      "rulesBgColor": "",
      "rulesContentColor": "",
      "eventid":"",
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/commontag"
    },
    watch: ['data.styleKey', "data.rulesTitle", "data.rulesBgColor", "data.rulesContent", "data.rulesContentColor"]
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
        }
      },
      created: function () {
        // `this` 指向 vm 实例
        Object.assign(this.oldObj.data, this.obj.data);
        //this.loadActRule(false);
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
        selectNpmVersion: function () {

          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/commontag', path, function () {
            console.log("update ok ");
          });
        },
        HTMLDecode(text) { 
          var temp = document.createElement("div"); 
          temp.innerHTML = text; 
          var output = temp.innerText || temp.textContent; 
          temp = null; 
          return output; 
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
          !!tipsFlag && alert('活动规则加载成功');
        }
      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);

  };


  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    if (!component.config.obj.data.headmapsrc) {
      component.config.obj.data.headmapsrc = "https://cdn.jyblife.com/static/style/act/publish/img/txauto0804/banner_txvideo.png";
    }
    return component;
  };
});
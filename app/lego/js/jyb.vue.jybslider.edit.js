define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.commontag");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybslider/edit.html';

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
      "sliderArr": [],
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/commontag"
    },
    watch: ['data.styleKey', "data.sliderArr"]
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


        addSliderItem: function () {
          this.obj.data.sliderArr.push({
            imgSrc: '', //
            url: ''
          });

          this.$nextTick(function () {

          });
        },
        deleteSliderItem: function (index) {
          var deleteItem = this.obj.data.sliderArr.splice(index - 0, 1);
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
        }

      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);
  };


  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    if (!component.config.obj.data.rulesTitle) {

    }
    return component;
  };
});

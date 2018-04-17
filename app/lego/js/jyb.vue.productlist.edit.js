define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.productlist");
  var Factory = require('./jyb.vue.edit.factory');
  var DateInputLib = require('./mpm.sys.calendar').mpmDateInputLib;
  var defaultTplEdit = '/public/template/new/productlist/edit.html';


  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'productlist',
    data: {
      styleKey: '',
      "didTrigger": false, //生成页面的时候，这里为False
      "didFinish": false, //生成页面的时候，这里为False
      "showMore": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/productlist",
      "actId": "",
      "cmd": "",
      "showType": "1",
      "showNum": 1000,
      "isShowAll": 0,
      "jumpUrl": "",
      "eventid": "",
      "buyBtnBg":"",
      "buyColor":"",
      "advertUrl": "https://img11.360buyimg.com/mcoss/jfs/t12676/217/2503090753/59495/2e58f921/5a4de03fN38dacbf3.jpg.webp",
      "isShowSubject": 0, //是否展示主题头部 默认展示
      "subjectDesc": "圣诞必买清单",
      "timerDesc": "距离结束还有",
      "isShowTimer": 0
    },
    watch: ['data.styleKey', 'data.showType']
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
                that.obj.data.endtime = datepicker.value;
                console.log('选定日期', datepicker.value);
              }
            })
          })
        },

        selectNpmVersion: function () { /* npm管理 */
          console.info("切换排行榜组件的版本是", this.obj.data.npmversion);
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          require.async('./mpm.sys.dataCenter', function (module) {
            moduleDataCenter = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/productlist', path, function () {
            console.log("update ok ");
          });
        }

      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);


  };

  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);

    return component;
  };
});

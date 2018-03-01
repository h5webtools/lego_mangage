define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybpay");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybpay/edit.html';

  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybpay',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "coupontitle": "话费充值",
      "prdvalue": "300",
      "backtimedes": "(分3次返还)",
      "backdetail": "分3次返还,每月100元，购买当天即充100元",
      "submitdes": "立即支付(270元)",
      "backplandes": "话费返还计划描述",
      "isshowdetail": 0,
      "prdtypeval": 0,
      "backtabledes": "支付270元购300元加油套餐，2个月发放说明：",
      "backtabletitle": "话费返还说明",
      "tableConntent": []
    },
    watch: ['data.styleKey', 'data.coupontitle', 'data.prdvalue', 'data.backtimedes', "data.backtabletitle", "data.backtabledes"
      , 'data.backdetail', 'data.submitdes', 'data.backplandes', 'data.isshowdetail', 'data.prdtypeval']
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
        addTableContent: function () {
          this.obj.data.tableConntent.push({
            detailitem: '', //
            valitem: '',
            dateitem: ''
          });

          this.$nextTick(function () {

          });
        },
        deleteTableContent: function (index) {
          var deleteItem = this.obj.data.tableConntent.splice(index - 0, 1);
        },
        checkTable: function () {
          $("#pop").removeClass("ui-d-n");
          $("#pop").find(".pop-layer").addClass("pop-layer__show");
        },
        hideTable: function () {
          $("#pop").addClass("ui-d-n");
          $("#pop").find(".pop-layer").removeClass("pop-layer__show");
        }

      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);
  };

  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    if (component.config.obj.tableConntent && component.config.obj.tableConntent.length > 0) {
      component.config.obj.tableConntent = [];
    }
    return component;
  };

});


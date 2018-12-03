define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybnews");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybnews/edit.html';

  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybnews',
    data: {
      styleKey: '',
      "didTrigger": false,//生成页面的时候，这里为False
      "didFinish": false,//生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "backgroundcolor": "",//背景色
      "titleColor": '',//标题字体颜色
      "contentColor": '',//副标题颜色
      "groupList": [],
      "newsList": []
    },
    watch: ['data.styleKey', "desfontsize", "backgroundcolor", "titleColor", "contentColor", "groupList", "newsList"]
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
        addNews: function () {
          this.obj.data.newsList.push({
            title: '',
            content: '', //
            imgLink: '', //
            usergroup: '',
            href: '',
            eventid: '',
            imgArea: '1'
          });
        },
        deleteNews: function (index) {
          var deleteItem = this.obj.data.newsList.splice(index - 0, 1);
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


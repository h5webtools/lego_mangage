define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybnews");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybnews/edit.html';

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */

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
      "newsList": [],
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybnews",
      "tplid": '', //模板ID 
      'comTplId': '',//组件ID
    },
    watch: ['data.styleKey', "desfontsize", "backgroundcolor", "titleColor", "contentColor", "groupList", "newsList"]
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
    moduleDataCenter.getnodeversions('@lego/jybnews', path, function (json) {
      if(json.code == 0){
        var _data = json.data.version_list;
        that.obj.data.groupList = _data;
        if (!that.obj.data.npmversion) {
          that.obj.data.npmversion = _data[_data.length - 1].version;
        }
      }
    });

    moduleDataCenter.getTplList( that.obj.data.comTplId || '3', function (json) { // 由组件ID获取对应组件的所有模板
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


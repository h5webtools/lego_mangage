define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybswitchlist");
  var Factory = require('./jyb.vue.edit.factory');
  var commonTpl = require('./mpm.sys.htmlTpl'); //公共控制模板
  var selectSubCom = require('./mpm.sys.selectSubCom');
  var defaultTplEdit = '/public/template/new/jybswitchlist/edit.html';
  var moduleUtil;

  require.async('./mpm.sys.util', function (module) {
    moduleUtil = module;
  });

  /* npm管理 */
  var moduleBasicInfo = "";
  var moduleDataCenter = "";
  /* npm管理 */


  var __config = {
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybswitchlist',
    data: {
      styleKey: '',
      "_itemList": [],
      "itemList": [],
      "combo": 0,
      "didTrigger": false, //生成页面的时候，这里为False
      "didFinish": false, //生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "fixed": 0,//
      "tabIndex": 0,//当前tabIndex
      "fold": 0,//
      "LRPadding": "",
      "bgcolor": "",
      "contentColor": "",
      "selectedcontentColor": "",
      "selectedbgcolor": "",
      "tabs": [],
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybswitchlist",
    },
    watch: ['data.styleKey', 'data.tabs', 'data.LRPadding']
  };


  var _Class = Factory.getClass(__config);

  _Class.prototype.init = function (callback) {
    var that = this;
    var config = this.config;


    //初始化组件回掉
    var _cb = function () {
      if (!that.tplEdit || !that.arrStyle) {
        return;
      }

      that.ready = true;
      // for (var i = 0; i < that.arrReadyCB.length; i++) {
      //     if (typeof that.arrReadyCB[i] == "function") {
      //         that.arrReadyCB[i](that);
      //     }
      // }
      callback(that);
    };


    if (!this.obj.data.tabs || !this.obj.data.defaultRate) {
      Vue.set(this.obj.data, 'tabs', [{
        tabid: 0,
        tabTitle: "tab1",
        hot: false,
        sub: [],
        shallid: {}
      }]);
      Vue.set(this.obj.data, 'defaultRate', []);
    } else {
      for (var i = 0; i < this.obj.data.tabs.length; i++) {
        if (!this.obj.data.tabs[i].shallid) {
          Vue.set(this.obj.data.tabs[i], 'shallid', {});
        }
      }
    }
    if (!this.obj.data.mpmData) {
      Vue.set(this.obj.data, 'mpmData', {
        adding: false, //组件加载会有异步逻辑
        showSubTab: false,
        currentTab: 0,
        currentSubTab: 0
      });
    }

    if (!this.obj.data.state) {
      Vue.set(this.obj.data, 'state', {
        tab: 0
      });
    }

    //先这样吧--0830
    this.obj.data.tabIndex = 0;

    if (!this.obj.data.defaultRate) {
      Vue.set(this.obj.data, 'defaultRate', []);
    }

    //按需异步加载模板数据
    _Class.getTplEdit(this.__config.defaultTplEdit, _cb, this);
    _Class.getStyle(config.componentIndex, _cb, this);
  };

  //组件增加到实时展示区域中
  _Class.prototype._appendShowDom = function () {
    var that = this;
    var config = this.config;
    var styleObj = this._getStyle();
    var showDom = $('<div>').append($('<div class="mpm_show_tips"><span>上移</span><span>下移</span><span>删除</span></div>' + styleObj.template));

    var parentShowBox = $('#parend_' + this.obj.uid);
    var childShowBox = $('#child_' + this.obj.uid);

    $(showDom).find('.child').remove();

    if (parentShowBox.length == 0) {
      $('#show_' + this.obj.uid).append($('<div id=parend_' + this.obj.uid + '></div>'));
      parentShowBox = $('#parend_' + this.obj.uid);
    }

    if (childShowBox.length == 0) {
      $('#show_' + this.obj.uid).append($('<div id=child_' + this.obj.uid + '></div>'));
      childShowBox = $('#child_' + this.obj.uid);
    }

    parentShowBox.append(showDom);



    var extObj = {};
    try {
      extObj = styleObj.com_ext ? JSON.parse(styleObj.com_ext) : {};
    } catch (e) { }

    this.obj.max = extObj.max || 20;//最多展示的tab数量


    var objForDomShow = {
      el: showDom[0],
      data: this.obj,
      events: {},
      watch: {
        'data.styleKey': {
          handler: function (val, oldVal) {
            that.rebuildShowComponent();
          },
          deep: false
        }
      }
    };

    for (var i = 0; i < this.__config.watch.length; i++) {
      objForDomShow.watch[this.__config.watch[i]] = {
        handler: function (val, oldVal) {
          that.rebuildShowComponent();
        },
        deep: false
      };
    }

    if (this.domShow && this.domShow.$el) {
      that.domShow.$destroy(true);
      this.domShow.$el.remove();
    }

    this.domShow = new Vue(objForDomShow);

  };

  //展示编辑功能区域
  _Class.prototype._appendEditDom = function () {
    var that = this;
    var config = this.config;
    var styleObj = this._getStyle();
    var editDom = $('#editbox_' + this.obj.uid).append($(that.tplEdit))[0];


    //编辑
    that.domEdit = new Vue({
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

        //暂时先这样吧
        this.obj.data.mpmData.adding = false;
        this.obj.data.mpmData.showSubTab = false;
        this.obj.data.mpmData.currentSubTab = 0;
        this.obj.data.mpmData.currentTab = 0;

      },
      events: {},
      methods: {
        change: function () { //点击保存
          for (var i = 0; i < this.__config.watch.length; i++) {
            var arr = this.__config.watch[i].split('.');
            if (arr[1] == 'styleKey') {
              continue;
            }
            this.oldObj.data[arr[1]] = this.obj.data[arr[1]];
          }
          that.rebuildShowComponent();
        },
        chancel: function () {
          for (var i = 0; i < this.__config.watch.length; i++) {
            var arr = this.__config.watch[i].split('.');
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
        add: function () {
          if (this.obj.data.mpmData.adding) {
            return;
          }

          if (this.obj.data.tabs.length >= this.obj.max) {
            moduleUtil.alert('此样式最多支持' + this.obj.max + '个tab');
            return;
          }
          this.obj.data.tabs.push({
            tabid: this.obj.data.tabs.length,
            tabTitle: 'tab' + (this.obj.data.tabs.length + 1),
            hot: false,
            sub: [],
            shallid: {}
          });
        },
        deleteone: function (index) {
          var that = this;
          if (this.obj.data.mpmData.adding) {
            return;
          }
          if (this.obj.data.tabs.length == 1) {
            moduleUtil.toastInfo("最后一个不可以删除");
            return;
          }
          moduleUtil.confirm({
            msg: '确定删除此内容？',
            confirm: function () {
              that.obj.data.tabs[index].sub.forEach(function (uid) {
                var childComponent = moduleUtil.component.get(uid);
                childComponent.remove();
              });
              //删除该组件下的子组件引用
              that.obj.child = that.obj.child.filter(function (item, _index, arr) {
                return that.obj.data.tabs[index].sub.indexOf(item) == -1;
              });
              //删除tab数据
              that.obj.data.tabs.splice(index - 0, 1);
            }
          });
        },
        up: function (index) {
          if (this.obj.data.mpmData.adding || index == "0") {
            return;
          }

          var moving = this.obj.data.tabs.splice(index, 1);
          this.obj.data.tabs.splice(index - 1, 0, moving[0]); //dom映射表调整

          //that.arrUp(this.obj.data.tabs, index - 0);
        },
        down: function (index) {
          if (this.obj.data.mpmData.adding || (index == this.obj.data.tabs.length - 1) || this.obj.data.tabs.length == 1) {
            return;
          }
          this.up(index + 1);
        },
        addSub: function (event) {
          if (this.obj.data.mpmData.adding) {
            return;
          }
          var domTbody = $(event.target).closest('tbody');
          var parentIndex = domTbody.attr('pindex') - 0;

          selectSubCom.show(['jybswitchlist'], function (item) {
            if (!item) {
              return;
            }
            console.log(item);
            var config = {
              uid: moduleUtil.uniqueId.get(),
              componentIndex: item.id,
              componentName: item.tb_desc,
              name: item.path_key, //组件名
              type: '' //组件标签名
            };
            var dom = moduleUtil.getComponent(config);
            console.log(dom);

            that.config.obj.child.push(dom.obj.uid);

            dom.init(function (dom) {
              dom.config.editBox = $(this.domEdit.$el).find('div.subEdit')[0];
              dom.config.showBox = $('#child_' + this.obj.uid)[0];
              dom.config.rightBox = $('<div>')[0];

              dom.show(function (dom) {
                $(dom.domShow.$el).find('.mpm_show_tips').hide();
              });

              this.obj.data.mpmData.adding = false;
              var arr = [];
              var m = this.obj.data.mpmData.currentTab;

              arr = Object.assign(arr, this.obj.data.tabs[m].sub);
              arr.push(dom.obj.uid);

              //this.obj.data.tabs[m].sub.$set(arr.length - 1, dom.obj.uid);
              Vue.set(this.obj.data.tabs[m].sub, arr.length - 1, dom.obj.uid);
              dom.config.obj.parent_uid = this.obj.uid;

              dom.config.obj.canUseFloor = this.obj.data.tabs[m].sub;

              $('#rightbox_' + this.obj.uid).trigger('click');
            }.bind(that));

          }.bind(this));
        },
        deleteSub: function (event) {
          if (this.obj.data.mpmData.adding) {
            return;
          }

          moduleUtil.confirm({
            msg: '确定删除此内容？',
            confirm: function () {
              var domTr = $(event.target).closest('tr');
              var domTbody = domTr.closest('tbody');
              var subIndex = domTr.attr('index') - 0;
              var parentIndex = domTbody.attr('pindex') - 0;
              var uid = that.obj.data.tabs[parentIndex].sub.splice(subIndex, 1)[0];

              var childComponent = moduleUtil.component.get(uid);
              childComponent.remove();

              that.config.obj.child = that.config.obj.child.filter(function (item, _index, arr) {
                return item != uid;
              });
            }
          });

        },
        upSub: function (event) {
          if (this.obj.data.mpmData.adding) {
            return;
          }
          var domTr = $(event.target).closest('tr');
          var domTbody = domTr.closest('tbody');
          var subIndex = domTr.attr('index') - 0;
          var parentIndex = domTbody.attr('pindex') - 0;


          if (subIndex == 0) {
            return;
          }
          $('#show_' + this.obj.data.tabs[parentIndex].sub[subIndex]).remove().insertBefore(
            $('#show_' + this.obj.data.tabs[parentIndex].sub[subIndex - 1]));

          //that.arrUp(this.obj.data.tabs[parentIndex].sub, subIndex - 0);

          var moving = this.obj.data.tabs[parentIndex].sub.splice(subIndex, 1);
          this.obj.data.tabs[parentIndex].sub.splice(subIndex - 1, 0, moving[0]); //dom映射表调整
        },
        downSub: function (event) {
          if (this.obj.data.mpmData.adding) {
            return;
          }
          var domTr = $(event.target).closest('tr');
          var domTbody = domTr.closest('tbody');
          var subIndex = domTr.attr('index') - 0;
          var parentIndex = domTbody.attr('pindex') - 0;

          if (subIndex == this.obj.data.tabs[parentIndex].sub.length - 1 || this.obj.data.tabs[parentIndex].sub.length == 1) {
            return;
          }

          $('#show_' + this.obj.data.tabs[parentIndex].sub[subIndex + 1]).remove().insertBefore(
            $('#show_' + this.obj.data.tabs[parentIndex].sub[subIndex]));

          var moving = this.obj.data.tabs[parentIndex].sub.splice(subIndex + 1, 1);
          this.obj.data.tabs[parentIndex].sub.splice(subIndex, 0, moving[0]); //dom映射表调整

          //that.arrDown(this.obj.data.tabs[parentIndex].sub, subIndex - 0);

        },
        //编辑子组件
        editSub: function (event) {
          var domTr = $(event.target).closest('tr');
          var domTbody = domTr.closest('tbody');
          var subIndex = domTr.attr('index') - 0;
          var parentIndex = domTbody.attr('pindex') - 0;
          var that = this;
          var uid = this.obj.data.tabs[parentIndex].sub[subIndex];
          this.obj.data.mpmData.currentTab = parentIndex;
          this.obj.data.mpmData.adding = true;
          this.obj.data.mpmData.showSubTab = true;
          $(this.$el).find('div.subEdit').children().hide();
          $('div.subBack').show();
          $('#editbox_' + uid).show();


          for (var i = 0; i < this.obj.data.tabs.length; i++) {
            var subs = this.obj.data.tabs[i].sub;
            if (i == parentIndex) {
              for (var m = 0; m < subs.length; m++) {
                $('#show_' + subs[m]).show();
              }
            } else {
              for (var m = 0; m < subs.length; m++) {
                $('#show_' + subs[m]).hide();
              }
            }
          }

        },
        //选择tab，高亮展示
        selectTab: function (index, callback) {
          if (this.obj.data.mpmData.adding) {
            return;
          }
          this.obj.data.mpmData.currentTab = index - 0;
          this.obj.data.tabIndex = index - 0;


          for (var i = 0; i < this.obj.data.tabs.length; i++) {
            var subs = this.obj.data.tabs[i].sub;
            if (i == index) {
              for (var m = 0; m < subs.length; m++) {
                $('#show_' + subs[m]).show();
              }
            } else {
              for (var m = 0; m < subs.length; m++) {
                $('#show_' + subs[m]).hide();
              }
            }
          }
          if (typeof callback === "function") {
            callback();
          }

        },
        //从子组件，返回tab编辑界面
        back: function () {
          this.obj.data.mpmData.showSubTab = false;
          this.obj.data.mpmData.adding = false;
        },
        selectNpmVersion: function () { /* npm管理 */
          console.info("切换tab组件的版本是", this.obj.data.npmversion);
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });
          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();

          var path =  pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybswitchlist', path, function () {
            console.log("update ok ");
          });
        }
      }
    });


    var config = this.config;

    //初始化子组件
    var initSub = function () {
      var arr = config.obj.data && config.obj.data.tabs ? config.obj.data.tabs : [];
      var closureFn = function (com, sub) {

        com.config.editBox = $(that.domEdit.$el).find('div.subEdit')[0];
        com.config.showBox = $('#child_' + that.obj.uid)[0];
        com.config.rightBox = $('<div>')[0];


        com.show(function (com) {
          $(com.domShow.$el).find('.mpm_show_tips').hide();//隐藏子组件的快捷编辑浮层
          com.config.obj.canUseFloor = sub;
          that.domEdit.selectTab(that.obj.data.tabIndex);
        });
      };
      for (var i = 0; i < arr.length; i++) {
        var arrSub = arr[i].sub;
        for (var m = 0; m < arrSub.length; m++) {
          var name = arrSub[m];
          var com;
          if (name != '-') {
            com = moduleUtil.component.get(name);
            com && closureFn(com, arrSub);
          }
        }
      }

      that.domEdit.selectTab(that.obj.data.tabIndex);

    };

    initSub();
  };

  //属性修改了，需要重新构造展示的组件
  _Class.prototype.rebuildShowComponent = function () {
    var that = this;
    that.domShow.$destroy(true);
    that.domShow.$el.remove();
    that.obj.data.didTrigger = false;
    that.obj.data.didFinish = false;
    $(that.domStyle).remove();


    if (that.obj.data.itemList) {
      that.obj.data.itemList = [];
    }
    if (that.obj.data._itemList) {
      that.obj.data._itemList = [];
    }

    var styleObj = that._getStyle();

    var getTplCB = function () {

      var showDom = $('<div>').append($(styleObj.template))[0];
      //扩展js
      if (styleObj.com_js) {
        try {
          window.vueFnObj['fn_' + that.obj.data.styleKey] = eval('(' + styleObj.com_js + ')');
        } catch (e) {
          window.vueFnObj['fn_' + that.obj.data.styleKey] = {};
        }
      }

      that.domStyle = that.addCssByStyle(styleObj.com_css);
      that.obj.data.fnObj = window.vueFnObj['fn_' + that.obj.data.styleKey];
      that.extendObj(styleObj.com_extend);


      that._appendShowDom();

      that.domEdit.selectTab(that.obj.data.tabIndex, function () {
        if (that.obj.max < that.obj.data.tabs.length) {
          moduleUtil.alert("此样式最多支持" + that.obj.max + "个tab，目前有" + that.obj.data.tabs.length + "个tab，请手动删除多余的tab");
        }
      });
    };

    var tplurl = styleObj.tpl_url;

    if (tplurl) {
      //异步获取模板文件
      moduleUtil.getTemplateByUrl(tplurl, function (json) {

        styleObj.com_css = json.com_css;
        styleObj.com_js = json.com_js;
        styleObj.com_extend = json.com_extend;
        styleObj.template = json.template;
        styleObj.com_sinclude_url = json.com_sinclude_url;
        styleObj.com_sinclude_content_url = json.com_sinclude_content_url;
        styleObj.scriptTemplate = json.scriptTemplate;
        getTplCB();
      });
    } else {
      getTplCB();
    }
  };


  _Class.prototype.getHTMLString = function () {
    var config = this.config;
    var div = $('<div>');
    var HTMLString = this._getStyle().template;
    var dom = $(HTMLString);
    var html;

    div.append(dom);
    div.find('jybswitchlist').attr('uid', this.obj.uid);

    var arr = config.obj.data && config.obj.data.tabs ? config.obj.data.tabs : [];
    var that = this;
    var arrStr = [];


    //获取子组件的模板
    for (var i = 0; i < arr.length; i++) {
      var arrSub = arr[i].sub;
      for (var m = 0; m < arrSub.length; m++) {
        var name = arrSub[m];
        if (name != '-') {
          var com = moduleUtil.component.get(name);

          if (com) {
            var domRef = $(com.getHTMLString()).attr("ref", name)[0].outerHTML;
            arrStr.push(domRef);
          }

        }
      }
    }
    div.find('div.childBox').attr("tabpid", this.obj.uid);
    div.find('div.childBox').append($(arrStr.join('\n')));
    html = div.html();
    div.remove();

    return html;
  };


  var getComponent = function (config) {
    var switchList = new _Class(config);

    return switchList;
  };

  exports.getComponent = getComponent;

});


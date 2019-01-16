define(function (require, exports, module) {

  var vueComponent = require("./jyb.vue.jybimgmap");
  var Factory = require('./jyb.vue.edit.factory');
  var defaultTplEdit = '/public/template/new/jybimgmap/edit.html';
  var getUrlQuery = function (name, url) {
    //参数：变量名，url为空则表从当前页面的url中取
    var u = url || window.location.search,
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
  };

  var _Class = Factory.getClass({
    vueComponent: vueComponent,
    defaultTplEdit: defaultTplEdit,
    type: 'jybimgmap',
    data: {
      styleKey: '',
      "didTrigger": false, //生成页面的时候，这里为False
      "didFinish": false, //生成页面的时候，这里为False
      "lazyLoad": false,
      "isShowNpmVersions": USER_INFOR.isAdmin,
      "npmversion": "",
      "npmversionArr": [],
      "npmname": "@lego/jybimgmap",
      "tabIndex": 0,
      "imgUrl": "https://cdnsit.jyblife.com/act/201710/cunguan/image/banner-a3bff324.png",
      "index": 0,
      "imageMap": '',
      "isFloat": 'false',
      "pageActId":getUrlQuery('act_id'),
      "pageId":getUrlQuery('page_id'),
      "comDesc":''
    },
    watch: ['data.styleKey', 'data.imgUrl', 'data.tabIndex']
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
        selectNpmVersion: function () { /* npm管理 */
          console.info("切换", this.obj.name, "的版本是", this.obj.data.npmversion);
          this.obj.data.comDesc = this.obj.componentName + this.obj.uid;
          require.async('./mpm.sys.dataCenter', function (module) {
            moduleDataCenter = module;
          });
          require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
          });

          var pageInfo = moduleBasicInfo.showMePageInfo();
          var folderSet = moduleBasicInfo.showMeFolderName();
      
          var path = pageInfo.datefolder + "/" + folderSet.sub + "/";

          moduleDataCenter.updataversion(this.obj.data.npmversion, this.obj.data.npmname, path, function () {
            console.log("update ok ");
          });
        },
        addImageMap: function () {
          !this.obj.data.imageMap ? (this.obj.data.imageMap = []) :'';
          this.obj.data.imageMap.push({
            selected: '',
            imageMapLink: '', //
            eventid: '', //
            imageMapArea: '',
            oldWidth: 25,
            oldHeight: 15,
            left: 0,
            top: 0,
            width: 25,
            height: 15,
            extra:JSON.stringify({})
          });
        },
        deleteImageMap: function (index) {
          var deleteItem = this.obj.data.imageMap.splice(index - 0, 1);
        },
        addHighlight: function (index) {
          this.obj.data.tabIndex = index;
        }
      }
    });

    $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);
  };

  _Class.prototype.getHTMLString = function () {
    var HTMLString = this._getStyle().template;
    var dom = $(HTMLString).attr('uid', this.obj.uid);
    var html;
    var htmlTpl = '<jybimgmap uid="jybimgmap" v-bind:params="data" inline-template="">' +
      '    <div class="hot_area" id="areaContent":style="{position:params.isFloat == \'false\'? \'static\' : \'fixed\',bottom:0}">' +
      '<template v-if="true">' +
      '        <div class="" name="imageMap" id="image_map">' +
      '            <img :src="params.imgUrl" ref="imageMap" id="photo" width="100%" draggable="false">' +
      '            <div class="map_position map_position_save" v-for="(item , index) in params.imageMap" ' +
      ' v-on:click="checkhotmap(index)" ' +
      '                :data-stat-id="item.eventid " ' +
      'v-bind:data-stat-para="JSON.stringify({pageActId:params.pageActId,pageId:params.pageId,comDesc:params.comDesc})"'+
      '                v-bind:style="{left: item.left + \'%\',top: item.top + \'%\',width: item.width + \'%\',height: item.height + \'%\'}">' +
      '            </div>' +
      '        </div>' +
      '</template>' +
      '    </div>' +
      '</jybimgmap>';

    var htmlDom = $(htmlTpl)[0];
    htmlDom.setAttribute("uid", this.obj.uid);
    html = htmlDom.outerHTML;
    return html;
  };

  exports.getComponent = function (config, callback) {
    var component = new _Class(config, callback);
    return component;
  };

});
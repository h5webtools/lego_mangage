define(function (require, exports, module) {

  //var util = require('@lego/util');
  var util = {
      getQuery : function (name, url) {
          var u = url || window.location.search,
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            r = u.substr(u.indexOf("\?") + 1).match(reg);
          return r != null ? r[2] : "";
      },
      getCookie: function (name) {
          //读取COOKIE
          var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
          return val ? (val[2] ? unescape(val[2]) : "") : null;
      }
  }
  function _register(opt) {

      Vue.component("jybslider", {
          props: ["params"],
          // template: '#' + config.uid + "_tpl",
          /* data: function() {
               return {
                   data: {}
               };
           },*/
          functional: false,
          //mixins: [commonFunc.commonUtil.utilMethods],
          data: function () {
              return {
                  data: {
                      didFinish: false,
                      didTrigger: false,
                      showMore: false,

                      //sliderIndex:10
                  }
              };
          },
          mounted: function() {
              $('.ui-p-fixed').removeClass('ui-p-fixed');
          },
          created: function () {
              var me = this;
              try {
                  if (this.params.rulesContent && this.params.rulesContent.length > 0) {
                      this.params.rulesContent.forEach(function (item) {
                          item.rulesDes = item.rulesDes.replace(/\\n/g, "").replace(/\\/g, "").replace(/\\t/g , "");;
                      });
                  }
                  if(this.params.code){
                      this.params.code = this.params.code.replace(/\\n/g, "").replace(/\\/g, "").replace(/\\t/g , "");
                  }
                  if(this.params.sliderArr && this.params.sliderArr.length > 0){
                      this.params.sliderArr.forEach(function(item){
                          item.url = me.getJybUrl(item.url);
                          console.log('item.url',item.url);
                      });
                  }
              } catch (e) {
                  console.log("去掉rules中的空格和换行符");
              }
          },
          methods: {
              addKeyValue: function (url, key, value) {
                  url = url.replace(/？/g, "?");//异常处理
                  var reg = /key[=]/,
                      hasQuery = /\?/.test(url);
                  var hasAnchor = url.indexOf('#') > -1;
                  if (reg.test(url)) {//进行替换
                      url = url.replace(reg, key + "=" + value);
                  } else {//没有，则进行追加
                      url = hasAnchor ? url.replace("#", (hasQuery ? "&" : "?") + key + "=" + value + "#") : (url + (hasQuery ? "&" : "?") + key + "=" + value);
                  }
                  return url;
              },
              getJybUrl: function (url) {
                  var _userid = util.getQuery("userid") || util.getCookie("userid") || "",
                      _token = util.getQuery("token") || util.getCookie("token") || "";
                  if (url.indexOf("http") > -1) {
                      url = this.addKeyValue(url, "userid", _userid);
                      url = this.addKeyValue(url, "token", _token);
                  }
                  return url;
              },
              hideRulesDialog: function () {
                  this.params.isShowDialog = true;
              },
              showRulesDialog: function () {
                  this.params.isShowDialog = false;
              },
              switchtips: function () {
                  console.log("switch tips");
              },

              submitBuy:function(){
                  //仅仅用于测试，微信还款类组件   真正环境是有js逻辑的  jyb.vue.jybwxhkpay
              },
              toDraw:function(){

              }

          }
      });



  }


  exports.register = function (opt) {
      var temp = _register(opt);
      return temp;
  }
  //--------------------- E 程序入口 ----------------------//
});
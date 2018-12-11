define(function (require, exports, module) {
  var commonFunc = require("./jyb.vue.util");

  function _register(opt) {

    Vue.component("jybregister", {
      props: ["params"],

      functional: false,
      mixins: [commonFunc.commonUtil.utilMethods],
      data: function () {
        return {
          data: {
            didFinish: false,
            didTrigger: false,
            showMore: false
          }
        };
      },

      mounted: function () {

      },

      created: function () {

      },
      methods: {

        refreshCode: function (){ 

        },
        msgCode: function (){

        },
        telinput: function (){

        },
        submit: function (){

        },
        checkoutcoupons: function (){

        },
        switchflag: function (){

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
define(function (require, exports, module) {


  function _register(opt) {

      Vue.component("jybcoupon", {
          props: ["params"],
          functional: false,
          data: function () {
              return {
                  data: {
                      didFinish: false,
                      didTrigger: false,
                      showMore: false,
                      endtime:'',
                      nowtime:'',
                      couponList:[],
                      times:{
                          miniSec:"0",
                          sec:"0", 
                          minute:"0", 
                          hour:"0", 
                          day:"0"
                      }
                  }
              };
          },

          mounted: function () {

          },
          created: function () {
              this.initCoupons();
          },
          methods: {
              initCoupons:function(){
                this.data.couponList = this.params.couponList;
              },
              toDraw:function(e){
                  
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
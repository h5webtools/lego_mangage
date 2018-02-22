define(function (require, exports, module) {

  function _register(opt) {
    Vue.component("jybpay", {
      props: ["params"],
      functional: false,
      data: function () {
        return {
          data: {
            didFinish: false,
            didTrigger: false,
            showMore: false,
            mpmFlag: window.MPM_EDIT
            //sliderIndex:10
          }
        };
      },

      mounted: function () {

      },
      created: function () {
        !this.params.lazyLoad && this.loadData();
      },
      methods: {
        getTimeArr: function () {
          var now = new Date();
          var monthArr = [];
          var month = now.getMonth() + 1;
          monthArr.push(this.getFormatDate(now));
          for (let i = 0; i < this.params.tableConntent.length; i++) {
            now.setMonth(month + i);
            monthArr.push(this.getFormatDate(now));
          }
          return monthArr;
        },
        getFormatDate: function (date) {
          return date.getFullYear() + '年' + (date.getMonth() * 1 + 1) + '月' + date.getDate() + '日';
        },
        submitBuy: function () {
          //仅仅用于测试，微信还款类组件   真正环境是有js逻辑的  jyb.vue.jybwxhkpay
        },
        closeDemoPlan: function () {

        },
        showDemoPlan: function () {

        },
        loadData: function () {
          var timeArr = this.getTimeArr();
          var _tableConntent = this.params.tableConntent;
          for (let i = 0; i < _tableConntent.length; i++) {
            this.params.tableConntent[i].dateitem = timeArr[i];
          }

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
define(function (require, exports, module) {
  var getData = require('./common/request'),
    commonUtil = require('./common/util');
  function _register(opt) {
    Vue.component("productlist", {
      props: ["params"],
      functional: false,
      mixins: [commonUtil.commonUtil],
      data: function () {
        return {
          data: {
            didFinish: false,
            didTrigger: false,
            showMore: false,
            paramList: []
          }
        };
      },

      mounted: function () {
      },
      created: function () {

        this.loadData();

      },
      methods: {
        loadData: function () {
          //http://172.16.1.16:9013/baina1.3_804_michael/prd/free
          // {"userid":"1081","token":"b60e3a98483ec9d5f5659548c30c7b24","ver":"","ajax":1,"from":"","cmd":41060201}
          var data = {
            cmd: '41060201',
            userid: "1081",
            token: 'b60e3a98483ec9d5f5659548c30c7b24'
          },
            url = 'http://172.16.1.16:9013/baina1.3_804_michael/prd/free';
          var me = this;

          getData.request(
            data,
            url,
            false,
            function (json) {
              if (0 == json.code) {
                var data = json.data.prds[0].prd_list;
                //处理图片
                data.forEach(function (item) {
                  item.imgSrc = item.img[0];
                });
                me.data.paramList = data;
              } else {
                console.log(json.code);
              }

            },
            function (json) {
              //debugger;
            });
          console.log("获取白拿数据");
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
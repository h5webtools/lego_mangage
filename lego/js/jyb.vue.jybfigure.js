define(function (require, exports, module) {

  var _cacheThisModule_ = '';
  var envetsControl;

  function _register(opt) {
    var comConfig = {
      props: ["params"],
      data: function () {
        return {
          data: {
            didTrigger: false,
            didFinish: false,
            tabIndex: 0
          }
        };
      },
      created: function () {
        !this.params.lazyLoad && this.loadData();
      },
      methods: {
        formatNum: function (strNum) {
          if (strNum.length <= 3) {
            return strNum;
          }
          if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
            return strNum;
          }
          var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
          var re = new RegExp();
          re.compile("(\\d)(\\d{3})(,|$)");
          while (re.test(b)) {
            b = b.replace(re, "$1,$2$3");
          }
          return a + "" + b + "" + c;
        },
        loadData: function () {
          var me = this;
          if (this.data.didFinish) return; //已经加载完成了
          me.data.figure = 1000;
          me.data.formatFigure = me.formatNum(100000);
          this.data.didTrigger = true;
          this.data.didFinish = true;
          this.$nextTick(function () {

          });
        }
      }
    };

    if (opt.template) {
      comConfig.template = opt.template;
    }

    Vue.component(opt.tagName, comConfig);

  }


  exports.register = function (opts) {
    var settings = {
      template: null,
      tagName: "jybfigure"
    };
    _register(settings);
  }

});


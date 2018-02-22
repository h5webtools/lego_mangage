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

        loadData: function () {
          var me = this;
          if (this.data.didFinish) return; //已经加载完成了
          me.data.figure = 1000;
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


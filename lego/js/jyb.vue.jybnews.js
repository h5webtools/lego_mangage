define(function (require, exports, module) {
  
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
         
          var json = {
            "code": "0",
            "data": {
              "groups": [
                "ords_equal_0",
                "test",
                "test1"
              ],
              "timestamp": 1543313059
            }
          }
          this.params.groupList = json.data.groups;
          this.$nextTick(function () {

          });
        },
        isShow(groups) {
          if (window.MPM_EDIT) {
            return false;
          }
          if (!groups) {
            return false;
          }
          var list = groups.split(',');
          var newList = this.params.groupList.filter(function (v) { return list.indexOf(v) > -1 })
          if (newList.length > 0) {
            return false;
          }
          return true;
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
      tagName: "jybnews"
    };
    _register(settings);
  }

});


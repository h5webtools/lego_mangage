define(function (require, exports, module) {
  
  function _register(opt) {
    var comConfig = {
      props: ["params"],
      data: function () {
        return {
          data: {
            didTrigger: false,
            didFinish: false,
            tabIndex: 0,
            rotateList: []
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
                "reward": [
                  {
                    "reward_name": "9元红包",
                    "extra": [],
                    "flag": "1"
                  }
                ]
              },
              "login_tel": "13057134149",
              "timestamp": 1544172746
          }
          this.data.groupList = json.data.groups;
          this.$nextTick(function () {

          });
        },
        rotateCard: function(item) {
          console.log(item);
          if (item.rotateStatus == 1) {
            return false;
          }
          if (this.data.rotateType == 1) {
            item.activeStatus = 1;
            this.data.rotateList.forEach(function(item,index) {
              item.rotateStatus = 1;
            })
          } else {
            item.rotateStatus = 1;
            item.activeStatus = 1;
          }
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
      tagName: "jybdrawcard"
    };
    _register(settings);
  }

});


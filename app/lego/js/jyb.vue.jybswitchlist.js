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
            fixed: 0,
            tabIndex: 0,
            fold: 0
          }
        };
      },
      created: function () {
        !this.params.lazyLoad && this.loadData();
      },
      methods: {

        initEvents: function () {
          var self = this;

        },
        //绑定tab的切换事件
        /*
        selectedTab:当前选中的TAB的index或者tabid
        */
        toggleTabs: function (selectedTab, ignoreGoTop, scrollBoxSelector) {
          if (window.MPM_EDIT) {
            return;
          }
          //设置当前选中态，绑定变量tabIndex
          this.data.tabIndex = selectedTab;

          //兼容mpm编辑页面
          this.params.tabIndex = this.data.tabIndex;

          var selector = this.data.selector || "uid";
          //隐藏所有
          this.params.tabs.forEach(function (o, index) {
            var arrSub = o.sub;
            var bShow = false;
            if (selectedTab == index) {
              bShow = true;
            }
            arrSub.forEach(function (domId) {
              var dom = document.querySelector('[' + selector + '="' + domId + '"]');
              if (bShow) {
                this.$root.$refs[domId] && this.$root.$refs[domId].loadData();
                dom && (dom.style.display = "");

              } else {
                dom && (dom.style.display = "none");
              }

            }.bind(this));
          }.bind(this))
        },
        loadData: function () {
          var json = {
            "code": "0",
            "data": {
              "rank_lists": {
                "1": {
                  "my_score": 10000
                },
                "2": {
                  "my_score": 20000
                },
                "3": {
                  "my_score": 30000
                },
                "4": {
                  "my_score": 30000
                },

                "5": {
                  "my_score": 30000
                }
              }
            }
          };
          this.params.tabs.forEach(function (item, index) {
            console.log(item.tabTitle);
            item.buyamount = parseInt(json.data.rank_lists[index * 1 + 1].my_score / 100);
          });


          setTimeout(function () {
            if ($('#' + this.params.uid + '_scrollbox').length > 0) {
              this.toggleTabs(this.data.tabIndex, true, '#' + this.params.uid + '_scrollbox');
            } else {
              this.toggleTabs(this.data.tabIndex, true);
            }


          }.bind(this), 300);

          this.data.didTrigger = true;
          this.data.didFinish = true;
          this.$nextTick(function () {
            this.initEvents();
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
      tagName: "jybswitchlist"
    };
    _register(settings);
  }

});


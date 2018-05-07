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
            tabInitIndex: 0,
            fold: true
          }
        };
      },
      created: function () {
        !this.params.lazyLoad && this.loadData();
        // this.initScroll();
      },
      methods: {
        toggleFold: function() {
          this.data.fold = !this.data.fold;
        },
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
          if (this.data.scoreTabFlag) {
            window.pageConfig.TAPINDEX = this.data.tabIndex;
          }
          //兼容mpm编辑页面
          this.params.tabIndex = this.data.tabIndex;
          var selector = this.data.selector || "uid";
          var anchorUid = this.params.tabs[this.params.tabIndex].anchorUid;
          if (this.params.tabType == 'anchorlist') {
            var top = $("[uid='" + anchorUid + "']").offset().top;
            window.scrollTo(0, top - 40)
          } else {
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
                  this.$root.$refs[domId] && this.$root.$refs[domId].loadData && this.$root.$refs[domId].loadData();
                  setTimeout(function () {
                    //console.log(1,dom);
                    dom && (dom.style.display = "");
                  }, 0);
                } else {
                  dom && (dom.style.display = "none");
                }

              }.bind(this));
            }.bind(this))
          }
        },
        initScroll: function () {
          var me = this;
          window.addEventListener('scroll', function () {
            var tabHeight = $("[uid='" + me.params.uid + "']").offset().top;
            var fixedDom = $("[uid='" + me.params.uid + "']").find("[data-role='fixed']");
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > tabHeight) {
              fixedDom.addClass("ui-p-fixed");
            } else {
              fixedDom.removeClass("ui-p-fixed");
            }
          });
        },
        loadData: function () {
          if (this.params.tabType == 'anchorlist') {
  
          } else {
            this.data.tabIndex = this.data.tabInitIndex;
            var me = this;
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


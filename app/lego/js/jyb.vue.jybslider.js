define(function (require, exports, module) {
  var _loopSrcoll = require('./loopScroll');

  var ua = window.navigator.userAgent;

  var ualc = ua.toLowerCase();
  var isJybApp = /jiayoubao/.test(ualc); // 加油宝app

  var openUrl = function(url) {
      
  }

  function showLoopScroll(){
      var headLoopDom = $('#jybwx_banner_slider__container'),
          items = headLoopDom.find(".wrap-item");
      _headLoop = _loopSrcoll.init({
          tp : "img", //图片img或是文字text  默认text
          moveDom : headLoopDom, //必选  待移动父元素zepto查询对象
          moveChild : items, //必选  zepto查询对象
          tab : headLoopDom, //必选  zepto查询对象
          len : items.length, //总元素
          index : 1, //当前位移的元素
          loopScroll : true,
          tabClass : "on",
          autoTime:2000,
          enableTransX : true,
          fun: function(index) {
             var navBar = $(".mod_slider_nav__nav_bar__index");
             navBar.each(function($index , dom){
                var $dom = $(dom);
                if($index == index-1){
                    $dom.addClass('on')
                }else{
                    $dom.removeClass('on')
                }
             })
          }
      });
  }

  function _register(opt) {

      Vue.component("jybslider", {
          props: ["params"],
          functional: false,
          data: function () {
              return {
                  data: {
                      didFinish: false,
                      didTrigger: false,
                      sliderItems:[],
                      userid: '',
                      token: ''
                  }
              };
          },

          mounted: function () {
              showLoopScroll();
          },
          created: function () { // 顾虑出当前时间内有效的 以及 没设置时间的
              var me = this;
              var filterRes =this.params.sliderArr.filter(function(item){
                var _flagBegin = "",_flagEnd;
                if(item.beginTime && item.endTime){
                    _flagBegin = new Date() > new Date(item.beginTime),
                    _flagEnd = new Date() < new Date(item.endTime);
                }else{
                    _flagBegin = true;
                    _flagEnd = true;
                }
                return _flagBegin && _flagEnd;
              });
              console.log('过滤结果',filterRes)
              this.data.sliderItems = filterRes;
            //   this.params.sliderArr.forEach(function (item) {
            //       if (!item.url) {
            //         //item.url = "javascript:;";
            //       }
                 
            //   });
          },
          methods: {
              addKeyValue: function (url, key, value) {
                 
                  return url;
              },
              getJybUrl: function (url) {
                 
                  return url;
              },
              jybOpenUrl: function(index){
                  var _url = this.params.sliderArr[index].url;
                  openUrl(_url);
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
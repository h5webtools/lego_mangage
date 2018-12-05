define(function (require, exports, module) {

  var _cacheThisModule_ = '';
  var envetsControl;
  function getPos(el) {
    const pos = {
      left: 0,
      top: 0
    };

    while (el) {
      pos.top += el.offsetTop;
      pos.left += el.offsetLeft;
      el = el.offsetParent;
    }

    return pos;
  }

  var areaContent = document.body;
  areaContent.addEventListener('dragenter', (e) => {
    e.preventDefault();
  });
  areaContent.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  function vueTouch(el, binding, type) {
    var _this = this;
    this.obj = el;
    this.binding = binding;
    this.touchType = type;
    this.vueTouches = { x: 0, y: 0 };
    this.vueMoves = false;
    this.vueLeave = true;
    this.longTouch = true;
    this.image_map = this.obj.parentNode.parentNode;
    this.vueCallBack = typeof (binding.value) == "object" ? binding.value.fn : binding.value;

    this.obj.addEventListener("dragstart", function (e) {
      _this.start(e);
    }, false);

    this.obj.addEventListener("drag", function (e) {
      _this.move(e);
    });

    this.obj.addEventListener("dragend", function (e) {
      _this.end(e);
    });
  };
  vueTouch.prototype = {
    start: function (e) {
      this.vueTouches = {
        x: e.pageX - getPos(this.obj).left,
        y: e.pageY - getPos(this.obj).top,
        oldX: e.pageX,
        oldY: e.pageY,
      };
    },
    end: function (e) {
      this.vueMoves = false;
      var resizeX = e.pageX - this.vueTouches.oldX;
      var resizeY = e.pageY - this.vueTouches.oldY;
      this.touchType == "resize" && this.vueCallBack(this.binding.value, resizeX, resizeY, this.vueMoves);
      return false;
    },
    move: function (e) {
      this.vueMoves = true;
      var disX = e.pageX - getPos(this.image_map).left - this.vueTouches.x;
      var disY = e.pageY - getPos(this.image_map).top - this.vueTouches.y;

      var resizeX = e.pageX - this.vueTouches.oldX;
      var resizeY = e.pageY - this.vueTouches.oldY;

      if (Math.abs(disX) > 10 || Math.abs(disY) > 10) {
        this.touchType == "swipe" && this.vueCallBack(this.binding.value, disX, disY);
      }
      this.touchType == "resize" && this.vueCallBack(this.binding.value, resizeX, resizeY, this.vueMoves);

    }
  };
  function _register(opt) {
    var comConfig = {
      props: ["params"],
      data: function () {
        return {
          data: {
            didTrigger: false,
            didFinish: false,
            tabIndex: 0,
            mousedown: false,
            parentEl: this.$el
          }
        };
      },
      created: function () {
        !this.params.lazyLoad && this.loadData();
      },
      methods: {

        loadData: function () {
          console.log(this.data);
        },
        deleteImageMap: function (index) {
          this.params.imageMap.splice(index - 0, 1);
        },
        moveEvent: function (e, x, y) {
          var left = x;
          var top = y;
          if (left < 0) {
            left = 0;
          }
          if (top < 0) {
            top = 0;
          }
          var bottom = top + this.params.imageMap[e.index].height / 100 * this.$el.offsetHeight;
          if (bottom > this.$el.offsetHeight) {
            top = top - (bottom - this.$el.offsetHeight);
          }
          var right = left + this.params.imageMap[e.index].width / 100 * this.$el.offsetWidth;
          if (right > this.$el.offsetWidth) {
            left = left - (right - this.$el.offsetWidth);
          }
          this.params.imageMap[e.index].left = (left / this.$el.offsetWidth) * 100;
          this.params.imageMap[e.index].top = (top / this.$el.offsetHeight) * 100;
        },
        resizeEvent: function (e, x, y, isMove) {
          var left = this.params.imageMap[e.index].left / 100 * this.$el.offsetWidth;
          var top = this.params.imageMap[e.index].top / 100 * this.$el.offsetHeight;
          var height = this.params.imageMap[e.index].oldHeight / 100 * this.$el.offsetHeight + y;
          if ((top + height) > this.$el.offsetHeight) {
            height = height - ((top + height) - this.$el.offsetHeight);
          }
          if (height < 20) height = 20;
          var width = this.params.imageMap[e.index].oldWidth / 100 * this.$el.offsetWidth + x;
          if ((left + width) > this.$el.offsetWidth) {
            width = width - ((left + width) - this.$el.offsetWidth);
          }
          if (width < 12) width = 12;
          this.params.imageMap[e.index].width = (width / this.$el.offsetWidth) * 100;
          this.params.imageMap[e.index].height = (height / this.$el.offsetHeight) * 100;
          if (!isMove) {
            this.params.imageMap[e.index].oldWidth = this.params.imageMap[e.index].width;
            this.params.imageMap[e.index].oldHeight = this.params.imageMap[e.index].height;
          }
          return false;
        },
        addHighlight: function (index) {
          this.params.tabIndex = index;
        }

      }
    };

    if (opt.template) {
      comConfig.template = opt.template;
    }
    Vue.directive("swipe", {
      inserted: function (el, binding) {
        new vueTouch(el, binding, "swipe");
      }
    });
    Vue.directive("resize", {
      inserted: function (el, binding) {
        new vueTouch(el, binding, "resize");
      }
    });
    Vue.component(opt.tagName, comConfig);

  }


  exports.register = function (opts) {
    var settings = {
      template: null,
      tagName: "jybimgmap"
    };
    _register(settings);
  }

});
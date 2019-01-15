/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 182);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_vue__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_scss__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_scss__);




window.__debugEditor__ = {
  install: function install(el, Vue) {
    var app = new Vue({
      render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_0__app_vue___default.a);
      }
    }).$mount(el);
    return {
      app: app,
      show: function show() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        for (var k in data) {
          if (Object.prototype.hasOwnProperty.call(app.$children[0], k)) {
            app.$children[0][k] = data[k];
          }
        }
        app.$children[0].visible = true;
      },
      hide: function hide() {
        app.$children[0].visible = false;
      },
      off: function off() {
        var _app$$children$;

        (_app$$children$ = app.$children[0]).$off.apply(_app$$children$, arguments);
        return this;
      },
      on: function on() {
        var _app$$children$2;

        (_app$$children$2 = app.$children[0]).$on.apply(_app$$children$2, arguments);
        return this;
      }
    };
  }
};

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(184)
}
var Component = __webpack_require__(18)(
  /* script */
  __webpack_require__(185),
  /* template */
  __webpack_require__(193),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-d2c2b4fe",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\jyb\\jyb_git\\lego_manage\\app\\web\\pages\\debug\\app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d2c2b4fe", Component.options)
  } else {
    hotAPI.reload("data-v-d2c2b4fe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 184:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_postmate__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ace_editor_vue__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ace_editor_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_ace_editor_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jyb_lego_util__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jyb_lego_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__jyb_lego_util__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AceEditor: __WEBPACK_IMPORTED_MODULE_1__components_ace_editor_vue___default.a
  },
  data: function data() {
    return {
      visible: false,
      editorVar: {}, // 编辑器智能提示变量
      frameUrl: '',
      userInfo: window.userInfo || {},
      codeHtmlString: '',
      codeStyleString: '/* css */\n',
      codeScriptString: '(function() {\n  // do something\n})();'
    };
  },

  watch: {
    visible: function visible(newVal) {
      if (newVal) {
        this.setDefaultCodeValue();
        this.frameReload();
      }
    }
  },
  methods: {
    setDefaultCodeValue: function setDefaultCodeValue() {
      if (!this.codeStyleString) {
        this.codeStyleString = '/* css */\n';
      }
      if (!this.codeScriptString) {
        this.codeScriptString = '(function() {\n  // do something\n})();';
      }
    },
    initVariable: function initVariable(componentConfig) {
      var variable = [];
      var editorVar = {};
      // 通用方法和属性
      Object(__WEBPACK_IMPORTED_MODULE_2__helper__["b" /* getObjectFunction */])(__WEBPACK_IMPORTED_MODULE_3__jyb_lego_util___default.a, variable);
      variable.forEach(function (v) {
        var processFunc = Object(__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* getProcessFunc */])(v.type);
        editorVar[processFunc.getKey(v)] = {
          value: processFunc.getValue(v),
          desc: processFunc.getLabel(v)
        };
      });
      // 组件数据
      if (Array.isArray(componentConfig)) {
        componentConfig.forEach(function (item) {
          editorVar[item.uid] = {
            value: item.uid,
            desc: '\u7EC4\u4EF6' + item.name + '\uFF0CID\u4E3A' + item.uid
            // 组件属性
          };Object(__WEBPACK_IMPORTED_MODULE_2__helper__["a" /* getComponentProps */])(item).forEach(function (prop) {
            editorVar[prop.name + '.' + prop.propName] = {
              value: prop.propName,
              desc: prop.type + '\u7C7B\u578B'
            };
          });
        });
      }
      this.editorVar = editorVar;
    },
    frameReload: function frameReload() {
      if (this.childAPI) {
        this.childAPI.destroy();
        this.childAPI = null;
        this.createPostmate();
      } else {
        this.createPostmate();
      }
    },
    handleFullScreen: function handleFullScreen(type) {
      switch (type) {
        case 'html':
          {
            this.$refs.codeHtmlString.fullScreen();
            break;
          }
        case 'style':
          {
            this.$refs.codeStyleString.fullScreen();
            break;
          }
        case 'script':
          {
            this.$refs.codeScriptString.fullScreen();
            break;
          }
        default:
          {
            break;
          }
      }
    },
    handleLoadIframe: function handleLoadIframe() {
      this.frameReload();
    },
    handleLoadPage: function handleLoadPage() {
      var _this = this;

      var legoEditor = window.LegoEditor || {};
      if (legoEditor.preview && typeof legoEditor.preview.saveAndCreatePage === 'function') {
        legoEditor.preview.saveAndCreatePage(function () {
          _this.frameReload();
        }, 'debug');
      }
    },
    handleEditorHtmlChange: function handleEditorHtmlChange(val) {
      this.codeHtmlString = val;
    },
    handleEditorScriptChange: function handleEditorScriptChange(val) {
      this.codeScriptString = val;
    },
    handleEditorStyleChange: function handleEditorStyleChange(val) {
      this.codeStyleString = val;
    },
    handleClose: function handleClose() {
      this.visible = false;
    },
    handleDebug: function handleDebug(e) {
      if (this.childAPI) {
        this.childAPI.call('injectStyle', { code: this.codeStyleString });
        this.childAPI.call('injectString', { content: this.codeHtmlString });
        this.childAPI.call('evalFunc', { code: this.codeScriptString });
      }
    },
    handleRefresh: function handleRefresh() {
      if (this.childAPI) {
        this.childAPI.call('refresh');
      }
    },
    handleSave: function handleSave() {
      this.$emit('save', {
        html: this.codeHtmlString || '',
        style: this.codeStyleString || '',
        script: this.codeScriptString || ''
      });
      this.visible = false;
    },
    removeChild: function removeChild(el) {
      if (el.children && el.children.length > 0) {
        [].slice.call(el.children, 0).forEach(function (item) {
          return el.removeChild(item);
        });
      }
    },
    createPostmate: function createPostmate() {
      var _this2 = this;

      var $preview = document.getElementById('js-preview');
      if ($preview && this.frameUrl) {
        this.removeChild($preview);
        var handshake = new __WEBPACK_IMPORTED_MODULE_0_postmate__["a" /* default */]({
          container: $preview,
          url: this.frameUrl
        });
        handshake.then(function (child) {
          _this2.childAPI = child;
          _this2.listenEvent();
        });
      }
    },
    listenEvent: function listenEvent() {
      var _this3 = this;

      this.childAPI.on('get-component-config', function (data) {
        try {
          var json = JSON.parse(data);
          _this3.initVariable(json);
        } catch (e) {}
      });
    }
  },
  mounted: function mounted() {
    this.createPostmate();
  }
});

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  postmate - A powerful, simple, promise-based postMessage library
  @version v1.4.8
  @link https://github.com/dollarshaveclub/postmate
  @author Jacob Kelley <jakie8@gmail.com>
  @license MIT
**/
/**
 * The type of messages our frames our sending
 * @type {String}
 */
var messageType = 'application/x-postmate-v1+json';
/**
 * hasOwnProperty()
 * @type {Function}
 * @return {Boolean}
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * The maximum number of attempts to send a handshake request to the parent
 * @type {Number}
 */

var maxHandshakeRequests = 5;
/**
 * A unique message ID that is used to ensure responses are sent to the correct requests
 * @type {Number}
 */

var _messageId = 0;
/**
 * A unique message ID that is used to ensure responses are sent to the correct requests
 * @type {Number}
 */

var generateNewMessageId = function generateNewMessageId() {
  return ++_messageId;
};
/**
 * Postmate logging function that enables/disables via config
 * @param  {Object} ...args Rest Arguments
 */

var log = function log() {
  var _console;

  return Postmate.debug ? (_console = console).log.apply(_console, arguments) : null;
}; // eslint-disable-line no-console

/**
 * Takes a URL and returns the origin
 * @param  {String} url The full URL being requested
 * @return {String}     The URLs origin
 */

var resolveOrigin = function resolveOrigin(url) {
  var a = document.createElement('a');
  a.href = url;
  var protocol = a.protocol.length > 4 ? a.protocol : window.location.protocol;
  var host = a.host.length ? a.port === '80' || a.port === '443' ? a.hostname : a.host : window.location.host;
  return a.origin || protocol + "//" + host;
};
/**
 * Ensures that a message is safe to interpret
 * @param  {Object} message       The postmate message being sent
 * @param  {String} allowedOrigin The whitelisted origin
 * @return {Boolean}
 */

var sanitize = function sanitize(message, allowedOrigin) {
  if (message.origin !== allowedOrigin) return false;
  if (typeof message.data !== 'object') return false;
  if (!('postmate' in message.data)) return false;
  if (message.data.type !== messageType) return false;
  if (!{
    'handshake-reply': 1,
    call: 1,
    emit: 1,
    reply: 1,
    request: 1
  }[message.data.postmate]) return false;
  return true;
};
/**
 * Takes a model, and searches for a value by the property
 * @param  {Object} model     The dictionary to search against
 * @param  {String} property  A path within a dictionary (i.e. 'window.location.href')
 * @param  {Object} data      Additional information from the get request that is
 *                            passed to functions in the child model
 * @return {Promise}
 */

var resolveValue = function resolveValue(model, property) {
  var unwrappedContext = typeof model[property] === 'function' ? model[property]() : model[property];
  return Postmate.Promise.resolve(unwrappedContext);
};
/**
 * Composes an API to be used by the parent
 * @param {Object} info Information on the consumer
 */

var ParentAPI =
/*#__PURE__*/
function () {
  function ParentAPI(info) {
    var _this = this;

    this.parent = info.parent;
    this.frame = info.frame;
    this.child = info.child;
    this.childOrigin = info.childOrigin;
    this.events = {};

    if (process.env.NODE_ENV !== 'production') {
      log('Parent: Registering API');
      log('Parent: Awaiting messages...');
    }

    this.listener = function (e) {
      var _ref = ((e || {}).data || {}).value || {},
          data = _ref.data,
          name = _ref.name;

      if (e.data.postmate === 'emit') {
        if (process.env.NODE_ENV !== 'production') {
          log("Parent: Received event emission: " + name);
        }

        if (name in _this.events) {
          _this.events[name].call(_this, data);
        }
      }
    };

    this.parent.addEventListener('message', this.listener, false);

    if (process.env.NODE_ENV !== 'production') {
      log('Parent: Awaiting event emissions from Child');
    }
  }

  var _proto = ParentAPI.prototype;

  _proto.get = function get(property) {
    var _this2 = this;

    return new Postmate.Promise(function (resolve) {
      // Extract data from response and kill listeners
      var uid = generateNewMessageId();

      var transact = function transact(e) {
        if (e.data.uid === uid && e.data.postmate === 'reply') {
          _this2.parent.removeEventListener('message', transact, false);

          resolve(e.data.value);
        }
      }; // Prepare for response from Child...


      _this2.parent.addEventListener('message', transact, false); // Then ask child for information


      _this2.child.postMessage({
        postmate: 'request',
        type: messageType,
        property: property,
        uid: uid
      }, _this2.childOrigin);
    });
  };

  _proto.call = function call(property, data) {
    // Send information to the child
    this.child.postMessage({
      postmate: 'call',
      type: messageType,
      property: property,
      data: data
    }, this.childOrigin);
  };

  _proto.on = function on(eventName, callback) {
    this.events[eventName] = callback;
  };

  _proto.destroy = function destroy() {
    if (process.env.NODE_ENV !== 'production') {
      log('Parent: Destroying Postmate instance');
    }

    window.removeEventListener('message', this.listener, false);
    this.frame.parentNode.removeChild(this.frame);
  };

  return ParentAPI;
}();
/**
 * Composes an API to be used by the child
 * @param {Object} info Information on the consumer
 */

var ChildAPI =
/*#__PURE__*/
function () {
  function ChildAPI(info) {
    var _this3 = this;

    this.model = info.model;
    this.parent = info.parent;
    this.parentOrigin = info.parentOrigin;
    this.child = info.child;

    if (process.env.NODE_ENV !== 'production') {
      log('Child: Registering API');
      log('Child: Awaiting messages...');
    }

    this.child.addEventListener('message', function (e) {
      if (!sanitize(e, _this3.parentOrigin)) return;

      if (process.env.NODE_ENV !== 'production') {
        log('Child: Received request', e.data);
      }

      var _e$data = e.data,
          property = _e$data.property,
          uid = _e$data.uid,
          data = _e$data.data;

      if (e.data.postmate === 'call') {
        if (property in _this3.model && typeof _this3.model[property] === 'function') {
          _this3.model[property].call(_this3, data);
        }

        return;
      } // Reply to Parent


      resolveValue(_this3.model, property).then(function (value) {
        return e.source.postMessage({
          property: property,
          postmate: 'reply',
          type: messageType,
          uid: uid,
          value: value
        }, e.origin);
      });
    });
  }

  var _proto2 = ChildAPI.prototype;

  _proto2.emit = function emit(name, data) {
    if (process.env.NODE_ENV !== 'production') {
      log("Child: Emitting Event \"" + name + "\"", data);
    }

    this.parent.postMessage({
      postmate: 'emit',
      type: messageType,
      value: {
        name: name,
        data: data
      }
    }, this.parentOrigin);
  };

  return ChildAPI;
}();
/**
  * The entry point of the Parent.
 * @type {Class}
 */

var Postmate =
/*#__PURE__*/
function () {
  // eslint-disable-line no-undef
  // Internet Explorer craps itself

  /**
   * Sets options related to the Parent
   * @param {Object} userOptions The element to inject the frame into, and the url
   * @return {Promise}
   */
  function Postmate(_ref2) {
    var _ref2$container = _ref2.container,
        container = _ref2$container === void 0 ? typeof container !== 'undefined' ? container : document.body : _ref2$container,
        model = _ref2.model,
        url = _ref2.url;
    // eslint-disable-line no-undef
    this.parent = window;
    this.frame = document.createElement('iframe');
    container.appendChild(this.frame);
    this.child = this.frame.contentWindow || this.frame.contentDocument.parentWindow;
    this.model = model || {};
    return this.sendHandshake(url);
  }
  /**
   * Begins the handshake strategy
   * @param  {String} url The URL to send a handshake request to
   * @return {Promise}     Promise that resolves when the handshake is complete
   */


  var _proto3 = Postmate.prototype;

  _proto3.sendHandshake = function sendHandshake(url) {
    var _this4 = this;

    var childOrigin = resolveOrigin(url);
    var attempt = 0;
    var responseInterval;
    return new Postmate.Promise(function (resolve, reject) {
      var reply = function reply(e) {
        if (!sanitize(e, childOrigin)) return false;

        if (e.data.postmate === 'handshake-reply') {
          clearInterval(responseInterval);

          if (process.env.NODE_ENV !== 'production') {
            log('Parent: Received handshake reply from Child');
          }

          _this4.parent.removeEventListener('message', reply, false);

          _this4.childOrigin = e.origin;

          if (process.env.NODE_ENV !== 'production') {
            log('Parent: Saving Child origin', _this4.childOrigin);
          }

          return resolve(new ParentAPI(_this4));
        } // Might need to remove since parent might be receiving different messages
        // from different hosts


        if (process.env.NODE_ENV !== 'production') {
          log('Parent: Invalid handshake reply');
        }

        return reject('Failed handshake');
      };

      _this4.parent.addEventListener('message', reply, false);

      var doSend = function doSend() {
        attempt++;

        if (process.env.NODE_ENV !== 'production') {
          log("Parent: Sending handshake attempt " + attempt, {
            childOrigin: childOrigin
          });
        }

        _this4.child.postMessage({
          postmate: 'handshake',
          type: messageType,
          model: _this4.model
        }, childOrigin);

        if (attempt === maxHandshakeRequests) {
          clearInterval(responseInterval);
        }
      };

      var loaded = function loaded() {
        doSend();
        responseInterval = setInterval(doSend, 500);
      };

      if (_this4.frame.attachEvent) {
        _this4.frame.attachEvent('onload', loaded);
      } else {
        _this4.frame.onload = loaded;
      }

      if (process.env.NODE_ENV !== 'production') {
        log('Parent: Loading frame', {
          url: url
        });
      }

      _this4.frame.src = url;
    });
  };

  return Postmate;
}();
/**
 * The entry point of the Child
 * @type {Class}
 */


Postmate.debug = false;

Postmate.Promise = function () {
  try {
    return window ? window.Promise : Promise;
  } catch (e) {
    return null;
  }
}();

Postmate.Model =
/*#__PURE__*/
function () {
  /**
   * Initializes the child, model, parent, and responds to the Parents handshake
   * @param {Object} model Hash of values, functions, or promises
   * @return {Promise}       The Promise that resolves when the handshake has been received
   */
  function Model(model) {
    this.child = window;
    this.model = model;
    this.parent = this.child.parent;
    return this.sendHandshakeReply();
  }
  /**
   * Responds to a handshake initiated by the Parent
   * @return {Promise} Resolves an object that exposes an API for the Child
   */


  var _proto4 = Model.prototype;

  _proto4.sendHandshakeReply = function sendHandshakeReply() {
    var _this5 = this;

    return new Postmate.Promise(function (resolve, reject) {
      var shake = function shake(e) {
        if (!e.data.postmate) {
          return;
        }

        if (e.data.postmate === 'handshake') {
          if (process.env.NODE_ENV !== 'production') {
            log('Child: Received handshake from Parent');
          }

          _this5.child.removeEventListener('message', shake, false);

          if (process.env.NODE_ENV !== 'production') {
            log('Child: Sending handshake reply to Parent');
          }

          e.source.postMessage({
            postmate: 'handshake-reply',
            type: messageType
          }, e.origin);
          _this5.parentOrigin = e.origin; // Extend model with the one provided by the parent

          var defaults = e.data.model;

          if (defaults) {
            var keys = Object.keys(defaults);

            for (var i = 0; i < keys.length; i++) {
              if (hasOwnProperty.call(defaults, keys[i])) {
                _this5.model[keys[i]] = defaults[keys[i]];
              }
            }

            if (process.env.NODE_ENV !== 'production') {
              log('Child: Inherited and extended model from Parent');
            }
          }

          if (process.env.NODE_ENV !== 'production') {
            log('Child: Saving Parent origin', _this5.parentOrigin);
          }

          return resolve(new ChildAPI(_this5));
        }

        return reject('Handshake Reply Failed');
      };

      _this5.child.addEventListener('message', shake, false);
    });
  };

  return Model;
}();

/* harmony default export */ __webpack_exports__["a"] = (Postmate);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)))

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(188)
}
var Component = __webpack_require__(18)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(190),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\jyb\\jyb_git\\lego_manage\\app\\web\\components\\ace-editor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ace-editor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6720b412", Component.options)
  } else {
    hotAPI.reload("data-v-6720b412", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 188:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AceEditor',
  props: {
    editorId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    variable: {
      type: Object,
      default: function _default() {}
    },
    lang: {
      type: String,
      default: 'text'
    },
    theme: {
      type: String,
      default: 'github'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data: function data() {
    return {
      editor: null,
      langTools: null,
      beforeContent: '',
      isFullScreen: false
    };
  },

  watch: {
    content: function content(newVal) {
      if (this.beforeContent !== newVal) {
        this.editor.setValue(newVal, 1);
      }
    },
    variable: function variable(newVal) {
      this.setCompleter(newVal);
    }
  },
  methods: {
    setCompleter: function setCompleter(list) {
      list = list || {};
      var vlist = [];
      for (var i in list) {
        vlist.push({
          caption: i,
          value: list[i].value || i,
          meta: list[i].desc
        });
      }
      var completer = {
        getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
          if (prefix.length === 0) {
            return callback(null, []);
          }
          callback(null, vlist);
        }
      };
      this.langTools.setCompleters([completer, this.langTools.keyWordCompleter]);
    },
    fullScreen: function fullScreen() {
      var _fullScreen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.editor) {
        this.isFullScreen = !!_fullScreen;
        this.editor.container.classList[this.isFullScreen ? 'add' : 'remove']('ui-full-screen');
        this.editor.setAutoScrollEditorIntoView(!this.isFullScreen);
        this.editor.resize();
      }
    },
    exitFullScreen: function exitFullScreen() {
      this.fullScreen(false);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.editor.destroy();
    this.editor.container.remove();
  },
  mounted: function mounted() {
    var _this = this;

    this.editor = window.ace.edit(this.editorId);
    this.langTools = ace.require('ace/ext/language_tools');
    this.editor.setOptions({
      enableLiveAutocompletion: true
    });

    this.setCompleter(this.variable);

    this.editor.setValue(this.content, 1);
    this.editor.getSession().setMode('ace/mode/' + this.lang);
    this.editor.setTheme('ace/theme/' + this.theme);

    this.editor.on('change', function () {
      _this.beforeContent = _this.editor.getValue();
      _this.$emit('change', _this.beforeContent);
    });
  }
});

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    style: ({
      'width': _vm.width,
      'height': _vm.height
    }),
    attrs: {
      "id": _vm.editorId
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isFullScreen),
      expression: "isFullScreen"
    }],
    staticClass: "ui-close-btn",
    on: {
      "click": _vm.exitFullScreen
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6720b412", module.exports)
  }
}

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getObjectFunction;
/* harmony export (immutable) */ __webpack_exports__["c"] = getProcessFunc;
/* harmony export (immutable) */ __webpack_exports__["a"] = getComponentProps;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 获取对象的属性
 * @param {Object} obj
 * @param {Array} variable
 * @param {Object} options
 * @param {Number} options.limit
 * @param {String} options.prefix
 */
function getObjectFunction(obj) {
  var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var limit = options.limit || 4;
  var prefix = options.prefix || 'LegoUtil';
  var prefixLen = prefix.split('.').length;

  if (prefixLen >= limit) return;
  for (var k in obj) {
    if (typeof obj[k] === 'function' || prefixLen === limit - 1) {
      variable.push({
        key: prefix + '.' + k,
        type: obj[k] && obj[k].type || _typeof(obj[k]),
        label: obj[k] && obj[k].label || ''
      });
    } else if (_typeof(obj[k]) === 'object') {
      getObjectFunction(obj[k], variable, { prefix: prefix + '.' + k });
    }
  }
}

/**
 * 类型处理函数
 * @param {String} type
 */
function getProcessFunc(type) {
  var processVariable = {
    function: {
      getKey: function getKey(val) {
        return val.key;
      },
      getValue: function getValue(val) {
        return val.key + '()';
      },
      getLabel: function getLabel(val) {
        return val.key;
      }
    },
    default: {
      getKey: function getKey(val) {
        return val.key;
      },
      getValue: function getValue(val) {
        return val.key;
      },
      getLabel: function getLabel(val) {
        return val.key;
      }
    }
  };
  return processVariable[type] || processVariable.default || {};
}

/**
 * 获取组件属性
 * @param {Object} config
 * @return {Array}
 */
function getComponentProps(config) {
  var result = [];
  var PROPS = ['styleKey', 'didTrigger', 'didFinish', 'lazyLoad', 'isShowNpmVersions', 'npmversion', 'npmversionArr', 'npmname', 'extend', 'fnObj', '_itemList'];

  if (!config.data) return result;
  for (var k in config.data) {
    if (PROPS.indexOf(k) === -1) {
      result.push({
        name: config.name,
        propName: k,
        type: _typeof(config.data[k])
      });
    }
  }
  return result;
}

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("LegoUtil",[],t):"object"==typeof exports?exports.LegoUtil=t():e.LegoUtil=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";function i(){Array.isArray(window._componentConfig)&&(o={},window._componentConfig.forEach(function(e){e.uid&&(o[e.uid]=e)}))}var o={};i(),t.a={init:i,get:function(e){return Object.prototype.hasOwnProperty.call(o,e)?o[e]:{}}}},function(e,t,n){var i;void 0!==(i=function(e,t,n){function i(){this.tipsHtml,this.config={msg:"",isLoading:!1,autoHide:!0,hideTime:1200},this.iconConf={loading:'<span class="rotate-icon"></span>',none:""},this.tipTemplate='<div id="bubble"><div class="mod-spinner"><div class="spinner-wrap">{{icon}}<p class="text" id="bubble-text">{{text}}</p></div></div></div>',this.tipRegisterSuccess='<div class="overlay"></div>    <div class="mod-dialog">        <div class="dialog-title ui-bb-n">感谢您对加油宝的支持<span class="close-wrap" id="registerCloseDialog">&#10005;</span></div>        <div class="dialog-content ui-ov-h">            <div class="coupon-wrap ui-ta-c ui-p-r">                <img src="https://images.jyblife.com/tuiguang/huafei/couponbg.png" width="80%">                <div class="ui-p-a f-15 text">                    <dd class="color-333">{{tipsdesc1}}</dd>                    <dd class="color-red">{{tipsdesc2}}</dd>                </div>            </div>            <dd class="color-333 ui-pt-10 ui-pb-20">{{tipsdesc3}}</dd>            <div class="ui-ml-20 ui-mr-20 ui-pl-20 ui-pr-20 ui-pb-20 ui-mb-20">                <a class="mod-btn f-15 hover" href="{{jumpurl}}">{{tipsdesc4}}</a>            </div>        </div>    </div>',this.tipRegisterSuccessEvent='<div class="overlay"></div>    <div class="mod-dialog">        <div class="dialog-title ui-bb-n">感谢您对加油宝的支持<span class="close-wrap" id="registerCloseDialog">&#10005;</span></div>        <div class="dialog-content ui-ov-h">            <div class="coupon-wrap ui-ta-c ui-p-r">                <img src="https://images.jyblife.com/tuiguang/huafei/couponbg.png" width="80%">                <div class="ui-p-a f-15 text">                    <dd class="color-333">{{tipsdesc1}}</dd>                    <dd class="color-red">{{tipsdesc2}}</dd>                </div>            </div>            <dd class="color-333 ui-pt-10 ui-pb-20">{{tipsdesc3}}</dd>            <div class="ui-ml-20 ui-mr-20 ui-pl-20 ui-pr-20 ui-pb-20 ui-mb-20" id="confirm_btn">                <div class="mod-btn f-15 hover" >{{tipsdesc4}}</div>            </div>        </div>    </div>'}$.extend(i.prototype,{showTips:function(e){var t=this;if(!t.tipsHtml){var n=$.extend({},this.config,e),i=this.tipTemplate.replace(/{{icon}}/,n.isLoading?this.iconConf.loading:"").replace(/{{text}}/,n.msg);this.tipsHtml=$(i),$("body").append(this.tipsHtml),n.autoHide&&setTimeout(function(){t.closeTips()},n.hideTime),this.lock=!0}},showRegisterSuccess:function(e){this.tipRegisterSuccess=this.tipRegisterSuccess.replace("{{tipsdesc1}}",e.tipsdesc1).replace("{{tipsdesc2}}",e.tipsdesc2).replace("{{tipsdesc3}}",e.tipsdesc3).replace("{{tipsdesc4}}",e.tipsdesc4).replace("{{jumpurl}}",e.jumpurl),$("#layer").append(this.tipRegisterSuccess),$("#registerCloseDialog").on("click",function(e){$("#layer").html("")})},showRegisterSuccessEvent:function(e,t,n){this.tipRegisterSuccessEvent=this.tipRegisterSuccessEvent.replace("{{tipsdesc1}}",e.tipsdesc1).replace("{{tipsdesc2}}",e.tipsdesc2).replace("{{tipsdesc3}}",e.tipsdesc3).replace("{{tipsdesc4}}",e.tipsdesc4).replace("{{jumpurl}}",e.jumpurl),$("#layer").append(this.tipRegisterSuccessEvent),$("#registerCloseDialog").on("click",function(e){$("#layer").html("")});var i=this;$("#confirm_btn").on("click",function(e){n&&n(),i.showLoading(),setTimeout(function(){t&&t(e)},3e3)})},showLoading:function(e){this.showTips({msg:e||"努力加载中...",isLoading:!0,autoHide:!1})},showError:function(e){var t=this;clearInterval(t.ptr),t.ptr=setInterval(function(){t.tipsHtml||(t.showTips({msg:e}),clearInterval(t.ptr))},200)},closeTips:function(){var e=this;return e.tipsHtml?(e.tipsHtml.remove(),e.tipsHtml=null,e.lock=!1,e):e}}),n.exports=new i}.call(t,n,t,e))&&(e.exports=i)},function(e,t,n){e.exports=n(3)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(4),o=(n.n(i),n(5)),s=(n.n(o),n(6)),r=n(7),a=n(0),c=n(8),u={};u.$base=c.a,u.$dom=s.a,u.$util=i,u.$data=r.a,u.$config=a.a,t.default=u},function(e,t,n){!function(e,n){n(t)}(0,function(e){"use strict";function t(e,t){var n=t||window.location.search.replace("&amp;","&"),i=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=n.substr(n.indexOf("?")+1).match(i);return null!=o?o[2]:""}function n(e){var t=new RegExp("(^| )"+e+"(?:=([^;]*))?(;|$)"),n=document.cookie.match(t);return n?n[2]?unescape(n[2]):"":null}function i(e,t,i,o){if(null!=n(e)){var s=new Date;s.setMinutes(s.getMinutes()-1e3),t=t||"/",document.cookie=e+"=;expires="+s.toGMTString()+(t?";path="+t:"")+(i?";domain="+i:"")+(o?";secure":"")}}function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"/",o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,s=arguments.length>5&&void 0!==arguments[5]&&arguments[5],r=new Date;n&&r.setTime(r.getTime()+24*n*3600*1e3),document.cookie=e+"="+escape(t)+(n?";expires="+r.toGMTString():"")+(i?";path="+i:"")+(o?";domain="+o:"")+(s?";secure":"")}function s(){try{return sessionStorage.setItem("testSafariPrivate",!0),!0}catch(e){return!1}}function r(e){return String(e).replace(/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g,"$1,")}function a(e){return e.replace(/(\d{4})(\d{2})(\d{2})?/g,function(e,t,n,i){return i?t+"-"+n+"-"+i:t+"-"+n})}function c(e,t){return t?(e/100).toFixed(2):e/100}e.getQuery=t,e.getCookie=n,e.delCookie=i,e.setCookie=o,e.supportStorage=s,e.getFormatPrice=r,e.formatDate=a,e.getYuan=c,Object.defineProperty(e,"__esModule",{value:!0})})},function(e,t){"undefined"==typeof $&&(window.$={extend:function(e,t){for(var n in t)e[n]=t[n]}})},function(e,t,n){"use strict";t.a={get:function(e){return document.querySelector('[uid="'+e+'"]')}}},function(e,t,n){"use strict";var i=n(0);t.a={get:function(e){return i.a.get(e).data||{}}}},function(e,t,n){"use strict";var i=n(9),o=n.n(i),s=n(10),r=n.n(s),a=n(11),c=n.n(a),u=n(14),l=n.n(u),d=n(1),p=n.n(d);t.a={detect:o.a,env:o()(),EventEmit:r.a,event:r.a.instance,request:c.a,tips:p.a,dialog:l.a}},function(e,t,n){!function(t,n){e.exports=n()}(0,function(){"use strict";function e(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(!e&&t)return t;t={},n=n||window.navigator.userAgent;var i=n.toLowerCase(),o=n.match(/(Android);?[\s\/]+([\d.]+)?/),s=n.match(/(iPad).*OS\s([\d_]+)/),r=n.match(/(iPod)(.*OS\s([\d_]+))?/),a=!s&&n.match(/(iPhone\sOS)\s([\d_]+)/),c=/jiayoubao/.test(i),u=/micromessenger/.test(i),l=/qq\//.test(i);return t.jyb=c,t.weixin=u,t.qq=l,o&&(t.android=!0,t.version=o[2]),a&&!r&&(t.ios=t.iphone=!0,t.version=a[2].replace(/_/g,".")),s&&(t.ios=t.ipad=!0,t.version=s[2].replace(/_/g,".")),r&&(t.ios=t.ipod=!0,t.version=r[3]?r[3].replace(/_/g,"."):null),t}var t=null;return e})},function(e,t,n){!function(t,n){e.exports=n()}(0,function(){"use strict";var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),n=function(){function n(){e(this,n),this.listeners={}}return t(n,[{key:"on",value:function(e,t,n){var i=this.listeners[e];i||(i=this.listeners[e]=[]),i.push(t),n&&(i.once=!0)}},{key:"has",value:function(e){return this.listeners[e]}},{key:"once",value:function(e,t){this.on(e,t,!0)}},{key:"emit",value:function(e){var t=this.listeners[e];if(t){for(var n=arguments.length,i=Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];for(var s=0,r=t.length;s<r;s++)t[s].apply(this,i);t.once&&delete this.listeners[e]}}},{key:"off",value:function(e){delete this.listeners[e]}},{key:"offAll",value:function(){this.listeners={}}}]),n}();return n.instance=new n,n})},function(e,t,n){function i(e,t,n,i,a){"object"==typeof e&&(n,n=t,t=e,e="/act/index"),l&&!t.serialFlag||(void 0!==t.userStatus&&1!=t.userStatus||(t.userid=s.getQuery("userid")||s.getCookie("userid")||"",t.token=s.getQuery("token")||s.getCookie("token")||""),delete t.userStatus,delete t.serialFlag,a||o.showLoading(),"copy"==u&&(t.visit="copy"),t.from=d,l=!0,r({url:window.interface_env+e+"?ts="+ +new Date,data:JSON.stringify(t),type:"post",dataType:"json",timeout:6e4},function(e){o.closeTips(),l=!1,n(e)},function(e){l=!1,a?o.showError("网络错误<br/>错误码"+e):o.closeTips().showError("网络错误<br/>错误码"+e)}))}var o=n(1),s=n(12),r=n(13),a=s.getQuery("userid")||"",c=s.getQuery("token")||"",u=s.getQuery("visit")||"",l=!1;a&&c&&(s.setCookie("userid",a,10),s.setCookie("token",c,10));var d=s.isJyb()?"app":"h5";e.exports=i},function(e,t,n){var i;void 0!==(i=function(e,t,n){return{isJyb:function(){return/jiayoubao/.test(window.navigator.userAgent.toLowerCase())},getQuery:function(e,t){var n=arguments[1]||window.location.search.replace("&amp;","&"),i=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=n.substr(n.indexOf("?")+1).match(i);return null!=o?o[2]:""},getUserid:function(){return this.getQuery("userid")||this.getCookie("userid")||""},getToken:function(){return this.getQuery("token")||this.getCookie("token")||""},addUrlPara:function(e,t,n){var i=n.split("#")[0],o=new RegExp(e+"=[-\\w]{1,1000}","g");return/\?/g.test(i)?o.test(i)?i=i.replace(o,e+"="+t):i+="&"+e+"="+t:i+="?"+e+"="+t,n=n.split("#")[1]?i+"#"+n.split("#")[1]:i},getCookie:function(e){var t=new RegExp("(^| )"+e+"(?:=([^;]*))?(;|$)"),n=document.cookie.match(t);return n?n[2]?unescape(n[2]):"":null},delCookie:function(e,t,n,i){if(null!=this.getCookie(e)){var o=new Date;o.setMinutes(o.getMinutes()-1e3),t=t||"/",document.cookie=e+"=;expires="+o.toGMTString()+(t?";path="+t:"")+(n?";domain="+n:"")+(i?";secure":"")}},setCookie:function(e,t,n,i,o,s){var r=new Date,n=arguments[2]||null,i=arguments[3]||"/",o=arguments[4]||null,s=arguments[5]||!1;n&&r.setTime(r.getTime()+24*n*3600*1e3),document.cookie=e+"="+escape(t)+(n?";expires="+r.toGMTString():"")+(i?";path="+i:"")+(o?";domain="+o:"")+(s?";secure":"")},setLogin:function(e,t){this.setCookie("userid",e,10),this.setCookie("token",t,10)},supportStorage:function(){try{return sessionStorage.setItem("testSafariPrivate",!0),!0}catch(e){return!1}},getFormatPrice:function(e){return String(e).replace(/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g,"$1,")},formatDate:function(e){return e.replace(/(\d{4})(\d{2})(\d{2})?/g,function(e,t,n,i){return i?t+"-"+n+"-"+i:t+"-"+n})},getYuan:function(e,t){return t?(e/100).toFixed(2):e/100},getJybUrl:function(e){var t=this.getQuery("userid")||this.getCookie("userid")||"",n=this.getQuery("token")||this.getCookie("token")||"";return e.indexOf("http")>-1&&(e=this.addUrlPara("userid",t,e),e=this.addUrlPara("token",n,e)),e},toThousands:function(e){for(var e=(e||0).toString(),t="";e.length>3;)t=","+e.slice(-3)+t,e=e.slice(0,e.length-3);return e&&(t=e+t),t},formatPrice:function(e){if(+(e=+e)<0||isNaN(e))return"--";e=(e/100).toFixed(2);var t=e.split(".");return[this.toThousands(t[0]),t[1]].join(".")},timeFormat:function(e,t){var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));for(var i in n)new RegExp("("+i+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[i]:("00"+n[i]).substr((""+n[i]).length)));return e},parseDate:function(e){var t=new Date(1e3*e),n=function(e){return e>9?e+"":"0"+e};return{year:n(t.getFullYear()),month:n(t.getMonth()+1),day:n(t.getDate()),hour:n(t.getHours()),min:n(t.getMinutes()),second:n(t.getSeconds()),weekDay:t.getDay()+"",monthLastDay:function(){return t.setDate(32),t.setDate(0),t.getDate()+""}()}},escape:function(e){var t={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"};return e.replace(/[\<\>\&\"\']/g,function(e){return t[e]})},flog:function(e){console.log(JSON.stringify(e,null,4))},testPhone:function(e){return/^1[34578]\d{9}$/.test(e)},testVerifyCode:function(e){return/^\d{6}$/.test(e)},delUrlParam:function(e,t){e=e||location.href;var n="",i="",o="",s="";n=e.indexOf("?")>-1?e.substr(0,e.indexOf("?")):e,e.indexOf("?")>-1&&(i=e.indexOf("#")>-1?e.slice(e.indexOf("?")+1,e.indexOf("#")):e.slice(e.indexOf("?")+1,e.length)),e.indexOf("#")>-1&&(o=e.substr(e.indexOf("#")));var r=new Array;if(""!=i)for(var a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");u[0]!=t&&r.push(a[c])}return r.length>0&&(s="?"+r.join("&")),e=n+s+o},callLogin:function(){if(this.isJyb()){var e=this;wv.ready(function(){wv.login({phoneNo:"",complete:function(t){e.setLogin(t.userId,t.token);var n=location.href;n=e.addUrlPara("userid",t.userId,n),n=e.addUrlPara("token",t.token,n),window.location.replace(n)}})})}else{var t=this.delUrlParam(location.href,"userid");t=this.delUrlParam(t,"token");var n=window.location.origin,i=this.getQuery("origin");i&&(n=i),window.location.href=n+"/act/unionlogin/pages/index.html?redirect="+encodeURIComponent(t)}},openUrl:function(e){if(this.isJyb()&&-1==e.indexOf("jtjr"))window.wv.ready(function(){window.wv.open({url:e})});else{var t=this;setTimeout(function(){e=t.addUrlPara("userid",t.getUserid(),e),e=t.addUrlPara("token",t.getToken(),e),window.location.href=e},0)}},detect:function(){var e={},t=t||window.navigator.userAgent,n=t.toLowerCase(),i=t.match(/(Android);?[\s\/]+([\d.]+)?/),o=t.match(/(iPad).*OS\s([\d_]+)/),s=t.match(/(iPod)(.*OS\s([\d_]+))?/),r=!o&&t.match(/(iPhone\sOS)\s([\d_]+)/),a=/jiayoubao/.test(n),c=/micromessenger/.test(n),u=/qq\//.test(n);return e.jyb=a,e.weixin=c,e.qq=u,i&&(e.android=!0,e.version=i[2]),r&&!s&&(e.ios=e.iphone=!0,e.version=r[2].replace(/_/g,".")),o&&(e.ios=e.ipad=!0,e.version=o[2].replace(/_/g,".")),s&&(e.ios=e.ipod=!0,e.version=s[3]?s[3].replace(/_/g,"."):null),e}}}.call(t,n,t,e))&&(e.exports=i)},function(e,t,n){var i;void 0!==(i=function(e,t,n){n.exports=function(e,t,n){var i=new XMLHttpRequest;i.onreadystatechange=function(){1==i.readyState&&e.beforeSend&&e.beforeSend();var o=setTimeout(function(){4!==i.readyState&&(n&&n(),i.abort())},e.timeout||1e4);4===i.readyState&&(clearTimeout(o),200===i.status?t.call(i,"json"==e.dataType.toLowerCase()?JSON.parse(i.responseText):i.responseText):n&&n.apply(i,[i.status,i.responseText]))},e.type=e.type.toUpperCase();var o=e.data;(void 0===e.processData||e.processData)&&(o=function(e){if("object"==typeof e&&null!=e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")}return e}(e.data)),"GET"===e.type&&(e.url=e.url+(e.url.indexOf("?")>0?"&":"?")+o,o=null),i.open(e.type,e.url),i.withCredentials=!0,("POST"==e.type&&void 0===e.contentType||e.contentType)&&i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(o)}}.call(t,n,t,e))&&(e.exports=i)},function(e,t,n){var i;void 0!==(i=function(e,t){function n(e){if(r={titleBorder:!1,title:"",showClose:!1,content:"",btnFn:[],mask:!1,selfAction:"",onClose:function(){},onShow:function(){}},!a){$.extend(r,e);var t,n=[],o=[],s="",h="",m=window.pageYOffset,w=window.innerHeight;$.each(r.btnFn,function(e,t){n.push(g.replace(/{{text}}/,t.text).replace(/{{index}}/,e).replace(/{{css}}/,t.css?t.css:"")),v["btnCallback"+e]=t.callback}),c=r.btnFn.length,r.title&&(h=l.replace(/{{title}}/,r.title).replace(/{{close}}/,r.showClose?d:"").replace(/{{titleBorder}}/,r.titleBorder?"":"ui-bb-n")),t=p.replace(/{{content}}/,r.content),c&&(s=f.replace(/{{btnList}}/,n.join(""))),o.push("<div id='dialogNode' class='ui-vh'>"),r.mask&&o.push(u),o.push('<div class="mod-dialog ui-mb-20" style="position:absolute;top:'+(m+.2*window.innerHeight)+'px;">'),o.push(h+t+s),o.push("</div></div>"),a=$(o.join("")),$("body").append(a);var y=$(".mod-dialog");y[0].scrollHeight<w&&y.css({position:"fixed",top:"50%",left:"50%",transform:"translateX(-50%) translateY(-50%)","-webkit-transform":"translateX(-50%) translateY(-50%)"}),a.removeClass("ui-vh"),r.onShow(a),i()}}function i(){a.on("click",v.handleEvent)}function o(e){a.find(".dialog-content").html(e)}function s(){v.closeDialog()}var r,a,c,u='<div class="overlay"></div>',l='<div class="dialog-title {{titleBorder}}">{{title}}{{close}}</div>',d='<span class="close-wrap" et="click:closeDialog">&#10005;</span>',p='<div class="dialog-content ui-ov-h">{{content}}</div>',f='<div class="dialog-btn-wrap">{{btnList}}</div>',g='<span class="dialog-btn ui-d-b {{css}}" et="click:btnCallback{{index}}">{{text}}</span>',v={};v.handleEvent=function(e){e=e||window.event;var t=e.target.tagName,n=$(e.target),i=n.attr("et");if(!i){for(;n[0]!=this&&!i;)n=n.parent(),i=n.attr("et");if(!i)return}"A"!=t&&e.stopPropagation(),0==i.indexOf(e.type)&&v[i.split(":")[1]](n,e)},v.closeDialog=function(){a&&(a.remove(),a=null,r.onClose(),$.each(c,function(e){delete v["btnCallback"+e]}))},v.selfDefineAction=function(e,t){r.selfAction&&r.selfAction(e,t)},t.show=n,t.close=s,t.updateContent=o}.call(t,n,t,e))&&(e.exports=i)}]).default});

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible),
      expression: "visible"
    }],
    staticClass: "debug-wrap"
  }, [_c('div', {
    staticClass: "ui-close-btn close-btn",
    on: {
      "click": _vm.handleClose
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "debug-main"
  }, [_c('div', {
    staticClass: "url-box"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.frameUrl),
      expression: "frameUrl"
    }],
    staticClass: "url-box__input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.frameUrl)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.frameUrl = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "btn-save",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm.handleLoadIframe
    }
  }, [_vm._v("加载")]), _vm._v(" "), _c('div', {
    staticClass: "operate-btn-box"
  }, [_c('a', {
    staticClass: "btn-save",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm.handleLoadPage
    }
  }, [_vm._v("重新加载页面")]), _vm._v(" "), _c('a', {
    staticClass: "btn-save",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm.handleRefresh
    }
  }, [_vm._v("刷新页面")]), _vm._v(" "), _c('a', {
    staticClass: "btn-save",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm.handleDebug
    }
  }, [_vm._v("调试")]), _vm._v(" "), _c('a', {
    staticClass: "btn-save",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm.handleSave
    }
  }, [_vm._v("保存")])])]), _vm._v(" "), _c('div', {
    staticClass: "debug-box"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "debug-editor-box"
  }, [_c('h6', {
    staticClass: "debug-editor__title"
  }, [_vm._v("html代码："), _c('a', {
    staticClass: "full-screen",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": function($event) {
        _vm.handleFullScreen('html')
      }
    }
  }, [_vm._v("全屏")])]), _vm._v(" "), _c('ace-editor', {
    ref: "codeHtmlString",
    staticClass: "debug-editor",
    attrs: {
      "editorId": "codeHtmlString",
      "height": "180px",
      "content": _vm.codeHtmlString,
      "lang": "html"
    },
    on: {
      "change": function($event) {
        _vm.handleEditorHtmlChange($event)
      }
    }
  }), _vm._v(" "), _c('h6', {
    staticClass: "debug-editor__title"
  }, [_vm._v("样式代码："), _c('a', {
    staticClass: "full-screen",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": function($event) {
        _vm.handleFullScreen('style')
      }
    }
  }, [_vm._v("全屏")])]), _vm._v(" "), _c('ace-editor', {
    ref: "codeStyleString",
    staticClass: "debug-editor",
    attrs: {
      "editorId": "codeStyleString",
      "height": "180px",
      "content": _vm.codeStyleString,
      "lang": "css"
    },
    on: {
      "change": function($event) {
        _vm.handleEditorStyleChange($event)
      }
    }
  }), _vm._v(" "), _c('h6', {
    staticClass: "debug-editor__title"
  }, [_vm._v("脚本代码（只支持es5语法）："), _c('a', {
    staticClass: "full-screen",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": function($event) {
        _vm.handleFullScreen('script')
      }
    }
  }, [_vm._v("全屏")])]), _vm._v(" "), _c('ace-editor', {
    ref: "codeScriptString",
    staticClass: "debug-editor",
    attrs: {
      "editorId": "codeScriptString",
      "height": "180px",
      "variable": _vm.editorVar,
      "content": _vm.codeScriptString,
      "lang": "javascript"
    },
    on: {
      "change": function($event) {
        _vm.handleEditorScriptChange($event)
      }
    }
  })], 1)])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "preview-wrapper"
  }, [_c('div', {
    staticClass: "preview-box",
    attrs: {
      "id": "js-preview"
    }
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d2c2b4fe", module.exports)
  }
}

/***/ }),

/***/ 194:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })

/******/ });
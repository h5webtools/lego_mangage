webpackJsonp([6],{

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(156);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = parseTime;
/* unused harmony export formatTime */
/* unused harmony export getQueryObject */
/* unused harmony export getByteLen */
/* unused harmony export cleanArray */
/* unused harmony export param */
/* unused harmony export param2Obj */
/* unused harmony export html2Text */
/* unused harmony export objectMerge */
/* unused harmony export scrollTo */
/* unused harmony export toggleClass */
/* unused harmony export pickerOptions */
/* unused harmony export getTime */
/* unused harmony export getDifTime */
/* harmony export (immutable) */ __webpack_exports__["e"] = trim;
/* harmony export (immutable) */ __webpack_exports__["c"] = getQuery;
/* unused harmony export getInt */
/* unused harmony export getObjType */
/* harmony export (immutable) */ __webpack_exports__["a"] = arrayContain;
/* harmony export (immutable) */ __webpack_exports__["b"] = getCookie;
/* unused harmony export delCookie */
/* unused harmony export setCookie */
/* unused harmony export hasOwn */
/* unused harmony export hasOwnProp */
/* unused harmony export clone */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by jiachenpan on 16/11/18.
 */

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  var date = void 0;
  if ((typeof time === 'undefined' ? 'undefined' : _typeof(time)) == 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
    var value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

function formatTime(time, option) {
  time = +time * 1000;
  var d = new Date(time);
  var now = Date.now();

  var diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}

// 格式化时间
function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  var search = url.substring(url.lastIndexOf('?') + 1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
function getByteLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1;
    } else {
      len += 0.5;
    }
  }
  return Math.floor(len);
}

function cleanArray(actual) {
  var newArray = [];
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function param(json) {
  if (!json) return '';
  return cleanArray(Object.keys(json).map(function (key) {
    if (json[key] === undefined) return '';
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  })).join('&');
}

function param2Obj(url) {
  var search = url.split('?')[1];
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

function html2Text(val) {
  var div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

function objectMerge(target, source) {
  /* Merges two  objects,
   giving the last one precedence */

  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  for (var property in source) {
    if (source.hasOwnProperty(property)) {
      var sourceProperty = source[property];
      if ((typeof sourceProperty === 'undefined' ? 'undefined' : _typeof(sourceProperty)) === 'object') {
        target[property] = objectMerge(target[property], sourceProperty);
        continue;
      }
      target[property] = sourceProperty;
    }
  }
  return target;
}

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;
  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  var classString = element.className;
  var nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

var pickerOptions = [{
  text: '今天',
  onClick: function onClick(picker) {
    var end = new Date();
    var start = new Date(new Date().toDateString());
    end.setTime(start.getTime());
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近一周',
  onClick: function onClick(picker) {
    var end = new Date(new Date().toDateString());
    var start = new Date();
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近一个月',
  onClick: function onClick(picker) {
    var end = new Date(new Date().toDateString());
    var start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近三个月',
  onClick: function onClick(picker) {
    var end = new Date(new Date().toDateString());
    var start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    picker.$emit('pick', [start, end]);
  }
}];

function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

function getDifTime(diff) {
  var end = new Date();
  var start = new Date();
  start.setTime(end.getTime() + 3600 * 1000 * 24 * diff);
  // const startStr = parseTime(start, "{y}-{m}-{d}");
  // const endStr = parseTime(end, "{y}-{m}-{d}");
  return [start, end];
}

function trim(str) {
  return str.replace(/\s*/g, '');
}

function getQuery(name, url) {
  //参数：变量名，url为空则表从当前页面的url中取
  var u = arguments[1] || window.location.search.replace("&amp;", "&"),
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = u.substr(u.indexOf("\?") + 1).match(reg);
  return r != null ? r[2] : "";
}

function getInt(str) {
  return parseInt(str, 10);
}

function getObjType(obj) {
  return Object.prototype.toString.apply(obj);
}

function arrayContain(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
      return true;
  }
  return false;
}

function getCookie(name) {
  //读取COOKIE
  var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
      val = document.cookie.match(reg);
  return val ? val[2] ? unescape(val[2]) : "" : null;
}

function delCookie(name, path, domain, secure) {
  //删除cookie
  var value = this.getCookie(name);
  if (value != null) {
    var exp = new Date();
    exp.setMinutes(exp.getMinutes() - 1000);
    path = path || "/";
    document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
  }
}

function setCookie(name, value, expires, path, domain, secure) {
  //写入COOKIES
  var exp = new Date(),
      expires = arguments[2] || null,
      path = arguments[3] || "/",
      domain = arguments[4] || null,
      secure = arguments[5] || false;
  expires ? exp.setTime(exp.getTime() + expires * 24 * 3600 * 1000) : "";
  document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
}

var hasOwn = Object.prototype.hasOwnProperty;

function hasOwnProp(obj, k) {
  return hasOwn.call(obj, k);
}

function clone(obj) {
  if (null == obj || "object" != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(14);
var settle = __webpack_require__(167);
var buildURL = __webpack_require__(169);
var parseHeaders = __webpack_require__(170);
var isURLSameOrigin = __webpack_require__(171);
var createError = __webpack_require__(158);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(172);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(173);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(168);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_assets_js_util__ = __webpack_require__(155);




// 创建axios实例
var service = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

// request拦截器
service.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers['x-csrf-token'] = __WEBPACK_IMPORTED_MODULE_2_assets_js_util__["b" /* getCookie */]('csrfToken');
  return config;
}, function (error) {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(function (response) {
  /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
  var code = response.data.code;

  // 50014:Token 过期了 50012:其他客户端登录了 50008:非法的token
  if (code == "1601000014" || code == "1601000013") {
    Object(__WEBPACK_IMPORTED_MODULE_1_element_ui__["Message"])({
      message: response.data.msg,
      type: 'error',
      duration: 3 * 1000
    });
    // 跳转去登录页
    // location.replace("/login?redirect=" + encodeURIComponent(location.href));
    location.replace("/login");
    return Promise.reject();
  } else if (code != 0) {
    Object(__WEBPACK_IMPORTED_MODULE_1_element_ui__["Message"])({
      message: response.data.msg,
      type: 'error',
      duration: 3 * 1000
    });
    return response.data;
  } else {
    return response.data;
  }
}, function (error) {
  console.log('err' + error); // for debug
  Object(__WEBPACK_IMPORTED_MODULE_1_element_ui__["Message"])({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  });
  return Promise.reject(error);
});

/* harmony default export */ __webpack_exports__["a"] = (service);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)))

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(164);

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);
var bind = __webpack_require__(156);
var Axios = __webpack_require__(165);
var defaults = __webpack_require__(70);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(160);
axios.CancelToken = __webpack_require__(179);
axios.isCancel = __webpack_require__(159);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(180);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(70);
var utils = __webpack_require__(14);
var InterceptorManager = __webpack_require__(174);
var dispatchRequest = __webpack_require__(175);
var isAbsoluteURL = __webpack_require__(177);
var combineURLs = __webpack_require__(178);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(158);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);
var transformData = __webpack_require__(176);
var isCancel = __webpack_require__(159);
var defaults = __webpack_require__(70);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(160);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(19)(
  /* script */
  __webpack_require__(279),
  /* template */
  __webpack_require__(281),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\code\\lego_manage\\app\\web\\pages\\act\\list\\listApp.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] listApp.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bd91023", Component.options)
  } else {
    hotAPI.reload("data-v-7bd91023", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["i"] = getTestEngineer;
/* harmony export (immutable) */ __webpack_exports__["b"] = getActDetail;
/* harmony export (immutable) */ __webpack_exports__["j"] = postSingleConf;
/* harmony export (immutable) */ __webpack_exports__["m"] = saveActConfig;
/* harmony export (immutable) */ __webpack_exports__["f"] = getRelatedCouponList;
/* harmony export (immutable) */ __webpack_exports__["e"] = getEnableEditUsersList;
/* harmony export (immutable) */ __webpack_exports__["d"] = getChannelList;
/* harmony export (immutable) */ __webpack_exports__["g"] = getSingleFile;
/* harmony export (immutable) */ __webpack_exports__["h"] = getSingleFileParams;
/* harmony export (immutable) */ __webpack_exports__["k"] = putSingleFile;
/* harmony export (immutable) */ __webpack_exports__["l"] = putSingleParams;
/* harmony export (immutable) */ __webpack_exports__["c"] = getActSingleConfig;
/* harmony export (immutable) */ __webpack_exports__["n"] = setChannelList;
/* harmony export (immutable) */ __webpack_exports__["a"] = GetActivityDraftConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services__ = __webpack_require__(162);


function getTestEngineer() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/common/getTestEngineer',
    method: 'post'
  });
}

function getActDetail(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/getActDetail',
    method: 'post',
    data: data
  });
}

function postSingleConf(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/postSingleConf',
    method: 'post',
    data: data
  });
}

function saveActConfig(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/postAct',
    method: 'post',
    data: data
  });
}

function getRelatedCouponList() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/common/coupons',
    method: 'post'
  });
}

function getEnableEditUsersList() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/common/users',
    method: 'post'
  });
}

function getChannelList() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/GetChannels',
    method: 'post'
  });
}

function getSingleFile(search, page, pageSize) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/GetSingles',
    method: 'post',
    data: {
      search: search,
      page: page || 1,
      page_size: pageSize || 1000
    }
  });
}

function getSingleFileParams(code) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/GetSingleParams',
    method: 'post',
    data: {
      code: code
    }
  });
}

function putSingleFile(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/PutSingles',
    method: 'post',
    data: data
  });
}

function putSingleParams(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/PutSingleParams',
    method: 'post',
    data: data
  });
}

function getActSingleConfig(act_id, is_draft) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/GetActSingleConfig',
    method: 'post',
    data: {
      act_id: act_id,
      is_draft: is_draft || 0
    }
  });
}

function setChannelList(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/PostChannel',
    method: 'post',
    data: data
  });
}
function GetActivityDraftConfig(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/GetActivityDraftConfig',
    method: 'post',
    data: data
  });
}

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_api_api_act_edit__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_assets_js_util__ = __webpack_require__(155);
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
  data: function data() {
    return {
      queryData: {
        act_id: '',
        act_name: '',
        act_channel: '',
        start_time: '',
        end_time: '',
        page: 1,
        page_size: 20,
        expire_time: ''
      },
      deploy: window.currentEnv == 'prod' || window.currentEnv == 'uat', // prod才展示同步配置入口
      opsLogsData: {
        source_id: '',
        type: 0,
        user_id: ''
      },
      dialogTestResultVisible: false,
      tempActInfo: "",
      testResult: {
        results: "",
        remark: ""
      },
      rules: {
        results: [{ required: true, message: '请选择测试结果', trigger: 'change' }]
      },
      statusMapNew: { //测试以及发布状态
        0: '待测试',
        1: '测试中',
        2: '待审批',
        3: '审批中',
        4: '待发布', // 待审核或者待发布
        5: '已发布',
        6: '测试未通过'
      },
      isAdmin: '', //管理员
      isTester: '', //测试
      isOperator: '', // 运营
      isDev: '', // 开发
      userIds: '',
      tableData: [],
      logData: {}, //日志流水
      listLoading: true,
      total: 0
    };
  },

  computed: {
    showSubRoute: function showSubRoute() {
      return this.$route.name !== 'actList';
    }
  },
  watch: {
    showSubRoute: function showSubRoute(val) {
      if (!val) {
        this.queryFilterList(true);
      }
    }
  },
  created: function created() {
    if (!this.showSubRoute) {
      this.queryFilterList(true);
    }
    this.initUserInfo();
  },

  methods: {
    initUserInfo: function initUserInfo() {
      this.isAdmin = window.userInfo.isAdmin; //管理员
      this.isTester = window.userInfo.isTester; //测试
      this.isOperator = window.userInfo.isOperator; // 运营
      this.isDev = window.userInfo.isDev; // 开发
      this.userIds = window.userInfo.userid;
    },
    queryFilterList: function queryFilterList(refresh) {
      var _this = this;

      this.listLoading = true;
      __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__["a" /* getActList */](this.queryData).then(function (jsonData) {
        _this.listLoading = false;
        var me = _this;
        if (jsonData.code == 0) {
          var tempData = jsonData.data.data;
          tempData.forEach(function (item) {
            /*
            case:当前用户是管理员 或者当前用户是创建者
            case:当前用户是测试 并且用户是测试负责人
            case:其他
            */
            item.isTestOwner = __WEBPACK_IMPORTED_MODULE_2_assets_js_util__["a" /* arrayContain */](item.tests, me.userIds);
            item.isRevisability = __WEBPACK_IMPORTED_MODULE_2_assets_js_util__["a" /* arrayContain */](item.revisability, me.userIds);
            item.pageids = item.page_ids ? item.page_ids.join("-") : "";
          });

          //tempData.userStatus = 0;
          _this.tableData = jsonData.data.data;
          _this.timestamp = new Date(jsonData.data.timestamp * 1000);
          if (refresh) {
            // 设置分页展示
            _this.total = jsonData.data.sum * 1;
            _this.queryData.page = 1;
          }
        }
      });
    },

    //编辑页面跳转
    editPageLink: function editPageLink(length, act_id, pageId) {
      var _this2 = this;

      if (length > 0) {
        window.open('/lego/editPage?page_id=' + (pageId[0] || '') + '&act_id=' + act_id, '_blank');
      } else {
        var newUrl = window.open('/lego/homePage?act_id=' + act_id, '_blank');
        __WEBPACK_IMPORTED_MODULE_1_api_api_act_edit__["b" /* getActDetail */]({ act_id: act_id }).then(function (json) {
          if (json.code == 0) {
            if (json.data.page_ids.length > 0) {
              newUrl.location.href = '/lego/editPage?page_id=' + (json.data.page_ids[0] || '') + '&act_id=' + act_id;
            } else {
              newUrl.location.href = '/lego/homePage?act_id=' + act_id;
            }
          } else {
            _this2.$message.error(json.msg);
          }
        });
      }
    },

    //获取日志流水
    getOpsLogs: function getOpsLogs(row, expandedRows) {
      var _this3 = this;

      this.opsLogsData.source_id = row.act_id;
      var isRequest = expandedRows.some(function (item, index) {
        return item.act_id == row.act_id;
      });
      if (!isRequest) {
        //关闭扩展时不请求数据
        return false;
      }
      if (this.logData[row.act_id]) {
        //如果请求过数据则不重复请求
        return false;
      }
      //获取日志流水
      __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__["b" /* getOptLogs */](this.opsLogsData).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this3.$set(_this3.logData, row.act_id, jsonData.data);
        }
        _this3.logData[row.act_id].forEach(function (item, index) {
          _this3.logData[row.act_id][index].changeTime = getDateDiff(getDateTimeStamp(item.opt_time));
        });
      });
      //获取活动列表展示参数
      __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__["c" /* getShowList */]({
        act_id: row.act_id
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this3.$set(row, 'showList', jsonData.data);
        }
      });
    },

    //手动触发同步配置
    manual: function manual(row) {
      var _this4 = this;

      __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__["d" /* manual */]({
        act_id: row.act_id,
        page_id: row.page_ids
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this4.$alert('同步到集成环境成功');
        } else {
          _this4.$message.error(json.msg);
        }
      });
    },
    handleCurrentChange: function handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    filterStatusText: function filterStatusText(row) {
      return this.statusMapNew[row.status];
    },
    deadlineNotify: function deadlineNotify(row) {
      var expireDate = new Date(row.expire_time);
      // 1天内的提醒
      if (expireDate - this.timestamp < 86400000 && expireDate - this.timestamp > 0) {
        return row.expire_time + "&nbsp;&nbsp;<span class='textcenter' style='color: #ff2200;'>即将过期</span>";
      } else if (expireDate - this.timestamp < 0) {
        return row.expire_time + "&nbsp;&nbsp;<span class='textcenter' style='color: #ff2200;'>已过期</span>";
      } else {
        return row.expire_time;
      }
    },
    submitTest: function submitTest(props) {
      var _this5 = this;

      __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__["e" /* updateActStatus */]({
        act_id: props.row.act_id,
        action: "initiateTest"
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this5.$message({
            message: "转测成功，请通知相关人员测试！",
            type: 'success'
          });
        }
      });
    },
    showTestResultDialog: function showTestResultDialog(props) {
      // 展示
      this.dialogTestResultVisible = true;
      this.tempActInfo = props;
    },
    toPublish: function toPublish(props) {
      var _this6 = this;

      // 发布
      __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__["e" /* updateActStatus */]({
        act_id: props.row.act_id,
        action: "publish"
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this6.$message({
            message: "发布成功！",
            type: 'success'
          });
        }
      });
    },
    submitApprove: function submitApprove(props) {
      var _this7 = this;

      __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__["e" /* updateActStatus */]({
        act_id: props.row.act_id,
        action: "initiateApprove"
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this7.$message({
            message: "提交审批成功，请通知相关人员审批！",
            type: 'success'
          });
        }
      });
    },
    submitTestResult: function submitTestResult(formName) {
      var _this8 = this;

      //提交测试结果
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          //testResult.results
          //提交
          var _action = ""; //remark
          if (_this8.testResult.results == 0) {
            _action = 'passTest';
          } else {
            _action = 'refuseTest';
          }

          __WEBPACK_IMPORTED_MODULE_0_api_api_act_list__["e" /* updateActStatus */]({
            act_id: _this8.tempActInfo.row.act_id,
            action: _action,
            remark: _this8.testResult.remark
          }).then(function (jsonData) {
            if (jsonData.code == 0) {
              _this8.$message({
                message: "测试结果提交成功！",
                type: 'success'
              });
            }
          });

          _this8.dialogTestResultVisible = false;
        } else {
          //有错误
          return false;
        }
      });
    },
    resetTestResut: function resetTestResut(formName) {
      //取消提交测试结果
      this.$refs[formName].resetFields();
      this.dialogTestResultVisible = false;
    }
  }
});
function getDateDiff(dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var result = '';
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else result = "刚刚";
  return result;
}
function getDateTimeStamp(dateStr) {
  return Date.parse(dateStr.replace(/-/gi, "/"));
}

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getActList;
/* harmony export (immutable) */ __webpack_exports__["e"] = updateActStatus;
/* harmony export (immutable) */ __webpack_exports__["b"] = getOptLogs;
/* harmony export (immutable) */ __webpack_exports__["d"] = manual;
/* harmony export (immutable) */ __webpack_exports__["c"] = getShowList;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services__ = __webpack_require__(162);


function getActList(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/getActs',
    method: 'post',
    data: data
  });
}
function updateActStatus(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/UpdateActStatus',
    method: 'post',
    data: data
  });
}
function getOptLogs(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/common/GetOptLogs',
    method: 'post',
    data: data
  });
}
//手动触发同步
function manual(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/ActivitySynConf/manual',
    method: 'post',
    data: data
  });
}
//手动触发同步
function getShowList(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/ActShowParam/do',
    method: 'post',
    data: data
  });
}

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.showSubRoute) ? _c('router-view') : _c('div', {
    staticClass: "martop20"
  }, [_c('el-form', {
    attrs: {
      "inline": true,
      "label-width": "90px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "活动名："
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "按活动名查询"
    },
    model: {
      value: (_vm.queryData.act_name),
      callback: function($$v) {
        _vm.$set(_vm.queryData, "act_name", $$v)
      },
      expression: "queryData.act_name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "活动渠道："
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "按活动渠道查询"
    },
    model: {
      value: (_vm.queryData.act_channel),
      callback: function($$v) {
        _vm.$set(_vm.queryData, "act_channel", $$v)
      },
      expression: "queryData.act_channel"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "活动号："
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "按活动号查询"
    },
    model: {
      value: (_vm.queryData.act_id),
      callback: function($$v) {
        _vm.$set(_vm.queryData, "act_id", $$v)
      },
      expression: "queryData.act_id"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        return _vm.queryFilterList(true)
      }
    }
  }, [_vm._v("查询")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "success"
    }
  }, [_c('router-link', {
    attrs: {
      "to": {
        name: 'newAct'
      }
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-plus"
  }), _vm._v("新增活动")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.listLoading),
      expression: "listLoading"
    }],
    attrs: {
      "data": _vm.tableData,
      "stripe": "",
      "border": "",
      "highlight-current-row": ""
    },
    on: {
      "expand-change": _vm.getOpsLogs
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "expand"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [(props.row.is_lego == 0 || (props.row.is_lego == 1 && _vm.isAdmin)) ? _c('el-button', {
          attrs: {
            "type": "primary"
          }
        }, [_c('router-link', {
          attrs: {
            "to": {
              name: 'chainEdit',
              params: {
                act_id: props.row.act_id,
                status: props.row.status,
                is_draft: '1'
              }
            }
          }
        }, [_vm._v("副本模板"), _c('i', {
          staticClass: "el-icon-arrow-right"
        })])], 1) : _vm._e(), _vm._v(" "), (props.row.is_lego == 0 || (props.row.is_lego == 1 && _vm.isAdmin)) ? _c('el-button', {
          attrs: {
            "type": "primary"
          }
        }, [_c('router-link', {
          attrs: {
            "to": {
              name: 'chainEdit',
              params: {
                act_id: props.row.act_id,
                status: props.row.status,
                is_draft: '0'
              }
            }
          }
        }, [_vm._v("正式模板 "), _c('i', {
          staticClass: "el-icon-arrow-right"
        })])], 1) : _vm._e(), _vm._v(" "), _c('p', {
          staticClass: "ui-mt-20 ui-ta-c",
          staticStyle: {
            "font-size": "16px"
          }
        }, [_vm._v("更多活动配置信息")]), _vm._v(" "), _c('el-table', {
          attrs: {
            "data": [props.row],
            "stripe": "",
            "border": "",
            "highlight-current-row": ""
          }
        }, [_c('el-table-column', {
          attrs: {
            "prop": "business_channel",
            "label": "活动投放渠道",
            "show-overflow-tooltip": ""
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "act_url",
            "label": "活动地址",
            "show-overflow-tooltip": "",
            "min-width": "200"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "create_time",
            "label": "创建时间"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "creator_name",
            "label": "创建人"
          }
        })], 1), _vm._v(" "), _c('p', {
          staticClass: "ui-mt-20 ui-ta-c",
          staticStyle: {
            "font-size": "16px"
          }
        }, [_vm._v("关键配置项展示(副本)")]), _vm._v(" "), (props.row.showList) ? _c('el-table', {
          attrs: {
            "data": props.row.showList.copy,
            "stripe": "",
            "border": "",
            "highlight-current-row": ""
          }
        }, [_c('el-table-column', {
          attrs: {
            "prop": "cmd",
            "label": "命令字"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "code",
            "label": "逻辑码"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "name",
            "label": "逻辑名"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "p_code",
            "label": "参数码"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "type",
            "label": "逻辑类型"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "p_name",
            "label": "参数名"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "p_value",
            "label": "参数值"
          }
        })], 1) : _vm._e(), _vm._v(" "), _c('p', {
          staticClass: "ui-mt-20 ui-ta-c",
          staticStyle: {
            "font-size": "16px"
          }
        }, [_vm._v("关键配置项展示(正式)")]), _vm._v(" "), (props.row.showList) ? _c('el-table', {
          attrs: {
            "data": props.row.showList.live,
            "stripe": "",
            "border": "",
            "highlight-current-row": ""
          }
        }, [_c('el-table-column', {
          attrs: {
            "prop": "cmd",
            "label": "命令字"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "code",
            "label": "逻辑码"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "name",
            "label": "逻辑名"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "p_code",
            "label": "参数码"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "type",
            "label": "逻辑类型"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "p_name",
            "label": "参数名"
          }
        }), _vm._v(" "), _c('el-table-column', {
          attrs: {
            "prop": "p_value",
            "label": "参数值"
          }
        })], 1) : _vm._e(), _vm._v(" "), _c('div', {
          staticStyle: {
            "margin-top": "30px"
          }
        }, [_c('el-steps', {
          attrs: {
            "direction": "vertical",
            "space": "80px",
            "active": 1
          }
        }, _vm._l((_vm.logData[props.row.act_id]), function(item, index) {
          return _c('el-step', {
            key: index,
            attrs: {
              "size": "small",
              "icon": "el-icon-info"
            }
          }, [_c('span', {
            attrs: {
              "slot": "title"
            },
            slot: "title"
          }, [_vm._v(_vm._s(item.changeTime + '  ' + item.user_name + '  ' + item.opt_time))]), _vm._v(" "), _c('span', {
            attrs: {
              "slot": "description"
            },
            slot: "description"
          }, [_vm._v(_vm._s(item.description))])])
        }), 1)], 1)]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "act_id",
      "label": "活动号",
      "width": "120"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "crypt",
      "label": "加密号",
      "width": "120"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "act_title",
      "show-overflow-tooltip": "",
      "label": "活动名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "effect_time",
      "label": "生效时间"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "过期时间"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_c('span', {
          domProps: {
            "innerHTML": _vm._s(_vm.deadlineNotify(props.row))
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "status",
      "label": "活动状态",
      "width": "120"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_c('b', {
          staticClass: "color-success"
        }, [_vm._v(_vm._s(_vm.filterStatusText(props.row)))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "width": "130",
      "label": "操作"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_c('el-dropdown', {
          attrs: {
            "size": "small"
          }
        }, [_c('span', {
          staticClass: "el-dropdown-link color-primary",
          staticStyle: {
            "font-size": "12px"
          }
        }, [_vm._v("\n              操作菜单"), _c('i', {
          staticClass: "el-icon-arrow-down el-icon--right"
        })]), _vm._v(" "), _c('el-dropdown-menu', {
          attrs: {
            "slot": "dropdown"
          },
          slot: "dropdown"
        }, [_c('el-dropdown-item', [_c('div', {
          on: {
            "click": function($event) {
              return _vm.$router.push({
                name: 'actEdit',
                params: {
                  act_id: props.row.act_id,
                  status: props.row.status
                }
              })
            }
          }
        }, [_vm._v("编辑活动")])]), _vm._v(" "), _c('el-dropdown-item', {
          attrs: {
            "divided": ""
          }
        }, [_c('div', {
          on: {
            "click": function($event) {
              return _vm.$router.push({
                name: 'chainEdit',
                params: {
                  act_id: props.row.act_id,
                  status: props.row.status,
                  is_draft: 1
                }
              })
            }
          }
        }, [_vm._v("规则配置")])]), _vm._v(" "), (props.row.single_file || props.row.draft_single_file) ? _c('el-dropdown-item', {
          attrs: {
            "divided": ""
          }
        }, [_c('div', {
          on: {
            "click": function($event) {
              return _vm.$router.push({
                name: 'singleEdit',
                params: {
                  act_id: props.row.act_id
                }
              })
            }
          }
        }, [_vm._v("单文件配置")])]) : _vm._e(), _vm._v(" "), (_vm.deploy) ? _c('el-dropdown-item', {
          attrs: {
            "divided": ""
          }
        }, [_c('div', {
          on: {
            "click": function($event) {
              return _vm.manual(props.row)
            }
          }
        }, [_vm._v("同步配置")])]) : _vm._e(), _vm._v(" "), (props.row.is_lego == '1') ? _c('el-dropdown-item', {
          attrs: {
            "divided": ""
          }
        }, [_c('a', {
          attrs: {
            "target": "_blank",
            "href": "javascript:;"
          },
          on: {
            "click": function($event) {
              return _vm.editPageLink(props.row.pageids.length, props.row.crypt, props.row.page_ids)
            }
          }
        }, [_vm._v("编辑页面")])]) : _vm._e(), _vm._v(" "), (props.row.status == 0 && (props.row.creator == _vm.userIds || _vm.isAdmin || props.row.isRevisability)) ? _c('el-dropdown-item', {
          attrs: {
            "divided": ""
          }
        }, [_c('el-button', {
          attrs: {
            "type": "primary"
          },
          on: {
            "click": function($event) {
              return _vm.submitTest(props)
            }
          }
        }, [_vm._v("转测试")])], 1) : _vm._e(), _vm._v(" "), (props.row.status == 1 && _vm.isTester && props.row.isTestOwner) ? _c('el-dropdown-item', {
          attrs: {
            "divided": ""
          }
        }, [_c('el-button', {
          attrs: {
            "type": "primary"
          },
          on: {
            "click": function($event) {
              return _vm.showTestResultDialog(props)
            }
          }
        }, [_vm._v("提交测试结果")])], 1) : _vm._e(), _vm._v(" "), (props.row.status == 2 && (props.row.creator == _vm.userIds || _vm.isAdmin || props.row.isRevisability)) ? _c('el-dropdown-item', {
          attrs: {
            "divided": ""
          }
        }, [_c('el-button', {
          attrs: {
            "type": "primary"
          },
          on: {
            "click": function($event) {
              return _vm.submitApprove(props)
            }
          }
        }, [_vm._v("提交审批")])], 1) : _vm._e(), _vm._v(" "), (props.row.status == 4 && (props.row.creator == _vm.userIds || _vm.isAdmin || props.row.isRevisability)) ? _c('el-dropdown-item', {
          attrs: {
            "divided": ""
          }
        }, [_c('el-button', {
          attrs: {
            "type": "primary"
          },
          on: {
            "click": function($event) {
              return _vm.toPublish(props)
            }
          }
        }, [_vm._v("发布")])], 1) : _vm._e()], 1)], 1)]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.listLoading),
      expression: "!listLoading"
    }],
    staticClass: "ui-mt-20 ui-ta-r"
  }, [_c('el-pagination', {
    attrs: {
      "current-page": _vm.queryData.page,
      "page-size": _vm.queryData.page_size,
      "div": "total, prev, pager, next",
      "total": _vm.total
    },
    on: {
      "current-change": _vm.handleCurrentChange,
      "update:currentPage": function($event) {
        return _vm.$set(_vm.queryData, "page", $event)
      },
      "update:current-page": function($event) {
        return _vm.$set(_vm.queryData, "page", $event)
      }
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "close-on-press-escape": false,
      "title": "测试结果",
      "visible": _vm.dialogTestResultVisible
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogTestResultVisible = $event
      }
    }
  }, [_c('el-form', {
    ref: "testResult",
    attrs: {
      "model": _vm.testResult,
      "rules": _vm.rules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "选择测试结果:",
      "required": "",
      "prop": "results"
    }
  }, [_c('el-radio-group', {
    model: {
      value: (_vm.testResult.results),
      callback: function($$v) {
        _vm.$set(_vm.testResult, "results", $$v)
      },
      expression: "testResult.results"
    }
  }, [_c('el-radio', {
    attrs: {
      "label": "0"
    }
  }, [_vm._v("测试通过")]), _vm._v(" "), _c('el-radio', {
    attrs: {
      "label": "1"
    }
  }, [_vm._v("测试不通过")])], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "测试结果说明:"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.testResult.remark),
      callback: function($$v) {
        _vm.$set(_vm.testResult, "remark", $$v)
      },
      expression: "testResult.remark"
    }
  })], 1)], 1), _vm._v(" "), _c('span', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        return _vm.resetTestResut('testResult')
      }
    }
  }, [_vm._v("暂不提交")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        return _vm.submitTestResult('testResult')
      }
    }
  }, [_vm._v("确认提交")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7bd91023", module.exports)
  }
}

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(14);
var normalizeHeaderName = __webpack_require__(166);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(157);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(157);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })

});
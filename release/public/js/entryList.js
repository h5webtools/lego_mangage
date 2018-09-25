webpackJsonp([4],{

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(11);
var normalizeHeaderName = __webpack_require__(230);

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
    adapter = __webpack_require__(123);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(123);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(122);

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

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_assets_js_util__ = __webpack_require__(210);




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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(9)))

/***/ }),

/***/ 122:
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

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(11);
var settle = __webpack_require__(231);
var buildURL = __webpack_require__(233);
var parseHeaders = __webpack_require__(234);
var isURLSameOrigin = __webpack_require__(235);
var createError = __webpack_require__(124);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(236);

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
      var cookies = __webpack_require__(237);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(232);

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

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 126:
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

/***/ 210:
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

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(228);

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var bind = __webpack_require__(122);
var Axios = __webpack_require__(229);
var defaults = __webpack_require__(103);

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
axios.Cancel = __webpack_require__(126);
axios.CancelToken = __webpack_require__(243);
axios.isCancel = __webpack_require__(125);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(244);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(103);
var utils = __webpack_require__(11);
var InterceptorManager = __webpack_require__(238);
var dispatchRequest = __webpack_require__(239);
var isAbsoluteURL = __webpack_require__(241);
var combineURLs = __webpack_require__(242);

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

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(124);

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

/***/ 232:
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

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

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

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

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

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

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

/***/ 236:
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

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

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

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

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

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);
var transformData = __webpack_require__(240);
var isCancel = __webpack_require__(125);
var defaults = __webpack_require__(103);

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

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(11);

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

/***/ 241:
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

/***/ 242:
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

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(126);

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

/***/ 244:
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

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(26)(
  /* script */
  __webpack_require__(745),
  /* template */
  __webpack_require__(759),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\jyb\\jyb_git\\lego_manage\\web\\pages\\entry\\config\\configApp.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] configApp.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20797183", Component.options)
  } else {
    hotAPI.reload("data-v-20797183", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = getUserGroup;
/* harmony export (immutable) */ __webpack_exports__["c"] = getEntranceConf;
/* harmony export (immutable) */ __webpack_exports__["b"] = getActivityConfig;
/* harmony export (immutable) */ __webpack_exports__["a"] = deleteEntrancePlan;
/* harmony export (immutable) */ __webpack_exports__["d"] = getEntranceDetail;
/* harmony export (immutable) */ __webpack_exports__["h"] = postEntrancePlan;
/* harmony export (immutable) */ __webpack_exports__["j"] = putEntrancePlan;
/* harmony export (immutable) */ __webpack_exports__["e"] = getEntrancePlanList;
/* harmony export (immutable) */ __webpack_exports__["i"] = postEntranceShelves;
/* harmony export (immutable) */ __webpack_exports__["f"] = getIconEntranceDetail;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services__ = __webpack_require__(117);


//用户群列表
function getUserGroup(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/getUserGroup',
    method: 'post',
    data: data
  });
}

//入口配置
function getEntranceConf(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/getEntranceConf',
    method: 'post',
    data: data
  });
}

//拉取活动配置信息 
function getActivityConfig(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/getActivityConfig',
    method: 'post',
    data: data
  });
}

//删除活动计划 
function deleteEntrancePlan(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/deleteEntrancePlan',
    method: 'post',
    data: data
  });
}

//获取入口配置详情
function getEntranceDetail(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/getEntranceDetail',
    method: 'post',
    data: data
  });
}

//修改候补计划
function postEntrancePlan(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/postEntrancePlan',
    method: 'post',
    data: data
  });
}

//增加计划
function putEntrancePlan(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/putEntrancePlan',
    method: 'post',
    data: data
  });
}

//新增候补计划
function getEntrancePlanList(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/getEntrancePlanList',
    method: 'post',
    data: data
  });
}

//下架入口 
function postEntranceShelves(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/postEntranceShelves',
    method: 'post',
    data: data
  });
}

// 获取icon列表
function getIconEntranceDetail(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_services__["a" /* default */])({
    url: '/act/getIconEntranceDetail',
    method: 'post',
    data: data
  });
}

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assets_js_util__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appIndex_vue__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__appIndex_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__appIndex_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configForm_vue__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configForm_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__configForm_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configIcon_vue__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configIcon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__configIcon_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configSlider_vue__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configSlider_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__configSlider_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vue__);
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
//
//










var userGroupOptions = [];

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    appIndex: __WEBPACK_IMPORTED_MODULE_2__appIndex_vue___default.a,
    configForm: __WEBPACK_IMPORTED_MODULE_3__configForm_vue___default.a,
    configIcon: __WEBPACK_IMPORTED_MODULE_4__configIcon_vue___default.a,
    configSlider: __WEBPACK_IMPORTED_MODULE_5__configSlider_vue___default.a
  },
  data: function data() {
    return {
      configFlag: "", //比如：icon:强弹配置
      configIndex: 0,
      configType: "", //类型： 比如九宫格 大图 1+2 轮播图 icon等
      configTitle: "",
      activeUserGroupId: '0', //默认选中
      isOperatorAdmin: userInfo.isOperatorAdmin,
      addSubActForm: {
        plan_type: "",
        plan_id: "",
        entrance_type: "",
        act_id: "",
        begin_at: "",
        end_at: "",
        pic_url: "",
        act_url: "",
        status: "",
        title: "",
        mta_id: "",
        sub_title: "",
        isIndeterminate: true,
        checkAll: false,
        checkedUserGroups: [],
        userGroups: []
      },
      SubActFormRules: {
        begin_at: [{
          type: 'string',
          required: true,
          pattern: /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/,
          message: '请填写投放日期',
          trigger: 'change'
        }],
        end_at: [{
          type: 'string',
          required: true,
          pattern: /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/,
          message: '请填写下线日期',
          trigger: 'change'
        }],
        title: [{ required: true, message: '请填写主标题', trigger: 'change' }],
        sub_title: [{ required: true, message: '请填写副标题', trigger: 'change' }],
        pic_url: [{ required: true, message: '请填写活动图片', trigger: 'change' }],
        act_url: [{ required: true, message: '请填写活动地址', trigger: 'change' }],
        mta_id: [{ required: true, message: '请填写mtaid', trigger: 'change' }],
        checkedUserGroups: [{ required: true, message: '请选择用户群', trigger: 'change' }]
      },
      checkSubActsListVisible: false,
      dialogAddSubActVisible: false,
      formLabelWidth: '120px',
      appIndexData: { //入口信息 九宫格 大banner 1+2区域 轮播区域
        jiugongge: {
          content: []
        },
        banner: {
          content: []
        },
        twoAddOne: {
          content: []
        },
        marquee: {
          content: []
        }
      },
      userGroups: [], //用户群
      subActsList: [],
      actType: {
        1: '候补活动',
        2: '默认活动'
      }
    };
  },
  created: function created() {
    this.queryAppIndexData(); //初始化app首页数据
    this.queryUserGroupList(); //用户群
  },

  methods: {
    filterUserGroupDesc: function filterUserGroupDesc(row) {
      var curGroupDesc = '';
      this.userGroups.forEach(function (item) {
        if (item.group_id == row) {
          curGroupDesc = item.name;
        }
      });
      return curGroupDesc;
    },
    filterActType: function filterActType(row) {
      return this.actType[row.status];
    },
    urlValidCheck: function urlValidCheck(url) {
      //检测url
      var envType = location.origin.indexOf("sit") > -1 ? 0 : 1;
      var sitRegExp = /^https:\/\/cdnsit.jyblife.com/,
          productRegExp = /^https:\/\/cdn.jyblife.com/,
          appRegExp = /^jtjr:\/\//;
      if (envType == 0 && (sitRegExp.test(url) || appRegExp.test(url))) {
        return true;
      } else if (envType == 1 && (productRegExp.test(url) || appRegExp.test(url))) {
        return true;
      } else {
        return true;
      }
    },
    timeValidCheck: function timeValidCheck(beginTime, endTime, effect_time, expire_time) {
      ////检测时间
      if (effect_time && expire_time) {
        //如果时间没有的就不校验
        var startFlag = new Date(beginTime) >= new Date(effect_time),
            endTimeFalg = new Date(endTime) <= new Date(expire_time);
        if (startFlag && endTimeFalg) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    querySubActsList: function querySubActsList() {
      var _this = this;

      //type index
      __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["e" /* getEntrancePlanList */]({
        type: this.configType,
        location: this.configIndex,
        filter: 1
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this.subActsList = jsonData.data.data;
        }
      });
    },
    queryUserGroupList: function queryUserGroupList() {
      var _this2 = this;

      //获取用户群
      __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["g" /* getUserGroup */]({}).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this2.initUserGroupStr(jsonData.data);
        }
      });
    },
    initUserGroupStr: function initUserGroupStr(data) {
      data.forEach(function (element) {
        element.configArr = {
          current_entrance: {},
          waiting_activity: [],
          default_activity: {}
        };
      });
      this.userGroups = data;
      userGroupOptions = data;
    },
    queryAppIndexData: function queryAppIndexData() {
      var _this3 = this;

      //初始化app首页数据
      __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["c" /* getEntranceConf */]().then(function (jsonData) {
        if (jsonData.code == 0) {
          _this3.appIndexData = jsonData.data;
        }
      });
    },
    takeOffCurAct: function takeOffCurAct() {
      var _this4 = this;

      this.$confirm('你确定要下架该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["i" /* postEntranceShelves */]({
          type: _this4.configType,
          location: _this4.configIndex,
          group_id: [_this4.activeUserGroupId]
        }).then(function (jsonData) {
          if (jsonData.code == 0) {
            _this4.$message({
              type: 'success',
              message: '下架成功!'
            });
          } else {
            _this4.$message({
              type: 'error',
              message: jsonData.msg
            });
          }
        });
      }).catch(function () {
        _this4.$message({
          type: 'info',
          message: '已取消下架'
        });
      });
    },
    saveCurAct: function saveCurAct(plan_type, plan_id, index) {
      var _this5 = this;

      //保存用户群下的某个活动的修改 传参为：type location groupid plan_type planid 
      this.$confirm('你确定要修改该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var submitData = {};
        if (plan_type == 1) {
          //候补活动
          submitData = _this5.curActList.waiting_activity[index];
        } else if (plan_type == 2) {
          //默认活动
          submitData = _this5.curActList.default_activity;
        }
        if (!submitData.mta_id || !submitData.act_id || !submitData.act_url || !submitData.pic_url) {
          _this5.$message({
            type: 'error',
            message: '活动信息填写不完整'
          });
          return;
        }

        if (plan_type == 1 && (!submitData.begin_at || !submitData.end_at)) {
          _this5.$message({
            type: 'error',
            message: '投放时间填写不完整'
          });
          return;
        }

        if (!_this5.urlValidCheck(submitData.act_url)) {
          _this5.$message({
            type: 'error',
            message: '跳转地址填写有误'
          });
          return;
        }
        if (plan_type == 1 && !_this5.timeValidCheck(submitData.begin_at, submitData.end_at, submitData.effect_time, submitData.expire_time)) {
          _this5.$message({
            type: 'error',
            message: '投放时间不在活动有效时间段之内'
          });
          return;
        }
        submitData.group_id = [_this5.activeUserGroupId];
        submitData.entrance_type = _this5.configType;
        submitData.location = _this5.configIndex;
        delete submitData.appIndexData;
        __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["h" /* postEntrancePlan */](submitData).then(function (jsonData) {
          if (jsonData.code == 0) {
            _this5.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        });
      }).catch(function () {
        _this5.$message({
          type: 'info',
          message: '已取消保存'
        });
      });
    },
    deleteCurAct: function deleteCurAct(plan_type, plan_id) {
      var _this6 = this;

      // 传参为：type location groupid plan_type planid
      this.$confirm('你确定要删除该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["a" /* deleteEntrancePlan */]({
          type: _this6.configType,
          location: _this6.configIndex,
          group_id: [_this6.activeUserGroupId],
          plan_type: plan_type,
          plan_id: plan_id
        }).then(function (jsonData) {
          if (jsonData.code == 0) {
            _this6.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        });
      }).catch(function () {
        _this6.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitSubAct: function submitSubAct(formName) {
      var _this7 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          _this7.dialogAddSubActVisible = false;
          if (!_this7.urlValidCheck(_this7.addSubActForm.act_url)) {
            _this7.$message({
              type: 'info',
              message: '跳转地址填写有误'
            });
            return;
          }
          if (!_this7.timeValidCheck(_this7.addSubActForm.begin_at, _this7.addSubActForm.end_at, _this7.addSubActForm.effect_time, _this7.addSubActForm.expire_time)) {
            _this7.$message({
              type: 'info',
              message: '投放时间不在活动有效时间段之内'
            });
            return;
          }
          _this7.addSubActForm.plan_type = 1;
          _this7.addSubActForm.location = _this7.configIndex;
          _this7.addSubActForm.entrance_type = _this7.configType;
          _this7.addSubActForm.group_id = _this7.addSubActForm.checkedUserGroups;
          if (!_this7.addSubActForm.plan_id) {
            __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["j" /* putEntrancePlan */](_this7.addSubActForm).then(function (jsonData) {
              if (jsonData.code == 0) {
                _this7.$message({
                  message: '保存成功',
                  type: 'success'
                });
              }
            });
          } else {
            __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["h" /* postEntrancePlan */](_this7.addSubActForm).then(function (jsonData) {
              if (jsonData.code == 0) {
                _this7.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    getActInfo: function getActInfo(actId) {
      var _this8 = this;

      if (!actId) {
        this.$message({
          message: '请先填写活动号',
          type: 'warning'
        });
        return false;
      }
      __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["b" /* getActivityConfig */]({
        act_id: actId
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          var actData = jsonData.data,
              curSubActForm = _this8.addSubActForm;
          curSubActForm.act_url = actData.act_url;
          curSubActForm.effect_time = actData.effect_time;
          curSubActForm.expire_time = actData.expire_time;
          _this8.$message({
            message: '获取活动信息成功',
            type: 'success'
          });
        }
      });
    },
    initNewSubAct: function initNewSubAct() {
      this.addSubActForm = {
        plan_type: "",
        plan_id: "",
        entrance_type: "",
        act_id: "",
        begin_at: "",
        end_at: "",
        pic_url: "",
        act_url: "",
        status: "",
        title: "",
        mta_id: "",
        sub_title: "",
        isIndeterminate: true,
        checkAll: false,
        checkedUserGroups: [],
        userGroups: []
      };
    },
    addNewSubAct: function addNewSubAct() {
      if (this.addSubActForm.plan_type) {
        this.initNewSubAct();
      }
      this.dialogAddSubActVisible = true;
    },
    checkSubActs: function checkSubActs() {
      this.querySubActsList();
      this.checkSubActsListVisible = true;
    },
    editSpecifyAct: function editSpecifyAct(scope) {
      this.dialogAddSubActVisible = true;
      this.checkSubActsListVisible = false;
      Object.assign(this.addSubActForm, scope.row);
      this.addSubActForm.checkedUserGroups = scope.row.group_id;
      this.addSubActForm.plan_type = scope.row.status;
    },
    selectConfig: function selectConfig(flag, index, waitingIndex) {
      var initData = this.userGroups[index].configArr;
      if (flag == 0) {
        //点击的是默认
        initData.current_entrance.selectedstatus = 1;
      } else {
        initData.current_entrance.selectedstatus = 0;
      }
      if (flag == 2) {
        //点击的是默认
        initData.default_activity.selectedstatus = 1;
      } else {
        initData.default_activity.selectedstatus = 0;
      }

      if (flag == 1) {
        initData.waiting_activity && initData.waiting_activity.forEach(function (element, index) {
          if (index == waitingIndex) {
            element.selectedstatus = 1;
          } else {
            element.selectedstatus = 0;
          }
        });
      } else {
        initData.waiting_activity && initData.waiting_activity.forEach(function (element, index) {
          element.selectedstatus = 0;
        });
      }
    },
    queryUserGroupConfig: function queryUserGroupConfig(userGroupName, type, index) {
      var _this9 = this;

      //获取之后加入到用户群对应的数据中
      __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["d" /* getEntranceDetail */]({
        group_id: this.activeUserGroupId,
        type: this.configType,
        location: this.configIndex
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          var curData = jsonData.data;
          _this9.curActList = curData;
          //增加选中态
          _this9.userGroups.forEach(function (element) {
            if (element.group_id == _this9.activeUserGroupId) {
              var _appData = JSON.stringify(_this9.appIndexData);
              element.configArr = curData;
              element.configArr.default_activity.length == 0 ? element.configArr.default_activity = {} : "";
              element.configArr.current_entrance.appIndexData = JSON.parse(_appData);
              __WEBPACK_IMPORTED_MODULE_6_vue___default.a.set(element.configArr.current_entrance, 'selectedstatus', 1);
              element.configArr.default_activity.appIndexData = JSON.parse(_appData);
              __WEBPACK_IMPORTED_MODULE_6_vue___default.a.set(element.configArr.default_activity, 'selectedstatus', 0);
              element.configArr.waiting_activity && element.configArr.waiting_activity.forEach(function (element) {
                element.appIndexData = JSON.parse(_appData);
                __WEBPACK_IMPORTED_MODULE_6_vue___default.a.set(element, 'selectedstatus', 0);
              });
            } else {
              element.configArr = {
                current_entrance: {},
                waiting_activity: [],
                default_activity: {}
              };
            }
          });
        }
      });
    },
    handleCheckAllChange: function handleCheckAllChange(val) {
      var checkedArr = [];
      userGroupOptions.forEach(function (element) {
        checkedArr.push(element.group_id);
      });
      this.addSubActForm.checkedUserGroups = val ? checkedArr : [];
      this.addSubActForm.isIndeterminate = false;
    },
    handlecheckedUserGroupsChange: function handlecheckedUserGroupsChange(value) {
      var checkedCount = value.length;
      console.log(checkedCount, this.userGroups.length);
      this.addSubActForm.checkAll = checkedCount === this.userGroups.length;
      this.addSubActForm.isIndeterminate = checkedCount > 0 && checkedCount < this.userGroups.length;
    },
    handleClick: function handleClick(tab, event) {
      this.queryUserGroupConfig();
    },
    initConfigTitle: function initConfigTitle() {
      //初始化配置标题
      var configIndex = this.configIndex + 1;
      var typeToDesc = {
        icon: "icon配置",
        topbanner: "顶部banner" + configIndex + "配置",
        slider: "轮播位置" + configIndex + "配置",
        festivalbanner: "重大节日配置",
        oneaddtwo: "1+2配置" + configIndex
      };
      this.configTitle = typeToDesc[this.configFlag];
    },

    configApp: function configApp(configFlag, configIndex, configType) {
      this.configFlag = configFlag;
      this.configIndex = configIndex;
      this.configType = configType;
      this.initConfigTitle();
    },
    showDefaultTabConfig: function showDefaultTabConfig() {
      //展示默认的
      var firstTab = document.querySelector('#tab-1');
      firstTab && firstTab.click();
    },
    setAppIndexConfig: function setAppIndexConfig() {
      //appIndex子组件的事件
      this.appIndexData.configFlag; //
      this.configFlag = this.appIndexData.configFlag; //当前配置flag
      this.configIndex = this.appIndexData.configIndex;
      this.configType = this.appIndexData.configType;
      this.initConfigTitle();
      this.showDefaultTabConfig();
    }
  }
});

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(747)
}
var Component = __webpack_require__(26)(
  /* script */
  __webpack_require__(748),
  /* template */
  __webpack_require__(749),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\jyb\\jyb_git\\lego_manage\\web\\pages\\entry\\config\\appIndex.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] appIndex.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a623ce46", Component.options)
  } else {
    hotAPI.reload("data-v-a623ce46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 747:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
  name: "appIndex",
  components: {},
  props: {
    editData: {},
    parentData: {}
  },
  data: function data() {
    return {
      typeDesc: {
        '3': 'jiugongge',
        '22': 'banner',
        '10': 'twoAddOne',
        '9': 'marquee'
      }
    };
  },
  created: function created() {
    if (this.editData.flag == 1) {
      var curData = this.editData.data;
      if (curData && curData[this.typeDesc[this.editData.configtype]] && curData[this.typeDesc[this.editData.configtype]].content) {
        curData[this.typeDesc[this.editData.configtype]].content[this.editData.configindex] = this.editData.config;
      }
    }
  },

  methods: {
    setAppIndexConfig: function setAppIndexConfig(configFlag, index, type) {
      var _parentData = this.parentData.data;
      _parentData.configFlag = configFlag;
      _parentData.configIndex = index;
      _parentData.configType = type;
      this.$emit('setAppIndexConfig');
    }
  }
});

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mg-tp-10 mg-bt-10",
    staticStyle: {
      "font-size": "12px"
    }
  }, [(_vm.editData.data && (_vm.editData.flag == 0 || _vm.editData.configtype == 3 && _vm.editData.flag != 0)) ? _c('el-row', {
    attrs: {
      "gutter": 20
    }
  }, _vm._l((_vm.editData.data.jiugongge.content), function(item, index) {
    return _c('el-col', {
      key: index,
      attrs: {
        "span": 6
      }
    }, [_c('div', {
      staticClass: "up-banner",
      attrs: {
        "index": index
      },
      on: {
        "click": function($event) {
          _vm.setAppIndexConfig('topbanner', index, _vm.editData.data.jiugongge.type)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.pic_url || 'http://placeholder.qiniudn.com/120x120'
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "up-banner__desc"
    }, [_vm._v(_vm._s(item.title || '四个字长'))])])])
  })) : _vm._e(), _vm._v(" "), ((_vm.editData.flag == 0 || _vm.editData.configtype == 3 && _vm.editData.flag != 0)) ? _c('div', {
    staticStyle: {
      "height": "10px",
      "width": "100%",
      "background-color": "#f5f5f5"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.editData.data && (_vm.editData.flag == 0 || (_vm.editData.configtype == 22 && _vm.editData.flag != 0))) ? _c('el-row', {
    staticClass: "mg-tp-10",
    attrs: {
      "gutter": 24
    }
  }, _vm._l((_vm.editData.data.banner.content), function(item, index) {
    return (index == 0) ? _c('el-col', {
      key: index,
      attrs: {
        "span": 24
      }
    }, [_c('div', {
      staticClass: "festival-banner",
      on: {
        "click": function($event) {
          _vm.setAppIndexConfig('festivalbanner', index, _vm.editData.data.banner.type)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.pic_url
      }
    })])]) : _vm._e()
  })) : _vm._e(), _vm._v(" "), (_vm.editData.data && (_vm.editData.flag == 0 || _vm.editData.configtype == 10 && _vm.editData.flag == 1)) ? _c('el-row', {
    staticClass: "mg-tp-10",
    attrs: {
      "gutter": 20
    }
  }, [_vm._l((_vm.editData.data.twoAddOne.content), function(item, index) {
    return (index == 0) ? _c('el-col', {
      key: index,
      attrs: {
        "span": 12
      }
    }, [_c('div', {
      staticClass: "one-inthree-left",
      on: {
        "click": function($event) {
          _vm.setAppIndexConfig('oneaddtwo', index, _vm.editData.data.twoAddOne.type)
        }
      }
    }, [_c('dl', {
      staticClass: "one-inthree__title one-inthree__title-left pd-tp-5"
    }, [_c('dt', [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('dd', [_vm._v(_vm._s(item.sub_title))])]), _vm._v(" "), _c('div', {
      staticClass: "one_three__img"
    }, [_c('img', {
      attrs: {
        "src": item.pic_url
      }
    })])])]) : _vm._e()
  }), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, _vm._l((_vm.editData.data.twoAddOne.content), function(item, index) {
    return (index > 0 && index < 3) ? _c('el-row', {
      key: index,
      attrs: {
        "gutter": 24
      }
    }, [_c('el-col', {
      class: [(index == 2) ? 'pd-tp-6' : ''],
      staticStyle: {
        "padding-left": "0px"
      },
      attrs: {
        "span": 24
      }
    }, [_c('div', {
      staticClass: "one-inthree-right",
      on: {
        "click": function($event) {
          _vm.setAppIndexConfig('oneaddtwo', index, _vm.editData.data.twoAddOne.type)
        }
      }
    }, [_c('dl', {
      staticClass: "one-inthree__title one-inthree__title-right"
    }, [_c('dt', [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('dd', [_vm._v(_vm._s(item.sub_title))])]), _vm._v(" "), _c('img', {
      attrs: {
        "src": item.pic_url
      }
    })])])], 1) : _vm._e()
  }))], 2) : _vm._e(), _vm._v(" "), (_vm.editData.data && (_vm.editData.flag == 0 || _vm.editData.configtype == 9 && _vm.editData.flag == 1)) ? _c('el-row', {
    staticClass: "mg-tp-10",
    attrs: {
      "gutter": 20
    }
  }, [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticClass: "block"
  }, [_c('el-carousel', {
    attrs: {
      "height": "150px"
    }
  }, _vm._l((_vm.editData.data.marquee.content), function(item, index) {
    return _c('el-carousel-item', {
      key: index
    }, [_c('img', {
      attrs: {
        "src": item.pic_url || 'http://placeholder.qiniudn.com/1125x300'
      },
      on: {
        "click": function($event) {
          _vm.setAppIndexConfig('slider', index, _vm.editData.data.marquee.type)
        }
      }
    })])
  }))], 1)])], 1) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a623ce46", module.exports)
  }
}

/***/ }),

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(26)(
  /* script */
  __webpack_require__(751),
  /* template */
  __webpack_require__(752),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\jyb\\jyb_git\\lego_manage\\web\\pages\\entry\\config\\configForm.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] configForm.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7015ad5c", Component.options)
  } else {
    hotAPI.reload("data-v-7015ad5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assets_js_util__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__ = __webpack_require__(646);
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
  name: "configForm",
  components: {},
  props: {
    editData: {},
    parentData: {}
  },
  data: function data() {
    return {
      rules: {
        act_id: [{ required: true, message: '请输入活动号', trigger: 'change' }],
        title: [{ required: true, message: '请输入主标题', trigger: 'change' }],
        sub_title: [{ required: true, message: '请输入副标题', trigger: 'change' }],
        begin_at: [{ type: 'date', required: true, message: '请选择投放开始时间', trigger: 'change' }],
        end_at: [{ type: 'date', required: true, message: '请选择投放下线时间', trigger: 'change' }],
        pic_url: [{ required: true, message: '请填写图片地址', trigger: 'change' }],
        act_url: [{ required: true, message: '请填写跳转地址', trigger: 'change' }],
        mta_id: [{ required: true, message: '请填写mtaid', trigger: 'change' }]
      }
    };
  },
  created: function created() {},

  methods: {
    getActInfo: function getActInfo(actId) {
      var _this = this;

      if (!actId) {
        this.$message({
          message: '请先填写活动号',
          type: 'warning'
        });
        return false;
      }
      __WEBPACK_IMPORTED_MODULE_1_api_api_entry_index__["b" /* getActivityConfig */]({
        act_id: actId
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this.$message({
            message: '获取活动信息成功',
            type: 'success'
          });
          _this.parentData.config.act_url = jsonData.data.act_url;
          _this.parentData.config.effect_time = jsonData.data.effect_time;
          _this.parentData.config.expire_time = jsonData.data.expire_time;
        }
      });
    }
  }
});

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-form', {
    attrs: {
      "model": _vm.parentData.config,
      "rules": _vm.rules,
      "label-width": "120px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "活动号",
      "prop": "act_id"
    }
  }, [_c('el-input', {
    staticClass: "mod-actid-custom",
    attrs: {
      "placeholder": "请输入活动号"
    },
    model: {
      value: (_vm.parentData.config.act_id),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "act_id", $$v)
      },
      expression: "parentData.config.act_id"
    }
  }), _vm._v(" "), _c('el-button', {
    staticClass: "actid-custom__btn",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.getActInfo(_vm.parentData.config.act_id)
      }
    }
  }, [_vm._v("加载配置")])], 1), _vm._v(" "), (_vm.parentData.configType == 10 || _vm.parentData.configType == 3) ? _c('el-form-item', {
    attrs: {
      "label": "主标题",
      "required": "",
      "prop": "title"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "请输入主标题"
    },
    model: {
      value: (_vm.parentData.config.title),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "title", $$v)
      },
      expression: "parentData.config.title"
    }
  }, [_vm._v(_vm._s(_vm.parentData.configType))])], 1) : _vm._e(), _vm._v(" "), (_vm.parentData.configType == 10) ? _c('el-form-item', {
    attrs: {
      "label": "副标题",
      "required": "",
      "prop": "sub_title"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "请输入副标题"
    },
    model: {
      value: (_vm.parentData.config.sub_title),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "sub_title", $$v)
      },
      expression: "parentData.config.sub_title"
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.parentData.actType != 2) ? _c('el-form-item', {
    attrs: {
      "label": "投放开始时间",
      "required": "",
      "prop": "begin_at"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "type": "datetime",
      "value-format": "yyyy-MM-dd HH:mm:ss",
      "placeholder": "选择生效时间"
    },
    model: {
      value: (_vm.parentData.config.begin_at),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "begin_at", $$v)
      },
      expression: "parentData.config.begin_at"
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.parentData.actType != 2) ? _c('el-form-item', {
    attrs: {
      "label": "投放下线时间",
      "required": "",
      "prop": "end_at"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "type": "datetime",
      "value-format": "yyyy-MM-dd HH:mm:ss",
      "placeholder": "选择下线时间"
    },
    model: {
      value: (_vm.parentData.config.end_at),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "end_at", $$v)
      },
      expression: "parentData.config.end_at"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "活动生效时间"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "disabled": true,
      "type": "datetime",
      "placeholder": "活动生效时间"
    },
    model: {
      value: (_vm.parentData.config.effect_time),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "effect_time", $$v)
      },
      expression: "parentData.config.effect_time"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "投放过期时间"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "disabled": true,
      "type": "datetime",
      "placeholder": "活动过期时间"
    },
    model: {
      value: (_vm.parentData.config.expire_time),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "expire_time", $$v)
      },
      expression: "parentData.config.expire_time"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "活动图片",
      "required": "",
      "prop": "pic_url"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "请输入活动图片"
    },
    model: {
      value: (_vm.parentData.config.pic_url),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "pic_url", $$v)
      },
      expression: "parentData.config.pic_url"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "跳转地址",
      "required": "",
      "prop": "act_url"
    }
  }, [_c('el-input', {
    attrs: {
      "disabled": true,
      "placeholder": "请通过活动号拉取跳转地址"
    },
    model: {
      value: (_vm.parentData.config.act_url),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "act_url", $$v)
      },
      expression: "parentData.config.act_url"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "MTAID",
      "required": "",
      "prop": "mta_id"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "请输入MTAID"
    },
    model: {
      value: (_vm.parentData.config.mta_id),
      callback: function($$v) {
        _vm.$set(_vm.parentData.config, "mta_id", $$v)
      },
      expression: "parentData.config.mta_id"
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7015ad5c", module.exports)
  }
}

/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(26)(
  /* script */
  __webpack_require__(754),
  /* template */
  __webpack_require__(755),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\jyb\\jyb_git\\lego_manage\\web\\pages\\entry\\config\\configIcon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] configIcon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7fbd7687", Component.options)
  } else {
    hotAPI.reload("data-v-7fbd7687", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_api_api_entry_index__ = __webpack_require__(646);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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



var cityOptions = [];

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'configIcon',
  components: {},
  props: {
    editData: {},
    parentData: {}
  },
  data: function data() {
    return {
      userGroups: [],
      queryDataFlag: false,
      typeOptions: [{
        value: '0',
        label: '跳转'
      }, {
        value: '1',
        label: '浮层'
      }, {
        value: '2',
        label: '强弹'
      }],
      statusOptions: [{
        value: '0',
        label: '失效'
      }, {
        value: '1',
        label: '生效'
      }],
      ruleForm: {
        icon: {
          type: 2,
          begin_at: '',
          end_at: '',
          status: 1
        },
        pictures: []
      },
      rules: {
        statusvalue: [{
          type: 'text', required: true, message: '请选择展示状态', trigger: 'change'
        }],
        typevalue: [{
          type: 'text', required: true, message: '请选择展示类型', trigger: 'change'
        }],
        begin_at: [{
          type: 'string',
          required: true,
          pattern: /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/,
          message: '请填写投放日期',
          trigger: 'change'
        }],
        end_at: [{
          type: 'string',
          required: true,
          pattern: /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/,
          message: '请填写下线日期',
          trigger: 'change'
        }],
        pic_url: [{ type: 'text', required: true, message: '请填写图片地址', trigger: 'change' }],
        act_url: [{ type: 'text', required: true, message: '请填写跳转地址', trigger: 'change' }],
        mta_id: [{ type: 'text', required: true, message: '请填写mtaid', trigger: 'change' }],
        group_id: [{ type: 'array', required: true, message: '请至少选择一个用户群', trigger: 'change' }],
        act_id: [{ type: 'text', required: true, message: '请输入活动号', trigger: 'change' }]
      },
      cmdTypeMap: {
        0: '常规活动',
        1: '乐高专用'
      }
    };
  },
  created: function created() {
    this.queryUserGroupLists();
  },

  methods: {
    urlValidCheck: function urlValidCheck(url) {
      //检测url
      var envType = location.origin.indexOf('sit') > -1 ? 0 : 1;
      var sitRegExp = /^https:\/\/cdnsit.jyblife.com/,
          productRegExp = /^https:\/\/cdn.jyblife.com/,
          appRegExp = /^jtjr:\/\//;
      if (envType == 0 && (sitRegExp.test(url) || appRegExp.test(url))) {
        return true;
      } else if (envType == 1 && (productRegExp.test(url) || appRegExp.test(url))) {
        return true;
      } else {
        return false;
      }
    },
    timeValidCheck: function timeValidCheck(beginTime, endTime, effect_time, expire_time) {
      ////检测时间
      if (effect_time && expire_time) {
        //如果时间没有的就不校验
        var startFlag = new Date(beginTime) >= new Date(effect_time),
            endTimeFalg = new Date(endTime) <= new Date(expire_time);
        if (startFlag && endTimeFalg) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    filterCmdTypeText: function filterCmdTypeText(row) {
      return this.cmdTypeMap[row.value];
    },

    addNewIconConfig: function addNewIconConfig() {
      var _ruleForm$pictures$pu;

      this.ruleForm.pictures.push((_ruleForm$pictures$pu = {
        'plan_id': '',
        'entrance_type': '',
        'location': '',
        'begin_at': '',
        'end_at': '',
        'expire_time': ''
      }, _defineProperty(_ruleForm$pictures$pu, 'expire_time', ''), _defineProperty(_ruleForm$pictures$pu, 'status', ''), _defineProperty(_ruleForm$pictures$pu, 'title', ''), _defineProperty(_ruleForm$pictures$pu, 'sub_title', ''), _defineProperty(_ruleForm$pictures$pu, 'pic_url', ''), _defineProperty(_ruleForm$pictures$pu, 'act_id', ''), _defineProperty(_ruleForm$pictures$pu, 'group_id', []), _ruleForm$pictures$pu));
    },
    queryAppIndexData: function queryAppIndexData() {
      var _this = this;

      //初始化app首页数据
      __WEBPACK_IMPORTED_MODULE_0_api_api_entry_index__["f" /* getIconEntranceDetail */]().then(function (jsonData) {
        if (jsonData.code == 0) {
          _this.queryDataFlag = true;
          _this.ruleForm = jsonData.data;
        }
      });
    },
    queryUserGroupLists: function queryUserGroupLists() {
      var _this2 = this;

      //获取用户群
      if (this.queryDataFlag) {
        return;
      }
      __WEBPACK_IMPORTED_MODULE_0_api_api_entry_index__["g" /* getUserGroup */]({
        scope: "operative"
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this2.userGroups = jsonData.data;
          _this2.queryAppIndexData();
        }
      });
    },

    getActInfo: function getActInfo(index) {
      var _this3 = this;

      var curIconList = this.ruleForm.pictures[index];
      var actId = curIconList.act_id;
      if (!actId) {
        this.$message({
          message: '请先填写活动号',
          type: 'warning'
        });
        return false;
      }
      __WEBPACK_IMPORTED_MODULE_0_api_api_entry_index__["b" /* getActivityConfig */]({
        act_id: actId
      }).then(function (jsonData) {
        if (jsonData.code == 0) {
          _this3.$message({
            message: '获取活动信息成功',
            type: 'success'
          });
          curIconList.act_url = jsonData.data.act_url;
          curIconList.effect_time = jsonData.data.effect_time;
          curIconList.expire_time = jsonData.data.expire_time;
        }
      });
    },
    saveIconConfig: function saveIconConfig(index) {
      var _this4 = this;

      this.$confirm('确认保存该配置修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var submitData = _this4.ruleForm.pictures[index];
        if (!submitData.begin_at || !submitData.end_at) {
          _this4.$message({
            type: 'error',
            message: '必须选择投放和下线时间'
          });
          return;
        }
        if (submitData.group_id.length == 0) {
          _this4.$message({
            type: 'error',
            message: '未选择用户群'
          });
          return;
        }
        if (!_this4.urlValidCheck(submitData.act_url)) {
          _this4.$message({
            type: 'error',
            message: '跳转地址填写有误'
          });
          return;
        }
        if (!_this4.timeValidCheck(submitData.begin_at, submitData.end_at, submitData.effect_time, submitData.expire_time)) {
          _this4.$message({
            type: 'error',
            message: '投放时间不在活动有效时间段之内'
          });
          return;
        }
        if (submitData.location) {
          __WEBPACK_IMPORTED_MODULE_0_api_api_entry_index__["h" /* postEntrancePlan */](submitData).then(function (jsonData) {
            if (jsonData.code == 0) {
              _this4.$message({
                message: '修改成功',
                type: 'success'
              });
            }
          });
        } else {
          __WEBPACK_IMPORTED_MODULE_0_api_api_entry_index__["j" /* putEntrancePlan */](submitData).then(function (jsonData) {
            if (jsonData.code == 0) {
              _this4.$message({
                message: '增加成功',
                type: 'success'
              });
            }
          });
        }
      }).catch(function () {
        _this4.$message({
          type: 'info',
          message: '取消保存'
        });
      });
    },
    takeOffCurAct: function takeOffCurAct(item) {
      var _this5 = this;

      this.$confirm('你确定要下架该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        __WEBPACK_IMPORTED_MODULE_0_api_api_entry_index__["i" /* postEntranceShelves */]({
          type: '0',
          location: item.location,
          group_id: item.group_id,
          plan_id: item.plan_id
        }).then(function (jsonData) {
          if (jsonData.code == 0) {
            _this5.$message({
              type: 'success',
              message: '下架成功!'
            });
          } else {
            _this5.$message({
              type: 'error',
              message: jsonData.msg
            });
          }
        });
      }).catch(function () {
        _this5.$message({
          type: 'info',
          message: '已取消下架'
        });
      });
    },

    deleteAppointCon: function deleteAppointCon(index) {
      this.ruleForm.pictures.splice(index - 0, 1);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    },
    deleteIconConfig: function deleteIconConfig(index) {
      var _this6 = this;

      this.$confirm('确认删除该配置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var submitData = _this6.ruleForm.pictures[index];
        if (!submitData.plan_id) {
          _this6.deleteAppointCon(index);
        } else {
          __WEBPACK_IMPORTED_MODULE_0_api_api_entry_index__["a" /* deleteEntrancePlan */]({
            group_id: submitData.group_id,
            plan_id: submitData.plan_id
          }).then(function (jsonData) {
            if (jsonData.code == 0) {
              _this6.deleteAppointCon(index);
            }
          });
        }
      }).catch(function () {
        _this6.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    }
  }
});

/***/ }),

/***/ 755:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-col', {
    attrs: {
      "span": 16
    }
  }, [_c('el-form', {
    ref: _vm.ruleForm.icon,
    attrs: {
      "model": _vm.ruleForm.icon,
      "rules": _vm.rules,
      "label-width": "120px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "类型",
      "prop": "typevalue"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.ruleForm.icon.type),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm.icon, "type", $$v)
      },
      expression: "ruleForm.icon.type"
    }
  }, _vm._l((_vm.typeOptions), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "生效时间",
      "prop": "begin_at"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "value-format": "yyyy-MM-dd HH:mm:ss",
      "type": "datetime",
      "placeholder": "选择日期时间"
    },
    model: {
      value: (_vm.ruleForm.icon.begin_at),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm.icon, "begin_at", $$v)
      },
      expression: "ruleForm.icon.begin_at"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "失效时间",
      "prop": "end_at"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "value-format": "yyyy-MM-dd HH:mm:ss",
      "type": "datetime",
      "placeholder": "选择日期时间"
    },
    model: {
      value: (_vm.ruleForm.icon.end_at),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm.icon, "end_at", $$v)
      },
      expression: "ruleForm.icon.end_at"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "状态",
      "prop": "statusvalue"
    }
  }, [_c('el-select', {
    attrs: {
      "formatter": _vm.filterCmdTypeText,
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.ruleForm.icon.status),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm.icon, "status", $$v)
      },
      expression: "ruleForm.icon.status"
    }
  }, _vm._l((_vm.statusOptions), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "mod-icon-title"
  }, [_c('h4', {
    staticClass: "textleft pd-tp-20 actconfig__title"
  }, [_vm._v("ICON配置")]), _vm._v(" "), _c('div', {
    staticClass: "mod-add-newconfig"
  }, [_c('el-button', {
    staticClass: "mt-lt-16 ",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.addNewIconConfig()
      }
    }
  }, [_vm._v("新增配置")])], 1)]), _vm._v(" "), _vm._l((_vm.ruleForm.pictures), function(item, index) {
    return _c('div', {
      key: item.act_url,
      ref: item,
      refInFor: true,
      staticClass: "mod-newconfig-item",
      attrs: {
        "model": item,
        "rules": _vm.rules,
        "index": index
      }
    }, [_c('div', {
      staticClass: "mod-save-icon"
    }, [_c('el-button', {
      staticClass: "mt-lt-16",
      attrs: {
        "type": "primary"
      },
      on: {
        "click": function($event) {
          _vm.saveIconConfig(index)
        }
      }
    }, [_vm._v("保存")])], 1), _vm._v(" "), (item.status != 2) ? _c('div', {
      staticClass: "mod-delete-icon"
    }, [_c('el-button', {
      staticClass: "mt-lt-4",
      attrs: {
        "type": "danger"
      },
      on: {
        "click": function($event) {
          _vm.deleteIconConfig(index)
        }
      }
    }, [_vm._v("删除")])], 1) : _vm._e(), _vm._v(" "), (item.status == 2) ? _c('div', {
      staticClass: "mod-delete-icon"
    }, [_c('el-button', {
      staticClass: "mt-lt-4",
      attrs: {
        "type": "danger"
      },
      on: {
        "click": function($event) {
          _vm.takeOffCurAct(item)
        }
      }
    }, [_vm._v("下架")])], 1) : _vm._e(), _vm._v(" "), _c('el-form-item', {
      staticClass: "pd-tp-20",
      staticStyle: {
        "width": "82%"
      },
      attrs: {
        "label": "活动号"
      }
    }, [_c('el-input', {
      staticClass: "mod-actid-custom",
      attrs: {
        "placeholder": "请输入活动号"
      },
      model: {
        value: (item.act_id),
        callback: function($$v) {
          _vm.$set(item, "act_id", $$v)
        },
        expression: "item.act_id"
      }
    }), _vm._v(" "), _c('el-button', {
      staticClass: "actid-custom__btn",
      attrs: {
        "type": "primary"
      },
      on: {
        "click": function($event) {
          _vm.getActInfo(index)
        }
      }
    }, [_vm._v("加载配置")])], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "投放开始时间",
        "prop": "begin_at"
      }
    }, [_c('el-date-picker', {
      attrs: {
        "value-format": "yyyy-MM-dd HH:mm:ss",
        "type": "datetime",
        "placeholder": "选择日期时间"
      },
      model: {
        value: (item.begin_at),
        callback: function($$v) {
          _vm.$set(item, "begin_at", $$v)
        },
        expression: "item.begin_at"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "投放下线时间",
        "prop": "end_at"
      }
    }, [_c('el-date-picker', {
      attrs: {
        "value-format": "yyyy-MM-dd HH:mm:ss",
        "type": "datetime",
        "placeholder": "选择日期时间"
      },
      model: {
        value: (item.end_at),
        callback: function($$v) {
          _vm.$set(item, "end_at", $$v)
        },
        expression: "item.end_at"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "活动生效时间"
      }
    }, [_c('el-date-picker', {
      attrs: {
        "disabled": true,
        "value-format": "yyyy-MM-dd HH:mm:ss",
        "type": "datetime",
        "placeholder": "活动生效时间"
      },
      model: {
        value: (item.effect_time),
        callback: function($$v) {
          _vm.$set(item, "effect_time", $$v)
        },
        expression: "item.effect_time"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "活动过期时间"
      }
    }, [_c('el-date-picker', {
      attrs: {
        "disabled": true,
        "value-format": "yyyy-MM-dd HH:mm:ss",
        "type": "datetime",
        "placeholder": "活动过期时间"
      },
      model: {
        value: (item.expire_time),
        callback: function($$v) {
          _vm.$set(item, "expire_time", $$v)
        },
        expression: "item.expire_time"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "活动图片",
        "prop": "pic_url"
      }
    }, [_c('el-input', {
      attrs: {
        "placeholder": "请输入活动图片"
      },
      model: {
        value: (item.pic_url),
        callback: function($$v) {
          _vm.$set(item, "pic_url", $$v)
        },
        expression: "item.pic_url"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "跳转地址",
        "prop": "act_url"
      }
    }, [_c('el-input', {
      attrs: {
        "disabled": true,
        "placeholder": "请通过活动号拉取跳转地址"
      },
      model: {
        value: (item.act_url),
        callback: function($$v) {
          _vm.$set(item, "act_url", $$v)
        },
        expression: "item.act_url"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "MTAID",
        "prop": "mta_id"
      }
    }, [_c('el-input', {
      attrs: {
        "placeholder": "请输入MTAID"
      },
      model: {
        value: (item.mta_id),
        callback: function($$v) {
          _vm.$set(item, "mta_id", $$v)
        },
        expression: "item.mta_id"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "适用用户群"
      }
    }, [_c('el-select', {
      attrs: {
        "filterable": "",
        "multiple": "",
        "placeholder": "请选择"
      },
      model: {
        value: (item.group_id),
        callback: function($$v) {
          _vm.$set(item, "group_id", $$v)
        },
        expression: "item.group_id"
      }
    }, _vm._l((_vm.userGroups), function(item, index) {
      return _c('el-option', {
        key: index,
        attrs: {
          "label": item.name,
          "value": item.group_id
        }
      }, [_c('span', {
        staticStyle: {
          "float": "left"
        }
      }, [_vm._v(_vm._s(item.name))])])
    }))], 1)], 1)
  })], 2)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "el-col-border",
    attrs: {
      "span": 8
    }
  }, [_c('el-carousel', {
    attrs: {
      "interval": 4000,
      "type": "card",
      "height": "200px"
    }
  }, _vm._l((_vm.ruleForm.pictures), function(item) {
    return _c('el-carousel-item', {
      key: item.act_id
    }, [_c('img', {
      attrs: {
        "src": item.pic_url
      }
    })])
  }))], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7fbd7687", module.exports)
  }
}

/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(26)(
  /* script */
  __webpack_require__(757),
  /* template */
  __webpack_require__(758),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\jyb\\jyb_git\\lego_manage\\web\\pages\\entry\\config\\configSlider.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] configSlider.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24bd196f", Component.options)
  } else {
    hotAPI.reload("data-v-24bd196f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
  name: "configSlider",
  components: {},
  props: {
    editData: {},
    parentData: {}
  },
  data: function data() {
    return {
      options: [{
        value: '选项1',
        label: '展示'
      }, {
        value: '选项2',
        label: '强制展示'
      }, {
        value: '选项3',
        label: '强制不展示'
      }],
      value: '',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    };
  },
  created: function created() {},

  methods: {
    addSlider: function addSlider() {
      this.editData.len += 1;
    }
  }
});

/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-form', {
    ref: "ruleForm",
    attrs: {
      "model": _vm.ruleForm,
      "rules": _vm.rules,
      "label-width": "120px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "是否展示",
      "prop": "name"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.value),
      callback: function($$v) {
        _vm.value = $$v
      },
      expression: "value"
    }
  }, _vm._l((_vm.options), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "最小版本",
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "输入兼容的最低app版本"
    },
    model: {
      value: (_vm.ruleForm.name),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "name", $$v)
      },
      expression: "ruleForm.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "最大版本",
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "输入兼容的最高app版本"
    },
    model: {
      value: (_vm.ruleForm.name),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "name", $$v)
      },
      expression: "ruleForm.name"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "mod-icon-title"
  }, [_c('h4', {
    staticClass: "textleft pd-tp-20 actconfig__title"
  }, [_vm._v("轮播配置")]), _vm._v(" "), _c('div', {
    staticClass: "mod-add-newconfig"
  }, [_c('el-button', {
    staticClass: "mt-lt-16 ",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.addSlider()
      }
    }
  }, [_vm._v("新增轮播配置")])], 1)]), _vm._v(" "), _vm._l((_vm.editData.len), function(item) {
    return _c('div', {
      key: item,
      staticClass: "mod-newconfig-item"
    }, [_c('div', {
      staticClass: "mod-delete-icon"
    }, [_c('el-button', {
      staticClass: "mt-lt-16",
      attrs: {
        "type": "danger"
      }
    }, [_vm._v("删除该配置")]), _vm._v(" "), _c('i', {
      staticClass: "el-icon-arrow-up",
      attrs: {
        "title": "上移"
      }
    }), _vm._v(" "), _c('i', {
      staticClass: "el-icon-arrow-down",
      attrs: {
        "title": "下移"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      staticClass: "pd-tp-20",
      staticStyle: {
        "width": "82%"
      },
      attrs: {
        "label": "活动号",
        "prop": "name"
      }
    }, [_c('el-input', {
      staticClass: "mod-actid-custom",
      attrs: {
        "placeholder": "请输入活动号"
      },
      model: {
        value: (_vm.ruleForm.name),
        callback: function($$v) {
          _vm.$set(_vm.ruleForm, "name", $$v)
        },
        expression: "ruleForm.name"
      }
    }), _vm._v(" "), _c('el-button', {
      staticClass: "actid-custom__btn",
      attrs: {
        "type": "primary"
      }
    }, [_vm._v("加载配置")])], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "投放开始时间",
        "prop": "name"
      }
    }, [_c('el-date-picker', {
      attrs: {
        "type": "datetime",
        "placeholder": "选择日期时间"
      },
      model: {
        value: (_vm.ruleForm.date1),
        callback: function($$v) {
          _vm.$set(_vm.ruleForm, "date1", $$v)
        },
        expression: "ruleForm.date1"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "投放下线时间",
        "prop": "name"
      }
    }, [_c('el-date-picker', {
      attrs: {
        "type": "datetime",
        "placeholder": "选择日期时间"
      },
      model: {
        value: (_vm.ruleForm.date1),
        callback: function($$v) {
          _vm.$set(_vm.ruleForm, "date1", $$v)
        },
        expression: "ruleForm.date1"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "活动图片",
        "prop": "name"
      }
    }, [_c('el-input', {
      attrs: {
        "placeholder": "请输入活动图片"
      },
      model: {
        value: (_vm.ruleForm.name),
        callback: function($$v) {
          _vm.$set(_vm.ruleForm, "name", $$v)
        },
        expression: "ruleForm.name"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "跳转地址",
        "prop": "name"
      }
    }, [_c('el-input', {
      attrs: {
        "placeholder": "请输入跳转地址"
      },
      model: {
        value: (_vm.ruleForm.name),
        callback: function($$v) {
          _vm.$set(_vm.ruleForm, "name", $$v)
        },
        expression: "ruleForm.name"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "MTAID",
        "prop": "name"
      }
    }, [_c('el-input', {
      attrs: {
        "placeholder": "请输入MTAID"
      },
      model: {
        value: (_vm.ruleForm.mtaid),
        callback: function($$v) {
          _vm.$set(_vm.ruleForm, "mtaid", $$v)
        },
        expression: "ruleForm.mtaid"
      }
    })], 1), _vm._v(" "), _c('el-form-item', {
      attrs: {
        "label": "适用用户群",
        "prop": "name"
      }
    }, [_c('el-select', {
      attrs: {
        "placeholder": "请选择"
      },
      model: {
        value: (_vm.value),
        callback: function($$v) {
          _vm.value = $$v
        },
        expression: "value"
      }
    }, _vm._l((_vm.options), function(item) {
      return _c('el-option', {
        key: item.value,
        attrs: {
          "label": item.label,
          "value": item.value
        }
      })
    }))], 1)], 1)
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24bd196f", module.exports)
  }
}

/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-row', {
    attrs: {
      "gutter": 24
    }
  }, [_c('el-col', {
    staticClass: "el-col-border el-col-width",
    attrs: {
      "span": 6
    }
  }, [_c('el-row', {
    attrs: {
      "gutter": 20
    }
  }, [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticClass: "mod-icon-banner",
    on: {
      "click": function($event) {
        _vm.configApp('icon', 0)
      }
    }
  }, [_c('img', {
    attrs: {
      "src": "http://images.jyblife.com//inner/icon_config_40_40.png"
    }
  })])])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "10px",
      "width": "100%",
      "background-color": "#f5f5f5"
    }
  }), _vm._v(" "), _c('appIndex', {
    attrs: {
      "parentData": {
        data: _vm.appIndexData,
        flag: 0,
        configindex: _vm.configIndex,
        configtype: _vm.configType
      },
      "editData": {
        data: _vm.appIndexData,
        flag: 0,
        configindex: _vm.configIndex,
        configtype: _vm.configType
      }
    },
    on: {
      "setAppIndexConfig": function($event) {
        _vm.setAppIndexConfig()
      }
    }
  })], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 17
    }
  }, [(_vm.configFlag && (_vm.configFlag != 'icon' || _vm.configFlag != 'slider')) ? _c('h3', {
    staticClass: "textleft pd-tp-7 actconfig__title"
  }, [_vm._v(_vm._s(_vm.configTitle))]) : _vm._e(), _vm._v(" "), (_vm.configFlag && _vm.configFlag != 'icon') ? _c('div', {
    staticClass: "mod-act-manager"
  }, [_c('el-button', {
    staticClass: "mt-lt-16",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.addNewSubAct
    }
  }, [_vm._v("新增候补活动")]), _vm._v(" "), _c('el-button', {
    staticClass: "mt-lt-16",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.checkSubActs
    }
  }, [_vm._v("查看候补活动")])], 1) : _vm._e(), _vm._v(" "), (_vm.configFlag == 'icon') ? _c('el-row', {
    staticClass: "mod-actrule mg-tp-20",
    attrs: {
      "gutter": 20
    }
  }, [_c('config-icon')], 1) : _vm._e(), _vm._v(" "), (_vm.configFlag && (_vm.configFlag == 'topbanner' || _vm.configFlag == 'oneaddtwo' || _vm.configFlag == 'slider' || _vm.configFlag == 'festivalbanner')) ? _c('el-tabs', {
    attrs: {
      "type": "card"
    },
    on: {
      "tab-click": _vm.handleClick
    },
    model: {
      value: (_vm.activeUserGroupId),
      callback: function($$v) {
        _vm.activeUserGroupId = $$v
      },
      expression: "activeUserGroupId"
    }
  }, _vm._l((_vm.userGroups), function(item, index) {
    return _c('el-tab-pane', {
      key: item.group_id,
      attrs: {
        "index": index,
        "label": item.name,
        "name": item.group_id
      }
    }, [_c('el-row', {
      class: [item.configArr.current_entrance.selectedstatus == 1 ? 'mod-actrule  mod-actrule--selected' : 'mod-actrule'],
      attrs: {
        "gutter": 20
      },
      on: {
        "click": function($event) {
          _vm.selectConfig(0, index)
        }
      }
    }, [_c('h4', {
      staticClass: "textleft actconfig__title",
      on: {
        "click": function($event) {
          _vm.selectConfig(0, index)
        }
      }
    }, [_vm._v("当前活动")]), _vm._v(" "), _c('div', {
      staticClass: "mod-delete-act"
    }, [(_vm.isOperatorAdmin) ? _c('el-button', {
      staticClass: "mt-lt-16",
      attrs: {
        "type": "primary"
      },
      on: {
        "click": _vm.takeOffCurAct
      }
    }, [_vm._v("下架当前活动")]) : _vm._e()], 1), _vm._v(" "), _c('el-col', {
      attrs: {
        "span": 16
      }
    }, [_c('configForm', {
      attrs: {
        "parentData": {
          config: item.configArr.current_entrance,
          configType: _vm.configType
        },
        "editData": {
          config: item.configArr.current_entrance,
          configType: _vm.configType
        }
      }
    })], 1), _vm._v(" "), (item.configArr.current_entrance.appIndexData) ? _c('el-col', {
      staticClass: "el-col-border mod-app-index",
      attrs: {
        "span": 8
      }
    }, [_c('appIndex', {
      staticStyle: {
        "transform": "scale(0.9, 0.9)"
      },
      attrs: {
        "parentData": {
          data: item.configArr.current_entrance.appIndexData,
          flag: 1,
          configindex: _vm.configIndex,
          configtype: _vm.configType,
          config: item.configArr.current_entrance
        },
        "editData": {
          data: item.configArr.current_entrance.appIndexData,
          flag: 1,
          configindex: _vm.configIndex,
          configtype: _vm.configType,
          config: item.configArr.current_entrance
        }
      }
    })], 1) : _vm._e()], 1), _vm._v(" "), _c('div', {
      staticStyle: {
        "height": "20px"
      }
    }), _vm._v(" "), _vm._l((item.configArr.waiting_activity), function(waitingItem, watingIndex) {
      return [_c('el-row', {
        key: waitingItem.act_id + watingIndex,
        class: [waitingItem.selectedstatus == 1 ? 'mod-actrule  mod-actrule--selected' : 'mod-actrule'],
        attrs: {
          "gutter": 20
        },
        on: {
          "click": function($event) {
            _vm.selectConfig(1, index, watingIndex)
          }
        }
      }, [_c('h4', {
        staticClass: "textleft actconfig__title",
        on: {
          "click": function($event) {
            _vm.selectConfig(1, index, watingIndex)
          }
        }
      }, [_vm._v("后补活动" + _vm._s(watingIndex + 1))]), _vm._v(" "), _c('div', {
        staticClass: "mod-delete-act"
      }, [_c('el-button', {
        staticClass: "mt-lt-16",
        attrs: {
          "type": "primary"
        },
        on: {
          "click": function($event) {
            _vm.saveCurAct(1, waitingItem.plan_id, watingIndex)
          }
        }
      }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
        staticClass: "mt-lt-16",
        attrs: {
          "type": "danger"
        },
        on: {
          "click": function($event) {
            _vm.deleteCurAct(1, waitingItem.plan_id, watingIndex)
          }
        }
      }, [_vm._v("删除该后补活动")])], 1), _vm._v(" "), _c('el-col', {
        attrs: {
          "span": 16
        }
      }, [_c('configForm', {
        attrs: {
          "parentData": {
            config: waitingItem,
            configType: _vm.configType
          },
          "editData": {
            config: waitingItem,
            configType: _vm.configType
          }
        }
      })], 1), _vm._v(" "), (waitingItem.appIndexData) ? _c('el-col', {
        staticClass: "el-col-border mod-app-index",
        attrs: {
          "span": 8
        }
      }, [_c('appIndex', {
        staticStyle: {
          "transform": "scale(0.9, 0.9)"
        },
        attrs: {
          "parentData": {
            data: waitingItem.appIndexData,
            flag: 1,
            configindex: _vm.configIndex,
            configtype: _vm.configType,
            config: waitingItem
          },
          "editData": {
            data: waitingItem.appIndexData,
            flag: 1,
            configindex: _vm.configIndex,
            configtype: _vm.configType,
            config: waitingItem
          }
        }
      })], 1) : _vm._e()], 1), _vm._v(" "), _c('div', {
        key: waitingItem.act_id + watingIndex + 1,
        staticStyle: {
          "height": "20px"
        }
      })]
    }), _vm._v(" "), _c('el-row', {
      class: [item.configArr.default_activity.selectedstatus == 1 ? 'mod-actrule  mod-actrule--selected' : 'mod-actrule'],
      attrs: {
        "gutter": 20
      },
      on: {
        "click": function($event) {
          _vm.selectConfig(2, index)
        }
      }
    }, [_c('h4', {
      staticClass: "textleft actconfig__title",
      on: {
        "click": function($event) {
          _vm.selectConfig(2, index)
        }
      }
    }, [_vm._v("默认活动")]), _vm._v(" "), _c('div', {
      staticClass: "mod-delete-act"
    }, [(_vm.isOperatorAdmin) ? _c('el-button', {
      staticClass: "mt-lt-16",
      attrs: {
        "type": "primary"
      },
      on: {
        "click": function($event) {
          _vm.saveCurAct(2, '')
        }
      }
    }, [_vm._v("保存")]) : _vm._e()], 1), _vm._v(" "), _c('el-col', {
      attrs: {
        "span": 16
      }
    }, [_c('configForm', {
      attrs: {
        "parentData": {
          config: item.configArr.default_activity,
          configType: _vm.configType,
          actType: 2
        },
        "editData": {
          config: item.configArr.default_activity,
          configType: _vm.configType,
          actType: 2
        }
      }
    })], 1), _vm._v(" "), (item.configArr.default_activity.appIndexData) ? _c('el-col', {
      staticClass: "el-col-border",
      attrs: {
        "span": 8
      }
    }, [_c('appIndex', {
      staticStyle: {
        "transform": "scale(0.9, 0.9)"
      },
      attrs: {
        "parentData": {
          data: item.configArr.default_activity.appIndexData,
          flag: 1,
          configindex: _vm.configIndex,
          configtype: _vm.configType,
          config: item.configArr.default_activity
        },
        "editData": {
          data: item.configArr.default_activity.appIndexData,
          flag: 1,
          configindex: _vm.configIndex,
          configtype: _vm.configType,
          config: item.configArr.default_activity
        }
      }
    })], 1) : _vm._e()], 1), _vm._v(" "), _c('div', {
      staticStyle: {
        "height": "20px"
      }
    })], 2)
  })) : _vm._e()], 1)], 1), _vm._v(" "), _c('el-dialog', {
    staticClass: "el-dialog__title el-dialog__title_weigth",
    attrs: {
      "title": "查看/编辑候补活动",
      "visible": _vm.checkSubActsListVisible
    },
    on: {
      "update:visible": function($event) {
        _vm.checkSubActsListVisible = $event
      }
    }
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "height": "400",
      "border": "",
      "data": _vm.subActsList
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "title",
      "label": "活动标题",
      "width": "150"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "begin_at",
      "label": "生效时间",
      "width": "150"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "group_id",
      "label": "用户群"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return _vm._l((scope.row.group_id), function(item) {
          return _c('el-tag', {
            key: item,
            staticStyle: {
              "margin-left": "5px"
            }
          }, [_vm._v(_vm._s(_vm.filterUserGroupDesc(item)))])
        })
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "actaction",
      "label": "操作",
      "width": "70"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.editSpecifyAct(scope)
            }
          }
        }, [_vm._v("编辑")])]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-dialog', {
    staticClass: "el-dialog__title el-dialog__title_weigth",
    attrs: {
      "title": "新增/编辑候补活动",
      "visible": _vm.dialogAddSubActVisible
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogAddSubActVisible = $event
      }
    }
  }, [_c('el-form', {
    ref: "addSubActForm",
    attrs: {
      "model": _vm.addSubActForm,
      "SubActFormRules": _vm.SubActFormRules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "活动号：",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    staticStyle: {
      "width": "70%"
    },
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.addSubActForm.act_id),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "act_id", $$v)
      },
      expression: "addSubActForm.act_id"
    }
  }), _vm._v(" "), _c('el-button', {
    staticClass: "actid-custom__btn",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.getActInfo(_vm.addSubActForm.act_id)
      }
    }
  }, [_vm._v("加载配置")])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "投放时间：",
      "prop": "begin_at",
      "required": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-date-picker', {
    attrs: {
      "value-format": "yyyy-MM-dd HH:mm:ss",
      "type": "datetime",
      "placeholder": "选择日期时间"
    },
    model: {
      value: (_vm.addSubActForm.begin_at),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "begin_at", $$v)
      },
      expression: "addSubActForm.begin_at"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "下线时间：",
      "prop": "end_at",
      "required": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-date-picker', {
    attrs: {
      "type": "datetime",
      "value-format": "yyyy-MM-dd HH:mm:ss",
      "placeholder": "选择日期时间"
    },
    model: {
      value: (_vm.addSubActForm.end_at),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "end_at", $$v)
      },
      expression: "addSubActForm.end_at"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "开始时间：",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-date-picker', {
    attrs: {
      "disabled": true,
      "value-format": "yyyy-MM-dd HH:mm:ss",
      "type": "datetime",
      "placeholder": "活动开始时间"
    },
    model: {
      value: (_vm.addSubActForm.effect_time),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "effect_time", $$v)
      },
      expression: "addSubActForm.effect_time"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "过期时间：",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-date-picker', {
    attrs: {
      "disabled": true,
      "type": "datetime",
      "value-format": "yyyy-MM-dd HH:mm:ss",
      "placeholder": "活动过期时间"
    },
    model: {
      value: (_vm.addSubActForm.expire_time),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "expire_time", $$v)
      },
      expression: "addSubActForm.expire_time"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "活动图片：",
      "prop": "pic_url",
      "required": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "请输入活动图片"
    },
    model: {
      value: (_vm.addSubActForm.pic_url),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "pic_url", $$v)
      },
      expression: "addSubActForm.pic_url"
    }
  })], 1), _vm._v(" "), (_vm.configType == 10 || _vm.configType == 3) ? _c('el-form-item', {
    attrs: {
      "label": "主标题：",
      "prop": "title",
      "required": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "请输入活动主标题"
    },
    model: {
      value: (_vm.addSubActForm.title),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "title", $$v)
      },
      expression: "addSubActForm.title"
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.configType == 10) ? _c('el-form-item', {
    attrs: {
      "label": "副标题：",
      "prop": "sub_title",
      "required": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "请输入活动副标题"
    },
    model: {
      value: (_vm.addSubActForm.sub_title),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "sub_title", $$v)
      },
      expression: "addSubActForm.sub_title"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "跳转地址：",
      "prop": "act_url",
      "required": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    attrs: {
      "disabled": true,
      "placeholder": "请通过活动号拉取跳转地址"
    },
    model: {
      value: (_vm.addSubActForm.act_url),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "act_url", $$v)
      },
      expression: "addSubActForm.act_url"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "MTAID",
      "prop": "mta_id",
      "required": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "请输入MTAID"
    },
    model: {
      value: (_vm.addSubActForm.mta_id),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "mta_id", $$v)
      },
      expression: "addSubActForm.mta_id"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "生效用户群：",
      "prop": "checkedUserGroups",
      "required": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-checkbox', {
    attrs: {
      "indeterminate": _vm.addSubActForm.isIndeterminate
    },
    on: {
      "change": _vm.handleCheckAllChange
    },
    model: {
      value: (_vm.addSubActForm.checkAll),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "checkAll", $$v)
      },
      expression: "addSubActForm.checkAll"
    }
  }, [_vm._v("全选")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin": "15px 0"
    }
  }), _vm._v(" "), _c('el-checkbox-group', {
    on: {
      "change": _vm.handlecheckedUserGroupsChange
    },
    model: {
      value: (_vm.addSubActForm.checkedUserGroups),
      callback: function($$v) {
        _vm.$set(_vm.addSubActForm, "checkedUserGroups", $$v)
      },
      expression: "addSubActForm.checkedUserGroups"
    }
  }, _vm._l((_vm.userGroups), function(city, index) {
    return _c('el-checkbox', {
      key: city.group_id,
      class: [(index % 3 == 0) ? 'mg-lt-0' : ''],
      staticStyle: {
        "width": "200px",
        "margin-left": "10px"
      },
      attrs: {
        "label": city.group_id,
        "index": index
      }
    }, [_vm._v(_vm._s(city.name))])
  }))], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.dialogAddSubActVisible = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.submitSubAct('addSubActForm')
      }
    }
  }, [_vm._v("确 定")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-20797183", module.exports)
  }
}

/***/ })

});
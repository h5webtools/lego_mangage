webpackJsonp([7],{14:function(e,t,r){"use strict";function n(e){return"[object Array]"===D.call(e)}function a(e){return"[object ArrayBuffer]"===D.call(e)}function o(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function l(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===D.call(e)}function f(e){return"[object File]"===D.call(e)}function d(e){return"[object Blob]"===D.call(e)}function h(e){return"[object Function]"===D.call(e)}function m(e){return l(e)&&h(e.pipe)}function g(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function y(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function v(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function w(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||n(e)||(e=[e]),n(e))for(var r=0,a=e.length;r<a;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}function b(){function e(e,r){"object"==typeof t[r]&&"object"==typeof e?t[r]=b(t[r],e):t[r]=e}for(var t={},r=0,n=arguments.length;r<n;r++)w(arguments[r],e);return t}function x(e,t,r){return w(t,function(t,n){e[n]=r&&"function"==typeof t?_(t,r):t}),e}var _=r(153),D=Object.prototype.toString;e.exports={isArray:n,isArrayBuffer:a,isFormData:o,isArrayBufferView:i,isString:s,isNumber:u,isObject:l,isUndefined:c,isDate:p,isFile:f,isBlob:d,isFunction:h,isStream:m,isURLSearchParams:g,isStandardBrowserEnv:v,forEach:w,merge:b,extend:x,trim:y}},152:function(e,t,r){"use strict";function n(e,t){if(0===arguments.length)return null;var r=t||"{y}-{m}-{d} {h}:{i}:{s}",n=void 0;"object"==(void 0===e?"undefined":u(e))?n=e:(10===(""+e).length&&(e=1e3*parseInt(e)),n=new Date(e));var a={y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate(),h:n.getHours(),i:n.getMinutes(),s:n.getSeconds(),a:n.getDay()};return r.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var r=a[t];return"a"===t?["一","二","三","四","五","六","日"][r-1]:(e.length>0&&r<10&&(r="0"+r),r||0)})}function a(e){return e.replace(/\s*/g,"")}function o(e,t){var r=arguments[1]||window.location.search.replace("&amp;","&"),n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=r.substr(r.indexOf("?")+1).match(n);return null!=a?a[2]:""}function i(e,t){for(var r=0;r<e.length;r++)if(e[r]==t)return!0;return!1}function s(e){var t=new RegExp("(^| )"+e+"(?:=([^;]*))?(;|$)"),r=document.cookie.match(t);return r?r[2]?unescape(r[2]):"":null}t.d=n,t.e=a,t.c=o,t.a=i,t.b=s;var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}},153:function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},154:function(e,t,r){"use strict";(function(t){var n=r(14),a=r(164),o=r(166),i=r(167),s=r(168),u=r(155),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||r(169);e.exports=function(e){return new Promise(function(l,p){var f=e.data,d=e.headers;n.isFormData(f)&&delete d["Content-Type"];var h=new XMLHttpRequest,m="onreadystatechange",g=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||s(e.url)||(h=new window.XDomainRequest,m="onload",g=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var y=e.auth.username||"",v=e.auth.password||"";d.Authorization="Basic "+c(y+":"+v)}if(h.open(e.method.toUpperCase(),o(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[m]=function(){if(h&&(4===h.readyState||g)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in h?i(h.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?h.response:h.responseText,n={data:r,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:t,config:e,request:h};a(l,p,n),h=null}},h.onerror=function(){p(u("Network Error",e)),h=null},h.ontimeout=function(){p(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED")),h=null},n.isStandardBrowserEnv()){var w=r(170),b=(e.withCredentials||s(e.url))&&e.xsrfCookieName?w.read(e.xsrfCookieName):void 0;b&&(d[e.xsrfHeaderName]=b)}if("setRequestHeader"in h&&n.forEach(d,function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(e){if("json"!==h.responseType)throw e}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),p(e),h=null)}),void 0===f&&(f=null),h.send(f)})}}).call(t,r(7))},155:function(e,t,r){"use strict";var n=r(165);e.exports=function(e,t,r,a){var o=new Error(e);return n(o,t,r,a)}},156:function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},157:function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},159:function(e,t,r){"use strict";(function(e){var n=r(160),a=r.n(n),o=r(68),i=(r.n(o),r(152)),s=a.a.create({baseURL:e.env.BASE_API,timeout:6e4,headers:{"Content-Type":"application/x-www-form-urlencoded"}});s.interceptors.request.use(function(e){return e.headers["x-csrf-token"]=i.b("csrfToken"),e},function(e){console.log(e),Promise.reject(e)}),s.interceptors.response.use(function(e){var t=e.data.code;return"1601000014"==t||"1601000013"==t?(Object(o.Message)({message:e.data.msg,type:"error",duration:3e3}),location.replace("/login?redirect="+encodeURIComponent(location.href)),Promise.reject()):0!=t?(Object(o.Message)({message:e.data.msg,type:"error",duration:3e3}),e.data):e.data},function(e){return console.log("err"+e),Object(o.Message)({message:e.message,type:"error",duration:5e3}),Promise.reject(e)}),t.a=s}).call(t,r(7))},160:function(e,t,r){e.exports=r(161)},161:function(e,t,r){"use strict";function n(e){var t=new i(e),r=o(i.prototype.request,t);return a.extend(r,i.prototype,t),a.extend(r,t),r}var a=r(14),o=r(153),i=r(162),s=r(69),u=n(s);u.Axios=i,u.create=function(e){return n(a.merge(s,e))},u.Cancel=r(157),u.CancelToken=r(176),u.isCancel=r(156),u.all=function(e){return Promise.all(e)},u.spread=r(177),e.exports=u,e.exports.default=u},162:function(e,t,r){"use strict";function n(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var a=r(69),o=r(14),i=r(171),s=r(172),u=r(174),c=r(175);n.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),e=o.merge(a,this.defaults,{method:"get"},e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url));var t=[s,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},o.forEach(["delete","get","head"],function(e){n.prototype[e]=function(t,r){return this.request(o.merge(r||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){n.prototype[e]=function(t,r,n){return this.request(o.merge(n||{},{method:e,url:t,data:r}))}}),e.exports=n},163:function(e,t,r){"use strict";var n=r(14);e.exports=function(e,t){n.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})}},164:function(e,t,r){"use strict";var n=r(155);e.exports=function(e,t,r){var a=r.config.validateStatus;r.status&&a&&!a(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r)):e(r)}},165:function(e,t,r){"use strict";e.exports=function(e,t,r,n){return e.config=t,r&&(e.code=r),e.response=n,e}},166:function(e,t,r){"use strict";function n(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var a=r(14);e.exports=function(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(a.isURLSearchParams(t))o=t.toString();else{var i=[];a.forEach(t,function(e,t){null!==e&&void 0!==e&&(a.isArray(e)&&(t+="[]"),a.isArray(e)||(e=[e]),a.forEach(e,function(e){a.isDate(e)?e=e.toISOString():a.isObject(e)&&(e=JSON.stringify(e)),i.push(n(t)+"="+n(e))}))}),o=i.join("&")}return o&&(e+=(-1===e.indexOf("?")?"?":"&")+o),e}},167:function(e,t,r){"use strict";var n=r(14);e.exports=function(e){var t,r,a,o={};return e?(n.forEach(e.split("\n"),function(e){a=e.indexOf(":"),t=n.trim(e.substr(0,a)).toLowerCase(),r=n.trim(e.substr(a+1)),t&&(o[t]=o[t]?o[t]+", "+r:r)}),o):o}},168:function(e,t,r){"use strict";var n=r(14);e.exports=n.isStandardBrowserEnv()?function(){function e(e){var t=e;return r&&(a.setAttribute("href",t),t=a.href),a.setAttribute("href",t),{href:a.href,protocol:a.protocol?a.protocol.replace(/:$/,""):"",host:a.host,search:a.search?a.search.replace(/^\?/,""):"",hash:a.hash?a.hash.replace(/^#/,""):"",hostname:a.hostname,port:a.port,pathname:"/"===a.pathname.charAt(0)?a.pathname:"/"+a.pathname}}var t,r=/(msie|trident)/i.test(navigator.userAgent),a=document.createElement("a");return t=e(window.location.href),function(r){var a=n.isString(r)?e(r):r;return a.protocol===t.protocol&&a.host===t.host}}():function(){return function(){return!0}}()},169:function(e,t,r){"use strict";function n(){this.message="String contains an invalid character"}function a(e){for(var t,r,a=String(e),i="",s=0,u=o;a.charAt(0|s)||(u="=",s%1);i+=u.charAt(63&t>>8-s%1*8)){if((r=a.charCodeAt(s+=.75))>255)throw new n;t=t<<8|r}return i}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=a},170:function(e,t,r){"use strict";var n=r(14);e.exports=n.isStandardBrowserEnv()?function(){return{write:function(e,t,r,a,o,i){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(a)&&s.push("path="+a),n.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},171:function(e,t,r){"use strict";function n(){this.handlers=[]}var a=r(14);n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){a.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=n},172:function(e,t,r){"use strict";function n(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var a=r(14),o=r(173),i=r(156),s=r(69);e.exports=function(e){return n(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=a.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),a.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return n(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(n(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},173:function(e,t,r){"use strict";var n=r(14);e.exports=function(e,t,r){return n.forEach(r,function(r){e=r(e,t)}),e}},174:function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},175:function(e,t,r){"use strict";e.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}},176:function(e,t,r){"use strict";function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new a(e),t(r.reason))})}var a=r(157);n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n(function(t){e=t}),cancel:e}},e.exports=n},177:function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},219:function(e,t,r){var n=r(45)(r(344),r(346),null,null,null);n.options.__file="/Users/chenchao/Documents/git_workspace/lego_manage/app/web/pages/lego/pages/listApp.vue",n.esModule&&Object.keys(n.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] listApp.vue: functional components are not supported with templates, they should use render functions."),e.exports=n.exports},344:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(345);t.default={data:function(){return{total:0,queryData:{pageIndex:1,pageOwner:window.userInfo.userAccount,pageSize:20,pageName:"",createRange:[],expireTime:"",pageActId:""},tableData:[],listLoading:!1,pageType:{1:"通用模板",2:"可分享模板",3:"支付模板"}}},created:function(){this.queryActPage(!0)},filters:{filterOldPath:function(e){return e.replace("https://cdn.jyblife.com/act/pagemaker/","").replace(/\//,"")}},methods:{queryActPage:function(e){var t=this;this.listLoading=!0,n.a(this.queryData).then(function(r){t.listLoading=!1,0==r.code&&(t.tableData=r.data.page_list,t.queryData.pageOwner=r.data.current_user,e&&(t.total=r.data.total_count,t.queryData.pageIndex=1))})},handleCurrentChange:function(e){this.queryData.pageIndex=e,this.queryActPage(!1)},filterPageType:function(e,t,r){return this.pageType[r]}}}},345:function(e,t,r){"use strict";function n(e){return Object(a.a)({url:"/lego/getActPageList",method:"post",data:e})}t.a=n;var a=r(159)},346:function(e,t,r){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"martop20"},[r("el-form",{attrs:{inline:!0,"label-width":"130px"}},[r("el-form-item",{attrs:{label:"活动创建人："}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.queryData.pageOwner,callback:function(t){e.$set(e.queryData,"pageOwner",t)},expression:"queryData.pageOwner"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"活动名称："}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.queryData.pageName,callback:function(t){e.$set(e.queryData,"pageName",t)},expression:"queryData.pageName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"活动号："}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.queryData.pageActId,callback:function(t){e.$set(e.queryData,"pageActId",t)},expression:"queryData.pageActId"}})],1)],1),e._v(" "),r("el-form",{attrs:{inline:!0,"label-width":"130px"}},[r("el-form-item",{attrs:{label:"创建日期范围："}},[r("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.queryData.createRange,callback:function(t){e.$set(e.queryData,"createRange",t)},expression:"queryData.createRange"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"活动过期时间："}},[r("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"活动过期时间"},model:{value:e.queryData.expireTime,callback:function(t){e.$set(e.queryData,"expireTime",t)},expression:"queryData.expireTime"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.queryActPage}},[e._v("查询")])],1)],1),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.tableData,"empty-text":"当前用户暂时没有创建活动",stripe:"",border:"","highlight-current-row":""}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-form",{attrs:{"label-width":"150px"}},[r("el-form-item",{attrs:{label:"最近修改时间："}},[r("span",[e._v(e._s(t.row.page_editdate))])]),e._v(" "),r("el-form-item",{attrs:{label:"页面过期时间："}},[r("span",[e._v(e._s(t.row.page_editdate))])]),e._v(" "),r("el-form-item",{attrs:{label:"集成测试："}},[r("a",{staticClass:"color-primary",staticStyle:{"font-size":"14px","font-weight":"bold","text-decoration":"underline"},attrs:{target:"_blank",href:"https://cdnsit.jyblife.com/act/"+t.row.date_folder+"/"+t.row.page_path.replace("https://cdn.jyblife.com/act/pagemaker/","").replace(/\//,"")+"/index.html?act_id="+(t.row.page_act_id||"")}},[e._v("https://cdnsit.jyblife.com/act/"+e._s(t.row.date_folder)+"/"+e._s(e._f("filterOldPath")(t.row.page_path))+"/index.html")])]),e._v(" "),r("el-form-item",{attrs:{label:"正式环境："}},[r("a",{staticClass:"color-primary",staticStyle:{"font-size":"14px","font-weight":"bold","text-decoration":"underline"},attrs:{target:"_blank",href:"https://cdn.jyblife.com/act/"+t.row.date_folder+"/"+t.row.page_path.replace("https://cdn.jyblife.com/act/pagemaker/","").replace(/\//,"")+"/index.html?act_id="+(t.row.page_act_id||"")}},[e._v("https://cdn.jyblife.com/act/"+e._s(t.row.date_folder)+"/"+e._s(e._f("filterOldPath")(t.row.page_path))+"/index.html")])])],1)]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"page_id",width:"80",label:"页面ID"}}),e._v(" "),r("el-table-column",{attrs:{prop:"page_author",width:"100",label:"创建人"}}),e._v(" "),r("el-table-column",{attrs:{prop:"page_act_id",label:"关联活动号"}}),e._v(" "),r("el-table-column",{attrs:{prop:"page_name","min-width":"180",label:"活动名称"}}),e._v(" "),r("el-table-column",{attrs:{prop:"page_type",label:"模板类型",formatter:e.filterPageType}}),e._v(" "),r("el-table-column",{attrs:{prop:"last_save_erp",label:"最近修改人"}}),e._v(" "),r("el-table-column",{attrs:{prop:"page_createdate","min-width":"160",label:"页面创建时间"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("a",{staticClass:"color-primary",attrs:{target:"_blank",href:"/lego/editPage?page_id="+t.row.page_id+"&act_id="+(t.row.page_act_id||"")}},[e._v("编辑页面")])]}}])})],1),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"martop20"},[r("el-pagination",{attrs:{"current-page":e.queryData.pageIndex,"page-size":e.queryData.pageSize,layout:"total, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.queryData,"pageIndex",t)}}})],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},69:function(e,t,r){"use strict";(function(t){function n(e,t){!a.isUndefined(e)&&a.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a=r(14),o=r(163),i=/^\)\]\}',?\n/,s={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=r(154):void 0!==t&&(e=r(154)),e}(),transformRequest:[function(e,t){return o(t,"Content-Type"),a.isFormData(e)||a.isArrayBuffer(e)||a.isStream(e)||a.isFile(e)||a.isBlob(e)?e:a.isArrayBufferView(e)?e.buffer:a.isURLSearchParams(e)?(n(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):a.isObject(e)?(n(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(i,"");try{e=JSON.parse(e)}catch(e){}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},a.forEach(["delete","get","head"],function(e){u.headers[e]={}}),a.forEach(["post","put","patch"],function(e){u.headers[e]=a.merge(s)}),e.exports=u}).call(t,r(7))}});
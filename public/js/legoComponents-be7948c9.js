webpackJsonp([11],{103:function(e,t,n){"use strict";(function(t){function r(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=n(11),a=n(230),i=/^\)\]\}',?\n/,s={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(123):void 0!==t&&(e=n(123)),e}(),transformRequest:[function(e,t){return a(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(i,"");try{e=JSON.parse(e)}catch(e){}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){u.headers[e]={}}),o.forEach(["post","put","patch"],function(e){u.headers[e]=o.merge(s)}),e.exports=u}).call(t,n(9))},11:function(e,t,n){"use strict";function r(e){return"[object Array]"===_.call(e)}function o(e){return"[object ArrayBuffer]"===_.call(e)}function a(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function l(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===_.call(e)}function d(e){return"[object File]"===_.call(e)}function f(e){return"[object Blob]"===_.call(e)}function m(e){return"[object Function]"===_.call(e)}function h(e){return l(e)&&m(e.pipe)}function g(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function y(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function b(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function v(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(null,e[a],a,e)}function w(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=w(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function x(e,t,n){return v(t,function(t,r){e[r]=n&&"function"==typeof t?D(t,n):t}),e}var D=n(122),_=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isFormData:a,isArrayBufferView:i,isString:s,isNumber:u,isObject:l,isUndefined:c,isDate:p,isFile:d,isBlob:f,isFunction:m,isStream:h,isURLSearchParams:g,isStandardBrowserEnv:b,forEach:v,merge:w,extend:x,trim:y}},117:function(e,t,n){"use strict";(function(e){var r=n(227),o=n.n(r),a=n(104),i=(n.n(a),n(210)),s=o.a.create({baseURL:e.env.BASE_API,timeout:6e4,headers:{"Content-Type":"application/x-www-form-urlencoded"}});s.interceptors.request.use(function(e){return e.headers["x-csrf-token"]=i.b("csrfToken"),e},function(e){console.log(e),Promise.reject(e)}),s.interceptors.response.use(function(e){var t=e.data.code;return"1601000014"==t||"1601000013"==t?(Object(a.Message)({message:e.data.msg,type:"error",duration:3e3}),location.replace("/login"),Promise.reject()):0!=t?(Object(a.Message)({message:e.data.msg,type:"error",duration:3e3}),e.data):e.data},function(e){return console.log("err"+e),Object(a.Message)({message:e.message,type:"error",duration:5e3}),Promise.reject(e)}),t.a=s}).call(t,n(9))},122:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},123:function(e,t,n){"use strict";(function(t){var r=n(11),o=n(231),a=n(233),i=n(234),s=n(235),u=n(124),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(236);e.exports=function(e){return new Promise(function(l,p){var d=e.data,f=e.headers;r.isFormData(d)&&delete f["Content-Type"];var m=new XMLHttpRequest,h="onreadystatechange",g=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in m||s(e.url)||(m=new window.XDomainRequest,h="onload",g=!0,m.onprogress=function(){},m.ontimeout=function(){}),e.auth){var y=e.auth.username||"",b=e.auth.password||"";f.Authorization="Basic "+c(y+":"+b)}if(m.open(e.method.toUpperCase(),a(e.url,e.params,e.paramsSerializer),!0),m.timeout=e.timeout,m[h]=function(){if(m&&(4===m.readyState||g)&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in m?i(m.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?m.response:m.responseText,r={data:n,status:1223===m.status?204:m.status,statusText:1223===m.status?"No Content":m.statusText,headers:t,config:e,request:m};o(l,p,r),m=null}},m.onerror=function(){p(u("Network Error",e)),m=null},m.ontimeout=function(){p(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED")),m=null},r.isStandardBrowserEnv()){var v=n(237),w=(e.withCredentials||s(e.url))&&e.xsrfCookieName?v.read(e.xsrfCookieName):void 0;w&&(f[e.xsrfHeaderName]=w)}if("setRequestHeader"in m&&r.forEach(f,function(e,t){void 0===d&&"content-type"===t.toLowerCase()?delete f[t]:m.setRequestHeader(t,e)}),e.withCredentials&&(m.withCredentials=!0),e.responseType)try{m.responseType=e.responseType}catch(e){if("json"!==m.responseType)throw e}"function"==typeof e.onDownloadProgress&&m.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&m.upload&&m.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){m&&(m.abort(),p(e),m=null)}),void 0===d&&(d=null),m.send(d)})}}).call(t,n(9))},124:function(e,t,n){"use strict";var r=n(232);e.exports=function(e,t,n,o){var a=new Error(e);return r(a,t,n,o)}},125:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},126:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},210:function(e,t,n){"use strict";function r(e,t){if(0===arguments.length)return null;var n=t||"{y}-{m}-{d} {h}:{i}:{s}",r=void 0;"object"==(void 0===e?"undefined":u(e))?r=e:(10===(""+e).length&&(e=1e3*parseInt(e)),r=new Date(e));var o={y:r.getFullYear(),m:r.getMonth()+1,d:r.getDate(),h:r.getHours(),i:r.getMinutes(),s:r.getSeconds(),a:r.getDay()};return n.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var n=o[t];return"a"===t?["一","二","三","四","五","六","日"][n-1]:(e.length>0&&n<10&&(n="0"+n),n||0)})}function o(e){return e.replace(/\s*/g,"")}function a(e,t){var n=arguments[1]||window.location.search.replace("&amp;","&"),r=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=n.substr(n.indexOf("?")+1).match(r);return null!=o?o[2]:""}function i(e,t){for(var n=0;n<e.length;n++)if(e[n]==t)return!0;return!1}function s(e){var t=new RegExp("(^| )"+e+"(?:=([^;]*))?(;|$)"),n=document.cookie.match(t);return n?n[2]?unescape(n[2]):"":null}t.d=r,t.e=o,t.c=a,t.a=i,t.b=s;var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}},227:function(e,t,n){e.exports=n(228)},228:function(e,t,n){"use strict";function r(e){var t=new i(e),n=a(i.prototype.request,t);return o.extend(n,i.prototype,t),o.extend(n,t),n}var o=n(11),a=n(122),i=n(229),s=n(103),u=r(s);u.Axios=i,u.create=function(e){return r(o.merge(s,e))},u.Cancel=n(126),u.CancelToken=n(243),u.isCancel=n(125),u.all=function(e){return Promise.all(e)},u.spread=n(244),e.exports=u,e.exports.default=u},229:function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var o=n(103),a=n(11),i=n(238),s=n(239),u=n(241),c=n(242);r.prototype.request=function(e){"string"==typeof e&&(e=a.merge({url:arguments[0]},arguments[1])),e=a.merge(o,this.defaults,{method:"get"},e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url));var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},a.forEach(["delete","get","head"],function(e){r.prototype[e]=function(t,n){return this.request(a.merge(n||{},{method:e,url:t}))}}),a.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(a.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},230:function(e,t,n){"use strict";var r=n(11);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},231:function(e,t,n){"use strict";var r=n(124);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n)):e(n)}},232:function(e,t,n){"use strict";e.exports=function(e,t,n,r){return e.config=t,n&&(e.code=n),e.response=r,e}},233:function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(11);e.exports=function(e,t,n){if(!t)return e;var a;if(n)a=n(t);else if(o.isURLSearchParams(t))a=t.toString();else{var i=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))}))}),a=i.join("&")}return a&&(e+=(-1===e.indexOf("?")?"?":"&")+a),e}},234:function(e,t,n){"use strict";var r=n(11);e.exports=function(e){var t,n,o,a={};return e?(r.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(a[t]=a[t]?a[t]+", "+n:n)}),a):a}},235:function(e,t,n){"use strict";var r=n(11);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},236:function(e,t,n){"use strict";function r(){this.message="String contains an invalid character"}function o(e){for(var t,n,o=String(e),i="",s=0,u=a;o.charAt(0|s)||(u="=",s%1);i+=u.charAt(63&t>>8-s%1*8)){if((n=o.charCodeAt(s+=.75))>255)throw new r;t=t<<8|n}return i}var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=o},237:function(e,t,n){"use strict";var r=n(11);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,a,i){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(a)&&s.push("domain="+a),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},238:function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(11);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},239:function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(11),a=n(240),i=n(125),s=n(103);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=a(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return r(e),t.data=a(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(r(e),t&&t.response&&(t.response.data=a(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},240:function(e,t,n){"use strict";var r=n(11);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},241:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},242:function(e,t,n){"use strict";e.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}},243:function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(126);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},244:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},611:function(e,t,n){var r=n(26)(n(738),n(739),null,null,null);r.options.__file="/Users/daizhiming/work/lego_manage/web/pages/lego/components/listApp.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] listApp.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},651:function(e,t,n){"use strict";function r(e){return Object(c.a)({url:"/lego/getComponentList",method:"post",data:e})}function o(e){return Object(c.a)({url:"/lego/saveComponent",method:"post",data:e})}function a(e){return Object(c.a)({url:"/lego/updateComponent",method:"post",data:e})}function i(e){return Object(c.a)({url:"/lego/getSelectedComponentStyles",method:"post",data:{comid:e}})}function s(e){return Object(c.a)({url:"/lego/saveComponentStyle",method:"post",data:e})}function u(e){return Object(c.a)({url:"/lego/updateComponentStyle",method:"post",data:e})}t.a=r,t.c=o,t.e=a,t.b=i,t.d=s,t.f=u;var c=n(117)},738:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(651);t.default={data:function(){return{listLoading:!1,dialogVisible:!1,dialogLoading:!1,tableData:[],showSubRoute:!1,queryData:{pageSize:20,pageIndex:1,order:"",orderby:"",cname:"",ctype:""},comTypeMap:{0:"隐藏",1:"推广组件",2:"运营活动组件",3:"通用组件",4:"消费线组件"},total:0,templateData:{modname:"",moddesc:"",modpathkey:"",modthumb:"",modgroupzu:"",modgroup:0},rules:{modname:[{required:!0,message:"请输入组件名",trigger:"blur"}],moddesc:[{required:!0,message:"请输入组件描述",trigger:"blur"}],modpathkey:[{required:!0,validator:function(e,t,n){/^[a-z]*$/g.test(t)?n():n(new Error("key值必须为小写字母"))},message:"组件key值必须为小写字母组成",trigger:"blur"}],modthumb:[{required:!0,message:"请输入组件缩略图",trigger:"blur"}],component_group:[{required:!0,message:"请选择组件分组",trigger:"blur"}]}}},watch:{$route:function(e){this.showSubRoute="componentList"!=e.name}},created:function(){this.showSubRoute="componentList"!=this.$route.name,this.showSubRoute||this.queryFilterList(!0)},methods:{queryFilterList:function(e){var t=this;this.listLoading=!0,r.a(this.queryData).then(function(n){t.listLoading=!1,0==n.code?(t.tableData=n.data.component_list,e&&(t.total=n.data.total_count,t.queryData.pageIndex=1)):t.$message.error(n.msg)})},handleCurrentChange:function(e){this.queryData.page=e,this.queryFilterList(!1)},queryByCondition:function(){this.queryData.page=1,this.queryFilterList(!0)},editCom:function(e){this.templateData.modname=e.tb_name,this.templateData.moddesc=e.tb_desc,this.templateData.modpathkey=e.path_key,this.templateData.modthumb=e.tb_thumb,this.templateData.modgroupzu=String(e.component_group),this.templateData.uniqueid=e.id,this.templateData.modgroup=0,this.dialogVisible=!0},configComStyle:function(e){this.$router.push("/lego/componentStyleList/"+e.id)},addNewCom:function(){this.templateData.modname="",this.templateData.moddesc="",this.templateData.modpathkey="",this.templateData.modthumb="",this.templateData.modgroupzu="",this.templateData.modgroup=0,this.templateData.uniqueid="",this.dialogVisible=!0},cancleAddCom:function(){this.dialogVisible=!1},filterComTypeText:function(e){return this.comTypeMap[e.component_group]},confirmAddCom:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var n=!!t.templateData.uniqueid;(n?r.e:r.c)(t.templateData).then(function(e){0==e.code?(t.$message({message:n?"更新组件成功":"保存组件成功",type:"success"}),t.queryFilterList(!1),t.dialogVisible=!1):t.$message.error(e.msg)})})}}}},739:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.showSubRoute?n("router-view"):n("div",{staticClass:"martop20"},[n("el-form",{attrs:{inline:!0}},[n("el-form-item",{attrs:{label:"组件关键字："}},[n("el-input",{attrs:{placeholder:"请输入"},model:{value:e.queryData.cname,callback:function(t){e.$set(e.queryData,"cname",t)},expression:"queryData.cname"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"组件类型："}},[n("el-select",{attrs:{clearable:""},model:{value:e.queryData.ctype,callback:function(t){e.$set(e.queryData,"ctype",t)},expression:"queryData.ctype"}},e._l(e.comTypeMap,function(e,t){return n("el-option",{key:t,attrs:{value:t,label:e}})}))],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.queryByCondition}},[n("i",{staticClass:"glyphicon glyphicon-search"}),e._v("查询")]),e._v(" "),n("el-button",{attrs:{type:"success"},on:{click:function(t){e.addNewCom("rule")}}},[n("i",{staticClass:"glyphicon glyphicon-plus"}),e._v("新增组件")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.tableData,stripe:"",border:"","highlight-current-row":""}},[n("el-table-column",{attrs:{prop:"id",label:"组件ID",width:"90"}}),e._v(" "),n("el-table-column",{attrs:{prop:"path_key",label:"组件关键字","min-width":"130"}}),e._v(" "),n("el-table-column",{attrs:{prop:"tb_name",label:"组件名称","min-width":"140"}}),e._v(" "),n("el-table-column",{attrs:{label:"组件缩略图",width:"120"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("img",{attrs:{src:e.row.tb_thumb}})]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"component_group",formatter:e.filterComTypeText,label:"组件类型",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{prop:"create_date",label:"创建时间","min-width":"150"}}),e._v(" "),n("el-table-column",{attrs:{prop:"edit_date",label:"编辑时间","min-width":"150"}}),e._v(" "),n("el-table-column",{attrs:{prop:"tb_desc",label:"组件描述","min-width":"130"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){e.editCom(t.row)}}},[e._v("修改组件")]),e._v(" "),n("router-link",{attrs:{to:{name:"componentStyleList",params:{componentId:t.row.id}}}},[n("el-button",{attrs:{type:"text"}},[e._v("管理样式")])],1)]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"martop20"},[n("el-pagination",{attrs:{"current-page":e.queryData.pageIndex,"page-size":e.queryData.pageSize,layout:"total, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.queryData,"pageIndex",t)}}})],1)],1),e._v(" "),n("el-dialog",{attrs:{"lock-scroll":"","close-on-click-modal":!1,title:"新增/编辑组件",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[e.dialogVisible?n("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogLoading,expression:"dialogLoading"}],ref:"templateData",attrs:{"label-width":"80px",rules:e.rules,model:e.templateData}},[n("el-form-item",{attrs:{label:"名称",required:"",prop:"modname"}},[n("el-input",{attrs:{placeholder:"建议中文字符"},model:{value:e.templateData.modname,callback:function(t){e.$set(e.templateData,"modname","string"==typeof t?t.trim():t)},expression:"templateData.modname"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"key",required:"",prop:"modpathkey"}},[n("el-input",{attrs:{placeholder:"建议用小写字母"},model:{value:e.templateData.modpathkey,callback:function(t){e.$set(e.templateData,"modpathkey","string"==typeof t?t.trim():t)},expression:"templateData.modpathkey"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"缩略图",required:"",prop:"modthumb"}},[n("el-input",{attrs:{placeholder:"输入图片地址"},model:{value:e.templateData.modthumb,callback:function(t){e.$set(e.templateData,"modthumb","string"==typeof t?t.trim():t)},expression:"templateData.modthumb"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"组件类型",required:"",prop:"modgroupzu"}},[n("el-select",{attrs:{placeholder:"请选择组件类型"},model:{value:e.templateData.modgroupzu,callback:function(t){e.$set(e.templateData,"modgroupzu",t)},expression:"templateData.modgroupzu"}},e._l(e.comTypeMap,function(e,t){return n("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"组件描述",required:"",prop:"moddesc"}},[n("el-input",{attrs:{placeholder:"组件描述"},model:{value:e.templateData.moddesc,callback:function(t){e.$set(e.templateData,"moddesc","string"==typeof t?t.trim():t)},expression:"templateData.moddesc"}})],1),e._v(" "),n("el-form-item",[n("el-button",{on:{click:e.cancleAddCom}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.confirmAddCom("templateData")}}},[e._v("确 定")])],1)],1):e._e()],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});
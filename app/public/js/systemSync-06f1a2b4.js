webpackJsonp([6],{14:function(e,t,n){"use strict";function r(e){return"[object Array]"===x.call(e)}function a(e){return"[object ArrayBuffer]"===x.call(e)}function o(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function l(e){return null!==e&&"object"==typeof e}function f(e){return"[object Date]"===x.call(e)}function d(e){return"[object File]"===x.call(e)}function p(e){return"[object Blob]"===x.call(e)}function m(e){return"[object Function]"===x.call(e)}function h(e){return l(e)&&m(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function _(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function b(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,a=e.length;n<a;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}function v(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=v(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)b(arguments[n],e);return t}function w(e,t,n){return b(t,function(t,r){e[r]=n&&"function"==typeof t?D(t,n):t}),e}var D=n(147),x=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:a,isFormData:o,isArrayBufferView:i,isString:s,isNumber:u,isObject:l,isUndefined:c,isDate:f,isFile:d,isBlob:p,isFunction:m,isStream:h,isURLSearchParams:y,isStandardBrowserEnv:_,forEach:b,merge:v,extend:w,trim:g}},146:function(e,t,n){"use strict";function r(e,t){if(0===arguments.length)return null;var n=t||"{y}-{m}-{d} {h}:{i}:{s}",r=void 0;"object"==(void 0===e?"undefined":u(e))?r=e:(10===(""+e).length&&(e=1e3*parseInt(e)),r=new Date(e));var a={y:r.getFullYear(),m:r.getMonth()+1,d:r.getDate(),h:r.getHours(),i:r.getMinutes(),s:r.getSeconds(),a:r.getDay()};return n.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var n=a[t];return"a"===t?["一","二","三","四","五","六","日"][n-1]:(e.length>0&&n<10&&(n="0"+n),n||0)})}function a(e){return e.replace(/\s*/g,"")}function o(e,t){var n=arguments[1]||window.location.search.replace("&amp;","&"),r=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=n.substr(n.indexOf("?")+1).match(r);return null!=a?a[2]:""}function i(e,t){for(var n=0;n<e.length;n++)if(e[n]==t)return!0;return!1}function s(e){var t=new RegExp("(^| )"+e+"(?:=([^;]*))?(;|$)"),n=document.cookie.match(t);return n?n[2]?unescape(n[2]):"":null}t.d=r,t.e=a,t.c=o,t.a=i,t.b=s;var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}},147:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},148:function(e,t,n){"use strict";(function(t){var r=n(14),a=n(159),o=n(161),i=n(162),s=n(163),u=n(149),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(164);e.exports=function(e){return new Promise(function(l,f){var d=e.data,p=e.headers;r.isFormData(d)&&delete p["Content-Type"];var m=new XMLHttpRequest,h="onreadystatechange",y=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in m||s(e.url)||(m=new window.XDomainRequest,h="onload",y=!0,m.onprogress=function(){},m.ontimeout=function(){}),e.auth){var g=e.auth.username||"",_=e.auth.password||"";p.Authorization="Basic "+c(g+":"+_)}if(m.open(e.method.toUpperCase(),o(e.url,e.params,e.paramsSerializer),!0),m.timeout=e.timeout,m[h]=function(){if(m&&(4===m.readyState||y)&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in m?i(m.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?m.response:m.responseText,r={data:n,status:1223===m.status?204:m.status,statusText:1223===m.status?"No Content":m.statusText,headers:t,config:e,request:m};a(l,f,r),m=null}},m.onerror=function(){f(u("Network Error",e)),m=null},m.ontimeout=function(){f(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED")),m=null},r.isStandardBrowserEnv()){var b=n(165),v=(e.withCredentials||s(e.url))&&e.xsrfCookieName?b.read(e.xsrfCookieName):void 0;v&&(p[e.xsrfHeaderName]=v)}if("setRequestHeader"in m&&r.forEach(p,function(e,t){void 0===d&&"content-type"===t.toLowerCase()?delete p[t]:m.setRequestHeader(t,e)}),e.withCredentials&&(m.withCredentials=!0),e.responseType)try{m.responseType=e.responseType}catch(e){if("json"!==m.responseType)throw e}"function"==typeof e.onDownloadProgress&&m.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&m.upload&&m.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){m&&(m.abort(),f(e),m=null)}),void 0===d&&(d=null),m.send(d)})}}).call(t,n(7))},149:function(e,t,n){"use strict";var r=n(160);e.exports=function(e,t,n,a){var o=new Error(e);return r(o,t,n,a)}},150:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},151:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},154:function(e,t,n){"use strict";(function(e){var r=n(155),a=n.n(r),o=n(68),i=(n.n(o),n(146)),s=a.a.create({baseURL:e.env.BASE_API,timeout:6e4,headers:{"Content-Type":"application/x-www-form-urlencoded"}});s.interceptors.request.use(function(e){return e.headers["x-csrf-token"]=i.b("csrfToken"),e},function(e){console.log(e),Promise.reject(e)}),s.interceptors.response.use(function(e){var t=e.data.code;return"1601000014"==t||"1601000013"==t?(Object(o.Message)({message:e.data.msg,type:"error",duration:3e3}),location.replace("/login?redirect="+encodeURIComponent(location.href)),Promise.reject()):0!=t?(Object(o.Message)({message:e.data.msg,type:"error",duration:3e3}),e.data):e.data},function(e){return console.log("err"+e),Object(o.Message)({message:e.message,type:"error",duration:5e3}),Promise.reject(e)}),t.a=s}).call(t,n(7))},155:function(e,t,n){e.exports=n(156)},156:function(e,t,n){"use strict";function r(e){var t=new i(e),n=o(i.prototype.request,t);return a.extend(n,i.prototype,t),a.extend(n,t),n}var a=n(14),o=n(147),i=n(157),s=n(69),u=r(s);u.Axios=i,u.create=function(e){return r(a.merge(s,e))},u.Cancel=n(151),u.CancelToken=n(171),u.isCancel=n(150),u.all=function(e){return Promise.all(e)},u.spread=n(172),e.exports=u,e.exports.default=u},157:function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var a=n(69),o=n(14),i=n(166),s=n(167),u=n(169),c=n(170);r.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),e=o.merge(a,this.defaults,{method:"get"},e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url));var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head"],function(e){r.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},158:function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},159:function(e,t,n){"use strict";var r=n(149);e.exports=function(e,t,n){var a=n.config.validateStatus;n.status&&a&&!a(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n)):e(n)}},160:function(e,t,n){"use strict";e.exports=function(e,t,n,r){return e.config=t,n&&(e.code=n),e.response=r,e}},161:function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var a=n(14);e.exports=function(e,t,n){if(!t)return e;var o;if(n)o=n(t);else if(a.isURLSearchParams(t))o=t.toString();else{var i=[];a.forEach(t,function(e,t){null!==e&&void 0!==e&&(a.isArray(e)&&(t+="[]"),a.isArray(e)||(e=[e]),a.forEach(e,function(e){a.isDate(e)?e=e.toISOString():a.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))}))}),o=i.join("&")}return o&&(e+=(-1===e.indexOf("?")?"?":"&")+o),e}},162:function(e,t,n){"use strict";var r=n(14);e.exports=function(e){var t,n,a,o={};return e?(r.forEach(e.split("\n"),function(e){a=e.indexOf(":"),t=r.trim(e.substr(0,a)).toLowerCase(),n=r.trim(e.substr(a+1)),t&&(o[t]=o[t]?o[t]+", "+n:n)}),o):o}},163:function(e,t,n){"use strict";var r=n(14);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(a.setAttribute("href",t),t=a.href),a.setAttribute("href",t),{href:a.href,protocol:a.protocol?a.protocol.replace(/:$/,""):"",host:a.host,search:a.search?a.search.replace(/^\?/,""):"",hash:a.hash?a.hash.replace(/^#/,""):"",hostname:a.hostname,port:a.port,pathname:"/"===a.pathname.charAt(0)?a.pathname:"/"+a.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),a=document.createElement("a");return t=e(window.location.href),function(n){var a=r.isString(n)?e(n):n;return a.protocol===t.protocol&&a.host===t.host}}():function(){return function(){return!0}}()},164:function(e,t,n){"use strict";function r(){this.message="String contains an invalid character"}function a(e){for(var t,n,a=String(e),i="",s=0,u=o;a.charAt(0|s)||(u="=",s%1);i+=u.charAt(63&t>>8-s%1*8)){if((n=a.charCodeAt(s+=.75))>255)throw new r;t=t<<8|n}return i}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=a},165:function(e,t,n){"use strict";var r=n(14);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,a,o,i){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(a)&&s.push("path="+a),r.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},166:function(e,t,n){"use strict";function r(){this.handlers=[]}var a=n(14);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){a.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},167:function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var a=n(14),o=n(168),i=n(150),s=n(69);e.exports=function(e){return r(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=a.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),a.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return r(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(r(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},168:function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},169:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},170:function(e,t,n){"use strict";e.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}},171:function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new a(e),t(n.reason))})}var a=n(151);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},172:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},210:function(e,t,n){var r=n(46)(n(323),n(325),null,null,null);r.options.__file="/Users/hilter/work/lego_manage/app/web/pages/system/sync/listApp.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] listApp.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},323:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(324);t.default={data:function(){return{listLoading:!1,dialogVisible:!1,dialogLoading:!1,tableData:[],queryData:{act_id:"",name:"",page_size:20,page:1,order:"",orderby:""},total:0,systemData:{table_name:"",db_config:"",remote_db_config:"",field:"",is_all:"",syn_time:"",create_time_field:"",update_time_field:""},rules:{table_name:[{required:!0,message:"请输入表名",trigger:"blur"}],db_config:[{required:!0,message:"请输入DB连接名称",trigger:"blur"}],remote_db_config:[{required:!0,message:"请输入远程DB连接名称",trigger:"blur"}],field:[{required:!0,message:"请输入同步字段",trigger:"blur"}],is_all:[{required:!0,message:"请输入是否全量，1为全量，0为增量",trigger:"blur"}],syn_time:[{required:!0,message:"请输入同步日期",trigger:"blur"}],create_time_field:[{required:!0,message:"请输入创建时间",trigger:"blur"}],update_time_field:[{required:!0,message:"请输入更新时间",trigger:"blur"}]}}},created:function(){this.queryFilterList(!0)},methods:{queryFilterList:function(e){var t=this;this.listLoading=!0,r.a().then(function(n){t.listLoading=!1;var r=(t.queryData.page-1)*t.queryData.page_size;e&&(t.total=1*n.data.data.length,t.queryData.page=1),0==n.code&&(t.tableData=n.data.data.splice(r,t.queryData.page_size))})},handleCurrentChange:function(e){this.queryData.page=e,this.queryFilterList(!1)},editSync:function(e){this.systemData.table_name=e.table_name,this.systemData.db_config=e.db_config,this.systemData.remote_db_config=e.remote_db_config,this.systemData.field=e.field,this.systemData.is_all=e.is_all,this.systemData.syn_time=e.syn_time,this.systemData.create_time_field=e.create_time_field,this.systemData.update_time_field=e.update_time_field,this.$set(this.systemData,"syn_id",e.syn_id),this.dialogVisible=!0},formatter:function(e,t){return 0==e.is_all?"增量":1==e.is_all?"全量":2==e.is_all?"手动":"-"},addNewSync:function(){this.systemData.table_name="",this.systemData.db_config="",this.systemData.remote_db_config="",this.systemData.field="",this.systemData.is_all="",this.systemData.syn_time="",this.systemData.create_time_field="",this.systemData.update_time_field="",this.$delete(this.systemData,"syn_id"),this.dialogVisible=!0},cancelAddSync:function(){this.dialogVisible=!1},toggleItemStatus:function(e){var t=this;this.$nextTick(function(){r.b({syn_id:e.syn_id,is_syn:e.is_syn}).then(function(n){0==n.code?t.$message({message:"修改成功",type:"success"}):(t.$message.error(n.msg),e.status="1"==e.is_syn?"0":"1")})})},toggleTblSyn:function(e){var t=this;this.$nextTick(function(){r.c({syn_id:e.syn_id}).then(function(e){0==e.code?t.$message({message:"修改成功",type:"success"}):t.$message.error(e.msg)})})},confirmAddSync:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;r.b(t.systemData).then(function(e){0==e.code?t.$confirm("活动保存成功","提示").then(function(){location.reload()}):t.$confirm("活动保存失败，请重试！","提示")})})}}}},324:function(e,t,n){"use strict";function r(e){return Object(i.a)({url:"/ActivitySynConf/index",method:"post",data:e})}function a(e){return Object(i.a)({url:"/ActivitySynConf/store",method:"post",data:e})}function o(e){return Object(i.a)({url:"/ActivitySynConf/TblSyn",method:"post",data:e})}t.a=r,t.b=a,t.c=o;var i=n(154)},325:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"martop20"},[n("el-form",{attrs:{inline:!0}},[n("el-form-item",{attrs:{label:"关键字："}},[n("el-input",{attrs:{placeholder:"按关键字查询"},model:{value:e.queryData.name,callback:function(t){e.$set(e.queryData,"name",t)},expression:"queryData.name"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.queryFilterList(!0)}}},[n("i",{staticClass:"glyphicon glyphicon-search"}),e._v("查询")]),e._v(" "),n("el-button",{attrs:{type:"success"},on:{click:function(t){e.addNewSync("rule")}}},[n("i",{staticClass:"glyphicon glyphicon-plus"}),e._v("新增配置")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{"header-cell-style":{color:"#333"},data:e.tableData,stripe:"",border:"","highlight-current-row":""}},[n("el-table-column",{attrs:{prop:"syn_id",label:"自增加ID",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{prop:"table_name",label:"表名",width:"240"}}),e._v(" "),n("el-table-column",{attrs:{prop:"db_config",label:"DB连接名称"}}),e._v(" "),n("el-table-column",{attrs:{prop:"remote_db_config",label:"远程DB连接名称",width:"200"}}),e._v(" "),n("el-table-column",{attrs:{prop:"field",label:"同步字段"}}),e._v(" "),n("el-table-column",{attrs:{prop:"is_all",formatter:e.formatter,label:"是否全量"}}),e._v(" "),n("el-table-column",{attrs:{prop:"syn_time",label:"同步日期"}}),e._v(" "),n("el-table-column",{attrs:{prop:"create_time_field",label:"创建时间字段"}}),e._v(" "),n("el-table-column",{attrs:{prop:"update_time_field",label:"更新时间字段"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){e.editSync(t.row)}}},[e._v("编辑")]),e._v(" "),n("el-switch",{attrs:{"active-text":"可用","active-color":"#13ce66","active-value":"1","inactive-value":"0","inactive-color":"#ff4949"},on:{change:function(n){e.toggleItemStatus(t.row)}},model:{value:t.row.is_syn,callback:function(n){e.$set(t.row,"is_syn",n)},expression:"scope.row.is_syn"}}),e._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){e.toggleTblSyn(t.row)}}},[e._v("立即同步")])]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"ui-mt-20 ui-ta-r"},[n("el-pagination",{attrs:{"current-page":e.queryData.page,"page-size":e.queryData.page_size,layout:"total, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.queryData,"page",t)}}})],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"新增/编辑配置",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogLoading,expression:"dialogLoading"}],ref:"systemData",attrs:{"label-width":"150px",rules:e.rules,model:e.systemData}},[n("el-form-item",{attrs:{label:"表名：",required:"",prop:"table_name"}},[n("el-input",{attrs:{placeholder:"请输入表名"},model:{value:e.systemData.table_name,callback:function(t){e.$set(e.systemData,"table_name",t)},expression:"systemData.table_name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"DB连接名称：",required:"",prop:"db_config"}},[n("el-input",{attrs:{placeholder:"请输入db_config"},model:{value:e.systemData.db_config,callback:function(t){e.$set(e.systemData,"db_config",t)},expression:"systemData.db_config"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"远程DB连接名称：",required:"",prop:"remote_db_config"}},[n("el-input",{attrs:{placeholder:"请输入remote_db_config"},model:{value:e.systemData.remote_db_config,callback:function(t){e.$set(e.systemData,"remote_db_config",t)},expression:"systemData.remote_db_config"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"同步字段：",required:"",prop:"field"}},[n("el-input",{attrs:{placeholder:"请输入field"},model:{value:e.systemData.field,callback:function(t){e.$set(e.systemData,"field",t)},expression:"systemData.field"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"是否全量：",required:""}},[n("el-radio-group",{staticStyle:{"margin-right":"20px"},model:{value:e.systemData.is_all,callback:function(t){e.$set(e.systemData,"is_all",t)},expression:"systemData.is_all"}},[n("el-radio",{attrs:{label:"0"}},[e._v("增量")]),e._v(" "),n("el-radio",{attrs:{label:"1"}},[e._v("全量")]),e._v(" "),n("el-radio",{attrs:{label:"2"}},[e._v("手动")])],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"同步日期：",required:"",prop:"syn_time"}},[n("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.systemData.syn_time,callback:function(t){e.$set(e.systemData,"syn_time",t)},expression:"systemData.syn_time"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"创建时间字段：",required:"",prop:"create_time_field"}},[n("el-input",{attrs:{placeholder:"请输入create_time_field"},model:{value:e.systemData.create_time_field,callback:function(t){e.$set(e.systemData,"create_time_field",t)},expression:"systemData.create_time_field"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"更新时间字段：",required:"",prop:"update_time_field"}},[n("el-input",{attrs:{placeholder:"请输入update_time_field"},model:{value:e.systemData.update_time_field,callback:function(t){e.$set(e.systemData,"update_time_field",t)},expression:"systemData.update_time_field"}})],1),e._v(" "),n("el-form-item",[n("el-button",{on:{click:e.cancelAddSync}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.confirmAddSync("systemData")}}},[e._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},69:function(e,t,n){"use strict";(function(t){function r(e,t){!a.isUndefined(e)&&a.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a=n(14),o=n(158),i=/^\)\]\}',?\n/,s={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(148):void 0!==t&&(e=n(148)),e}(),transformRequest:[function(e,t){return o(t,"Content-Type"),a.isFormData(e)||a.isArrayBuffer(e)||a.isStream(e)||a.isFile(e)||a.isBlob(e)?e:a.isArrayBufferView(e)?e.buffer:a.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):a.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(i,"");try{e=JSON.parse(e)}catch(e){}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},a.forEach(["delete","get","head"],function(e){u.headers[e]={}}),a.forEach(["post","put","patch"],function(e){u.headers[e]=a.merge(s)}),e.exports=u}).call(t,n(7))}});
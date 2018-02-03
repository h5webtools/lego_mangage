define(function(require, exports, module) {
   module.exports = function(opt, success, error) {
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange = function() {
           if(xhr.readyState == 1) {
               opt.beforeSend && opt.beforeSend();
           }
           var ptr = setTimeout(function() {
               if(xhr.readyState !== 4) {
                   error && error();
                   xhr.abort();
               }
           }, opt.timeout || 10000);
           if (xhr.readyState === 4) {
               clearTimeout(ptr);
               if(xhr.status === 200) {
                   success.call(xhr, opt.dataType.toLowerCase() == "json" ? JSON.parse(xhr.responseText) : xhr.responseText);
               } else {
                   error && error.apply(xhr, [xhr.status, xhr.responseText]);
               }
           }
       };
       opt.type = opt.type.toUpperCase();
       var data = opt.data;
       if(typeof opt.processData == 'undefined' || opt.processData) {
           data = genData(opt.data);
       }
       if (opt.type === "GET") {
           opt.url = opt.url + (opt.url.indexOf('?') > 0 ? "&" : "?") + data;
           data = null;
       }
       xhr.open(opt.type, opt.url);
       xhr.withCredentials = true;

       //xhr.setRequestHeader("Cache-Control","no-cache");
       if(opt.type == "POST" && typeof opt.contentType == 'undefined' || opt.contentType) {
           xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
       }
       xhr.send(data);
       function genData(data) {
           if (typeof data === "object" && data != null) {
               var _d = [];
               for (var i in data) {
                   _d.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
               }
               return _d.join('&');
           }
           return data;
       }
   }
})
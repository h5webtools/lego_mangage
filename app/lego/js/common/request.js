define(function(require, exports, module) {
   
    var ajax = require("../lib/ajax");

    exports.request = function (data, url, loading, success, fail) {
        ajax({
                url: url,
                data: JSON.stringify(data),
                dataType: "json",
                type: "post"
            }, function (res) {
            var code = res.code;
            if (code != 0) {
                console.log("fail");
            } else {
                success&&success(res);
            }
        }, function () {
            fail&&fail();
        })
    };
});
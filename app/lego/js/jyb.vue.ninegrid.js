define(function (require, exports, module) {
    
    function _register(opt) {

        Vue.component("ninegrid", {
            props: ["params"],
            functional: false,
            data: function () {
                return {
                    data: {
                        didFinish: false,
                        didTrigger: false,
                        showMore: false
                    }
                };
            },
            mounted: function () {

            },
            created: function () {

            },
            methods: {
                gridcommit: function () {

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
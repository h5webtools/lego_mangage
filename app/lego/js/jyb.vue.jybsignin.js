define(function (require, exports, module) {

    function _register(opt) {

        Vue.component("jybsignin", {
            props: ["params"],
            functional: false,
            data: function () {
                return {
                    data: {
                        didFinish: false,
                        didTrigger: false,
                        showMore: false,
                        signInSum:0,
                        isSignIn:false,
                        signInPercent:0,
                        signInDot:0.6
                    }
                };
            },
            mounted: function () {

            },
            created: function () {
                !this.params.lazyLoad && this.loadData();
            },
            methods: {
                toSignin: function(){
                    
                },
                loadData: function(){
                                     
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
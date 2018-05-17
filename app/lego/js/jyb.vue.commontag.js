define(function (require, exports, module) {


    function _register(opt) {

        Vue.component("commontag", {
            props: ["params"],
            // template: '#' + config.uid + "_tpl",
            /* data: function() {
                 return {
                     data: {}
                 };
             },*/
            functional: false,
            //mixins: [commonFunc.commonUtil.utilMethods],
            data: function () {
                return {
                    data: {
                        didFinish: false,
                        didTrigger: false,
                        showMore: false,

                        //sliderIndex:10
                    }
                };
            },
<<<<<<< HEAD
=======

>>>>>>> b821a500c45cd0b9935bdf1460c11954d41be8ef
            mounted: function() {
                $('.ui-p-fixed').removeClass('ui-p-fixed');
            },
            created: function () {

                try {
                    if (this.params.rulesContent && this.params.rulesContent.length > 0) {
                        this.params.rulesContent.forEach(function (item) {
                            item.rulesDes = item.rulesDes.replace(/\\n/g, "").replace(/\\/g, "").replace(/\\t/g , "");;
                        });
                    }
                    if(this.params.code){
                        this.params.code = this.params.code.replace(/\\n/g, "").replace(/\\/g, "").replace(/\\t/g , "");
                    }
                } catch (e) {
                    console.log("去掉rules中的空格和换行符");
                }
                //debugger;
            },
            methods: {

                hideRulesDialog: function () {
                    this.params.isShowDialog = true;
                },
                showRulesDialog: function () {
                    this.params.isShowDialog = false;
                },
                switchtips: function () {
                    console.log("switch tips");
                },

                submitBuy:function(){
                    //仅仅用于测试，微信还款类组件   真正环境是有js逻辑的  jyb.vue.jybwxhkpay
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
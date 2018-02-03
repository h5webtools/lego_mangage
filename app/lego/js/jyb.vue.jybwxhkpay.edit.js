define(function(require, exports, module){
       
        var vueComponent = require("./jyb.vue.jybwxhkpay");
        var Factory = require('./jyb.vue.edit.factory');
        var defaultTplEdit = 'http:/template/new/jybwxhkpay/edit.html';


        var _Class = Factory.getClass({
        vueComponent: vueComponent,
        defaultTplEdit: defaultTplEdit,
        type: 'jybwxhkpay',
        data: {
            styleKey: '',
            "didTrigger": false,//生成页面的时候，这里为False
            "didFinish": false,//生成页面的时候，这里为False
            "lazyLoad": false,
            "isShowNpmVersions":LegoPageConfig.isPower,
            "coupondes": "",
            "couponvalue": "",
            "btndes":"",
            "npmversion": "",
            "npmversionArr": [],
            "npmname": "@lego/jybwxhkpay",
        },
        watch: ['data.styleKey','data.coupondes','data.couponvalue','data.btndes']
    });



    exports.getComponent = function (config, callback) {
        var component = new _Class(config, callback);
        if (!component.config.obj.coupondes) {
            component.config.obj.coupondes = '';
            component.config.obj.couponvalue = '';
            component.config.obj.btndes = '';
        }
        return component;
    };

});


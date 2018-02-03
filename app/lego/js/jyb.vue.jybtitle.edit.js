define(function(require, exports, module){
       
        var vueComponent = require("./jyb.vue.commontag");
        var Factory = require('./jyb.vue.edit.factory');
        var defaultTplEdit = 'http:/template/new/couponresult/edit.html';

        /* npm管理 */
        var moduleBasicInfo = "";
        var moduleDataCenter ="";
        /* npm管理 */


        var _Class = Factory.getClass({
        vueComponent: vueComponent,
        defaultTplEdit: defaultTplEdit,
        type: 'commontag',
        data: {
            styleKey: '',
            "didTrigger": false,//生成页面的时候，这里为False
            "didFinish": false,//生成页面的时候，这里为False
            "lazyLoad": false,
            "isShowNpmVersions":LegoPageConfig.isPower,
            "title": "",
            "subTitle": "",
            "backgroundcolor":"",
            "color": '',//
            "npmversion":"",
            "npmversionArr":[],
            "npmname":"@lego/commontag"
        },
        watch: ['data.styleKey']
    });



    exports.getComponent = function (config, callback) {
        var component = new _Class(config, callback);
        if (!component.config.obj.title) {
            component.config.obj.title = '';
            component.config.obj.subTitle = '';
            component.config.obj.color = '';
        }
        return component;
    };

});


define(function(require, exports, module){
       
        var vueComponent = require("./jyb.vue.commontag");
        var Factory = require('./jyb.vue.edit.factory');
        var defaultTplEdit = 'http:/template/new/jybsuctionbtn/edit.html';


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
            "btndes": "",
            "tourl": "",
            "backgroundcolor":"",
            "fontcolor": '',
            "outterbgcolor":"",
            "outterwidth":""

        },
        watch: ['data.styleKey',"data.btndes","data.tourl" , "data.backgroundcolor" , "data.fontcolor"]
    });

    _Class.prototype.getHTMLString = function () {
        var config = this.config;
        var div = $('<div>');
        var HTMLString = this._getStyle().template;
        var dom = $(HTMLString);
        var html;

        dom.attr('uid', this.obj.uid);
        div.append(dom);
        

        html = div.html().replace("jyb-jybsuctionbtn-position" , "");
        //div.remove();

        return html;
    };



    exports.getComponent = function (config, callback) {
        var component = new _Class(config, callback);
        if (!component.config.obj.btndes) {
            component.config.obj.btndes = '';
            component.config.obj.tourl = '';
            component.config.obj.fontcolor = '';
            component.config.obj.backgroundcolor = '';
        }
        return component;
    };

});


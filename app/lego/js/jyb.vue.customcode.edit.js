define(function (require, exports, module) {

    var vueComponent = require("./jyb.vue.commontag");
    var Factory = require('./jyb.vue.edit.factory');
    var defaultTplEdit = 'http:/template/new/customcode/edit.html';

    var _Class = Factory.getClass({
        vueComponent: vueComponent,
        defaultTplEdit: defaultTplEdit,
        type: 'commonTag',
        data: {
            styleKey: '',
            "didTrigger": false,//生成页面的时候，这里为False
            "didFinish": false,//生成页面的时候，这里为False
            "lazyLoad": false,
            "isShowNpmVersions":LegoPageConfig.isPower,
            "code": "",//
            "npmversion":"",
            "npmversionArr":[],
            "npmname":"@lego/commontag"
        },
        watch: ['data.styleKey']
    });

    //线上页面，获取html 模板片段
    _Class.prototype.getHTMLString = function () {
        var div = $('<div>');
        var HTMLString = this._getStyle().template;
        var dom = $(HTMLString).attr('uid', this.obj.uid).html('<div></div>');
        var html;


        div.append(dom);
        // div.append('{{data.code}}');
        html = div.html();
        div.remove();

        return html;
    };

    //和线上展示的页面数据结构对应起来 window._componentConfig[]
    _Class.prototype.getData = function () {
        var obj = this.getMPMData();
        delete obj.data.code;

        var string = JSON.stringify(obj, null, '    ');
        string = string.replace(/"#fnObj#"/ig, 'window.vueFnObj.fn_' + this.config.obj.data.styleKey);
        var string = JSON.stringify(obj, null, '    ');
        return string;
    };

    //获取存在存在数据库中的数据
    _Class.prototype.getMPMData = function () {
        this.obj.data.uid = this.obj.uid;
        this.obj.data.didTrigger = false;
        this.obj.data.didFinish = false;

        var obj = {};

        obj = Object.assign(obj, this.obj);

        delete obj['itemList'];
        delete obj['_itemList'];
        delete obj['com_extend'];

        obj.data = Object.assign({}, obj.data);
        obj.data._itemList = [];
        obj.data.itemList = [];
        obj.data.fnObj = '#fnObj#';
        delete obj.data.pageConfig;
        obj.data.code = obj.data.code.replace('!--', '! --');
        obj.data.code = obj.data.code.replace(/\\n/g, "").replace(/\\/g, "").replace(/\\t/g , "");
        return obj;
    };

    exports.getComponent = function (config) {
        var component = new _Class(config);
        config.obj.data.code = (config.obj.data.code || '').replace('! --', '!--');

        return component;
    };

});


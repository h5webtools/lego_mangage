define(function (require, exports, module) {

    var vueComponent = require("./jyb.vue.jybregister");
    var Factory = require('./jyb.vue.edit.factory');
    var defaultTplEdit = 'http:/template/new/jybregister/edit.html';
    /* npm管理 */
    var moduleBasicInfo = "";
    var moduleDataCenter ="";
    /* npm管理 */


    var _Class = Factory.getClass({
        vueComponent: vueComponent,
        defaultTplEdit: defaultTplEdit,
        type: 'jybregister',
        data: {
            styleKey: '',
            "_itemList": [],
            "itemList": [],
            "didTrigger": false, //生成页面的时候，这里为False
            "didFinish": false, //生成页面的时候，这里为False
            "lazyLoad": false,
            "isShowNpmVersions":LegoPageConfig.isPower,
            "inputarr":[],
            "inputtypevalue":0,
            "buttoncolor": '',
            "btntextcolor":"",
            "backgroundcolor": "",
            "bordercolor": "",
            "innerInsetcolor": "",
            "btntestcolor": "",
            "btndowninsetcolor": "",
            "inputnamecolor": "",
            "inputdescolor":"",
            "buttondes": "",
            "activeid": "",
            "tipsdesc1": "",
            "tipsdesc2": "",
            "areacmdid":"",
            "tipsdesc3": "",
            "tipsdesc4": "",
            "jumpurl": "",
            "submitflag":false,
            "checoutkurl":"",
            "cmdid":"",
            "areaActId":"",//归属地
            "areaJumpUrl":"",//归属地
            "checkoutPrices":"",
            "identycodecolor":"",
            "npmversion":"",
            "npmversionArr":[],
            "npmname":"@lego/jybregister",
            "jumptypeval":0 //跳转类型：0弹框 1：归属地 2：红包结果页面
        },
        watch: ['data.checoutkurl','data.inputarr' , 'data.styleKey', "data.buttoncolor", "data.backgroundcolor", "data.bordercolor",
            "data.innerInsetcolor", "data.btntextcolor", "data.btndowninsetcolor", "data.inputnamecolor", "data.buttondes","data.identycodecolor"]
    });

    _Class.prototype.showCB = function () {
        var that = this;
        var config = this.config;
        var styleObj = this._getStyle();
        var fileUploader, maxImageSize = 1024 * 100;

        /* npm管理 */
        that.obj.data.isShowNpmVersions = LegoPageConfig.isPower;
        require.async('./mpm.sys.dataCenter', function (module) {
            moduleDataCenter = module;
        });
        require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
        });

        var pageInfo = moduleBasicInfo.showMePageInfo();
        var folderSet = moduleBasicInfo.showMeFolderName();

        var path = "/data/lego/h5_lego_actpage/release/act/" + pageInfo.datefolder + "/" + folderSet.sub + "/";

        moduleDataCenter.getnodeversions("@lego/jybregister", path, function (json) {
            console.log(json);
            that.obj.data.npmversionArr = json;
            //
            if (!that.obj.data.npmversion) {
                that.obj.data.npmversion = json[json.length - 1].version;
            } else {
                console.info("当前头图的", that.obj.data.npmversion);
            }
        });
        /* npm管理 */

        this.extendObj(styleObj.com_extend);
        this.obj.data.fnObj = window.vueFnObj['fn_' + this.obj.data.styleKey];
        this.domStyle = this.addCssByStyle(styleObj.com_css);

        this._showRightList();
        this._appendShowDom();
        this._appendEditDom();

    };


    //编辑功能
    _Class.prototype._appendEditDom = function () {
        var that = this;
        var config = this.config;
        var styleObj = this._getStyle();
        var editDom = $('#editbox_' + this.obj.uid).append($(that.tplEdit))[0];

        //编辑
        this.domEdit = new Vue({
            el: editDom,
            data: {
                obj: that.obj,
                arrStyle: that.arrStyle,
                showStyle: true,
                showProperty: false,
                oldObj: {
                    data: {}
                }
            },
            created: function () {
                // `this` 指向 vm 实例
                console.log('a is: ' + this.obj);
                Object.assign(this.oldObj.data, this.obj.data);
                console.log(this.oldObj);
            },
            events: {},
            watch: {

                'obj.data.styleKey': {
                    handler: function (val, oldVal) {
                        this.$nextTick(function () {
                        })
                    },
                    deep: false
                }
            },
            methods: {
                change: function () { //点击保存
                    for (var i = 0; i < that.__config.watch.length; i++) {
                        var arr = that.__config.watch[i].split('.');
                        if (arr[1] == 'styleKey') {
                            continue;
                        }
                        this.oldObj.data[arr[1]] = this.obj.data[arr[1]];
                    }
                    that.rebuildShowComponent();
                },
                chancel: function () {
                    for (var i = 0; i < that.__config.watch.length; i++) {
                        var arr = that.__config.watch[i].split('.');
                        if (arr[1] == 'styleKey') {
                            continue;
                        }

                        this.obj.data[arr[1]] = this.oldObj.data[arr[1]];
                    }
                },
                show: function (index) {
                    if (index == 0) {
                        this.showStyle = true;
                        this.showProperty = false;
                    } else {
                        this.showStyle = false;
                        this.showProperty = true;
                    }
                    this.$nextTick(function () {


                    })
                },

                addinputarr: function () {
                    var me = this;
                    this.obj.data.inputarr.push({
                        inputtype: me.obj.data.inputtypevalue
                    });

                    this.$nextTick(function () {

                    });
                },
                deleteinputarr: function (index) {
                    var deleteItem = this.obj.data.inputarr.splice(index - 0, 1);
                },
                selectNpmVersion: function () { /* npm管理 */
                    console.info("切换注册组件的版本是", this.obj.data.npmversion);
                    require.async('./mpm.sys.basicInfo', function (module) {
                        moduleBasicInfo = module;
                    });
                    var pageInfo = moduleBasicInfo.showMePageInfo();
                    var folderSet = moduleBasicInfo.showMeFolderName();

                    var path = "/data/lego/h5_lego_actpage/release/act/" + pageInfo.datefolder + "/" + folderSet.sub + "/";

                    moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybregister', path, function () {
                        console.log("update ok ");
                    });
                }
            }
        });

        $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);


    };
    exports.getComponent = function (config, callback) {
        var component = new _Class(config, callback);
        if (!component.config.obj.data.buttoncolor) {
            component.config.obj.data.buttoncolor = "";
        }
        return component;
    };
});

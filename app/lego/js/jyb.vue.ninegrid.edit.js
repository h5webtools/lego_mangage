define(function (require, exports, module) {

    var vueComponent = require("./jyb.vue.ninegrid");
    var Factory = require('./jyb.vue.edit.factory');
    var CFG = require('./mpm.sys.config');
    var moduleUploader = require('./mpm.sys.h5fileupload');
    var defaultTplEdit = 'http:/template/new/ninegrid/edit.html';
    var moduleDataCenter = "";
    var moduleBasicInfo = "";
    var uploadDom = "";

    var _Class = Factory.getClass({
        vueComponent: vueComponent,
        defaultTplEdit: defaultTplEdit,
        type: 'ninegrid',
        data: {
            styleKey: '',
            "didTrigger": false,//生成页面的时候，这里为False
            "didFinish": false,//生成页面的时候，这里为False
            "lazyLoad": false,
            "isShowNpmVersions": LegoPageConfig.isPower,
            "gridtype": 0,
            "gridcmd": "",
            "gridactid": "",
            "npmversion": "",
            "npmversionArr": [],
            "npmname": "@lego/ninegrid",
            "tplid": "",
            "gridspadding": {
                "pdtop": "",
                "pdbtm": "",
                "pdlr": ""
            },
            "gridsOuter": {
                "cornerImg": "",
                "outerbgcolor": "",
                "innerbgcolor": "",
                "titleup": "",
                "titledown": "",
                "titlecolor": "",
                "showbaoflag": 0,
                "baocolor": "",
                "isawardtimeflag": 0,
                "awardtimecolor": "",
                "borderImg": "https://cdn.jyblife.com/act/201708/platform/assets/images/index/light.png"
            },
            "gridList": [
                { desone: "", destwo: "", flag: 1, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" },
                { desone: "", destwo: "", flag: 2, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" },
                { desone: "", destwo: "", flag: 3, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" },
                { desone: "", destwo: "", flag: 8, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" },
                { desone: "", destwo: "", flag: 9, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" },
                { desone: "", destwo: "", flag: 4, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" },
                { desone: "", destwo: "", flag: 7, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" },
                { desone: "", destwo: "", flag: 6, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" },
                { desone: "", destwo: "", flag: 5, desthree: "", desfour: "", gridbackimg: "", useurl: "", updescolor: "", downdescolor: "" }
            ]
        },
        watch: ['data.styleKey', "data.gridList", "data.gridtype", "data.gridsOuter", "data.gridspadding"]
    });

    _Class.prototype.showCB = function () {
        var that = this;
        var config = this.config;
        var styleObj = this._getStyle();
        var fileUploader, maxImageSize = 1024 * 1000;

        require.async('./mpm.sys.dataCenter', function (module) {
            moduleDataCenter = module;
        });
        require.async('./mpm.sys.basicInfo', function (module) {
            moduleBasicInfo = module;
        });

        var pageInfo = moduleBasicInfo.showMePageInfo();
        var folderSet = moduleBasicInfo.showMeFolderName();

        var path = "/data/lego/h5_lego_actpage/release/act/" + pageInfo.datefolder + "/" + folderSet.sub + "/";

        this.obj.data.isShowNpmVersions = LegoPageConfig.isPower;
        moduleDataCenter.getnodeversions("@lego/ninegrid", path, function (json) {
            that.obj.data.npmversionArr = json;
            if (!that.obj.data.npmversion) {
                that.obj.data.npmversion = json[json.length - 1].version;
            }
        });

        moduleDataCenter.getTplList("2", function (e) {
            var json = JSON.parse(e);
            if (json.code == 0) {
                that.obj.data.tplList = json.data.data;
            }
        });

        this.extendObj(styleObj.com_extend);
        this.obj.data.fnObj = window.vueFnObj['fn_' + this.obj.data.styleKey];
        this.domStyle = this.addCssByStyle(styleObj.com_css);

        this._showRightList();
        this._appendShowDom();
        this._appendEditDom();

        function fileSelectHandler(file) {
            require.async('./mpm.sys.basicInfo', function (module) {
                moduleBasicInfo = module;
            });
            pageInfo = moduleBasicInfo.showMePageInfo();
            var savepath = "/data/lego/h5_lego_actpage/release/act/" +
                pageInfo.datefolder + "/" +
                pageInfo.path.split("/")[5] +
                "/assets/images/";
            if (file.size > maxImageSize) {
                moduleUtil.alert('图片超过10KB');
                return;
            }
            if (!/^[0-9A-Za-z_.\-]{1,100}$/.test(file.name)) {
                moduleUtil.alert('图片命名最好是字母下划线和数字的组合,请重新命名');
                return;
            }
            var extName = file.name.split('.'); //extName = extName[extName.length - 1];
            fileUploader.addPostData('savename', file.name);
            //保存路径修改下
            fileUploader.addPostData('savepath', savepath);
            fileUploader.upload();
        }

        function uploadImgSuccess(d, dom) {
            var d = JSON.parse(d);
            var gridtype = that.domShow.data.gridtype;
            var curGrid = that.domShow.data.gridList[gridtype];
            var path = "./assets/images/" + d.filePath.split("/").pop();

            if (uploadDoms.hasClass("corneruploadimg")) {
                that.domShow.data.gridsOuter.cornerImg = path;
            } else {
                curGrid.gridbackimg = path;
                Vue.set(that.domShow.data.gridList, gridtype, curGrid)
            }
        }
        function uploadImgError() {
            console.log(d);
        }
        function onJFS(url) {

        }
        var fileImage = $("#editbox_" + config.obj.uid).find(".fileupload");
        fileUploader = new moduleUploader.ajaxUploader({
            dom: fileImage[0],
            url: CFG.phpRoot + 'ajaxFileUpload',
            onchange: fileSelectHandler,
            uploadsuccess: uploadImgSuccess,
            uploaderror: uploadImgError
        });
        /*图片上传*/
        $("#editbox_" + config.obj.uid).find(".unloadimg").on("click", function (e) {
            
            uploadDom = $("#editbox_" + config.obj.uid).find(".fileupload").find("input").eq(0);
            uploadDoms = $(e.target);
            uploadDom.on("click", function () {});
            uploadDom.trigger("click");
            return false;
        });
    };
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
                selectNpmVersion: function () {
                    require.async('./mpm.sys.basicInfo', function (module) {
                        moduleBasicInfo = module;
                    });
                    var pageInfo = moduleBasicInfo.showMePageInfo(),
                        folderSet = moduleBasicInfo.showMeFolderName(),
                        path = "/data/lego/h5_lego_actpage/release/act/" + pageInfo.datefolder + "/" + folderSet.sub + "/";
                    moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/ninegrid', path, function () {
                        console.log("update ninegrid ok ");
                    });
                },
                toConfigTree: function () {
                    var moduleUtil, me = this;
                    require.async('./mpm.sys.util', function (module) {
                        moduleUtil = module;
                    });
                    var divComponentIframe = $("#divComponentIframe");
                    var _pageid = moduleBasicInfo.showMePageInfo().id,
                        _tpl_id = this.obj.data.tplid,
                        _act_id = moduleUtil.getUrlQuery('act_id'),
                        _comid = this.obj.uid.replace("com_", "");
                    if (!_tpl_id) {
                        alert("请先选择对应的模板");
                        return;
                    }
                    var _url = "http://ac.sit.jyblife.com/" + "views/template/chaintpllego.html?" +
                        "tpl_id=" + _tpl_id +
                        "&pageid=" + _pageid +
                        "&comid=" + _comid +
                        "&act_id=" + _act_id,
                        key = _pageid + "_" + _comid + "_" + _tpl_id + "_" + _act_id;

                    divComponentIframe.find("iframe")[0].src = _url;
                    divComponentIframe.show();

                    window.addEventListener("message", function (e) {
                        var json = JSON.parse(e.data);
                        console.log(json);
                        if (json[key]) {
                            console.log(json[key]);
                            var cmds = JSON.parse(json[key]);
                            if (_tpl_id = 6) {
                                me.obj.data.gridcmd = cmds[0];
                                me.obj.data.gridactid = _act_id;
                            }
                        }
                    }, true);
                }

            }
        });

        $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);

    };

    exports.getComponent = function (config, callback) {
        var component = new _Class(config, callback);
        if (!component.config.obj.title) {
            component.config.obj.title = '';
        }

        return component;
    };
});


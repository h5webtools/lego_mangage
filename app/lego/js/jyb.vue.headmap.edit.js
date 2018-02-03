define(function (require, exports, module) {

    var vueComponent = require("./jyb.vue.commontag");
    var Factory = require('./jyb.vue.edit.factory');
    var CFG = require('./mpm.sys.config');
    var moduleUploader = require('./mpm.sys.h5fileupload');
    var mpmDateInputLib = require('./mpm.sys.calendar').mpmDateInputLib;
    var defaultTplEdit = 'http:/template/new/headmap/edit.html';
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
            "_itemList": [],
            "itemList": [],
            "combo": 0,
            "didTrigger": false, //生成页面的时候，这里为False
            "didFinish": false, //生成页面的时候，这里为False
            "lazyLoad": false,
            "isShowNpmVersions":LegoPageConfig.isPower,
            "showMore": false,
            "headmapsrc": '',
            "outterwidth":"",
            "innerwidth":"100%",
            "tourl":"javascript:;",
            "headmapbgcolor": "",
            "npmversion":"",
            "npmversionArr":[],
            "npmname":"@lego/commontag",
            "interestpoint": [],
            "timeaxis": [],
            "appointarr": []
        },
        watch: ['data.styleKey', "data.headmapsrc"]
    });


    _Class.prototype.showCB = function () {
        var that = this;
        var config = this.config;
        var styleObj = this._getStyle();
        var fileUploader, maxImageSize = 1024 * 1024 * 1024;

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

        moduleDataCenter.getnodeversions("@lego/commontag", path, function (json) {
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

        function fileSelectHandler(file) {
            console.log('上传图片属性', file);

            
            

            pageInfo = moduleBasicInfo.showMePageInfo();
            var _datefolder = pageInfo.datefolder,
                _path = pageInfo.path.split("/")[5];
            //var savepath = "/data/act/jyb_h5_static/branches/actconfig/"+
            try {
                if (pageInfo.oldPageMenu) {
                    var pathArr = pageInfo.oldPageMenu.split("/"),
                        colName1 = pathArr[0],
                        colName2 = pathArr[1],
                        fileName = pathArr[2];

                    //console.log(_oldPagePath, colName1, colName2, fileName);

                    _datefolder = colName1;
                    _path = colName2;
                }

            } catch (e) {

            }
            var savepath = "/data/lego/h5_lego_actpage/release/act/" +
                _datefolder + "/" +
                _path +
                "/assets/images/";
            if (file.size > maxImageSize) {
                moduleUtil.alert('图片超过10KB');
                return;
            }
            if (!/^[0-9A-Za-z_.]{1,100}$/.test(file.name)) {
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
            var path = "./assets/images/" + d.filePath.split("/").pop();

            that.domShow.data.headmapsrc = path;
            // $(".preview").attr("src",path);
            // $("#textShareImgUrl").val(path);
            console.log("path");
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
            var dom = $("#editbox_" + config.obj.uid).find(".fileupload").find("input").eq(0);
            dom.on("click", function () {

            });
            dom.trigger("click");
            return false;
        });
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
                            setTimeout(function (e) {
                                var today = new Date();
                                mpmDateInputLib($(editDom).find(".selecttime"), {
                                    chosendate: today,
                                    //开始年份
                                    startdate: today.getFullYear(),
                                    //结束年份
                                    enddate: today.getFullYear() + 3,
                                    //时间格式
                                    timeFormat: 'hh:ii:ss', //hh:ii:ss
                                    hasTime: true,
                                    x: 0,
                                    y: -240,
                                    //选择完成后的回调事件
                                    callback: function (datepicker) {
                                        $(datepicker).change();
                                        debugger;
                                        console.log('选定日期', datepicker.value);
                                    }
                                })
                            }, 1000)

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


                addinterestpoint: function () {
                    this.obj.data.interestpoint.push({
                        interestdes: '', //
                        begin: '',
                        end: ''

                    });

                    this.$nextTick(function () {

                    });
                },
                deleteinterestpoint: function (index) {
                    var deleteItem = this.obj.data.interestpoint.splice(index - 0, 1);
                },
                addtimeaxis: function () {
                    this.obj.data.timeaxis.push({
                        timeaxisone: '', //
                        timeaxistwo: '', //
                        timeaxisthree: '', //
                        begin: '',
                        end: ''

                    });

                    this.$nextTick(function () {

                    });
                },
                deletetimeaxis: function (index) {
                    var deleteItem = this.obj.data.timeaxis.splice(index - 0, 1);
                },
                addappointarr: function () {
                    this.obj.data.appointarr.push({
                        appointdes: '', //
                        appointids: '', //
                        begin: '',
                        end: ''

                    });

                    this.$nextTick(function () {

                    });
                },
                deleteappointarr: function (index) {
                    var deleteItem = this.obj.data.appointarr.splice(index - 0, 1);
                },
                selectNpmVersion: function () { /* npm管理 */
                    console.info("切换到头图的版本是", this.obj.data.npmversion);
                    require.async('./mpm.sys.basicInfo', function (module) {
                        moduleBasicInfo = module;
                    });
                    var pageInfo = moduleBasicInfo.showMePageInfo();
                    var folderSet = moduleBasicInfo.showMeFolderName();

                    var path = "/data/lego/h5_lego_actpage/release/act/" + pageInfo.datefolder + "/" + folderSet.sub + "/";

                    moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/commontag', path, function () {
                        console.log("update ok ");
                    });
                }
            }
        });

        $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);


    };


    exports.getComponent = function (config, callback) {
        var component = new _Class(config, callback);
        if (!component.config.obj.data.headmapsrc) {
            component.config.obj.data.headmapsrc = "https://cdn.jyblife.com/static/style/act/publish/img/txauto0804/banner_txvideo.png";
        }
        return component;
    };
});

define(function(require, exports, module){
       
        var vueComponent = require("./jyb.vue.jybranklist");
        var Factory = require('./jyb.vue.edit.factory');
        var defaultTplEdit = 'http:/template/new/jybranklist/edit.html';

        /* npm管理 */
        var moduleBasicInfo = "";
        var moduleDataCenter ="";
        /* npm管理 */


        var _Class = Factory.getClass({
        vueComponent: vueComponent,
        defaultTplEdit: defaultTplEdit,
        type: 'jybranklist',
        data: {
            styleKey: '',
            "didTrigger": false,//生成页面的时候，这里为False
            "didFinish": false,//生成页面的时候，这里为False
            "lazyLoad": false,
            "isShowNpmVersions":LegoPageConfig.isPower,
            "rankpadding":"", //padding
            "headbgcolor":"",//背景色
            "headwordColor":"",//字体颜色
            "contentbgcolor":"",//背景色
            "contentwordColor":"",//字体颜色
            "footbgcolor":"",//背景色
            "footwordColor":"",//字体颜色
            'borderradiusval':"",//圆角
            'evencolumncolor':"",//奇数行背景
            "tableContentArr":[],//表格内容
            "pdTop":"",
            "outterwidth":"",
            "outterbgcolor":"",
            "npmversion":"",
            "npmversionArr":[],
            "npmname":"@lego/jybranklist",
        },
        watch: ['data.styleKey' , "data.rankpadding", "data.headbgcolor" , "data.headwordColor", "data.contentbgcolor" , 
        "data.contentwordColor" , "data.footbgcolor", "data.footwordColor", "data.tableContentArr" , "data.borderradiusval",
        "data.evencolumncolor"]
    });

        //编辑功能
        _Class.prototype._appendEditDom = function() {
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
                created: function() {
                    // `this` 指向 vm 实例
                    console.log('a is: ' + this.obj);
                    Object.assign(this.oldObj.data, this.obj.data);
                    console.log(this.oldObj);
                },
                events: {},
                 watch: {
              
                    'obj.data.styleKey': {
                        handler: function (val, oldVal) {
                            this.$nextTick(function(){
                               
                            })
                        },
                        deep: false
                    }
                },
                methods: {
                    change: function() { //点击保存
                        for (var i = 0; i < that.__config.watch.length; i++) {
                            var arr = that.__config.watch[i].split('.');
                            if (arr[1] == 'styleKey') {
                                continue;
                            }
                            this.oldObj.data[arr[1]] = this.obj.data[arr[1]];
                        }
                        that.rebuildShowComponent();
                    },
                    chancel: function() {
                        for (var i = 0; i < that.__config.watch.length; i++) {
                            var arr = that.__config.watch[i].split('.');
                            if (arr[1] == 'styleKey') {
                                continue;
                            }
    
                            this.obj.data[arr[1]] = this.oldObj.data[arr[1]];
                        }
                    },
                    show: function(index) {
                        if (index == 0) {
                            this.showStyle = true;
                            this.showProperty = false;
                        } else {
                            this.showStyle = false;
                            this.showProperty = true;
                        }
                        this.$nextTick(function(){
                      
                     
                        })
                    },
    
                    
                    addtableContent: function() {
                        this.obj.data.tableContentArr.push({
                            tabContentItem: "",
                            tabListWidth:"",
                            rankkey:""
                        });
    
                        this.$nextTick(function() {
                         
                        });
                    },
                    deletetableContent: function(index) {
                        var deleteItem = this.obj.data.tableContentArr.splice(index - 0, 1);
                    },
                    selectNpmVersion: function () { /* npm管理 */
                        console.info("切换排行榜组件的版本是", this.obj.data.npmversion);
                        require.async('./mpm.sys.basicInfo', function (module) {
                            moduleBasicInfo = module;
                        });
                        require.async('./mpm.sys.dataCenter', function (module) {
                            moduleDataCenter = module;
                        });
                        var pageInfo = moduleBasicInfo.showMePageInfo();
                        var folderSet = moduleBasicInfo.showMeFolderName();
    
                        var path = "/data/lego/h5_lego_actpage/release/act/" + pageInfo.datefolder + "/" + folderSet.sub + "/";
    
                        moduleDataCenter.updataversion(this.obj.data.npmversion, '@lego/jybranklist', path, function () {
                            console.log("update ok ");
                        });
                    }
                 
                }
            });
    
            $(that.domEdit.$el).attr('id', 'editbox_' + that.obj.uid);
     
    
        };



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


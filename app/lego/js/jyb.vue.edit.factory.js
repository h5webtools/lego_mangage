define(function(require, exports, module) {

    //var Vue = require('./lib/vuefe');
    var $ = require('zepto');
    var commonTpl = require('./mpm.sys.htmlTpl'); //公共控制模板
    var moduleUtil = null;
    // var navbarCom = require("./jyb.vue.navbar");
    require.async('./mpm.sys.util', function(module) {
        moduleUtil = module;
    });

    /* npm管理 */
    var moduleBasicInfo = "";
    var moduleDataCenter ="";
    /* npm管理 */

    window.vueFnObj = {};

    var getStyle = function (componentIndex, callback, instance) {
        var that = this;
        //var url = 'http://'+location.host+'/'+(location.pathname.indexOf("martpagemaker_dev")>-1?'martpagemaker_dev':'martpagemaker')+'/php/handler.php?action=getselectedcomponentstyles&comid=' + instance.obj.componentIndex;
        var url = 'http://'+location.host+'/handle?action=getselectedcomponentstyles&comid=' + instance.obj.componentIndex;

        if (!that._arrStyle) {
            that._arrStyle = {};
            
        }
        if (that._arrStyle[componentIndex]) {
            //期待的是异步
            setTimeout(function () {
                instance.arrStyle = that._arrStyle[componentIndex];
                if (!instance.obj.data.styleKey) {
                    instance.obj.data.styleKey = that._arrStyle[componentIndex][0].id;
                }
                callback();
            }, 0);
            return;
        }
        $.get(url, function (data) {
            //debugger;
            //var list = eval('(' + data + ')').result;
            var list = data;
            that._arrStyle[componentIndex] = list;

            list.forEach(function (item, index, arr) {
                item.tpl_url = item.tpl_url && item.tpl_url.replace("mpm.wq.jd.com" , "localhost");
                if (item.com_extend) {
                    try {
                        item.com_extend = JSON.parse(item.com_extend);
                    } catch (e) {
                        item.com_extend = [];
                    }
                }
                //扩展js
                if (item.com_js) {
                    try {
                        window.vueFnObj['fn_' + item.id] = eval('(' + item.com_js + ')');
                    } catch (e) {
                        window.vueFnObj['fn_' + item.id] = {};
                    }
                }
            });
            instance.arrStyle = list;

            if (!instance.obj.data.styleKey) {
                instance.obj.data.styleKey = list[0].id;
            }
            callback();
        });
    };

    //获取编辑模板
    var getTplEdit = function (url, callback, instance) {
        var that = this;
        if (this._tplEdit) {
            instance.tplEdit = this._tplEdit;
            callback();
            return;
        }

        if (window.location.href.indexOf('martpagemaker_dev') > 0) {
            url = url.replace('/martpagemaker/', '/martpagemaker_dev/');
        }
        $.get(url, function (html) {
            that._tplEdit = html;
            instance.tplEdit = html;
            callback();
        });
    };

    exports.getClass = function (__config) {

        /**
         * 组件工厂
         * @param config
         * config.uid:domid
         * config.editBox:编辑框需要放入的节点
         * config.showBox:展示框需要放入的节点
         * config.rightBox:右侧展示组件列表
         */
        var _Class = function (config) {
            this.__config = __config;
            this.config = config;
            this.domStyle = ''; //组件的样式style dom
            this.domLinkStyle = '';//样式页面片中的外链样式
            this.domShow = ''; //中间展示的
            this.domEdit = ''; //编辑区域
            this.domRightList = ''; //右侧的列表
            this.arrStyle = ''; //组件对应的所有样式
            this.tplEdit = '';
            this.ready = false; //是否初始化完成
            this.obj = config.obj;

            if (!config.obj.data) {
                config.obj.type = __config.type;
                config.obj.data = Object.assign({}, __config.data);
            }

            if (!config.obj.child) {
                config.obj.child = [];//子组件的uid列表
            }
            config.obj.data.pageConfig = window.pageConfig;//线上页面，engine会扩展此对象

            config.obj.getComponentInfo = moduleUtil.component.get;

            this.obj.data.extend = this.obj.data.extend || {};
        };

        /**
         * init独立出来，方便子类重写
         */
        _Class.prototype.init = function (callback) {
            var that = this;
            var config = this.config;

            var _cb = function () {
                if (!that.tplEdit || !that.arrStyle) {
                    return;
                }

                that.ready = true;

                callback(that);
            };

            //按需异步加载模板数据
            _Class.getTplEdit(this.__config.defaultTplEdit, _cb, this);
            _Class.getStyle(config.obj.componentIndex, _cb, this);
            return this;
        };

        //展示右侧列表
        _Class.prototype._showRightList = function () {
            var config = this.config;

            this.domRightList = $('#rightbox_' + this.obj.uid);
            if(this.domRightList.find('span.name').html() == ''){
                this.domRightList.find('span.name').html(config.obj.componentName + config.obj.uid.replace(/^com/ig, ''));
                this.domRightList.attr("floorname",config.obj.componentName + config.obj.uid.replace(/^com/ig, ''));
            }
            this.domRightList.find('span.name').attr('title', this.obj.uid);
            this.domRightList.attr("componentname",config.obj.name);
        };

        //组件增加到实时展示区域中
        _Class.prototype._appendShowDom = function () {
            var that = this;
            var config = this.config;
            var styleObj = this._getStyle();
            var showDom = $('<div>').append($('<div class="mpm_show_tips"><span>上移</span><span>下移</span><span>删除</span></div>' + styleObj.template))[0];

            $('#show_' + this.obj.uid).append(showDom);

            var objForDomShow = {
                el: showDom,
                data: this.obj,
                events: {},
                watch: {
                    'data.styleKey': {
                        handler: function (val, oldVal) {
                            that.rebuildShowComponent();
                        },
                        deep: false
                    }
                }
            };

            for (var i = 0; i < this.__config.watch.length; i++) {
                objForDomShow.watch[this.__config.watch[i]] = {
                    handler: function (val, oldVal) {
                        that.rebuildShowComponent();
                    },
                    deep: false 
                };
            }

            if (this.domShow && this.domShow.$el) {
                that.domShow.$destroy(true);
                //this.domShow &&  this.domShow.$el && this.domShow.$el.remove && this.domShow.$el.remove();
                try{
                    this.domShow.$el.remove && this.domShow.$el.remove();
                }catch(e){
                    console.log(e);
                }
                 
            }

            this.domShow = new Vue(objForDomShow);
        };

        //展示编辑功能区域
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
                    },
                    selectNpmVersion: function () { /* npm管理 */
                        
                        console.info("切换",this.obj.name,"的版本是", this.obj.data.npmversion);
                        require.async('./mpm.sys.dataCenter', function (module) {
                            moduleDataCenter = module;
                        });
                        require.async('./mpm.sys.basicInfo', function (module) {
                            moduleBasicInfo = module;
                        });
                
                        var pageInfo = moduleBasicInfo.showMePageInfo();
                        var folderSet = moduleBasicInfo.showMeFolderName();
    
                        var path = "/data/lego/h5_lego_actpage/release/act/" + pageInfo.datefolder + "/" + folderSet.sub + "/";
    
                        moduleDataCenter.updataversion(this.obj.data.npmversion, this.obj.data.npmname, path, function () {
                            console.log("update ok ");
                        });
                    }
                }
            });

        };

        //独立出来，方便子类重写
        _Class.prototype.showCB = function () {
            var that = this;
            var config = this.config;
            var styleObj = this._getStyle();
            var objData = this.obj.data;

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

        var path = pageInfo.datefolder + "/" + folderSet.sub + "/";
        
        if(objData.npmname){ //仅仅为了兼容老的页面而已
            moduleDataCenter.getnodeversions(objData.npmname, path, function (json) {
                if(json.code == 0) {
                    that.obj.data.npmversionArr = json.data.version_list;
                    that.obj.data.npmversion = json.data.latest;
                } else {
                    alert(json.msg);
                }
            });
        }else{
            that.obj.data.npmversionArr = [];
        }
        
        
        /* npm管理 */

            //扩展js
            if (styleObj.com_js) {
                try {
                    window.vueFnObj['fn_' + this.obj.data.styleKey] = eval('(' + styleObj.com_js + ')');
                } catch (e) {
                    window.vueFnObj['fn_' + this.obj.data.styleKey] = {};
                }
            }

            this.extendObj(styleObj.com_extend);
            this.obj.data.fnObj = window.vueFnObj['fn_' + this.obj.data.styleKey];

            this.addCssByStyle();
            this.addLinkStyle();
            this._showRightList();
            this._appendShowDom();
            this._appendEditDom();
        };

        _Class.prototype.show = function (callback) {
            var that = this;
            var config = this.config;
            var styleObj = this._getStyle();

            

            if (this.__config.vueComponent) {
                this.__config.vueComponent.register({
                    tagName: this.__config.type
                });
                if(this.__config.type == 'jybswitchtab'){
                    // navbarCom.register({
                    //     tagName:'navbar'
                    // });
                }
            }

            //先占坑
            $('<div>').attr('id', 'editbox_' + that.obj.uid).attr('_mpm_edit_box_', 1).appendTo(config.editBox);
            $('<div>').attr('id', 'show_' + this.obj.uid).attr('_mpm_show_box_', 1).appendTo(config.showBox);
            $(commonTpl.operationItem).attr('id', 'rightbox_' + this.obj.uid).attr('_mpm_right_box_', 1).appendTo(config.rightBox);

            //异步获取模板文件
            var url = styleObj.tpl_url;
            if(location.hostname.indexOf("jyb")>-1){//兼容 jyb域名
                //url = url.replace("jtjr" , "jyb");
            }
            //http://act.jtjr.com/martpagemaker/template/new/ninegrid/show.1.html
            url = url.replace("act.jtjr.com/martpagemaker" , location.host);
            moduleUtil.getTemplateByUrl(url, function (json) {

                styleObj.com_css = json.com_css;
                styleObj.com_js = json.com_js;
                styleObj.com_extend = json.com_extend;
                styleObj.template = json.template;
                styleObj.com_sinclude_url = json.com_sinclude_url;
                styleObj.com_sinclude_content_url = json.com_sinclude_content_url;

                that.showCB(json);
                if (callback) {
                    callback(that);
                }
            });

            this.show = function () {
            };
        };

        //将MPM中使用的数据，转换到线上用的数据中
        _Class.prototype.extendObj = function (com_extend) {
            var that = this;
            var vueObj = that.obj.data.extend;

            if (com_extend && typeof com_extend == "string") {
                com_extend = JSON.parse(com_extend);
            }

            that.obj.com_extend = com_extend;
            if (!com_extend || com_extend.length == 0) {
                return;
            }
            for (var i = 0; i < com_extend.length; i++) {
                var item = com_extend[i];
                if (that.obj.data.extend[item.nick]) { //属性已经存在了
                    continue;
                }

                if (item.type == 'radio') {
                    Vue.set(vueObj, item.nick, item.data[0].value);
                }

                if (item.type == 'input') {
                    Vue.set(vueObj, item.nick, item.value);
                }
            }
            return this;
        };

        //属性修改了，需要重新构造展示的组件
        _Class.prototype.rebuildShowComponent = function () {
            var that = this;
            var styleObj = that._getStyle();
            var getTplCB = function () {

                //扩展js
                if (styleObj.com_js) {
                    try {
                        window.vueFnObj['fn_' + that.obj.data.styleKey] = eval('(' + styleObj.com_js + ')');
                    } catch (e) {
                        window.vueFnObj['fn_' + that.obj.data.styleKey] = {};
                    }
                }
                that.addCssByStyle();
                that.addLinkStyle();
                that.obj.data.fnObj = window.vueFnObj['fn_' + that.obj.data.styleKey];
                that.extendObj(styleObj.com_extend);
                console.info('rebuild Component ' + that.config.obj.componentName + '_' + that.config.obj.uid);

                that._appendShowDom();
            };


            that.obj.data.didTrigger = false;
            that.obj.data.didFinish = false;


            if (that.obj.data.itemList) {
                that.obj.data.itemList = [];
            }
            if (that.obj.data._itemList) {
                that.obj.data._itemList = [];
            }
            //异步获取模板文件
            styleObj.tpl_url = styleObj.tpl_url.replace("act.jtjr.com/martpagemaker" , location.host);
            moduleUtil.getTemplateByUrl(styleObj.tpl_url, function (json) {
                styleObj.com_css = json.com_css;
                styleObj.com_js = json.com_js;
                styleObj.com_extend = json.com_extend;
                styleObj.template = json.template;
                styleObj.com_sinclude_url = json.com_sinclude_url;
                styleObj.com_sinclude_content_url = json.com_sinclude_content_url;

                getTplCB();
            });
        };

        _Class.prototype._getStyle = function () {
            var that = this;
            return this.arrStyle.find(function (item, index) {
                return that.obj.data.styleKey == item.id;
            });
        };

        //和线上展示的页面数据结构对应起来 window._componentConfig[]
        _Class.prototype.getData = function () {
            var obj = this.getMPMData();
            var string = JSON.stringify(obj, null, '    ');
            string = string.replace(/"#fnObj#"/ig, 'window.vueFnObj.fn_' + this.config.obj.data.styleKey)
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
            delete obj['getComponentInfo']

            obj.data = Object.assign({}, obj.data);
            obj.data._itemList = [];
            obj.data.itemList = [];
            obj.data.fnObj = '#fnObj#';
            delete obj.data.pageConfig;

            return obj;
        };

        /**
         * 校验每个组件的输入 
         * @return 没问题返回true 否则返回错误提示
         */
        _Class.prototype.checkInput = function(){
            return true;
        }

        //线上页面，window.vueFnObj['fn_uid']
        _Class.prototype.getExtendJS = function () {
            var obj = this._getStyle();

            return 'fn_' + this.obj.data.styleKey + ':' + (obj.com_js || '{}');
        };

        //获取模板对象
        _Class.prototype.getTemplate = function () {
            return this._getStyle();
        };

        //线上页面，获取html 模板片段
        _Class.prototype.getHTMLString = function () {
            var div = $('<div>');
            var HTMLString = this._getStyle().template;
            var dom = $(HTMLString).attr('uid', this.obj.uid);
            var html;

            div.append(dom);
            html = div.html();
            div.remove();

            return html;
        };

        //线上页面，获取css片段
        _Class.prototype.getCSSString = function () {
            return this._getStyle().com_css || '';
        };

        //线上页面，获取css片段
        _Class.prototype.getSincludeUrl = function () {
            return this._getStyle().com_sinclude_url || '';
        };

        _Class.prototype.beforeChildRemove = function (uid, callback) {

        };

        //删除子组件后，父组件会收到通知
        _Class.prototype.afterChildRemove = function (uid, callback) {

        };

        //删除组件
        _Class.prototype.remove = function () {
            moduleUtil.component.remove(this.obj.uid);
        };

        //页面的一些前置参数，例如：判断是否是新人，是否是QQ会员，数据格式参考edit2.html中的window.pageConfig
        _Class.prototype.getPageConfig = function () {
            return '';
        };

        //内嵌的样式
        _Class.prototype.addCssByStyle = function () {

            var styleObj = this._getStyle();
            var doc = document;
            var style = "";
            if (this.domStyle) {
                $(this.domStyle).remove();
                this.domStyle = '';
            }

            if (styleObj.com_css) {
                style = doc.createElement("style");
                style.setAttribute("type", "text/css");
                style.setAttribute("id", this.config.obj.uid);

                if (style.styleSheet) { // IE
                    style.styleSheet.cssText = styleObj.com_css;
                } else { // w3c
                    var cssText = doc.createTextNode(styleObj.com_css);
                    style.appendChild(cssText);
                }

                var heads = doc.getElementsByTagName("head");
                if (heads.length) {
                    heads[0].appendChild(style);
                } else {
                    doc.documentElement.appendChild(style);
                }
            } else {

            }

            this.domStyle = style;

            return style;
        };

        //增加外链的样式，会先删除旧的，再增加新的
        _Class.prototype.addLinkStyle = function () {

            var styleObj = this._getStyle();
            var domLinkStyle;

            if (this.domLinkStyle) {
                $(this.domLinkStyle).remove();
                this.domLinkStyle = '';
            }

            if (styleObj.com_sinclude_content_url) {
                domLinkStyle = $('<link rel="stylesheet" href="" />');
                domLinkStyle.attr('href', styleObj.com_sinclude_content_url).attr('_uid', this.config.obj.uid);
                this.domLinkStyle = domLinkStyle;
                $('head').append(domLinkStyle);
            }
        };

        _Class._tplEdit = '';
        _Class._arrStyle = {};
        _Class.getStyle = getStyle;
        _Class.getTplEdit = getTplEdit;

        return _Class;
    };
});
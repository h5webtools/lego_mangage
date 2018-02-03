define(function (require, exports, module) {
    var $ = require('zepto'),
        CFG = require('./mpm.sys.config'),
        moduleShareSet = require('./mpm.sys.shareinfo'),
        //moduleMpjSysSet = require('./mpm.sys.mpj'),
        modulePageAddition = require('./mpm.sys.addition'),
        moduleOtherExtra = require('./mpm.sys.otherExtra'),
        moduleBasicInfo = require('./mpm.sys.basicInfo');
    var templateIndex = 1;
    var publishflag = "save";
    require.async('./mpm.sys.util', function (module) {
        moduleUtil = module;
    });

    require.async('./mpm.sys.structure', function (module) {
        moduleStructure = module;
    });
    //moduleStructure = require('');
    var pageInfo;
    var engineEntranceFile;
    var templatePageContent;
    var callback;
    var getEngineEntranceFile = function (cb) {
        $.get(CFG.root + 'sinclude/jsi/engineEnter_allinone_release.shtml?r=' + Math.random(), function (html) {
            engineEntranceFile = html;
            cb(html);
        });
    };
    var getTemplatePageContent = function (type, cb) {//这个cb是得到模板文件后的处理回调,一般是createFile里生成的匿名函数，
        //getTemplatePageContent挂在export下是方便其他想自行获取处理模板的地方
        var file;
        templateIndex = type;
        if (type == 1) {
            file = 'vue_common';
        } else if (type == 2) {
            file = 'vue_share';
        } else if (type == 3) {
            file = 'vue_pay';
        } else {
            moduleUtil.alert('获取模板文件出错,请检查页面基本信息');
            return;
        }
        if (moduleUtil.getUrlQuery('mpm_debug')) {
            file += '.debug';
        }


        $.get(CFG.root + 'template/' + file + '.shtml?r=' + Math.random(), function (html) {


            // var str1 = ['<!', '--MPM#', 'include'].join('');
            // var str2 = ['<!', '--', '#', 'include'].join('');

            //html = html.replace(new RegExp(str1, 'g'), str2);//取得模板文件后将包含页面片处理
            templatePageContent = html;

            //if(engineEntranceFile){
            cb(html);
            //}else{
            //getEngineEntranceFile(onSourceHTML);
            //}
        });
    };

    function onSourceHTML() {//这个cb来源一般是预览、发布两个功能，
        engineEntranceFile = true;
        if (!engineEntranceFile || !templatePageContent) {
            return;
        }

        var html = templatePageContent;
        var title = pageInfo.name;

        var mpmPageContent = moduleStructure.getPageContentSource();//window._componentConfig
        var shareInfo = moduleShareSet.getShareSource();//window.shareConfig
        
        var allTemplate = moduleStructure.getAllTemplate();
        var allCss = moduleStructure.getAllCss();
        var extendJS = moduleStructure.getExtendJS();//window.vueFnObj
        var pageConfig = moduleStructure.getPageConfig();//window.pageConfig
        var folderSet = moduleBasicInfo.showMeFolderName();
        var inputPageName = moduleBasicInfo.showMeInputPageName();
        var path = CFG.devFileRoot + folderSet.parent + '/', folder = folderSet.sub;
        var sincludeFile = moduleUtil.component.getSincludeUrl();

        var pagetype = $("#selectPageType").val();



        html = html.replace('{title}', '[title]').replace('{{[title]}}', title);
        html = html.replace('{mpmPageContent}', '[mpmPageContent]').replace('{{[mpmPageContent]}}', mpmPageContent);

        html = html.replace('{pageConfig}', '[pageConfig]').replace('{{[pageConfig]}}', pageConfig);//window.pageConfig
        html = html.replace('{sinclude}', '[sinclude]').replace('{{[sinclude]}}', sincludeFile.replace(/MPM#/g, '#'));

        html = html.replace('{extendJS}', '[extendJS]');//.replace('{{[extendJS]}}', extendJS);

        html = html.replace('{data}', '[data]');//.replace('{{[data]}}', mpmPageContent);
        html = html.replace('{template}', '[template]').replace('{{[template]}}', allTemplate);
        html = html.replace('{css}', '[css]').replace('{{[css]}}', allCss);
        html = html.replace('{{{engine}}}', engineEntranceFile);
        html = html.replace('{{{shareInfo}}}', shareInfo);


        html = html.replace('{{{timestamp}}}', 't=' + (new Date()).getTime());

        var bodyBgColor = moduleOtherExtra.getBackgroundColor();
        bodyBgColor = bodyBgColor ? 'style=background-color:' + bodyBgColor : '';
        html = html.replace('{bodyBgColor}', '[bodyBgColor]').replace('{{[bodyBgColor]}}', bodyBgColor);

        //生成对应的config文件
        var mpmData = moduleUtil.component.getMPMData(),
            comConfig = "var vuecomponents = { \n ";
        var devFlag = moduleUtil.getUrlQuery('mdev');
        var devFolder = devFlag ? "dev/" : "";
        var customCodeSource = "<!--custom template--> \n";
        if (moduleUtil.getUrlQuery("pageid") == 19 || moduleUtil.getUrlQuery("pageid") > 236) {
            //comConfig += "ninegrid:require('@lego/ninegrid'), \n "
            for (var key in mpmData) {
                var _data = mpmData[key],
                    _type = _data.type,
                    _name = _data.name;
                if (_type == 'commontag' && comConfig.indexOf("@lego/commontag") == -1) {
                    comConfig += "commontag:require('@lego/commontag'), \n "
                } else if (_type == 'jybregister' && comConfig.indexOf("userregister") == -1) {
                    comConfig += "userregister:require('@lego/jybregister'), \n "
                } else if (_type == 'productlist' && comConfig.indexOf("productlist") == -1) {
                    comConfig += "productlist:require('@lego/productlist'), \n "
                } else if (_type == 'ninegrid' && comConfig.indexOf("ninegrid") == -1) {
                    comConfig += "ninegrid:require('@lego/ninegrid'), \n "
                } else if (_type == 'jybwxhkpay' && comConfig.indexOf("jybwxhkpay") == -1) {
                    comConfig += "jybwxhkpay:require('@lego/jybwxhkpay'), \n "
                } else if (_type == 'jybswitchlist' && comConfig.indexOf("jybswitchlist") == -1) {
                    comConfig += "jybswitchlist:require('@lego/jybswitchlist'), \n "
                } else if (_type == 'jybranklist' && comConfig.indexOf("jybranklist") == -1) {
                    comConfig += "jybranklist:require('@lego/jybranklist'), \n "
                } else if (_type == 'jybactrolling' && comConfig.indexOf("jybactrolling") == -1) {
                    comConfig += "jybactrolling:require('@lego/jybactrolling'), \n "
                } else if (_type == 'jybexchange' && comConfig.indexOf("jybexchange") == -1) {
                    comConfig += "jybexchange:require('@lego/jybexchange'), \n "
                } else if (_type == 'jybpay' && comConfig.indexOf("jybpay") == -1) {
                    comConfig += "jybpay:require('@lego/jybpay'), \n "
                }else if (_type == 'jybfigure' && comConfig.indexOf("jybfigure") == -1) {
                    comConfig += "jybfigure:require('@lego/jybfigure'), \n "
                } 
                //获取自定义代码 
                if (_name == 'customcode') {
                    debugger;
                    customCodeSource += _data.data.code + "\n";
                }

            }
            comConfig += "};";
        } else {
            for (var key in mpmData) {
                var _data = mpmData[key],
                    _type = _data.type,
                    _name = _data.name;
                if (_type == 'commontag' && comConfig.indexOf("commontag") == -1) {
                    comConfig += "commontag:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.commontag'), \n "
                } else if (_type == 'jybregister' && comConfig.indexOf("userregister") == -1) {
                    comConfig += "userregister:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.jybregister'), \n "
                } else if (_type == 'productlist' && comConfig.indexOf("productlist") == -1) {
                    comConfig += "productlist:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.productlist'), \n "
                } else if (_type == 'ninegrid' && comConfig.indexOf("ninegrid") == -1) {
                    comConfig += "ninegrid:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.ninegrid'), \n "
                } else if (_type == 'jybwxhkpay' && comConfig.indexOf("jybwxhkpay") == -1) {
                    comConfig += "jybwxhkpay:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.jybwxhkpay'), \n "
                } else if (_type == 'jybswitchlist' && comConfig.indexOf(".jybswitchlist") == -1) {
                    comConfig += "jybswitchlist:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.jybswitchlist'), \n "
                } else if (_type == 'jybranklist' && comConfig.indexOf(".jybranklist") == -1) {
                    comConfig += "jybranklist:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.jybranklist'), \n "
                } else if (_type == 'jybactrolling' && comConfig.indexOf(".jybactrolling") == -1) {
                    comConfig += "jybactrolling:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.jybactrolling'), \n "
                } else if (_type == 'jybexchange' && comConfig.indexOf(".jybexchange") == -1) {
                    comConfig += "jybexchange:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.jybexchange'), \n "
                } else if (_type == 'jybpay' && comConfig.indexOf(".jybpay") == -1) {
                    comConfig += "jybpay:require('../../../actconfig/" + devFolder + "modules/mobile/vuecomponent/jyb.vue.jybpay'), \n "
                } 
                //获取自定义代码 
                if (_name == 'customcode') {
                    debugger;
                    customCodeSource += _data.data.code + "\n";
                }

                //是否引入分享模块
                var _shareInfo = moduleShareSet.getShareInfo(),
                    _shareModule = "shareConfig:require('../../modules/" + devFolder + "mobile/component/share'), \n ";
                (templateIndex == 2 && _shareInfo.title && _shareInfo.desc) ? (comConfig += _shareModule) : "";

               

            }
            comConfig += "};";
        }




        html = html.replace('{{{customcode}}}', customCodeSource + "<!--custom template-->");
        
        path = "/data/lego/h5_lego_actpage/release/act/"
        $.post(CFG.phpRoot + 'createHtmlFile', {
            path: path,
            folder: folder,
            pagename: inputPageName,
            pageid: moduleUtil.getUrlQuery('pageid'),
            content: html,
            extendJS: extendJS,
            comConfig: comConfig,
            datefolder: pageInfo.datefolder,
            oldPagePath: pageInfo.oldPageMenu || "",
            mpmPageContent: mpmPageContent,
            publishflag: publishflag,
            mdev: devFlag ? '0' : '1',
            jsmin: moduleUtil.getUrlQuery('mdebug') ? '0' : '1',
            publishid:LegoPageConfig.publishid || 63
        }, callback, 'json');
        /**
         path:以"/"结尾的dev路径,
         folder:活动页面存放的文件夹
         con:html代码
         */
    }

    exports.createFile = function (cb, flag) {
        callback = cb;
        publishflag = flag || "save";
        pageInfo = moduleBasicInfo.showMePageInfo();
        //修复发布两次bug
        getTemplatePageContent(pageInfo.type, onSourceHTML);
        
    };
});
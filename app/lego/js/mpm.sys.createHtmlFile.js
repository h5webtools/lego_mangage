
define(function (require, exports, module) {
  var $ = require('zepto'),
      modulePageAddition = require('./mpm.sys.addition'),
      moduleBasicInfo = require('./mpm.sys.basicInfo'),
      moduleDataCenter = require('./mpm.sys.dataCenter');
  var templateIndex = 1;
  var publishflag = "save";
  var pageInfo;
  var engineEntranceFile;
  var templatePageContent;
  var callback;

  require.async('./mpm.sys.util', function (module) {
    moduleUtil = module;
  });

  require.async('./mpm.sys.structure', function (module) {
    moduleStructure = module;
  });

  var getTemplatePageContent = function (type, cb) {//这个cb是得到模板文件后的处理回调,一般是createFile里生成的匿名函数，
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

    $.get(location.origin + '/public/template/' + file + '.shtml?r=' + Math.random(), function (html) {
      templatePageContent = html;
      cb(html);
    });
  };

  function onSourceHTML() {
    engineEntranceFile = true;
    if (!engineEntranceFile || !templatePageContent) {
      return;
    }

    var html = templatePageContent;
    var title = pageInfo.name;

    var mpmPageContent = moduleStructure.getPageContentSource();//window._componentConfig
    var shareInfo = moduleBasicInfo.getShareSource();//window.shareConfig

    var allTemplate = moduleStructure.getAllTemplate();
    var allCss = moduleStructure.getAllCss();
    var extendJS = moduleStructure.getExtendJS();//window.vueFnObj
    var pageConfig = moduleStructure.getPageConfig();//window.pageConfig
    var folder = moduleBasicInfo.showMeFolderName();
    var inputPageName = moduleBasicInfo.showMeInputPageName();
    var sincludeFile = moduleUtil.component.getSincludeUrl();

    var pagetype = $("#selectPageType").val();

    html = html.replace('{title}', '[title]').replace('{{[title]}}', title);
    html = html.replace('{mpmPageContent}', '[mpmPageContent]').replace('{{[mpmPageContent]}}', mpmPageContent);

    html = html.replace('{pageConfig}', '[pageConfig]').replace('{{[pageConfig]}}', pageConfig);//window.pageConfig

    html = html.replace('{extendJS}', '[extendJS]');//.replace('{{[extendJS]}}', extendJS);

    html = html.replace('{data}', '[data]');//.replace('{{[data]}}', mpmPageContent);
    html = html.replace('{template}', '[template]').replace('{{[template]}}', allTemplate);
    html = html.replace('{css}', '[css]').replace('{{[css]}}', allCss);
    html = html.replace('{{{engine}}}', engineEntranceFile);
    html = html.replace('{{{shareInfo}}}', shareInfo);
    html = html.replace('{{{timestamp}}}', 't=' + (new Date()).getTime());

    var bodyBgColor = pageInfo.bgColor;
    bodyBgColor = bodyBgColor ? 'style=background-color:' + bodyBgColor : '';
    html = html.replace('{bodyBgColor}', '[bodyBgColor]').replace('{{[bodyBgColor]}}', bodyBgColor);

    //生成对应的config文件
    var mpmData = moduleUtil.component.getMPMData(),
      comConfig = "var vuecomponents = { \n ";
    var devFlag = moduleUtil.getUrlQuery('mdev');
    var devFolder = devFlag ? "dev/" : "";
    var customCodeSource = "<!--custom template--> \n";
    if (moduleUtil.getUrlQuery("page_id") == 19 || moduleUtil.getUrlQuery("page_id") > 236) {
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
        } else if (_type == 'jybfigure' && comConfig.indexOf("jybfigure") == -1) {
          comConfig += "jybfigure:require('@lego/jybfigure'), \n "
        } else if (_type == 'jybimgmap' && comConfig.indexOf(".jybimgmap") == -1) {
          comConfig += "jybimgmap:require('@lego/jybimgmap'), \n "
        } else if (_type == 'jybtasks' && comConfig.indexOf(".jybtasks") == -1) {
            comConfig += "jybtasks:require('@lego/jybtasks'), \n "
        } else if (_type == 'jybsignin' && comConfig.indexOf(".jybsignin") == -1) {
            comConfig += "jybsignin:require('@lego/jybsignin'), \n "
        }  
        //获取自定义代码 
        if (_name == 'customcode') {
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
          customCodeSource += _data.data.code + "\n";
        }
        //是否引入分享模块
        var _shareModule = "shareConfig:require('../../modules/" + devFolder + "mobile/component/share'), \n ";
        (templateIndex == 2 && pageInfo.share_desc && pageInfo.share_title) ? (comConfig += _shareModule) : "";
      }
      comConfig += "};";
    }

    html = html.replace('{{{customcode}}}', customCodeSource + "<!--custom template-->");

    moduleDataCenter.packageAct({
      folder: folder.sub,
      pagename: inputPageName,
      pageid: moduleUtil.getUrlQuery('page_id'),
      content: html,
      extendJS: extendJS,
      comConfig: comConfig,
      datefolder: pageInfo.datefolder,
      oldPagePath: pageInfo.oldPageMenu || "",
      mpmPageContent: mpmPageContent,
      publishflag: publishflag,
      mdev: devFlag ? '0' : '1',
      jsmin: moduleUtil.getUrlQuery('mdebug') ? '0' : '1',
      publishid: 63,
      pveventid:$('#pvEventid').val() || ''
    }, callback);
  }

  exports.createFile = function (cb, flag) {
    callback = cb;
    publishflag = flag || "save";
    pageInfo = moduleBasicInfo.showMePageInfo();
    //修复发布两次bug
    getTemplatePageContent(pageInfo.type, onSourceHTML);
  };
});
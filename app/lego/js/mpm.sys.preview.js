define(function (require, exports, module) {
  var $ = require('zepto'),
    moduleUtil = "",
    moduleBasicInfo = require('./mpm.sys.basicInfo'),
    previewURL = '',
    preViewRoot = 'https://cdnsit.jyblife.com/',
    pageInfo,
    moduleCreateFile = require('./mpm.sys.createHtmlFile');
  var previewBtn = $('#previewBtn'),
    publishBtn = $("#publishBtn"),
    prePublishBtn = $("#prePublishBtn");
 
  var mpmStructureModule = require('./mpm.sys.structure');

  var publishSta = "save";

  require.async('./mpm.sys.util', function (module) {
    moduleUtil = module;
  });

  function createCB(d) {
    console.log('生成文件:', d);
    var folderSet = moduleBasicInfo.showMePageInfo();
    var _oldPagePath = folderSet.oldPageMenu,
      _fileName = "index.html",
      _path = folderSet.path.split("/")[5];
    try {
      if (_oldPagePath) {
        var pathArr = _oldPagePath.split("/"),
          colName1 = pathArr[0],
          colName2 = pathArr[1],
          fileName = pathArr[2];

        console.log(_oldPagePath, colName1, colName2, fileName);

        folderSet.datefolder = colName1;
        _path = colName2;
        _fileName = fileName || "index.html";
      }

    } catch (e) {

    }
    var des = '发布系统建单成功，请到发布系统进行部署！';
    var previewURL = "https://cdnsit.jyblife.com/act/" + folderSet.datefolder + "/" + _path + "/" + _fileName;
    var publishURL = "https://cdn.jyblife.com/act/" + folderSet.datefolder + "/" + _path + "/" + _fileName;
    if (publishSta == "preview") {
      des = des + "<br> 集成测试地址：" + previewURL;
    } else if (publishSta == "publish") {
      des = des + "<br> 正式环境地址：" + publishURL;
    } else if (publishSta == "prepublish") {
      des = des + "<br> 预发布环境地址：" + publishURL;
    }
    console.log(previewURL);
    if (publishSta == "preview" || publishSta == "publish" || publishSta == "prepublish") {
      moduleUtil.alert(des);
    }
    if (d.size < 1) {
      moduleUtil.alert('生成文件失败');
      return;
    }
  }

  function writeFile(e) {
    var _target = $(e.target);
    _target.hasClass("previews") ? publishSta = "preview" : "";
    _target.hasClass("prepublishs") ? publishSta = "prepublish" : "";
    _target.hasClass("publishs") ? publishSta = "publish" : "";
    mpmStructureModule.savePageData(function (num) {
      if (num >= 0) {
        moduleCreateFile.createFile(createCB, publishSta);
      } else {
        moduleUtil.alert('生成文件失败(savePageData)');
      }
    });
  }

  exports.main = function () {
    previewBtn.on('click', writeFile);
    publishBtn.on("click", writeFile);
    prePublishBtn.on("click", writeFile);
  };
});



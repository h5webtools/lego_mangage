define(function (require, exports, module) {
    var $ = require('zepto'),
        CFG = require('./mpm.sys.config'),
        moduleUtil = require('./mpm.sys.util'),
        moduleBasicInfo = "",
       
        // moduleUploader = require('./mpm.sys.h5fileupload'),
        moduleDataCenter = require('./mpm.sys.dataCenter');

    require.async('./mpm.sys.basicInfo', function(module) {
        moduleBasicInfo = module;
    });

    var myDOM = $('#divShareInfoSet'), 
        previewImg = myDOM.find('img'),
        textShareTitle = $('#textShareTitle'), textShareDesc = $('#textShareDesc'),
        textShareImgUrl = $("#textShareImgUrl"),
        shareInfoSaveBtn = $('#shareInfoSaveBtn'), shareInfoCancelBtn = $('#shareInfoCancelBtn');
    var pageId, oldData, fileUploader, maxImageSize = 1024 * 1024, tempSrc, tempShareObj;

    var pageInfo;


    

    function showSetting() {
        pageInfo = moduleBasicInfo.showMePageInfo();
        previewImg.attr('src', oldData.img_url);
        textShareImgUrl.val(oldData.img_url);
        textShareTitle.val(oldData.title);
        textShareDesc.val(oldData.desc);
        tempSrc = textShareImgUrl.value;
        

        if(pageInfo.type == 2 ){
            myDOM.show();
        }
    }
    function cancelEdit() {
        myDOM.hide();
        $(document).trigger('subeditend');
    }
    function validateInput() {
        // var title = textShareTitle.val().replace(/['"\s]/g, ''),
        //     desc = textShareDesc.val().replace(/['"\s]/g, '');
        // if (!title) {
        //     moduleUtil.alert('分享标题错误');
        //     return false;
        // }
        // if (!desc) {
        //     moduleUtil.alert('分享描述错误');
        //     return false;
        // }
        return true;
    }
    function getNewPageShare() {
        oldData.title = textShareTitle.val().replace(/['"\s]/g, '');
        oldData.desc = textShareDesc.val().replace(/['"\s]/g, '');
        if (tempSrc != null) { oldData.img_url = tempSrc }
        return JSON.stringify(oldData);
    }
    function saveEdit(newPageId) {
        var title = textShareTitle.val().replace(/['"\s]/g, ''),
            desc = textShareDesc.val().replace(/['"\s]/g, ''),
            tempSrc = textShareImgUrl.val().replace(/['"\s]/g, '');
        var pageInfo = moduleBasicInfo.showMePageInfo();
        tempShareObj = { "img_url": oldData.img_url, "img_width": 80, "img_height": 80 };
        var titleAlter = false, descAlter = false, imgAlter = false;
        if (!title && pageInfo.type==3) {
            moduleUtil.alert('标题不对');
            return;
        }
        if (!desc && pageInfo.type==3) {
            moduleUtil.alert('描述不对');
            return;
        }
        //debugger;
        tempShareObj.title = title;
        tempShareObj.desc = desc;
        tempShareObj.img_url = tempSrc;
        if (title != oldData.title) { titleAlter = true }
        if (desc != oldData.desc) { descAlter = true }
        if (tempSrc != oldData.img_url) { imgAlter = true }
        //if (tempSrc != null) { tempShareObj.img_url = tempSrc; imgAlter = true; }
        //if (!(titleAlter || descAlter || imgAlter)) { return }
        moduleDataCenter.updateShareInfo(pageId || newPageId, tempShareObj, onUpdate);
    }
    function onUpdate(num) {
        if (num >= 0) {
            moduleUtil.alert('保存成功');  
        }
        oldData = tempShareObj;
        cancelEdit();
    }
    function fileSelectHandler(file) {
        console.log('上传图片属性', file);
        pageInfo = moduleBasicInfo.showMePageInfo();
        var savepath = "/data/lego/h5_lego_actpage/release/act/"+
                        pageInfo.datefolder+"/"+
                        pageInfo.path.split("/")[5]+
                        "/assets/images/";
        if (file.size > maxImageSize) {
            moduleUtil.alert('图片超过10KB');
            return;
        }
        if(!/^[0-9A-Za-z_.]{1,100}$/.test(file.name)){
             moduleUtil.alert('图片命名最好是字母下划线和数字的组合,请重新命名');
             return;
        }
        var extName = file.name.split('.'); //extName = extName[extName.length - 1];
        // fileUploader.addPostData('savename', file.name);
        //保存路径修改下
        // fileUploader.addPostData('savepath', savepath);
        // fileUploader.upload();
    }
    function uploadImgSuccess(d,dom) {
       var d = JSON.parse(d);
       var path ="./assets/images/"+ d.filePath.split("/").pop();
       $(".preview").attr("src",path);
       $("#textShareImgUrl").val(path);
       console.log("path");
    }
    function uploadImgError() {
       console.log(d);
    }
    function onJFS(url) {
       
    }

    exports.getShareSource = function () {
        return 'window.shareConfig=' + JSON.stringify(oldData) + ';';
    };
    exports.getShareInfo = function () {
        return oldData;
    };
    exports.validateInput = validateInput;
    exports.updateShareInfo = saveEdit;
    exports.getNewPageShare = getNewPageShare;

    exports.main = function (pageid, shareinfo) {
        if (pageid === 0) {//新建页面
            oldData = { "img_url": "https://cdn.jyblife.com/static/style/app/publish/img/nocard/logo.png", 
            "img_width": 80, "img_height": 80,
             "title": "",
              "desc": "" };
        } else {
            pageId = pageid;
            shareinfo.img_width = 80;
            shareinfo.img_height = 80;
            oldData = shareinfo;
        }
        
      	$('#basicInfoBtn').on('click', showSetting);
        
        shareInfoSaveBtn.on('click', saveEdit);//在基本信息里面一起操作
        shareInfoCancelBtn.on('click', cancelEdit);
        // fileUploader = new moduleUploader.ajaxUploader({
        //     dom: myDOM.find('.uploadBtn')[0],
        //     url: CFG.phpRoot + 'ajaxFileUpload',
        //     onchange: fileSelectHandler,
        //     uploadsuccess: uploadImgSuccess,
        //     uploaderror: uploadImgError
        // });
    }
});
define(function (require, exports, module) {
    var $ = require('zepto'),
        moduleUtil = require('./mpm.sys.util'),
        moduleShareSet = require('./mpm.sys.shareinfo'),
        modulePageAddition = require('./mpm.sys.addition'),
        moduleOtherExtra = require('./mpm.sys.otherExtra'),
        mpmDateInputLib = require('./mpm.sys.calendar').mpmDateInputLib,
        moduleDataCenter = require('./mpm.sys.dataCenter');
    var divTopMenu = $('#divTopMenu'),
        basicInfoBtn = $('#basicInfoBtn'),
        thisModuleDOM = $('#divBasicInfoSet'),
        selectPageType = $('#selectPageType'),      //页面类型
        inputPageName = $('#inputPageName'),        //活动名称
        selectPagePath = $('#selectPagePath'),		//页面路径
        inputPageMenu = $('#inputPageMenu'),		//目录名称
        inputOldPageMenu = $('#inputOldPageMenu'),		//老老链接目录名称
        expireTime = $('#expireTime'),              //过期时间
        expireUrl = $('#expireUrl'),				//过期跳转链接
        shareInfoControl = $('#shareInfoControl'),
        basicInfoCancelBtn = $('#basicInfoCancelBtn'),
        basicInfoSaveBtn = $('#basicInfoSaveBtn'),
        templateid = moduleUtil.getUrlQuery('tid') || '';

    var curPage = {
        id: 0,
        name: '',
        path: '',
        type: 1,
        actLevel:'0',
        actType:'2',
        sortid: ''
    }, creatingNew = false, newPath, oldPageInfo,
        firstLoadInfoData = true,
        menuReg = /^[a-zA-Z0-9_]{5,30}$/;

    function saveInfo() {
        if (inputPageName.val().length < 3) {
            moduleUtil.alert('名称长度不能小于3');
            return;
        }
        if (selectPagePath.val() == 0) {
            moduleUtil.alert('请选择路径');
            return;
        }
        if (!menuReg.test(inputPageMenu.val())) {
            moduleUtil.alert('目录名称不合法');
            return;
        }
        
        if (!expireTime.val()) {
            moduleUtil.alert('请填写过期时间');
            return;
        }
        
        /*if (!/^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(expireUrl.val())) {
            moduleUtil.alert('跳转链接有误');
            return;
        }*/
        
        
        
        curPage.type = selectPageType.val();
        curPage.name = inputPageName.val().replace(/['"]/g, "");
        curPage.expireUrl = expireUrl.val();
        curPage.oldPageMenu = inputOldPageMenu.val().trim();;
        curPage.expireTime = null;
        if (expireTime.val().length > 8) {
            curPage.expireTime = expireTime.val();
        }
        
        if (!moduleShareSet.validateInput()) {
            return;
        }

        newPath = selectPagePath.val() + inputPageMenu.val() + '/';
        if (newPath == curPage.path) {
            onCheckPath(0);
        } else {
            moduleDataCenter.checkPath(newPath, onCheckPath);
        }
    }

    function onCheckPath(n) {
        if (n > 0) {
            moduleUtil.alert('目录已存在');
        }
        else {
            curPage.path = newPath;
            if (creatingNew) {
                curPage.shareinfo = moduleShareSet.getNewPageShare();
                curPage.templateid = templateid;
                moduleDataCenter.createNewPage(curPage, function (newId) {

                    if (newId == 0) {
                        moduleUtil.alert('新建页面失败');
                    }
                    else {
                        
                        moduleShareSet.updateShareInfo(newId);//基本信息保存后触发分享信息更新
                        var act_id = moduleUtil.getUrlQuery("act_id");
                        if(act_id){
                            moduleDataCenter.savePageRelaction(newId ,act_id , function(json){
                                console.log("上报成功");
                                setTimeout(function(){
                                    location.replace('?pageid=' + newId+"&act_id="+act_id);
                                } , 1000);
                            });
                        }else{
                            setTimeout(function(){
                                location.replace('?pageid=' + newId);
                            } , 1000);
                        }
                        
                        
                    }
                });
            } else {
                curPage;
                oldPageInfo;
                console.log(curPage);
                if(oldPageInfo.page_path != curPage.path){
                    moduleUtil.alert('目录名称和页面路径不可以修改');
                    return;
                }
                moduleDataCenter.updatePageBasicInfo(curPage, function (d) {
                    moduleUtil.alert('保存成功');
                    moduleShareSet.updateShareInfo();//基本信息保存后触发分享信息更新

                    setTimeout(function () {
                        thisModuleDOM.hide();
                        $(document).trigger('subeditend');
                    }, 100);
                    onGetInfo(d);
                })
            }
        }
    }

    function onGetInfo(d) {
        console.info('页面信息', d);
        if (d) {
            oldPageInfo = d;

            curPage.id = d.page_id;
            setInputValueByInfo(d);
            if (firstLoadInfoData) {//第一次获得数据后，各子模块设置一次
                firstLoadInfoData = false;
                var shareInfo = {				//分享
                	img_url:d.share_img_url,    
                	title:d.share_title,
                	desc:d.share_desc
                }
                moduleShareSet.main(curPage.id, shareInfo);
                
                var extraInfo = {            //扩展信息
                	bgColor:d.page_bgcolor
                }
                
                moduleOtherExtra.main(curPage.id, extraInfo);
            }
        } else {
            moduleUtil.alert('页面不存在');
            divTopMenu.hide();
        }
    }

    function setInputValueByInfo(obj) {
        curPage.sortid = obj.pagesortid;
        curPage.type = obj.page_type;
        curPage.path = obj.page_path;
        curPage.datefolder = obj.date_folder;
        curPage.name = obj.page_name;
        curPage.oldPageMenu = obj.oldPageMenu || obj.old_page_path || "";
        curPage.content = obj.page_content;
        curPage.expireTime = obj.page_expire_time;
        curPage.expireUrl = obj.page_expire_url;
        curPage.pageCreateDate = obj.page_createdate;
        selectPageType.val(curPage.type);
        inputPageName.val(curPage.name);
        typeChange();
        var s = curPage.path.split('/'), menu = s[s.length - 2], pathV = s.slice(0, s.length - 2).join('/') + '/';
        selectPagePath.val(pathV);
        inputPageMenu.val(menu);
        inputOldPageMenu.val(curPage.oldPageMenu);
        expireUrl.val(curPage.expireUrl);
        expireTime.val(curPage.expireTime);
        /*路径和页面名称不可修改 */
        selectPagePath.attr("disabled" , "true");
        inputPageMenu.attr("disabled" , "true");
        /*路径和页面名称不可修改*/
        // if(curPage.actLevel == '0'){
        //     actLevel.eq(1).attr("checked",true);
        // }else{
        //     curPage.actLevel = '1';
        //     actLevel.eq(0).attr("checked",true);
        // }
        
        // if(curPage.actType == '3'){
        //     actType.eq(1).attr("checked",true);
        // }else{
        //     curPage.actType = '2';
        //     actType.eq(0).attr("checked",true);
        // }
        
        initExpireTime();
    }
    
    function initExpireTime(){
    	var today = new Date();
        mpmDateInputLib(expireTime, {
            chosendate: today,
            //开始年份
            startdate: today.getFullYear(),
            //结束年份
            enddate: today.getFullYear() + 3,
            //时间格式
            timeFormat: 'hh:ii:ss', //hh:ii:ss
            hasTime: true,
            x: 0,
            y: 30,
            //选择完成后的回调事件
            callback: function (datepicker) {
                console.log('选定日期', datepicker.value);
            }
        });
    }

    function cancelSave() {
        thisModuleDOM.hide();	
        $(document).trigger('subeditend');
        setInputValueByInfo(oldPageInfo);
    }

    function startEdit() {
        $(document).trigger('subeditstart');
        thisModuleDOM.show();//基本设置框
    }
    
    function getNextYear(){
    	var now = new Date();
    	var year = now.getFullYear()+1;
    	var month = (now.getMonth()+1)>10?now.getMonth()+1:'0'+(now.getMonth()+1);
    	var day = now.getDate()>10?now.getDate():'0'+now.getDate();
    	return year+'/'+month+'/'+day+' 00:00:00';
    }
    
    function typeChange(){
        $("html").css("fontSize" , "50px");
    }

    exports.showMeFolderName = function () {
        var s = curPage.path.split('/');
        return {
            parent: s[s.length - 3],
            sub: s[s.length - 2]
        };
    };
    exports.showMeInputPageName = function () {
        
        return curPage.name;
    };
    exports.showMePageInfo = function () {
        return curPage;
    };
    exports.getPageInfo = function (page, user, cb) {
        moduleDataCenter.getPageBasicInfo(page, function (d) {
            onGetInfo(d);
            cb(d);
        });
    };
    exports.newPage = function () {
        creatingNew = true;
        basicInfoCancelBtn.hide();
        moduleShareSet.main(0);
        
        initExpireTime();
        basicInfoBtn.trigger('click');
    };
    function showShareInfo(){
        $("#divShareInfoSet").show();
    }
    exports.main = function () {
        basicInfoBtn.on('click', startEdit);
        basicInfoSaveBtn.on('click', saveInfo);
        basicInfoCancelBtn.on('click', cancelSave);
    };
});
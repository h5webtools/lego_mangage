define(function (require, exports, module) {
  var $ = require('zepto'),
    moduleUtil = require('./mpm.sys.util'),
    modulePageAddition = require('./mpm.sys.addition'),
    mpmDateInputLib = require('./mpm.sys.calendar').mpmDateInputLib,
    moduleDataCenter = require('./mpm.sys.dataCenter');
  var divTopMenu = $('#divTopMenu'),
    basicInfoBtn = $('#basicInfoBtn'),
    thisModuleDOM = $('#divBasicInfoSet'),
    selectPageType = $('#selectPageType'),      //页面类型
    inputPageName = $('#inputPageName'),        //活动名称
    selectPagePath = $('#selectPagePath'),		//页面路径
    inputPageMenu = $('#inputPageMenu'),		//目录名称
    inputOldPageMenu = $('#inputOldPageMenu'),	//老链接目录名称
    expireTime = $('#expireTime'),              //过期时间
    expireUrl = $('#expireUrl'),				//过期跳转链接
    bgColor = $('#bgColor'),				    //背景色
    bgColorTo = $('#bgColorTo'),				//渐变色
    pvEventid = $('#pvEventid'),				//上报ID
    textShareImgUrl = $('#textShareImgUrl'),    //分享图标
    textShareTitle = $('#textShareTitle'),      //分享标题
    textShareDesc = $('#textShareDesc'),        //分享描述
    shareInfoControl = $('#shareInfoControl'),
    basicInfoCancelBtn = $('#basicInfoCancelBtn'),
    basicInfoSaveBtn = $('#basicInfoSaveBtn'),
    templateid = moduleUtil.getUrlQuery('tid') || '';

  var curPage = {
    id: 0,
    name: '',
    path: '',
    type: 1,
    actLevel: '0',
    actType: '2',
    sortid: ''
  }, creatingNew = false, newPath, oldPageInfo,
    firstLoadInfoData = true,
    menuReg = /^[a-zA-Z0-9_]{5,30}$/;

  function saveInfo() {
    if (inputPageName.val().length < 3) {
      moduleUtil.alert('名称长度不能小于3');
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

    curPage.type = selectPageType.val();
    curPage.name = inputPageName.val().replace(/['"]/g, '');
    curPage.expireUrl = expireUrl.val();
    curPage.oldPageMenu = inputOldPageMenu.val().trim();
    curPage.shareImgUrl = textShareImgUrl.val().trim();
    curPage.shareTitle = textShareTitle.val().trim();
    curPage.shareDesc = textShareDesc.val().trim();
    curPage.expireTime = null;
    curPage.extraData = {
      bgColor: bgColor.val().trim(),
      bgColorTo: bgColorTo.val().trim(),
      pvEventid: pvEventid.val().trim()
    };
    if (expireTime.val().length > 8) {
      curPage.expireTime = expireTime.val();
    }

    newPath = inputPageMenu.val();
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
      var act_id = moduleUtil.getUrlQuery("act_id");
      curPage.path = newPath;
      curPage.actId = act_id;
      if (creatingNew) {
        curPage.templateid = templateid;
        moduleDataCenter.createNewPage(curPage, function (json) {
          var newId = 0,
              act_url = '';
          var replaceUrl = function(url){
            setTimeout(function () {
              location.replace(url);
            }, 1000);
          };

          if (json.code == 0) {//创建页面成功
            var _data = json.data;
            newId = _data.page_id;
            replaceUrl('?page_id=' + newId + "&act_id=" + act_id);
          } else if(json.code == '810010'){//页面创建成功 但是未关联page_id与act_id
            var _data = json.data;
            newId = _data.page_id;
            act_url = _data.cdn_prefix + _data.date_folder + '/' + curPage.path + '/' + 'index.html' + '?actId=' + act_id;
            moduleDataCenter.savePageRelaction(newId, act_id, act_url , function (json) {
              if(json.code == 0){
                replaceUrl('?page_id=' + newId + "&act_id=" + act_id);
              }else{
                moduleUtil.alert('活动号未与页面关联，请联系开发');
                replaceUrl('?page_id=' + newId + "&act_id=" + act_id);
              }
            });
          } else {
            moduleUtil.alert('新建页面失败');
          }
        });
      } else {
        if (oldPageInfo.page_path != curPage.path) {
          moduleUtil.alert('目录名称和页面路径不可以修改');
          return;
        }
        moduleDataCenter.updatePageBasicInfo(curPage, function (d) {
          moduleUtil.alert('保存成功');
          setTimeout(function () {
            thisModuleDOM.hide();
            $(document).trigger('subeditend');
          }, 100);
        })
      }
    }
  }

  function onGetInfo(json) {
    if (json.code == 0) {
      var d = json.data;
      console.info('页面信息', d);
      if (d) {
        //其他信息
        var otherExtra = d.page_extra;
        if (!!otherExtra) {//兼容老页面，老页面是分开保存的
          var otherExtraObj = JSON.parse(otherExtra);
          d.bgColor = otherExtraObj.bgColor;
          d.bgColorTo = otherExtraObj.bgColorTo;
          d.pvEventid = otherExtraObj.pvEventid;
        } else {
          d.bgColor = d.page_bgcolor;
          d.bgColorTo = "";
          d.pvEventid = "";
        }

        curPage.id = d.page_id;
        oldPageInfo = d; //基本信息
        d.share_title == 'undefined' ? d.share_title = '' : '';
        d.share_desc == 'undefined' ? d.share_desc = '' : '';
        setInputValueByInfo(d);
      } else {
        moduleUtil.alert('页面不存在');
        divTopMenu.hide();
      }
    } else {
      moduleUtil.alert('页面数据获取失败,请刷新重试！');
    }
  }

  function setInputValueByInfo(obj) {
    curPage.sortid = obj.pagesortid;
    curPage.type = obj.page_type;
    curPage.path = obj.page_path;
    curPage.datefolder = obj.date_folder;
    curPage.name = obj.page_name;
    curPage.oldPageMenu = obj.oldPageMenu || obj.old_page_path || '';
    curPage.content = obj.page_content;
    curPage.expireTime = obj.page_expire_time;
    curPage.expireUrl = obj.page_expire_url;
    curPage.pageCreateDate = obj.page_createdate;
    curPage.bgColor = obj.bgColor;
    curPage.bgColorTo = obj.bgColorTo;
    curPage.pvEventid = obj.pvEventid;
    curPage.shareImgUrl = obj.share_img_url;
    curPage.shareTitle = obj.share_title;
    curPage.shareDesc = obj.share_desc;
    selectPageType.val(curPage.type);
    inputPageName.val(curPage.name);
    typeChange();
    var s = curPage.path.split('/');
    var pathV = '';
    if (s.length > 2) {
      var menu = s[s.length - 2],
        pathV = s.slice(0, s.length - 2).join('/') + '/';
    } else {
      pathV = 'https://cdn.jyblife.com/act/pagemaker/';
      menu = curPage.path;
    }
    selectPagePath.val(pathV);
    inputPageMenu.val(menu);
    inputOldPageMenu.val(curPage.oldPageMenu);
    expireUrl.val(curPage.expireUrl);
    expireTime.val(curPage.expireTime);
    textShareImgUrl.val(curPage.shareImgUrl);
    textShareTitle.val(curPage.shareTitle);
    textShareDesc.val(curPage.shareDesc);
    bgColor.val(curPage.bgColor);
    bgColorTo.val(curPage.bgColorTo);
    pvEventid.val(curPage.pvEventid);
    /*路径和页面名称不可修改 */
    selectPagePath.attr('disabled', 'true');
    inputPageMenu.attr('disabled', 'true');
    initExpireTime();
  }

  function initExpireTime() {
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

  function getNextYear() {
    var now = new Date();
    var year = now.getFullYear() + 1;
    var month = (now.getMonth() + 1) > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
    var day = now.getDate() > 10 ? now.getDate() : '0' + now.getDate();
    return year + '/' + month + '/' + day + ' 00:00:00';
  }

  function typeChange() {
    $("html").css("fontSize", "50px");
  }

  exports.showMeFolderName = function () {
    var s = curPage.path.split('/');
    if (s.length == 1) {
      return {
        parent: s[0],
        sub: s[0]
      };
    } else {
      return {
        parent: s[s.length - 3],
        sub: s[s.length - 2]
      };
    }
  };
  exports.showMeInputPageName = function () {
    return curPage.name;
  };
  exports.showMePageInfo = function () {
    return curPage;
  };
  exports.getShareSource = function () {
    var shareInfor = {
      img_url: curPage.shareImgUrl,
      title: curPage.shareTitle,
      desc: curPage.shareDesc
    }
    return 'window.shareConfig=' + JSON.stringify(shareInfor) + ';';
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

    initExpireTime();
    basicInfoBtn.trigger('click');
  };

  exports.main = function () {
    basicInfoBtn.on('click', startEdit);
    basicInfoSaveBtn.on('click', saveInfo);
    basicInfoCancelBtn.on('click', cancelSave);
  };
});
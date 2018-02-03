define(function(require, exports, module) {
  function request(url, data, callback) {
    $.post(url, data).done(function(json) {
      if (json.code == 0) {
        callback(json);
      } else {
        alert(json.msg);
      }
    }).fail(function() {
      alert('网络错误');
    })
  }

  /**
   * 根据组件ID获取对应的规则树配置模板
   * @param {*} com_id 
   * @param {*} callback 
   */
  exports.getTplList = function(com_id, callback) {
    request('/act/getComponentTemplates', {
      com_id: com_id
    }, callback);
  }

  /**
   * 保存pageId和活动号的关联
   * @param {*} pageId  页面ID
   * @param {*} actId   活动号
   * @param {*} cb 回调函数
   */
  exports.savePageRelaction = function(pageId, actId, callback) {
    request('/act/SavePageActRelation', {
      page_id: pageId,
      act_id: actId
    }, callback);
  }

  /**
   * 获取指定npm包的版本号列表
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a6997e23fb506228fc3c80d
   * @param {*} npmname npm包的名字
   * @param {*} path  当前活动路径，用于读取package.json
   * @param {*} cb 
   */
  exports.getnodeversions = function(npmname, path, callback) {
    request('/lego/getPackageVersion', {
      npmname: npmname,
      folder: path
    }, callback);
  };

  /**
   * 更新指定NPM包的版本号
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a6999c362732a229e6473bf
   * @param {*} version 
   * @param {*} npmname 
   * @param {*} path 
   * @param {*} callback 
   */
  exports.updataversion = function(version, npmname, path, callback) {
    request('/lego/updatePackageVersion', {
      npmName: npmname,
      npmVersion: version,
      folder: path
    }, callback);
  }

  /**
   * 检查指定目录是否存在冲突
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a69a9b73fb506228fc3c813
   * @param {*} path 
   * @param {*} callback true/false 
   */
  exports.checkPath = function(path, callback) {
    request('/lego/checkActDirNameExist', {
      path: path
    }, callback);
  };

  /**
   * 创建活动页面
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a69abf362732a229e6473c3
   * @param {*} page 
   * @param {*} callback 
   */
  exports.createNewPage = function(page, callback) {
    request('/lego/createPage', {
      type: page.type, //活动或者是产品
      pageName: page.name,
      folder: page.path,
      expireTime: page.expireTime,
      expireUrl: page.expireUrl,
      shareImage: page.shareinfo.img_url,
      shareTitle: page.shareinfo.title,
      shareDesc: page.shareinfo.desc,
      templateId: page.templateid,
      extraData: page.extraData
    }, callback);
  };

  /**
   * @description 查询指定活动页面的基本配置信息
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a69a75f3fb506228fc3c812
   * @param {*} id          页面ID
   * @param {*} callback    回调函数
   */
  exports.getPageBasicInfo = function(id, callback) {
    request('/lego/getPageBaseInfo', {
      pageId: id
    }, callback);
  };

  /**
   * @description 更新页面基本配置信息，合并了原来的updateBasicInfo和updateExtra两个接口的数据，分享信息需要分散成三个字段，extraData传json对象
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a69ae4c2344ad2298d175ac
   * @param {*} page 
   * @param {*} callback 
   */
  exports.updatePageBasicInfo = function(page, callback) {
    request('/lego/updateBaseInfo', {
      pageName: page.name,
      folder: page.path,
      pageId: page.id,
      type: page.type,
      shareImage: page.shareinfo.img_url,
      shareTitle: page.shareinfo.title,
      shareDesc: page.shareinfo.desc,
      oldPageUrl: page.oldPageMenu,
      expireTime: page.expireTime,
      expireUrl: page.expireUrl,
      extraData: page.extraData
    }, callback)
  };

  /**
   * @description 更新活动内容配置信息
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a69af183fb506228fc3c816
   * @param {*} id 
   * @param {*} content 
   * @param {*} callback 
   */
  exports.updatePageContent = function(id, content, callback) {
    request('/lego/updatePageContent', {
      pageId: id,
      content
    }, callback)
  };

  /**
   * @description 获取乐高公告
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a6ed8770e71141e56f9ee5a
   * @param {*} cb 
   */
  exports.getHomeNotice = function(cb) {
    request('/lego/getLegoNotice', {}, cb)
  };

  /**
   * @description 拷贝页面
   * @see http://mock.fe.jyb.com/#/doc/5a699394c2a30b22a4acc146/5a6f0a32a50df91e50c0a127
   * @param {*} pageId 
   * @param {*} folder 
   * @param {*} callback 
   */
  exports.copyPage = function(pageId, folder, callback) {
    request('/lego/copyPage', {
      from: pageId,
      folder
    }, callback)
  };

  /**
   * @description 批量查询活动页面详情
   * @param {*} pageId  数组
   * @param {*} callback 
   */
  exports.getMultiPageInfo = function(pageId, callback) {
    request('/lego/getMultiplePage', {
      pageId
    }, callback);
  }
});

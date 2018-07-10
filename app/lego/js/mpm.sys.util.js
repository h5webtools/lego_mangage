
define(function (require, exports, module) {
  var zepto = require('zepto');
  var moduleDataCenter = require('./mpm.sys.dataCenter');
  var jybtitle = require('./jyb.vue.jybtitle.edit');
  var headmap = require('./jyb.vue.headmap.edit');
  var jybregister = require('./jyb.vue.jybregister.edit');
  var jybrules = require('./jyb.vue.jybrules.edit');
  var topactrule = require('./jyb.vue.topactrule.edit');
  var productlist = require('./jyb.vue.productlist.edit');
  var jybfooter = require('./jyb.vue.jybfooter.edit');
  var customcode = require('./jyb.vue.customcode.edit');
  var ninegrid = require('./jyb.vue.ninegrid.edit');
  var couponresult = require('./jyb.vue.couponresult.edit');
  var jybwxhkpay = require('./jyb.vue.jybwxhkpay.edit');
  var jybswitchlist = require('./jyb.vue.jybswitchlist.edit');
  var jybtable = require('./jyb.vue.jybtable.edit');
  var jybranklist = require('./jyb.vue.jybranklist.edit');
  var jybexchange = require('./jyb.vue.jybexchange.edit');
  var jybsuctionbtn = require('./jyb.vue.jybsuctionbtn.edit');
  var jybfinanciallist = require("./jyb.vue.jybfinanciallist.edit");
  var jybactrolling = require("./jyb.vue.jybactrolling.edit");
  var jybcommpadding = require("./jyb.vue.jybcommpadding.edit");
  var jybpay = require("./jyb.vue.jybpay.edit");
  var jybfigure = require("./jyb.vue.jybfigure.edit");
  var jybimgmap = require("./jyb.vue.jybimgmap.edit");
  var jybfloating = require("./jyb.vue.jybfloating.edit");
  var jybcoupon = require("./jyb.vue.jybcoupon.edit");
  // var jybsignin = require("./jyb.vue.jybsignin.edit");
  // var jybtasks = require("./jyb.vue.jybtasks.edit");

  var getData = require('./common/request');
  var cookieName = 'jybactconfig';


  var divComponentEdit = zepto('#divComponentEdit'),
    divLeftComList = zepto('#divLeftComList'),
    divComponentSetPanel = zepto('#divComponentSetPanel'),
    addComBtn = zepto('#addComBtn'),
    addComCancelBtn = zepto('#addComCancelBtn'),
    divEditingPage = zepto('#divEditingPage'),
    divOperationItemList = zepto('#divOperationItemList');

  var components = {
    'jybtitle': jybtitle,
    'headmap': headmap,
    'jybregister': jybregister,
    'jybrules': jybrules,
    'topactrule': topactrule,
    'productlist': productlist,
    'jybfooter': jybfooter,
    'customcode': customcode,
    'ninegrid': ninegrid,
    'couponresult': couponresult,
    'jybwxhkpay': jybwxhkpay,
    'jybswitchlist': jybswitchlist,
    'jybtable': jybtable,
    'jybranklist': jybranklist,
    'jybexchange': jybexchange,
    'jybsuctionbtn': jybsuctionbtn,
    'jybfinanciallist': jybfinanciallist,
    'jybactrolling': jybactrolling,
    'jybcommpadding': jybcommpadding,
    'jybpay': jybpay,
    'jybfigure': jybfigure,
    'jybimgmap': jybimgmap,
    'jybfloating': jybfloating,
    'jybcoupon':jybcoupon
  };

  exports.ckeckIsLogin = function () {
    
  }

  exports.component = (function () {
    //所有组件列表，包括子组件
    var allComponents = {};

    return {
      //创建组件(不区分父子组件)不区分
      create: function (obj) {

        if (!obj) {
          exports.alert('mpm.sys.util getComponent config error');
          return;
        }
        var name = obj.path_key || obj.name;

        if (!components[name]) {
          exports.alert('no ' + obj.name + ' component');
          return;
        }
        var config = {
          editBox: divComponentSetPanel,
          showBox: divEditingPage,
          rightBox: divOperationItemList,
          obj: obj
        };
        if (obj.uid) {//这里再补一次，防止重新展示页面时，自组件没有主动调用
          exports.uniqueId.add(obj.uid.replace(/\D+/ig, '') - 0);
        }

        var com = components[name].getComponent(config);
        allComponents[com.config.obj.uid] = com;

        return com;
      },
      //获取组件信息
      get: function (uid) {
        return allComponents[uid];
      },
      //删除组件
      remove: function (uid) {
        exports.uniqueId.del(uid);
        var component = allComponents[uid];
        if (!component) {//有的组件重复添加子组件
          return;
        }
        var child = component.config.obj.child || [];

        //这里要递归查询uid的子组件，递归删除子组件
        for (var i = 0; i < child.length; i++) {
          exports.component.remove(child[i]);
        }

        component.domEdit && component.domEdit.$destroy(true);
        component.domShow && component.domShow.$destroy(true);
        component.domRightList && component.domRightList.remove();
        $(component.domStyle).remove();
        $('#show_' + component.obj.uid).remove();
        $('#editbox_' + component.obj.uid).remove();


        delete allComponents[uid];
      },

      //生成页面，获取所有的样式文件
      getAllCSSString: function () {

        var arr = [];
        var existStyle = {};//避免重复添加

        for (let o in allComponents) {
          var item = allComponents[o];
          var str = item.getCSSString();
          var styleKey = item.config.obj.data.styleKey;

          if (existStyle[styleKey]) {
            existStyle[styleKey] = existStyle[styleKey].replace(/_uid="/ig, item.config.obj.uid + "|");
            continue;
          }

          if (str) {
            str = '<style _uid="' + item.config.obj.uid + '">\n' + compress(str) + "\n</style>";
          }

          existStyle[item.config.obj.data.styleKey] = str;
        }

        for (let o in existStyle) {
          arr.push(existStyle[o]);
        }

        return arr.join('\r\n');
      },

      //线上页面，window.vueFnObj['fn_uid']
      getAllExtendJS: function () {
        var styleKeyobj = {};
        var arr = [];
        for (var o in allComponents) {
          var item = allComponents[o];
          var nowstyleKey = allComponents[o].obj.data.styleKey;
          var ext_comjs = item.getExtendJS();
          if (!styleKeyobj[nowstyleKey] || styleKeyobj[nowstyleKey] == "{}") {
            styleKeyobj[nowstyleKey] = ext_comjs.split(":")[1];
            arr.push(ext_comjs);
          }
        }
        return ';window.vueFnObj = {' + arr.join(',') + '};';
      },

      //线上页面window._componentConfig
      getComponentConfig: function () {
        var js = 'window._componentConfig =';
        var arr = [];
        var str;
        try {
          for (var o in allComponents) {
            var item = allComponents[o];
            var data = item.getMPMData();
            var actIdArr = [];
            if (data.name == 'jybregister') {
              var _act_id = data.data.activeid;
              if (_act_id) {
                actIdArr.push(_act_id);
              }
            }
            if (data.name == 'jybfigure') {
              var _act_id = data.data.actid;
              if (_act_id) {
                actIdArr.push(_act_id);
              }
            }
            if (data.name == 'jybranklist') {
              var _act_id = data.data.rankactid;
              if (_act_id) {
                actIdArr.push(_act_id);
              }
            }
            if (data.name == 'jybexchange') {
              var _act_id = data.data.actId;
              if (_act_id) {
                actIdArr.push(_act_id);
              }
            }
            if (data.name == 'ninegrid') {
              var _act_id = data.data.gridactid;
              if (_act_id) {
                actIdArr.push(_act_id);
              }
            }
            if (data.name == 'productlist') {
              var _act_id = data.data.actId;
              var _pvEventid = $('#pvEventid').val();
              if (_act_id && _pvEventid) {
                //上报下
                $.get('//bi.jyblife.com/legao/act', {
                  actid: _act_id,
                  metaid: _pvEventid
                }, function(json){
                }, 'json');
              }
            }

          }

        } catch (e) {
          console.log("上报活动ID");
        }

        $.get('//bi.jyblife.com/legao/config', {
          param:JSON.stringify({
            pvEventId: $('#pvEventid').val(),
            pageId:exports.getUrlQuery("page_id"),
            pageActId:exports.getUrlQuery("act_id"),
            pageTitle:$('#inputPageName').val()
          }),
          type:1
        }, function(json){
          
        }, 'json');
        


        for (var o in allComponents) {
          var item = allComponents[o];
          var string = item.getData();
          string.replace("\n", "");
          arr.push(string);
        }

        str = '[' + arr.join(',') + '];';

        return js + str;
      },

      //线上页面window.pageConfig
      getPageConfig: function () {
        var pageConfig = {};

        for (var o in allComponents) {
          var item = allComponents[o];
          var arr = item.getPageConfig();
          if (arr) {
            for (var m = 0; m < arr.length; m++) {
              var key = arr[m];
              if (!pageConfig[key]) {
                pageConfig[key] = {};
              }
            }
          }
        }

        return 'window.pageConfig = ' + JSON.stringify(pageConfig, null, '    ') + ';';
      },
      getMPMData: function () {
        var obj = {

        };

        for (var o in allComponents) {
          var item = allComponents[o];
          obj[o] = item.getMPMData();
        }

        return obj;

      },
      checkInput: function () {
        var obj = {

        };

        for (var o in allComponents) {
          var item = allComponents[o];
          obj[o] = item.checkInput();
        }

        return obj;
      },
      getSincludeUrl: function () {
        var arr = [];
        var existUrl = {};//避免重复添加

        for (let o in allComponents) {
          var item = allComponents[o];
          var url = item.getSincludeUrl();
          var styleKey = item.config.obj.data.styleKey;
          var str = existUrl[url] || "";

          if (str) {
            existUrl[url] = str.replace(/for /ig, "for " + item.config.obj.uid + " | ");
            continue;
          }

          if (url) {
           
          } else {
            existUrl[url] = '';
          }
        }

        for (let o in existUrl) {
          arr.push(existUrl[o]);
        }

        return arr.join('\r\n');
      }

    };
  })();

  //压缩css
  function compress(str) {
    var code = str;
    code = code.replace(/(\n|\t|\s)*/ig, '$1');
    code = code.replace(/\n|\t|\s(\{|\}|\,|\:|\;)/ig, '$1');
    code = code.replace(/(\{|\}|\,|\:|\;)\s/ig, '$1');
    return code;
  }

  //创建组件
  exports.getComponent = function (obj) {
    return exports.component.create(obj);
  };

  exports.uniqueId = (function () {
    //已加入的组件的id索引表
    var max = 1000;
    var uniqueIdMap = {};

    return {
      get: function () {
        return 'com_' + (++max);
      },
      add: function (id) {
        uniqueIdMap[id] = 1;
        if (id - 0 > max) {
          max = id - 0;
        }
      },
      del: function (id) {
        if (uniqueIdMap[id]) {
          delete uniqueIdMap[id];
        }
      }
    };
  })();

  exports.getComponentList = (function () {
    var list;
    return function (callback) {
      if (list) {
        setTimeout(function () {
          callback(list);
        }, 50);
        return;
      }
      moduleDataCenter.getComponentList(function (json) {
        if (json.code == 0) {
          list = json.data.component_list;
          callback(list);
        }
      })
     
    };
  })();



  exports.getCookie = function (name) {
    var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
    return val ? (val[2] ? unescape(val[2]).replace(/(^")|("$)/g, "") : "") : null;
  };

  exports.setCookie = function (name, value, expires, path, domain, secure) {
    //写入COOKIES
    var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false;
    expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
    document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
  };


  exports.alert = function (txt, callback) {
    var html =
      `<div class="modal">
        <div class="modal-dialog">
            <div class="modal-header">
                <!-- <h4 class="modal-title">标题</h4> -->
            </div>
            <div class="modal-body text-center">
                <p>`+ txt + `</p>
            </div>
            <div class="modal-footer text-center">
                <button class="jc-btn btn-primary">确定</button>
            </div>
        </div>
    </div>`;
    var div = $(html);
    var btn = div.find('button');

    $('body').append(div);
    div.fadeIn(200);
    btn.one('click', function () {
      div.fadeOut(200, function () {
        div.remove();
        if (callback) {
          callback();
        }
      });
    });
  };
  exports.toastInfo = exports.alert;

  exports.confirm = function (config) {
    if (!config || !config.confirm) {
      return;
    }
    var html =
      `<div class="modal">
        <div class="modal-dialog">
            <div class="modal-header">
                <!-- <h4 class="modal-title">标题</h4> -->
            </div>
            <div class="modal-body text-center">
                <p>`+ config.msg + `</p>
            </div>
            <div class="modal-footer text-center">
                <button class="jc-btn btn-primary">确定</button>
                <button class="jc-btn">取消</button>
            </div>
        </div>
    </div>`;
    var div = $(html);

    config.cancel = config.cancel || function () { };

    $('body').append(div);
    div.find('button').eq(0).click(function () {
      div.remove();
      config.confirm();
    });
    div.find('button').eq(1).click(function () {
      div.remove();
      if (config.cancel) {
        config.cancel();
      }
    });
  };

  exports.getUrlQuery = function (name, url) {
    //参数：变量名，url为空则表从当前页面的url中取
    var u = url || window.location.search,
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
  };



  exports.getTemplateByUrl = (function () {
    var map = {};

    return function (url, callback) {
      if (window.location.href.indexOf('martpagemaker_dev') > 0) {
        url = url.replace('/martpagemaker/', '/martpagemaker_dev/');
      }
      if (map[url]) {
        setTimeout(function () {
          callback(map[url]);
        });
        return;
      }

      $.get(url + '?r=' + parseInt(new Date() / 30000), function (str) {
        var dom = document.createElement('div');//这里不可以直接用jquery创建，会把script做转换
        dom.innerHTML = str;
        dom = $(dom);
        var domLink = dom.find('link');
        var domStyle = dom.find('style');
        var domTemplate = dom.find('.showTemplate');
        var domExtend = dom.find('.forMPMExtend');
        var domExt = dom.find('.forMPMExt');
        var domJS = dom.find('.forIDCExtend');

        var result = {
          com_css: '',
          template: '',
          com_extend: '',
          com_ext: '',
          com_js: '',
          com_sinclude_url: '',
          com_sinclude_content_url: '',
        };

        if (domStyle.length > 0) {
          result.com_css = domStyle.html();
        }

        if (domTemplate.length > 0) {
          result.template = domTemplate.html();
        }

        if (domExtend.length > 0) {
          result.com_extend = domExtend.html().replace(/^\r*\n*.*var\s+com_extend\s+=\s*/ig, '').replace(/}\s*;?\s*$/ig, '}');
        }

        if (domExt.length > 0) {
          result.com_ext = domExt.html().replace(/^\r*\n*.*var\s+com_ext\s+=\s*/ig, '').replace(/}\s*;?\s*$/ig, '}');
        }

        if (domJS.length > 0) {
          result.com_js = domJS.html().replace(/^\r*\n*.*var\s+com_js\s+=\s*/ig, '').replace(/}\s*;?\s*$/ig, '}');
        }

        if (domLink.length > 0) {

        } else {
          map[url] = result;
          callback(result);
        }
      });
    }
  })();


  exports.trace = function (count) {
    var caller = arguments.callee.caller;
    var i = 0;
    count = count || 10;
    console.log("***----------------------------------------  ** " + (i + 1));
    while (caller && i < count) {
      console.log(caller.toString());
      caller = caller.caller;
      i++;
      console.log("***---------------------------------------- ** " + (i + 1));
    }
  };

  exports.getFloorAnchor = function (list, callback) {

  };


  window.sysUtil = exports;

});

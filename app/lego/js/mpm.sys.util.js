
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

  var getData = require('./common/request');
  var cookieName = 'jybactconfig';




  var CFG = require('./mpm.sys.config');

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
    'jybfigure': jybfigure
  };

  exports.ckeckIsLogin = function () {
    var cookieName = "jybactconfig", userpower = "actconfiguserpower";
    var user_name = exports.getCookie(cookieName);
    var user_power = exports.getCookie(userpower);
    $("#username").html(user_name);
    if (user_name) {
      return user_name;
    } else {
      location.href = CFG.phpRoot + "login.html";
    }
  }

  exports.component = (function () {
    //所有组件列表，包括子组件
    var allComponents = {};

    return {
      //创建组件(不区分父子组件)
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
        console.log(uid);
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
            if (actIdArr.length > 0) {
              getData.request({
                act_id: actIdArr,
                page_id: exports.getUrlQuery("pageid"),
                user_name: exports.getCookie("jybactconfig")
              }, "http://manage.jyblife.com/actManage/autoActMark", false, function (json) {
                console.log(json);
              });
            }

          }

        } catch (e) {
          console.log("上报活动ID");
        }


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
            str = '<!-- for ' + item.config.obj.uid + ' -->\n<!--MPM#include virtual="' + url + '" -->\n';//legos的bug，必须隔开<!--和include
            existUrl[url] = str;
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
      // $.get(location.origin + '' + '/handle?action=getallcomponents', function (data) {
      //     //debugger;
      //     list = data.result;
      //     callback(list);
      // });
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

  exports.checkLogin = function (user_name, user_pwd) {
    var userName = $.cookie(cookieName);
    if (!userName || userName != user_name) {
      $.get(CFG.phpRoot + "handle", { action: 'checkuser', username: user_name, userpwd: user_pwd }, function (d) {
        if (d && d.res == 0) {
          $.cookie(cookieName, user_name, { path: '/' });
          $.cookie("actconfiguserpower", d.power, { path: '/' });
          $.cookie("actconfiguserpublishid", d.publishid, { path: '/' });
          location.href = CFG.phpRoot + "home.html";
        } else {
          alert("用户名或者密码错误");
        }
      }, 'json');
    } else {
      console.info('当前用户:', user_name);
      location.href = CFG.phpRoot + "home.html";
    }
  };


  exports.checkEOSPower = function (name, cb) {
    $.get(phpAction, {
      action: 'checkEOSPower',
      username: name
    }, cb, 'json');
  };

  exports.registerEos = function (name, cb) {
    $.get(CFG.phpRoot + 'registerEos.php', { user: name }, cb);
  };

  exports.recordEosReg = function (name, cb) {
    $.get(phpAction, {
      action: 'recordEosReg',
      username: name
    }, cb);
  };

  exports.syncToJFS = function (file, cb) {//jd file service 使用北京的图片服务
    // $.get(CFG.phpRoot + "syncToJFS.php", { imgpath: file }, function (d) {
    //     /*jfs那边返回格式需要处理一下
    //      *
    //      51
    //      [{"id":"1","msg":"jfs/t1933/90/1841043256/40359/90026eda/5683cc89N5e069b60.jpg"}]
    //      0
    //      * */
    //     if(d && d.indexOf('error')>-1){
    //         JD.report.umpBiz({bizid:'285',operation:'18',result:'2',source:'0',message:'item imgupload timeout'});
    //         exports.alert("网络超时,请重新上传！");
    //     }else{

    //         var list=JSON.parse(d.replace(/(^[^\[]*)|([^\]]+$)/g,''));
    //         console.info('同步jfs返回',list);
    //         if(list && list[0].msg==5){//上传图片报错
    //             //给运营提示上传失败  并且上报错误
    //             JD.report.umpBiz({bizid:'285',operation:'18',result:'1',source:'0',message:'item imgupload failed'});
    //             exports.alert("上传图片失败,请联系产品或者开发");
    //         }else if(list && list[0].id==1){ //成功

    //             JD.report.umpBiz({bizid:'285',operation:'18',result:'0',source:'0',message:'item imgupload success'});
    //         }else{
    //             JD.report.umpBiz({bizid:'285',operation:'18',result:'3',source:'0',message:'item imgupload othererror'});
    //             exports.alert("上传图片出现网络问题,请重新上传！");
    //         }

    //         if(list[0].msg.indexOf('jfs')<0){
    //             console.error('同步jfs文件出错');
    //             exports.alert("上传图片出现问题,请重新上传！");
    //             return;
    //         }
    //         var img_url='http://img10.360buyimg.com/wq/'+list[0].msg;
    //         cb(img_url);
    //     }
    // });
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

  //获取sinclude的内容，主要是样式文件
  exports.getSincludeContent = (function () {
    var map = {};

    // url : /sinclude/cssi/h5/1111/wx_pinlei/index.shtml
    return function (url, callback) {
      if (map[url]) {
        setTimeout(function () {
          callback(map[url]);
        });
        return;
      }

      $.get('/martpagemaker' + url + '?r=' + Math.random(), function (str) {
        map[url] = str;
        callback(str);
      });
    }
  })();

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
          result.com_sinclude_url = domLink.attr('href');
          exports.getSincludeContent(domLink.attr('href'), function (content) {
            //参考http://mpm.wq.jd.com/martpagemaker/sinclude/cssi/h5/1111/wx_pinlei/index.shtml中的内容
            let dom = document.createElement('div');//这里不可以直接用jquery创建，会把script做转换
            dom.innerHTML = content;
            dom = $(dom);
            result.com_sinclude_content_url = dom.find('link').attr('href');

            map[url] = result;
            callback(result);
          });
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

'use strict';
let manifest = null;

const errCode = require('../constant/errCode');

try {
  manifest = require('../public/manifest.json');
} catch (e) {
  manifest = {};
}

const CSS_REGEX = /\.css(\?.*)?$/;
const JS_REGEX = /\.js(\?.*)?$/;

function wrapperCSS(uri) {
  return `<link rel="stylesheet" href="${uri}">`;
}

function wrapperJS(uri) {
  return `<script src="${uri}"></script>`;
}



module.exports = {
  /**
   * 引入js和css
   * @param {String} filename
   * @return {String}
   */
  requireStatic(filename) {
    const manifestName = manifest[filename];
    if (!manifestName) {
      return '';
    }
    if (CSS_REGEX.test(filename)) {
      return this.safe(wrapperCSS(manifestName));
    }
    if (JS_REGEX.test(filename)) {
      return this.safe(wrapperJS(manifestName));
    }
    return manifestName;
  },
  /**
   * 向目标服务器发请求，简单的处理负载均衡（一台机器访问出错，再重新访问另外一台机器，直到访问成功。如果机器已经遍历完毕，则返回错误）
   * @param {*} env     当前访问的目标环境列表对象
   * @param {*} param   需要发送的参数
   * @param {*} exclude 需要被排除的目标机器序号
   */
  async sendRequest(env, param, exclude) {
    let target = await env.get(exclude);
    const ctx = this.ctx;
    if (!target) {
      return errCode.ALL_TARGET_ENV_DISCONNECTED;
    }
    try {
      ctx.logger.info('target Ip: ' + target.env.ip);
      const requestParam = await ctx.helper.extendParam({
        service: target.env.jmf,
        params: JSON.stringify(param)
      });
      ctx.logger.info('request param: ' + JSON.stringify(requestParam));
      const result = await ctx.curl(target.env.ip + '?ts=' + (+new Date()), {
        // 必须指定 method
        method: 'POST',
        headers: {
          'frame-type': 'JMF'
        },
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        timeout: 20000,
        // data: param,
        data: requestParam,
        dataType: 'json',
      });
      return result.data;
    } catch (e) {
      ctx.logger.error(e.message);
      // 重新调用
      return ctx.helper.sendRequest(env, param, target.index);
    }
  },
  /**
   * 向目标服务器发请求，简单的处理负载均衡（一台机器访问出错，再重新访问另外一台机器，直到访问成功。如果机器已经遍历完毕，则返回错误）
   * @param {*} env     当前访问的目标环境列表对象
   * @param {*} param   需要发送的参数
   * @param {*} exclude 需要被排除的目标机器序号
   */
  async sendNormalRequest(url, data) {
    const ctx = this.ctx;
    const env = this.config.envConfig;
    if (!env) {
      return errCode.ALL_TARGET_ENV_DISCONNECTED;
    }
    try {
      ctx.logger.info('target Ip: ' + env.BASE_API);
      ctx.logger.info('request param: ' + JSON.stringify(data));
      const result = await ctx.curl(env.BASE_API + url + '?ts=' + (+new Date()), {
        // 必须指定 method
        method: 'POST',
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        data: data,
        headers: {
          'userid': ctx.session.userid
        },
        timeout: 10000,
        dataType: 'json',
      });
      return result.data;
    } catch (e) {
      ctx.logger.error(e.message);
      return errCode.ALL_TARGET_ENV_DISCONNECTED;
    }
  },
  /**
   * 向目标服务器发GET请求
   * @param {*} url     目标地址
   * @param {*} data    需要发送的参数
   */
  async get(url, data) {
    const ctx = this.ctx;
    ctx.logger.info('target get url: ' + decodeURIComponent(url));
    const result = await ctx.curl(url, {
      // 必须指定 method
      method: 'get',
      contentType: 'json',
      data: data || {},
      timeout: 10000,
      dataType: 'json',
    });
    return result.data;
  },
  /**
   * 合并jmf公共的参数
   * @param {*} param 
   */
  async extendParam(param) {
    return Object.assign({}, this.config.jmfCommonParam, param);
  },
  /**
   * 获取环境配置
   * @param {*} category    业务类别
   * @param {*} serviceName 业务名
   */
  async envHelper(category, serviceName) {
    const business = this.config[category];
    const ctx = this.ctx;
    if (!business) {
      return '';
    }
    let envList, envNum, excludedIndex = []; // 存储已经被排除的IP序号
    // 获取目标环境列表
    if (serviceName) {
      envList = business[serviceName];
    } else {
      envList = business;
    }
    envNum = envList.length;
    return {
      /**
       * 获取目标IP地址
       * @param {*} exclude 被排除的目标IP
       */
      get(exclude) {
        if (typeof exclude != 'undefined') {
          excludedIndex.push(exclude);
        }
        // 所有的目标IP都出错
        if (excludedIndex.length == envNum) {
          return '';
        }
        let index = random(0, envNum - 1, excludedIndex);
        ctx.logger.info('get target env config ' + JSON.stringify(envList[index]));
        return {
          env: envList[index],
          index
        };
      }
    }
  },
  async dateFormat(fmt, date) {
    let now = date || new Date();
    let dateObj = {
      "M+": now.getMonth() + 1, //月份   
      "d+": now.getDate(), //日   
      "h+": now.getHours(), //小时   
      "m+": now.getMinutes(), //分   
      "s+": now.getSeconds(), //秒   
      "q+": Math.floor((now.getMonth() + 3) / 3), //季度   
      "S": now.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (now.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in dateObj) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (dateObj[k]) : (("00" + dateObj[k]).substr(("" + dateObj[k]).length)));
      }
    }
    return fmt;
  },
  async recordLog(pageId, msg) {

  }
}

function random(start, end, excludedIndex) {
  var diff = end - start + 1,
    result = Math.floor(Math.random() * diff + start);
  // 已经存在了，重新随机
  if (excludedIndex.indexOf(result) != -1) {
    return random(start, end, excludedIndex);
  } else {
    return result;
  }
}

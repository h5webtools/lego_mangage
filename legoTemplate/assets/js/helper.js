/**
 * helper
 */

import qs from 'qs';
import * as util from '@jyb/lib-util';
import extend from '@jyb/lib-extend';
import globalVar from 'config/global_var';

import libDetect from '@jyb/lib-detect';

const detect = libDetect();

/**
 * 获取userid
 */
export function getUserid() {
  return util.getCookie('userid') || util.getQuery('userid');
}

/**
 * 获取userid
 */
export function getToken() {
  return util.getCookie('token') || util.getQuery('token');
}



/**
 * 登出
 */
export function setLogout() {
  util.delCookie('userid');
  util.delCookie('token');
}

/**
 * 清除APP登录状态
 */
export function clearAppLoginStatus() {
  if (detect.jyb && util.getQuery('timestamp') && (!util.getQuery('userid') || !util.getQuery('token'))) {
    setLogout();
  }
}

/**
 * 设置登录状态
 */
export function setLogin(data = {}) {
  // 登录成功
  util.setCookie('userid', data.userid, 10);
  util.setCookie('token', data.token, 10);
}

/**
 * 打开链接
 * @param {String} url
 */
export function openUrl(url) {
  if (detect.jyb) {
    globalVar.wv.ready(() => {
      globalVar.wv.open({ url });
    });
  } else {
    setTimeout(() => {
      window.location.href = url;
    }, 0);
  }
}

/**
 * 没有登录
 */
export function callLogin() {
  // 客户端内部
  if (detect.jyb) {
    globalVar.wv.ready(() => {
      globalVar.wv.login({
        phoneNo: '', // 登录手机号
        complete(res) {
          setLogin({ userid: res.userId, token: res.token });
          // userId, token
          window.location.replace(getCurrentPageURL({ userid: res.userId, token: res.token }));
        }
      });
    });
  } 
}

/**
 * 获取页面URL
 * @param {Object} query
 */
export function getCurrentPageURL(query) {
  const qsObj = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  extend(qsObj, query);
  return window.location.origin + window.location.pathname + qs.stringify(qsObj, { addQueryPrefix: true });
}

/**
 * 创建页面URL
 * @param {String} pageName
 * @param {Object} params
 */
export function createPageURL(pageName, params = {}) {
  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/[^/]\w*\.\w*/, '');
  const newParams = extend({}, params, {
    _t: Date.now()
  });
  return origin + pathname + pageName + qs.stringify(newParams, { addQueryPrefix: true });
}

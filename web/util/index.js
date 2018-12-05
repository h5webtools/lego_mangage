/**
 * util
 */

import Vue from 'vue';

/**
 * 获取querystring
 * @param {String} name
 * @param {String} [url] url为空则表从当前页面的url中取
 * @return {String|Null}
 */
export function getQuery(name, url) {
  const u = url || window.location.search.replace('&amp;', '&');
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = u.substr(u.indexOf('?') + 1).match(reg);

  return r != null ? r[2] : '';
}

/**
 * 返回元素的大小及其相对于视口的位置
 * @param {HTMLElement} el
 * @return {Object}
 */
export function getClientRect(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`
  };
}

/**
 * 是否空对象
 * @param {Object} obj
 * @return {Boolean}
 */
export function isEmptyObject(obj) {
  for (const k in obj) {
    return false;
  }
  return true;
}

/**
* 防抖动
* @param {Function} fn
* @param {Number} time
* @return {Function}
*/
export function debounce(fn, time = 200) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

/**
 * 代码生成
 * @param {String} code
 * @return {Any}
 */
export function codeGenFunction(code, ctx) {
  /* eslint-disable no-new-func */
  return new Function('$context', code)(ctx || {});
}

/**
 * 组件代码生成
 * @param {String} code
 * @return {Any}
 */
export function componentCodeGenFunction(code = '') {
  return new Function(`return ${code.replace(/\s*export\s+default\s*/, '')}`)();
}

/**
 * 优化组件代码
 * @param {String} code 代码
 * @return {String}
 */
export function optimizeComponentCode(code = '') {
  return code.replace(/function\s*(\w+)\s*\(\)\s*\{\s*\[native code\]\s*\}/g, '$1');
}

/**
 * 注册组件
 * @param {Object} widget
 */
export function registerComponent(widget = {}) {
  const setting = widget._code;
  const version = widget.version || '';
  if (!setting) return;
  const componentName = `${setting.tag}-${version.replace(/\./g, '')}`;
  const component = Vue.component(componentName);
  if (component) return;
  return Vue.component(componentName, Object.assign({}, setting.definition));
}

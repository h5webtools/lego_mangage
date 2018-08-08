/**
 * $context
 */

import * as libUtil from '@jyb/lib-util';
import * as queryString from '@/util/querystring';

export default function createContext({ store }) {
  // 注入到组件代码中
  const $context = {};

  // 工具函数
  $context.$util = {
    getQuery: libUtil.getQuery,
    getCookie: libUtil.getCookie,
    delCookie: libUtil.delCookie,
    setCookie: libUtil.setCookie
  };

  // dom操作函数
  $context.$dom = {
    getElementById(id) {
      return document.querySelector(`[data-cube-id="${queryString.pageId}--${id}"]`);
    }
  };

  // 存储
  $context.$storage = {
    storage: {},
    set(key, value) {
      this.storage[key] = value;
    },
    get(key) {
      return this.storage[key];
    },
    delete(key) {
      delete this.storage[key];
    },
    deleteAll() {
      this.storage = {};
    }
  };

  // vuex.store api
  $context.$store = {
    dispatch(action, ...args) {
      return store.dispatch(`${queryString.pageId}/${action}`, ...args);
    }
  };

  return $context;
}


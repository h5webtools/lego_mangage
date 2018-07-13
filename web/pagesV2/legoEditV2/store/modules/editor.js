/**
 * drag module
 */

import * as util from '@/util';
import extend from '@jyb/lib-extend';
import typeOf from '@jyb/lib-type-of';
import stringifyObject from '@/util/stringify';
import * as queryString from '@/util/querystring';
import {setPageData, setPageDataItemByKey, updatePageItemThemeStyle} from '@/util/helper'
import vStore from '../index';
import Vue from 'vue'


// { tag: '', props: {}, children: [] }

const STRINGIFY_OBJECT_OPTIONS = {
  indent: '  ',
  singleQuotes: false
};

let defaults = {};
// 默认代码片段
const defaultCodeSnippet = {
  event: {}, // 事件
  props: {}, // 属性
  vuex: {
    getters: {}
  },
  extend: {
    created: function () {},
    mounted: function () {}
  }
};
// 默认store代码片段
const defaultStoreCode = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {},
  mutations: {}
};

// state
const initialState = {
  app: {}, // 应用数据
  pageData: [], // 页面数据
  currentComponent: { // 当前组件
    model: {}
  },
  layer: { // 层
    visible: false,
    style: {},
    definition: {}
  },
  menuActiveIndex: 'layout',
  isRegisterComponent: false  

};

// getters
const getters = {
  pageData: state => state.pageData,
  currentComponent: state => state.currentComponent,
  layerData: state => state.layer,
  menuActiveIndex: state => state.menuActiveIndex,
  isRegisterComponent: state => state.isRegisterComponent
};

const updateLayer = util.debounce(({ commit, state }) => {
  commit('updateLayer', {
    style: util.getClientRect(state.currentComponent.elm)
  });
}, 100);

// actions
const actions = {
  // 更新对应位置上的item
  updatePage({ commit }, result) {
    commit('updatePage', result);
  },
  setCurrentComponent({ commit }, result) {
    commit('setCurrentComponent', result);
  },
  
  // 更新当前组件的某个key
  updateModelValue({ commit, state }, data) {
    commit('updateModelValue', data);
    // 更新model，同步更新layer
    // updateLayer({ commit, state });
  },

  registerComponent({ commit, state }, data) {
    commit('registerComponent', data);
  },

  // 直接更新某个数据的多个值（包括多级的， 例如extendProps.key）
  updateValueDirect({ commit, state }, data) {
    commit('updateValueDirect', data);
  },

  // 直接更新某个数据的多个值（包括多级的， 例如extendProps.key）
  updatePageItemThemeStyle({ commit, state }, data) {
    commit('updatePageItemThemeStyle', data);
  }
  
};

// mutations
const mutations = {
  updatePage(state, result) {
    const { levelIndex, data } = result;
    
    // 顶级的是直接替换全部数据， 其余的每次是替换children的值， 第一个leveindex是多余的标志量
    // console.log(JSON.stringify(result));
    if(levelIndex === 'top' || levelIndex === '0') {
      state.pageData = data;
      console.log(JSON.stringify(state.pageData));
    } else {
      const indexArr = levelIndex.split('-')
      indexArr.shift();
      setPageData(indexArr, state.pageData, data)
    }
  },
  setCurrentComponent(state, result) {
    state.currentComponent = result;
  },
  updateModelValue(state, data) {
    const { key, value } = data;
    if (state.currentComponent.model[key]) {
      state.currentComponent.model[key].value = value;
      state.currentComponent.props[key] = value;
    }
  },
  registerComponent(state, data) {
    state.isRegisterComponent = data
  },
  updateValueDirect(state, datas) {
    const { data, update } = datas;
    // state.currentComponent = data;
    update.map(item => {
      const keys = item.key.split('.')
      if(keys.length > 1) {
        setPageDataItemByKey(keys, data, item.value)
      } else {
        data[item.key] = item.value
      }
    })
  },

  // 直接更新某个数据的多个值（包括多级的， 例如extendProps.key）
  updatePageItemThemeStyle(state, data) {
    const { currentTheme } = data;
    updatePageItemThemeStyle(state.pageData, currentTheme)
  }

};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};

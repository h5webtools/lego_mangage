/**
 * drag module
 */

import * as util from '@/util';
import extend from '@jyb/lib-extend';
import typeOf from '@jyb/lib-type-of';
import stringifyObject from '@/util/stringify';
import * as queryString from '@/util/querystring';
import {setPageData, setPageDataItemByKey, updatePageItemThemeStyle, getLevelPageData} from '@/util/helper'


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
  currentThemeStyle: {
    config: {}
  },  
  menuActiveIndex: 'layout',
  isRegisterComponent: false,
  registerComponentList: []
};

// getters
const getters = {
  pageData: state => state.pageData,
  currentComponent: state => state.currentComponent,
  menuActiveIndex: state => state.menuActiveIndex,
  currentThemeStyle: state => state.currentThemeStyle,
  isRegisterComponent: state => state.isRegisterComponent,
  registerComponentList: state => state.registerComponentList
};

// actions
const actions = {
  // 更新对应index位置上的item(整个替换包括children)
  updatePage({ commit }, result) {
    commit('updatePage', result);
  },
  
  /**
   * 
   * @param {*} state 
   * @param {*} result 传入对应的item 和对应位置， 方便在pageData 中快速定位
   *  {
          item: item[event.oldIndex],
          levelIndex: self.levelIndex,
          itemIndex: event.oldIndex
      }
   */
  //  TODO TODO  设置的时候进行model工厂化 _changeOneItemModel
  setCurrentComponent({ commit }, result) {
    commit('setCurrentComponent', result);
  },

  setCurrentThemeStyle({ commit }, result) {
    commit('setCurrentThemeStyle', result);
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
  },

  // 增加已经注册组件的备注列表
  addRegisterComponentItem({ commit, state }, data) {
    commit('addRegisterComponentItem', data);
  },
  
};

// mutations
const mutations = {
  updatePage(state, result) {
    const { levelIndex, data } = result;
    let currentData = JSON.parse(JSON.stringify(data))
    
    // 顶级的是直接替换全部数据， 其余的每次是替换children的值， 第一个leveindex是多余的标志量
    // console.log(JSON.stringify(result));
    if(levelIndex === 'top' || levelIndex === '0') {
      state.pageData = currentData;
    } else {
      const indexArr = levelIndex.split('-')
      indexArr.shift();
      setPageData(indexArr, state.pageData, currentData)
    }
  },

  setCurrentComponent(state, result) {
    // item 是JSONpagedata 后的子元素
    const {item, levelIndex, itemIndex} = result;

    if(state.currentComponent.extendProps) {
      state.currentComponent.extendProps.isCurrent = false;
    }

    let data;
    if(levelIndex === 'top' || levelIndex === '0') {
      data = state.pageData[itemIndex]
    } else {
      const indexArr = levelIndex.split('-')
      indexArr.shift();
      const children = getLevelPageData(indexArr, state.pageData);
      data = children[itemIndex]
    }

    data.extendProps.isCurrent = true;
    state.currentComponent = data;
  },

  setCurrentThemeStyle(state, result) {
    state.currentThemeStyle = result;
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
    const { item: oldItem, levelIndex, itemIndex, update } = datas;
    // state.currentComponent = data;

    let data;
    
    if(levelIndex === 'top' || levelIndex === '0') {
      data = state.pageData[itemIndex]
    } else {
      const indexArr = levelIndex.split('-')
      indexArr.shift();
      const children = getLevelPageData(indexArr, state.pageData);
      data = children[itemIndex]
    }

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
    state.pageData = JSON.parse(JSON.stringify(state.pageData))
  },

  addRegisterComponentItem(state, data) {
    state.registerComponentList.push(data);
  }

};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};

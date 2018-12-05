/**
 * drag module
 */

import * as util from '@/util';
import extend from '@jyb/lib-extend';
import typeOf from '@jyb/lib-type-of';
import stringifyObject from '@/util/stringify';
import * as queryString from '@/util/querystring';
import {setPageData, setPageDataItemByKey, updatePageItemThemeStyle, getLevelPageData, getLevelPageDataChildren, setDirectCurrentComponent} from '@/util/helper'
import Vue from 'vue';


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
  registerComponentList: {},
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

  removeItem({ commit }, result) {
    commit('removeItem', result);
  },

  sortItem({ commit }, result) {
    commit('sortItem', result);
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

  setRegisterComponentList({ commit, state }, data) {
    commit('setRegisterComponentList', data);
  }
  
};

// mutations
const mutations = {
  updatePage(state, result) {

    // 如果是在renderOne 部分的levelIndex 是到children， 如果点击的是当前组件，那么levelIndex 就是直接到children

    // 具体在拖拽元素的old levelIndex 中都是自己的真正位置， 以及 图层管理中的更改属性

    let { levelIndex, item, itemIndex, dragType, oldLevel, oldLevelIndex, oldItemIndex} = result;

    if(dragType === 'none') {
      state.pageData = item;
      return false;
    }

    // 顶级的是直接替换全部数据， 其余的每次是替换children的值， 第一个leveindex是多余的标志量
    // console.log(JSON.stringify(result));
    if(dragType === 'add') {

      let pageDataChildren = getLevelPageDataChildren(levelIndex, state.pageData)
      pageDataChildren.splice(itemIndex, 0, item);
    }
    
    // 1、先根据old位置修改原有位置children数据， 然后根据新位置改数据; 
    // 2、move过来的数据的levelIndex 是直接在pageData 里面的位置， 通过最后一位前的数据线定位数据， 然后根据最后一个位置进行splice
    // 3 区分组内sort， 和跨组move
    
    if(dragType === 'move') {
      const oldIndexArr = oldLevelIndex.split('-') 
      // 原先位置的索引位置
      const oldLastItemIndex = Number(oldIndexArr.pop());
      const realOldLevelIndex = oldIndexArr.join('-')

      let oldPageDataChildren = getLevelPageDataChildren(realOldLevelIndex, state.pageData)

      // 同级
      if(levelIndex === oldIndexArr.join('-')) {
        if(oldPageDataChildren.length <= 1 ) {
          return false;
        } 
        // 交换 oldLastItemIndex  和  itemIndex
/*         let temp = oldPageDataChildren[oldLastItemIndex];
        Vue.set(oldPageDataChildren, oldLastItemIndex, oldPageDataChildren[itemIndex] );
        Vue.set(oldPageDataChildren, itemIndex, temp ); */
        if(itemIndex > oldLastItemIndex) {
          oldPageDataChildren.splice(itemIndex, 0, item)
          oldPageDataChildren.splice(oldLastItemIndex, 1)
        } else if(itemIndex < oldLastItemIndex) {
          oldPageDataChildren.splice(itemIndex, 0, item)
          oldPageDataChildren.splice(oldLastItemIndex + 1, 1)
        } else {
          return false;
        }

      } else {
        // 根据新位置进行add item（保持原有index 不变）

        let pageDataChildren = getLevelPageDataChildren(levelIndex, state.pageData)
        pageDataChildren.splice(itemIndex, 0, item);

        // 保持原有index 不变的情况进行 remove
        oldPageDataChildren.splice(oldLastItemIndex, 1);

      }

    }


    setDirectCurrentComponent({
      item: item
    }, state)

  },

  setCurrentComponent(state, result) {
    // item 是JSONpagedata 后的子元素
    const {item, levelIndex, itemIndex, level, type} = result;
    // 存储页面时候特殊处理current
    if(type) {
      // 先去除current状态存储数据
      if(type === 'removeCurrent') {
        if(state.currentComponent.extendProps) {
          state.currentComponent.extendProps.isCurrent = false;
        }
      }

      // 恢复当前的饿current
      if(type === 'restoreCurrent') {
        if(state.currentComponent.extendProps) {
          state.currentComponent.extendProps.isCurrent = true;
        }
      }

    } else {
      if(state.currentComponent.extendProps) {
        state.currentComponent.extendProps.isCurrent = false;
      }
  
  /*     if(levelIndex) {
        let currentData = getLevelPageDataChildren(levelIndex, state.pageData, 1)
  
        currentData.extendProps.isCurrent = true;
        state.currentComponent = currentData;
      } */
      if(item) {
        item.extendProps.isCurrent = true;
        state.currentComponent = item;
      }
    }



  },

  removeItem(state, result) {
    const {item, levelIndex, itemIndex, level} = result;

    const oldIndexArr = levelIndex.split('-') 
    const oldLastItemIndex = Number(oldIndexArr.pop());
    const realOldLevelIndex = oldIndexArr.join('-')

    let oldPageDataChildren = getLevelPageDataChildren(realOldLevelIndex, state.pageData);

    oldPageDataChildren.splice(oldLastItemIndex, 1)

    debugger
    // 根据情况清空 currentComponent

  },

  sortItem(state, result) {
    const {item, levelIndex, itemIndex, level, oldIndex} = result;

    const oldIndexArr = levelIndex.split('-') 
    const oldLastItemIndex = Number(oldIndexArr.pop());
    const realOldLevelIndex = oldIndexArr.join('-')

    let oldPageDataChildren = getLevelPageDataChildren(realOldLevelIndex, state.pageData);

    // 交换 oldLastItemIndex  和  itemIndex
    let temp = oldPageDataChildren[oldIndex];
    Vue.set(oldPageDataChildren, oldIndex, oldPageDataChildren[itemIndex] );
    Vue.set(oldPageDataChildren, itemIndex, temp );
  },

  setCurrentThemeStyle(state, result) {
    state.currentThemeStyle = result;
  },
  updateModelValue(state, data) {
    const { key, value } = data;
    if (state.currentComponent.model[key]) {
      state.currentComponent.model[key].value = value;
      state.currentComponent.props[key] = value;
      /* if(Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
        let realVal = Object.assign(state.currentComponent.props[key], value)
        state.currentComponent.model[key].value = realVal;
        state.currentComponent.props[key] = realVal;
        // Vue.set(state.currentComponent.model[key], 'value', realVal)
        // Vue.set(state.currentComponent.props, key, realVal)
      } else {
        state.currentComponent.model[key].value = value;
        state.currentComponent.props[key] = value;
      } */

    } else {
      // 改变showIndex等一级数据
      state.currentComponent[key] = value
    }
  },
  registerComponent(state, data) {
    state.isRegisterComponent = data
  },
  updateValueDirect(state, datas) {
    const { item: oldItem, levelIndex, itemIndex, update } = datas;
    // state.currentComponent = data;

/*     let data;

    if(levelIndex === 'top' || levelIndex === '0') {
      data = state.pageData[itemIndex]
    } else {
      const indexArr = levelIndex.split('-')
      indexArr.shift();
      const children = getLevelPageData(indexArr, state.pageData);
      data = children[itemIndex]
    } */

    let currentData = getLevelPageDataChildren(levelIndex, state.pageData, 1)

    update.map(item => {
      const keys = item.key.split('.')
      if(keys.length > 1) {
        setPageDataItemByKey(keys, currentData, item.value)
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
    const {name, fileUrl} = data

    state.registerComponentList[name] = data;
  },

  setRegisterComponentList(state, data) {
    state.registerComponentList = data;
  },



};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};

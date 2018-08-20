/**
 * page helper
 */

import extend from '@jyb/lib-extend';
import typeOf from '@jyb/lib-type-of';
import editorApi from '@/api/editor';

let _uid = 0;

/**
 * 页面中组件新增定义
 * @param {Object} widget
 * @return {Object}
 */
export function interceptDefinition(widget) {
  const setting = widget._code;
  const componentDefinition = {
    tag: setting.tag,
    componentId: widget.uuid, // 组件uuid
    componentVersion: widget.version, // 组件版本
    // elm: null // 元素
    uid: ++_uid, // 唯一ID
    name: widget.name, // 名称
    model: setting.model, // 配置
    event: setting.event, // 事件
    props: getInitialPropsValue(setting.model), // 属性
    index: -1, // 位置
    parent: null, // 父组件
    children: [], // 子组件
    dataObject: {} // data对象
  };

  // data对象
  const dataObject = {
    class: {},
    directives: [],
    domProps: {}
  };

  // 添加config
  dataObject.domProps.componentDefinition = componentDefinition;
  // isDrop=true，添加draggable指令
  if (setting.isDrop) {
    // 添加高亮样式
    dataObject.class['drag-highlight'] = true;
    dataObject.directives.push({
      name: 'draggable'
    });
  }
  // isEdit=true，添加editable指令
  if (setting.isEdit) {
    dataObject.directives.push({
      name: 'editable'
    });
  }

  // 增加key，防止元素被删除之后的一些异常情况
  dataObject.key = componentDefinition.uid;
  componentDefinition.dataObject = dataObject;
  return componentDefinition;
}

/**
 * 页面中编辑组件定义
 * @param {Object} widget 组件
 * @param {Object} current 当前组件定义
 * @param {Object} widgetCode 组件代码
 * @return {Object}
 */
export function interceptEditDefinition(widget, current, widgetCode) {
  const setting = widget._code;
  const componentDefinition = {
    tag: setting.tag,
    componentId: current.componentId, // 组件uuid
    componentVersion: current.componentVersion, // 组件版本
    // elm: null // 元素
    uid: current.uid, // 唯一ID
    name: widget.name, // 名称
    model: setting.model, // 配置
    props: current.props, // 属性
    index: current.index, // 位置
    parent: null, // 父组件
    children: [], // 子组件
    dataObject: {} // data对象
  };

  // 同步code片段的props
  const currentWidgetCode = widgetCode[current.uid] || {};

  Object.keys(current.props).forEach((k) => {
    if (componentDefinition.model[k]) {
      // 同步props的value到model
      componentDefinition.model[k].value = current.props[k];
    }
    let curr = current.props[k];
    Object.defineProperty(current.props, k, {
      configurable: true,
      enumerable: true,
      get() {
        return curr;
      },
      set(newValue) {
        curr = newValue;
        currentWidgetCode.props[k] = newValue;
      }
    });
  });

  if (current.uid > _uid) {
    _uid = current.uid;
  }

  // data对象
  const dataObject = {
    class: {},
    directives: [],
    domProps: {}
  };

  // 添加config
  dataObject.domProps.componentDefinition = componentDefinition;
  // isDrop=true，添加draggable指令
  if (setting.isDrop) {
    // 添加高亮样式
    dataObject.class['drag-highlight'] = true;
    dataObject.directives.push({
      name: 'draggable'
    });
  }
  // isEdit=true，添加editable指令
  if (setting.isEdit) {
    dataObject.directives.push({
      name: 'editable'
    });
  }

  // 增加key，防止元素被删除之后的一些异常情况
  dataObject.key = componentDefinition.uid;
  componentDefinition.dataObject = dataObject;
  return componentDefinition;
}

/**
 * 生成页面数据
 * @param {Object} pageCode 页面数据
 * @param {Object} widgetCode 组件代码
 * @param {Object} usedComponent 页面使用的组件
 * @param {Object} newPageCode 页面代码
 */
export function generatorPageData(pageCode, widgetCode, usedComponent, newPageCode = {}) {
  const { componentId, componentVersion } = pageCode;
  const currentComponent = usedComponent[componentId] || {};
  const currentComponentVersion = currentComponent[componentVersion];
  let widget = null;

  // 没有找到组件版本
  if (currentComponentVersion) {
    widget = extend(true, {}, {
      _code: currentComponentVersion.code
    }, currentComponentVersion);
  } else {
    widget = editorApi.getWidgetByIdAndVersion(componentId, componentVersion);
  }

  extend(newPageCode, interceptEditDefinition(widget, pageCode, widgetCode));
  if (Array.isArray(pageCode.children)) {
    pageCode.children.forEach((p) => {
      const o = {};
      generatorPageData(p, widgetCode, usedComponent, o);
      newPageCode.children.push(o);
    });
  }
}

/**
 * 初始化属性值
 * @param {Object} model
 * @return {Object}
 */
export function getInitialPropsValue(model) {
  if (!model) return {};
  return Object.keys(model).reduce((obj, val) => {
    obj[val] = model[val].value;
    return obj;
  }, {});
}

/**
 * 初始化事件
 * @param {Object} event
 * @return {Object}
 */
export function getInitialEvent(event) {
  if (!event) return {};
  return Object.keys(event).reduce((obj, k) => {
    const current = event[k];
    const args = current.arguments || [];
    obj[k] = new Function(
      `return function (${args.join(', ')}) {}`
    )();
    return obj;
  }, {});
}

/**
 * 查找drop元素
 * @param {Object} element
 * @param {Number} uid
 * @param {Function} cb
 */
export function findDropElement(element, uid, options) {
  // 回调函数
  const cb = typeOf(options.cb) === 'function' ? options.cb : function () {};
  // children位置
  const index = typeOf(options.index) === 'undefined' ? -1 : options.index;
  // 父元素
  const parent = typeOf(options.parent) === 'undefined' ? null : options.parent;

  if (element.uid === uid) {
    return cb(element, parent, index);
  }
  element.children.forEach((el, i) => findDropElement(el, uid, { cb, index: i, parent: element }));
}

/**
 * 获取所有uid
 * @param {Object} element
 * @param {Array} list
 */
export function findAllUid(element, list = []) {
  list.push(element.uid);
  if (Array.isArray(element.children)) {
    element.children.forEach(el => findAllUid(el, list));
  }
}

/**
 * 获取页面代码
 * @param {Object} pageData 页面布局数据结构
 * @param {Object} componentData 页面布局使用的数据
 * @param {Object} postPageData 待提交页面数据
 * @param {Object} postComponentData 待提交页面使用的组件数据
 */
export function getPageCode(pageData, componentData, postPageData = {}, postComponentData = {}) {
  if (!pageData.tag) return;

  const { componentId, componentVersion } = pageData;

  // 设置字段
  postPageData.tag = pageData.tag;
  postPageData.uid = pageData.uid;
  postPageData.props = pageData.props;
  postPageData.index = pageData.index;
  postPageData.componentId = componentId;
  postPageData.componentVersion = componentVersion || '';

  // 使用的组件数据
  if (!postComponentData[componentId]) {
    postComponentData[componentId] = {};
  }

  const currentComponent = componentData[componentId] || {};
  const currentComponentVersion = currentComponent[componentVersion];
  if (currentComponentVersion) {
    postComponentData[componentId][componentVersion] = currentComponentVersion;
  }

  // 如果有children
  if (Array.isArray(pageData.children)) {
    postPageData.children = [];
    pageData.children.forEach((p, i) => {
      const o = {};
      getPageCode(p, componentData, o, postComponentData);
      postPageData.children[i] = o;
    });
  }
}

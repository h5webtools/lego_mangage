/**
 * 页面管理
 * @example
 *
 * import CompHeader from 'components/c_header';
 *
 * 1. 普通用法
 * const pm = new PageManager();
 * pm.component('header', CompHeader);
 * pm.run();
 *
 * 2. 动态渲染
 * const pm = new PageManager();
 * pm.component(true, 'header', CompHeader);
 * pm.run();
 *
 * indexService.getUserInfo().then((json) => {
 *   if (json.code === 0) {
 *     pm.render('header', {
 *       name: 'canye'
 *     });
 *   }
 * });
 *
 * 3. 获取组件对象
 * const pm = new PageManager();
 * pm.component('header', CompHeader);
 * pm.run();
 *
 * pm.getContext('header);
 */

class PageManager {
  constructor() {
    this.componentCache = {};
  }

  /**
   * 添加组件
   * @param {Boolean} dynamic 是否动态组件
   * @param {String} name 组件名称
   * @param {Object} Ctor 组件构造函数
   * @param {Object} data 组件数据
   */
  component(dynamic, name, Ctor, data) {
    if (typeof dynamic !== 'boolean') {
      data = Ctor;
      Ctor = name;
      name = dynamic;
      dynamic = undefined;
    }

    let obj = null;
    const $el = document.querySelector(`[z-component="${name}"]`);

    if (!$el) {
      throw new Error(`${name} not found in page.`);
    }

    obj = new Ctor($el, data || {});
    this.componentCache[name] = { el: $el, obj, dynamic };

    return obj;
  }

  /**
   * 获取上下文
   * @param {String} name
   * @return {Object}
   */
  getContext(name) {
    const current = this.componentCache[name];

    if (!current) {
      throw new Error(`没有找到${name}组件`);
    }

    return current.obj;
  }

  /**
   * 渲染函数
   * @param {String} name 组件名
   * @param {Any} data 组件数据
   */
  render(name, data) {
    const current = this.componentCache[name];

    if (!current) {
      throw new Error(`没有找到${name}组件`);
    }

    current.obj.render(data);
  }

  /**
   * 渲染页面组件
   */
  run() {
    const cache = this.componentCache;

    for (const k in cache) {
      // 如果不是动态组件，马上渲染
      if (!cache[k].dynamic) {
        cache[k].obj.render();
      }
    }
  }
}

export default PageManager;

import testA from './testA.vue'
import Vue from 'vue'


/** 
Vue.component(
    'async-webpack-example',
    // 该 `import` 函数返回一个 `Promise` 对象。
    () => import('./my-async-component')
  )
*/
Vue.component(testA.name, testA);
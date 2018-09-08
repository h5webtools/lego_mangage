import './index.scss';

import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app.vue';
import router from 'routes';
import NProgress from 'nprogress'; // Progress 进度条


Vue.use(ElementUI, { size: 'small' });

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  next();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

// new Vue({
//   // router,
//   render: h => h(App)
// }).$mount('#app');
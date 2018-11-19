
import App from './app.vue';

window.__debugEditor__ = {
  install(el, Vue) {
    new Vue({
      render: h => h(App)
    }).$mount(el);
  }
};

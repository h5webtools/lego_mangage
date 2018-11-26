
import App from './app.vue';

window.__debugEditor__ = {
  install(el, Vue) {
    const app = new Vue({
      render: h => h(App)
    }).$mount(el);
    return {
      app,
      show(data = {}) {
        app.$children[0].visible = true;
        for (const k in data) {
          if (Object.prototype.hasOwnProperty.call(app.$children[0], k)) {
            app.$children[0][k] = data[k];
          }
        }
      },
      hide() {
        app.$children[0].visible = false;
      },
      on() {
        app.$children[0].$on(...arguments);
      }
    };
  }
};

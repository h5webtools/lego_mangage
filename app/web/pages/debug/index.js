
import App from './app.vue';

window.__debugEditor__ = {
  install(el, Vue) {
    const app = new Vue({
      render: h => h(App)
    }).$mount(el);
    return {
      app,
      show(data = {}) {
        for (const k in data) {
          if (Object.prototype.hasOwnProperty.call(app.$children[0], k)) {
            app.$children[0][k] = data[k];
          }
        }
        app.$children[0].visible = true;
      },
      hide() {
        app.$children[0].visible = false;
      },
      off() {
        app.$children[0].$off(...arguments);
        return this;
      },
      on() {
        app.$children[0].$on(...arguments);
        return this;
      }
    };
  }
};

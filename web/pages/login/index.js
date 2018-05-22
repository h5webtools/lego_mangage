import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './loginApp.vue';

Vue.use(ElementUI);


new Vue({
  render: h => h(App),
}).$mount('#app');
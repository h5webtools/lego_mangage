
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app.vue';

import './index.scss';

Vue.use(ElementUI, { size: 'small' });

new Vue({
  render: h => h(App)
}).$mount('#app');

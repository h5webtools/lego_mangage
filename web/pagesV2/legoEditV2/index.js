import 'babel-polyfill';
import Vue from 'vue';
const EventEmit = require('@jyb/lib-event-emit');

import ElementUI, { Message as $message } from 'element-ui';

import App from './app.vue';


import editor from './store/modules/editor';
import widget from './store/modules/widget';
// debug信息

import vStore from './store';

import cDraggable from 'vuedraggable'
import cDraggableMulti from './modules/common/draggable/RenderOne.vue'
import cDraggableMultiTree from './modules/common/draggable/dragTree/RenderOne.vue'
import legoComponentBasic from '@lego/lego_component_basic/page/show/index.js'
import legoEditProp from '@lego/lego_component_basic/page/edit/components/editorProps';

import './index.scss';

// Vue.config.errorHandler = function (err /* vm, info */) {
//   const info = { type: 'error', msg: err.message, desc: err.stack };

//   store.get('all').unshift(info);
//   store.get('error').unshift(info);
//   $message({
//     message: err.message,
//     type: 'error'
//   });
// };

// Vue.config.warnHandler = function (msg, vm, trace) {
//   const info = { type: 'warning', msg, desc: trace };

//   store.get('all').unshift(info);
//   store.get('warning').unshift({ msg, desc: trace });
//   $message({
//     message: msg,
//     type: 'warning'
//   });
// };

var eventEmit = new EventEmit();
window.GLOBALEVENTEMIT || (window.GLOBALEVENTEMIT = eventEmit);

Vue.use(ElementUI);
Vue.use(legoComponentBasic)
Vue.use(legoEditProp)
console.log(legoComponentBasic , '基础组件')
console.log(legoEditProp , 'edit');
Vue.component('c-draggable', cDraggable)
Vue.component('c-draggable-multi', cDraggableMulti)
Vue.component('c-draggable-multi-tree', cDraggableMultiTree)

vStore.registerModule('editor', editor);
vStore.registerModule('widget', widget);

// import './register/index'
// import('public/testA.vue');
// sea.use('')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: vStore,
  render: h => h(App)
});

// LoadJS('testid' , '/public/js/index.js' , function(){
//   window.ButtonTest.install(Vue);
//   console.log(Vue.options.components , '注册组件0');
// });

// function LoadJS(id , fileUrl, callback){
//   var scriptTag = document.getElementById(id); 
//   var oHead = document.getElementsByTagName('HEAD').item(0);
//   var oScript= document.createElement("script"); 
//   if ( scriptTag) oHead.removeChild(scriptTag); 

//   oScript.id = id; 

//   oScript.type = "text/javascript"; 

//   oScript.src=fileUrl ; 

//   oHead.appendChild(oScript); 

//   oScript.onload = () => {
//     callback && callback();
//   }
// }

import './index.scss';

import legoComponentBasic from '@lego/lego_component_basic/public/js/index.js'

import Vue from 'vue' ;

import App from './App.vue';

import editor from '../../store/modules/editor';
import widget from '../../store/modules/widget';
import vStore from '../../store';

import cRenderCom from '../../modules/common/RenderOne.vue'

const EventEmit = require('@jyb/lib-event-emit');

window.Lego_ComponentConfig = [{"com_id":2,"name":"按钮","tag_name":"lego-button","component_group":"1","thumb":"http://localhost:7002/public/images/button@2x.png","component_type":"0","component_style_id":3,"component_style_version_id":3,"com_desc":"按钮组件","com_js":null,"com_css":null,"com_img":null,"is_register":true,"fileUrl":"/public/components/headmap.js","component_umd_name":"LegoButton","shows":[{"com_desc":"按钮组件","com_img":null,"tag_name":"lego-button","style_id":3}],"tag":"lego-button","themeExtend":{"1":[{"key":"B","type":"color","cssKey":"background-color","opacity":"0.3"}],"2":[{"key":"A","type":"color"}]},"extendProps":{"isCurrent":false,"isLocked":false,"isFolded":false},"model":{"size":{"cellType":"select","value":"","options":[{"label":"默认表单","value":""},{"label":"中等表单","value":"medium"},{"label":"小型表单","value":"small"},{"label":"超小表单","value":"mini"}],"title":"尺寸","desc":"尺寸"},"disabled":{"cellType":"switch","value":false,"desc":"value"},"text":{"cellType":"text","value":"按钮002","title":"名称","desc":"名称","placeHolder":"按钮描述"},"btnType":{"cellType":"select","value":"","options":[{"label":"普通按钮","value":""},{"label":"吸底按钮","value":"fixbuttom"}],"title":"按钮类型","desc":"按钮类型"},"btnToUrl":{"cellType":"text","value":"","title":"跳转地址","desc":"跳转地址","placeHolder":"跳转地址"},"eventId":{"cellType":"text","value":"","title":"统计ID","desc":"统计ID","placeHolder":"比如:30001.1.1"},"labelWidth":{"cellType":"text","value":"","title":"label宽度","desc":"表单域标签的宽度"},"className":{"cellType":"text","value":"","title":"class","desc":"class"},"eventType":{"cellType":"select","value":"","options":[{"label":"登录","value":"login"},{"label":"注册","value":"register"},{"label":"抽奖","value":"lottery"},{"label":"兑换","value":"exchange"},{"label":"红包","value":"coupon"}],"title":"按钮类型"},"styles":{"cellType":"editorStyle","value":{},"title":"编辑样式","desc":"编辑样式"}},"props":{"uuid":"1","disabled":false,"styles":{},"size":"default","labelWidth":"","text":"按钮002","btnType":"","btnToUrl":"","eventId":"","className":"test test222","originStyles":{"background-color":"rgba(243,210,177,0.3)"},"eventType":""}},{"com_id":2,"name":"按钮","tag_name":"lego-button","component_group":"1","thumb":"http://localhost:7002/public/images/button@2x.png","component_type":"0","component_style_id":3,"component_style_version_id":3,"com_desc":"按钮组件","com_js":null,"com_css":null,"com_img":null,"is_register":true,"fileUrl":"/public/components/headmap.js","component_umd_name":"LegoButton","shows":[{"com_desc":"按钮组件","com_img":null,"tag_name":"lego-button","style_id":3}],"tag":"lego-button","themeExtend":{"1":[{"key":"B","type":"color","cssKey":"background-color","opacity":"0.3"}],"2":[{"key":"A","type":"color"}]},"extendProps":{"isCurrent":true,"isLocked":false,"isFolded":false},"model":{"size":{"cellType":"select","value":"","options":[{"label":"默认表单","value":""},{"label":"中等表单","value":"medium"},{"label":"小型表单","value":"small"},{"label":"超小表单","value":"mini"}],"title":"尺寸","desc":"尺寸"},"disabled":{"cellType":"switch","value":false,"desc":"value"},"text":{"cellType":"text","value":"按钮0334","title":"名称","desc":"名称","placeHolder":"按钮描述"},"btnType":{"cellType":"select","value":"","options":[{"label":"普通按钮","value":""},{"label":"吸底按钮","value":"fixbuttom"}],"title":"按钮类型","desc":"按钮类型"},"btnToUrl":{"cellType":"text","value":"https://cdn.jyblife.com/channel/h5buy/mbuy.html?channel=10","title":"跳转地址","desc":"跳转地址","placeHolder":"跳转地址"},"eventId":{"cellType":"text","value":"30000.1.2","title":"统计ID","desc":"统计ID","placeHolder":"比如:30001.1.1"},"labelWidth":{"cellType":"text","value":"","title":"label宽度","desc":"表单域标签的宽度"},"className":{"cellType":"text","value":"","title":"class","desc":"class"},"eventType":{"cellType":"select","value":"","options":[{"label":"登录","value":"login"},{"label":"注册","value":"register"},{"label":"抽奖","value":"lottery"},{"label":"兑换","value":"exchange"},{"label":"红包","value":"coupon"}],"title":"按钮类型"},"styles":{"cellType":"editorStyle","value":{"width":"4rem"},"title":"编辑样式","desc":"编辑样式"}},"props":{"uuid":"1","disabled":false,"styles":{"width":"4rem"},"size":"default","labelWidth":"","text":"按钮0334","btnType":"","btnToUrl":"https://cdn.jyblife.com/channel/h5buy/mbuy.html?channel=10","eventId":"30000.1.2","className":"test test222","originStyles":{"background-color":"rgba(243,210,177,0.3)"},"eventType":""}}]

Vue.component('c-render-com', cRenderCom)


Vue.use(legoComponentBasic.default)

vStore.registerModule('editor', editor);
vStore.registerModule('widget', widget);


var eventEmit = new EventEmit();
window.GLOBALEVENTEMIT || (window.GLOBALEVENTEMIT = eventEmit);

new Vue({
  el: '#container',
  render(h){
    return h(App);
  }
});


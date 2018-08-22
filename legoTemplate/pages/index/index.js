
  import './index.scss';

  import legoComponentBasic from '@lego/lego_component_basic/public/js/index.js'

  import Vue from 'vue' ;

  import App from './App.vue';

  import editor from '../../store/modules/editor';
  import widget from '../../store/modules/widget';
  import vStore from '../../store';

  import cRenderCom from '../../modules/common/RenderOne.vue'

  const EventEmit = require('@jyb/lib-event-emit');

  let vuecomponents = { 
 LegoHeadmap:require('@lego/lego_component_demo/public/js/index'), 
 };;

  window.Lego_ComponentConfig = [{"com_id":3,"name":"行组件","tag_name":"lego-row","component_group":"1","thumb":"http://localhost:7002/public/images/product_main@2x.png","component_type":"0","component_style_id":4,"component_style_version_id":4,"com_desc":null,"com_js":null,"com_css":null,"com_img":null,"is_register":true,"fileUrl":"/public/components/headmap.js","component_umd_name":"LegoRow","shows":[{"com_desc":null,"com_img":null,"tag_name":"lego-row","style_id":4}],"tag":"lego-row","draggable":true,"extendProps":{"isCurrent":true,"isLocked":false,"isFolded":false},"model":{"direction":{"cellType":"select","value":"row","options":[{"label":"水平","value":"row"},{"label":"水平倒置","value":"row-reverse"},{"label":"垂直","value":"column"},{"label":"垂直倒置","value":"column-reverse"}],"title":"排列方式","desc":"排列方式"},"justify":{"cellType":"select","value":"start","options":[{"label":"对齐起始位置","value":"start"},{"label":"靠末端对其","value":"end"},{"label":"居中对齐","value":"center"},{"label":"均匀排布","value":"space-around"},{"label":"两边对齐","value":"space-between"}],"title":"水平排列方式","desc":"水平排列方式"},"align":{"cellType":"select","value":"top","options":[{"label":"顶部对齐","value":"top"},{"label":"居中对齐","value":"middle"},{"label":"底部对齐","value":"bottom"}],"title":"垂直排列方式","desc":"垂直排列方式"},"gutter":{"cellType":"number","value":0,"title":"栅格间隔","desc":"栅格间隔","regExpress":"\\d+","message":"必须为数字","required":true},"styles":{"cellType":"editorStyle","value":{},"title":"编辑样式","desc":"编辑样式"}},"children":[{"com_id":2,"name":"按钮","tag_name":"lego-button","component_group":"1","thumb":"http://localhost:7002/public/images/button@2x.png","component_type":"0","component_style_id":3,"component_style_version_id":3,"com_desc":"按钮组件","com_js":null,"com_css":null,"com_img":null,"is_register":true,"fileUrl":"/public/components/headmap.js","component_umd_name":"LegoButton","shows":[{"com_desc":"按钮组件","com_img":null,"tag_name":"lego-button","style_id":3}],"tag":"lego-button","themeExtend":[1,2],"extendProps":{"isCurrent":false,"isLocked":false,"isFolded":false},"model":{"size":{"cellType":"select","value":"","options":[{"label":"默认表单","value":""},{"label":"中等表单","value":"medium"},{"label":"小型表单","value":"small"},{"label":"超小表单","value":"mini"}],"title":"尺寸","desc":"尺寸"},"disabled":{"cellType":"switch","value":false,"desc":"value"},"text":{"cellType":"text","value":"","title":"名称","desc":"名称","placeHolder":"按钮描述"},"btnType":{"cellType":"select","value":"","options":[{"label":"普通按钮","value":""},{"label":"吸底按钮","value":"fixbuttom"}],"title":"按钮类型","desc":"按钮类型"},"btnToUrl":{"cellType":"text","value":"","title":"跳转地址","desc":"跳转地址","placeHolder":"跳转地址"},"eventId":{"cellType":"text","value":"","title":"统计ID","desc":"统计ID","placeHolder":"比如:30001.1.1"},"labelWidth":{"cellType":"text","value":"","title":"label宽度","desc":"表单域标签的宽度"},"className":{"cellType":"text","value":"","title":"class","desc":"class"},"eventType":{"cellType":"select","value":"","options":[{"label":"登录","value":"login"},{"label":"注册","value":"register"},{"label":"抽奖","value":"lottery"},{"label":"兑换","value":"exchange"},{"label":"红包","value":"coupon"}],"title":"按钮类型"},"styles":{"cellType":"editorStyle","value":{},"title":"编辑样式","desc":"编辑样式"}},"props":{"uuid":"1","disabled":false,"styles":{},"size":"default","labelWidth":"","text":"button","btnType":"","btnToUrl":"","eventId":"","className":"test test222","originStyles":{"background-color":"#3a4aa7"},"eventType":""}}],"props":{"justify":"start","align":"middle","type":"flex","gutter":0,"styles":{},"originStyles":{}}}]

  Vue.component('c-render-com', cRenderCom)
  

  for (var componentname in vuecomponents) {
    if (vuecomponents.hasOwnProperty(componentname)) {
      Vue.use(vuecomponents[componentname].default);
    };
  }

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


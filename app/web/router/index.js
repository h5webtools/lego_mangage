import Vue from 'vue';
import Router from 'vue-router';

// import NotFound from '../pages/404';

import welcome from '../pages/welcome/welcomeApp.vue';
import Layout from '../pages/main/layout.vue';

const actList = () => import(/* webpackChunkName: "actList" */ '../pages/act/list/listApp.vue');
const actEdit = () => import(/* webpackChunkName: "actEdit" */ '../pages/act/edit/editApp.vue');
const cmdList = () => import(/* webpackChunkName: "cmdList" */ '../pages/cmd/list/cmdListApp.vue');
const paramsList = () => import(/* webpackChunkName: "paramsList" */ '../pages/params/paramApp.vue');
const actChainConfig = () => import(/* webpackChunkName: "actChainConfig" */ '../pages/chain/chainApp.vue');
const templateConfigTree = () => import(/* webpackChunkName: "templateConfigTree" */ '../pages/template/chaintpl/chainApp.vue');
const templateList = () => import(/* webpackChunkName: "templateList" */ '../pages/template/list/listApp.vue');
const systemSync = () => import(/* webpackChunkName: "systemSync" */ '../pages/system/sync/listApp.vue');
const ConfigTreeLego = () => import(/* webpackChunkName: "ConfigTreeLego" */ '../pages/template/chaintpllego/chainApp.vue');
const legoComponents = () => import(/* webpackChunkName: "legoComponents" */ '../pages/lego/components/listApp.vue');
const legoPages = () => import(/* webpackChunkName: "legoPages" */ '../pages/lego/pages/listApp.vue');
const legoComponentStyles = () => import(/* webpackChunkName: "legoComponentStyles" */ '../pages/lego/cstyles/listApp.vue');
const entryList = () => import(/* webpackChunkName: "entryList" */ '../pages/entry/config/configApp.vue');
const entryActList = () => import(/* webpackChunkName: "entryActList" */ '../pages/entry/list/entryActList.vue');

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'main',
    title: '主页',
    component: Layout,
    redirect: '/welcome',
    children: [
      { path: 'welcome', name:'welcome',title:'欢迎页', component: welcome }
    ]
  }, 
  {
    path: '/ConfigTreeLego/:tpl_id/:pageid/:comid/:act_id',
    name: 'ConfigTreeLego',
    component: ConfigTreeLego,
    title: '乐高模板'
  }, 
  {
    path: '/act',
    name: 'act',
    title: '活动配置管理',
    component: Layout,
    redirect: '/act/list',
    children: [{
        path: '/act/list',
        name: 'actList',
        title: '活动列表',
        component: actList,
        children: [{
          path: '/act/edit/:act_id/:status',
          component: actEdit,
          name: 'actEdit',
          title: '编辑活动'
        },{
          path: '/act/chainEdit/:act_id/:status',
          component: actChainConfig,
          name: 'chainEdit',
          title: '编辑配置树'
        }]
      }, {
        path: '/act/edit',
        component: actEdit,
        title: '新增活动',
        name: 'newAct'
      }, {
        path: '/act/cmdList',
        component: cmdList,
        title: '命令字列表',
        name: 'cmdList'
      }, {
        path: '/act/paramsList',
        component: paramsList,
        title: '规则/动作列表',
        name: 'filterList'
      }
    ]
  },
  {
    path: '/template',
    name: 'template',
    title: '组件模板管理',
    component: Layout,
    redirect: '/template/templateList',
    children: [{
        path: '/template/templateList',
        name: 'templateList',
        title: '规则树模板列表',
        component: templateList,
        children: [{
          path: '/tempalte/configTree/:tpl_id',
          component: templateConfigTree,
          name: 'configTree',
          title: '模板配置树'
        }]
      }
    ]
  },
  {
    path: '/lego',
    name: 'legoFE',
    title: '页面配置管理',
    component: Layout,
    redirect: '/lego/pageList',
    children: [{
      path: '/lego/pageList',
      name: 'pageList',
      title: '乐高页面列表',
      component: legoPages
    }, {
      path: '/lego/componentList',
      name: 'componentList',
      title: '乐高组件集合',
      component: legoComponents,
      children: [{
        path: '/lego/componentStyleList/:componentId',
        name: 'componentStyleList',
        title: '乐高组件样式集合',
        component: legoComponentStyles
      }]
    }]
  },
  {
    path: '/system',
    name: 'system',
    title: '系统设置',
    component: Layout,
    redirect: '/system/sync',
    children: [{
        path: '/system/sync',
        name: 'systemSync',
        title: '同步配置',
        component: systemSync
      }
    ]
  },
  {
    path: '/entry',
    name: 'entry',
    title: '活动入口配置',
    component: Layout,
    redirect: '/entry/list',
    children: [{
        path: '/entry/list',
        component: entryList,
        title: '入口配置',
        name: 'entryList'
      },
      {
        path: '/entry/entryActList',
        component: entryActList,
        title: '入口活动列表',
        name: 'entryActList'
      }
    ]
  },
];

addMetaTitle(routes);

function addMetaTitle(arr) {
  if (Array.isArray(arr)) {
    arr.forEach((a) => {
      if (!a.meta) a.meta = {};
      if (a.title) a.meta.title = a.title;
      if (a.children && Array.isArray(a.children)) addMetaTitle(a.children);
    });
  }
}

const router = new Router({
  routes,
  mode: 'hash',
  linkActiveClass: 'active'
});

export default router;
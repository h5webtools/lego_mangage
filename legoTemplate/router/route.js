// import dashboard from '../pages/dashboard/dashboardApp.vue';
// import orderList from '../pages/order/orderList/orderList.vue';
// import orderDetail from '../pages/order/orderDetail';
// import userList from '../pages/user/list';
// import userDetail from '../pages/user/userDetail';
// import userAudit from '../pages/user/auditList';
// import userAuditDetail from '../pages/user/auditDetail';
// import authList from '../pages/auth/list';
import NotFound from '../components/common/404.vue';

import welcome from '../pages/welcome/welcomeApp.vue';
import Layout from '../pages/main/layout.vue';

const orderList = () => import(/* webpackChunkName: "orderList" */ '../pages/order/orderList/orderList.vue');
const demo = () => import(/* webpackChunkName: "orderList" */ '../pages/demo/demo.vue');
const demo2 = () => import(/* webpackChunkName: "orderList" */ '../pages/editor/index');
const routes = [
  {
    path: '/404',
    component: NotFound,
    name: '404',
    component: Layout,
    title: '404',
    // redirect: 'noredirect',
  }, {
    path: '/',
    name: '主页',
    component: Layout,
    redirect: '/welcome',
    children: [{ path: 'welcome', component: welcome }]
  }, 
  {
    path: '/welcome',
    name: 'welcome', 
    component: welcome 
  },
  {
    path: '/demo',
    component: demo,
  },
  {
    path: '*',
    title: '404',
    redirect: '/404',
  }
];

export default routes;
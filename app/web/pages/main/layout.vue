<template>
  <div class="layout-main">
    <aside class="aside-wrap" :class="{fold: menuFolded}">
      <div class="logo">
        <router-link to="/welcome"><img src="../../assets/img/logo.png"/></router-link>
      </div>
      <el-menu unique-opened mode="vertical" background-color="#fff"
          text-color="#666"
          active-text-color="#46a0fc" :default-active="$route.path">
        <sidebar-item :menusList="menuList"></sidebar-item>
      </el-menu>
    </aside>
    <section class="main-wrap">
      <header class="app-header">
        <el-row>
          <el-col :span="12">
            <span class="toggle" @click="toggleMenu">
              <i class="glyphicon glyphicon-align-justify"></i>
            </span>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="(item,index)  in levelList" :key="index">
                <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.meta.title}}</router-link>
                <router-link v-else :to="item.path">{{item.meta.title}}</router-link>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="12" class="ui-ta-r">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a href="/login/loginOut">退出登录</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </header>
      <div class="app-main">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </section>
  </div>
</template>
<script>
import sidebarItem from './sidebar-item.vue';
import routes from '../../router/route'
import {walkRoute} from '@jyb/common-menu' 

export default {
  name: 'loan_menu',
  components: {
    sidebarItem
  },
  data() {
    return {
      menuList: [],
      isCollapse: false,
      levelList: [],
      menuFolded: false,
      userInfo: window.userInfo
    }
  },
  created() {
    this.getBreadcrumb();
    this.getMenuData();
  },
  methods: {
    toggleMenu() {
      this.menuFolded = !this.menuFolded;
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta.title);
      const first = matched[0];
      // if (first && (first.name !== 'main' || first.path !== '')) {
      //   matched = [{ name: '主页', path: '/' }].concat(matched)
      // }
      this.levelList = matched;
    },
    getMenuData() {
       this.menuList = walkRoute(routes, menuData, 'name');
       debugger
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
}
</script>


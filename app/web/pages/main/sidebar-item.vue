<template>
  <div>
    <template v-for="item in menusList">
      <!-- <router-link v-if="item.menu_items.length == 0" :to="item.path"> -->
        <el-menu-item v-if="item.children.length == 0" :index="item.menu_url">
          <router-link :to="item.menu_url"><span slot-scope="title">{{item.menu_name}}</span></router-link>
        </el-menu-item>
      <!-- </router-link> -->
      <el-submenu :index="item.menu_name" v-if="item.children.length > 0">
        <template slot-scope="title">
          <i :class="item.icon"></i><span slot-scope="title">{{item.menu_name}}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item v-if="child.children && child.children.length > 0" :menusList='child.children'></sidebar-item>
            <!-- <router-link v-else class="menu-indent" :to="child.path"> -->
          <el-menu-item v-else :index="child.menu_url">
            <span slot-scope="title"><router-link class="menu-link" :to="child.menu_url">{{child.menu_name}}</router-link></span>
            <!-- <a class="menu-link" :href="'#'+child.menu_url"><span slot-scope="title">{{child.menu_name}}</span></a> -->
          </el-menu-item>
            <!-- </router-link> -->
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: "sidebarItem",
  props: {
    menusList: {
      type: Array
    }
  }
};
</script>

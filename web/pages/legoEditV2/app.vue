<template>
 <el-container>
   <el-header>
      <header>www333</header>
    </el-header>
    <div class="wrapper">
      <editor-layout v-show="activeIndex === 'layout'"></editor-layout>
    </div>
 </el-container>
</template>

<script>

import { mapGetters } from 'vuex';
import * as util from '@jyb/lib-util';
import * as queryString from '@/util/querystring';
import Vue from 'vue'

// component
import EditorLayout from './modules/layout/index.vue';

export default {
  components: {
    EditorLayout,
  },
  data() {
    return {
      loading: true,
      showTestButton: false
    };
  },
  computed: {
    ...mapGetters({
      activeIndex: 'editor/menuActiveIndex'
    })
  },
  methods: {
    loadComponents(id , fileUrl, callback){
    var scriptTag = document.getElementById(id); 
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript= document.createElement("script"); 
    if ( scriptTag) oHead.removeChild(scriptTag); 

    oScript.id = id; 

    oScript.type = "text/javascript"; 

    oScript.src=fileUrl ; 

    oHead.appendChild(oScript); 

    oScript.onload = () => {
      callback && callback();
    }
  }
  },
  created() {
/*     this.loadComponents('testid' , '/public/style/style1.js' , function(){
      window.ButtonTest.install(Vue);
      console.log(Vue.options.components , '注册组件0');
    }); */
    // this.LoadJS('testid' , '/public/js/index.js')
    setTimeout(() =>{
      // console.log(ButtonTest , '开始注册');
      // ButtonTest && ButtonTest.install(Vue);
      
      console.log(Vue.options.components , '注册组件');
      // console.log(Vue.component('el-button-test'));
      // this.showTestButton = true;
     } , 5000);
    //this.AjaxPage('testid' , '/public/js/index.js');
    // 获取组件列表
    // this.$store.dispatch('widget/getWidgetList').then(() => {
    //   // 获取组件列表，注册组件之后，再设置默认页面
    //   this.$store.dispatch('editor/setDefaultPage', { pageId: queryString.pageId });
    //   this.loading = false;
    // });
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 60px);
  overflow: hidden;
}
.el-header {
  padding-left: 0;
  padding-right: 0;
  overflow: hidden;
}
</style>

<template>
 <el-container>

    <editor-header></editor-header>

    <div class="el-container-lego">
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
import EditorHeader from './modules/layout/header.vue';

export default {
  components: {
    EditorLayout,
    EditorHeader
  },
  data() {
    return {
      loading: true,
      userName: window.userInfo.userAccount,
      currentThemeColor: '#fff',
      themeColor: {
        color: [],
        grident: []
      },
      currentThemeId: -1,
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

<style lang="scss">


.el-container-lego {
  margin-top: 59px;
  height: 100vh;
  width: 100%;

  .el-aside {
    background: #FFFFFF;
    border-right: 1px solid rgba(58,74,167,0.10);
    overflow: hidden;
    .components {
      display: flex;
      text-align: center;
      align-items: baseline;
      flex-wrap: wrap;
      padding: 20px;
      .components__item {
        width: 32%;
        margin-top: 24px;
        font-size: 12px;
        color: #8489AB;
        border: 1px solid transparent;
        line-height: 3;
        &:hover {
          border: 1px dashed rgba(58,74,167,0.3);
        }
        .components__item__imgwrap {
          width: 88px;
          height: 66px;
          margin: 0 auto;
          background-position: center center;
          background-size: 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .el-collapse-item__header {
      background: rgba(58,74,167,0.10);
      padding-left: 20px;
      border-bottom: 1px solid rgba(58,74,167,0.3);
      &.is-active {
        border-bottom: 0;
      }
    }
  }
}

.iphone-container {
  margin: 20px auto 0;
  width: 375px;
  transition: all 0.3 ease;
  min-height: 800px;
  border: 1px dashed #999;
  position: relative;
  &:after {
    content: "iphone6首屏高度667px";
    position: absolute;
    width: 100%;
    border-bottom: 1px dashed #e5e5e5;
    left: 0;
    top: 667px;
    font-size: 12px;
    color: #e5e5e5;
    text-align: center;
  }
}
</style>

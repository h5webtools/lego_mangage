<template>
  <!-- 内容区域 -->
  <el-container class="layout">
    <!-- 左边侧边栏 -->
    <el-aside class="layout__aside-left" width="340px">
      <editor-widget-list :list="widgetList"></editor-widget-list>
    </el-aside>
    <!-- 中间区域 -->

    <el-main>
      <div class="layout__editor-main">
<!--         <el-alert
          title="拖拽组件到这里配置页面"
          type="info"
          :closable="false"
          center
          show-icon>
        </el-alert> -->
        <editor-render class="iphone-container"
          :page-data="pageData"
        ></editor-render>
      </div>
    </el-main>
    
    <!-- 右边侧边栏 -->
    <el-aside class="layout__aside-right" >
      <el-tabs type="border-card" class="prop-edit-area">
        <el-tab-pane label="组件编辑" width="170px" >
          <!-- 属性配置 -->
          <lego-edit-prop :component="currentComponent"></lego-edit-prop>
           <!-- <editor-props :component="currentComponent"></editor-props> -->
        </el-tab-pane>
        <el-tab-pane label="图层管理">
              <!-- 组件树 -->
<!--             <editor-tree
              
              @handleTreeNodeClick="handleTreeNodeClick"
              :page-data="pageData"
              :current="currentComponent.uid"
            ></editor-tree> -->
            <editor-tree></editor-tree>
        </el-tab-pane>

      </el-tabs>

    </el-aside>
    <!-- code dialog -->
   
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";

import EditorWidgetList from "./widget-list.vue";
import EditorTree from "../common/draggable/dragTree/Render.vue";
import EditorRender from "../common/draggable/Render.vue";

import stringifyObject from "@/util/stringify";

export default {
  components: {
    EditorRender,
    EditorWidgetList,
    EditorTree
  },
  data() {
    return {
      codeDialog: true
    };
  },
  computed: {
    ...mapGetters({
      pageData: "editor/pageData",
      widgetList: "widget/widgetList",
      currentComponent: "editor/currentComponent"
    }),
  },
  created() {

  },
  methods: {
    handleTreeNodeClick(data) {
      this.$store.dispatch("editor/setCurrentComponent", data);
    },

  }
};
</script>

<style lang="scss" >
/* .layout {
  height: calc(100% - 60px);
} */

.layout__aside-left {
  border-right: 1px solid #ebeef5;
  overflow-x: hidden;

  .el-collapse-item__header {
    padding-left: 10px;
  }
  .el-collapse-item__content {
    padding-bottom: 10px;
  }
}

.layout__editor-main {
  position: relative;
  height: 100%;
}

.layout__aside-right {
  // width: 340px;
  width: 450px!important;
  // border-left: 1px solid #ebeef5;
  .prop-edit-area {
    height: 100%;
    width: 100%;
    &.el-tabs--border-card {
      width: 100%;
      & > .el-tabs__header {
        & > .el-tabs__nav-wrap {
          & > .el-tabs__nav-scroll {
            width: 100%;
            & > .el-tabs__nav {
              width: 100%;
              & > .el-tabs__item {
                height: 48px;
                width: calc(50%);
                line-height: 48px;
                text-align: center;
                background: #ebecf6;
                font-size: 16px;
                color: #5f6270;
                letter-spacing: 0;
                text-align: center;
                border-width: 0;
                &.is-active {
                  border-width: 0;
                  background: #ffffff;
                  font-size: 16px;
                  color: rgba(97, 110, 185, 0.9);
                  letter-spacing: 0;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }

    & > .el-tabs__content {
      background-color: #ffffff;
      height: 100%;
      padding: 0;
    }
  }
}
</style>

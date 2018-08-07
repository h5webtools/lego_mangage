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
        <render-data></render-data>
        
      </div>
    </el-main>
    
    <!-- 右边侧边栏 -->
    <el-aside class="layout__aside-right" >
      <el-tabs type="border-card" class="prop-edit-area">
        <el-tab-pane label="样式选择" v-if="showComponentStyle">
          <!-- 属性配置 -->
           <select-com-style></select-com-style>
        </el-tab-pane>

        <el-tab-pane label="组件编辑" >
          <!-- 属性配置 -->
          <lego-edit-prop :component="currentComponent" ></lego-edit-prop>
           <!-- <editor-props :component="currentComponent"></editor-props> -->
        </el-tab-pane>
        <el-tab-pane label="图层管理">
              <!-- 组件树 -->

          <render-data-tree></render-data-tree>

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
import RenderData from "./renderData.vue"
import RenderDataTree from "./renderDataTree.vue"
import selectComStyle from "../common/selectComponentStyle.vue"

import stringifyObject from "@/util/stringify";

export default {
  components: {
    EditorWidgetList,
    RenderData,
    RenderDataTree,
    selectComStyle
  },
  data() {
    return {
      codeDialog: true,
      level: 0,
      levelIndex: "0",
      draggable: true
    };
  },
  computed: {
    ...mapGetters({
      isDragging: "editor/isDragging",
      pageData: "editor/pageData",
      widgetList: "widget/widgetList",
      currentComponent: "editor/currentComponent"
    }),
    showComponentStyle() {
      return this.currentComponent && this.currentComponent.shows && (this.currentComponent.shows.length > 1)
    }
  },
  created() {},
  methods: {
    handleTreeNodeClick(data) {
      this.$store.dispatch("editor/setCurrentComponent", data);
    }
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
  width: 450px !important;
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
              display: flex;
              width: 100%;
              & > .el-tabs__item {
                height: 48px;
                flex: 1;
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
      & > .el-tab-pane{
        height: 100%;
        & > .tree-manage{
          height: 100%;
        }
      }
    }
  }
}
</style>

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
    <el-aside class="layout__aside-right" width="340px">
      <el-tabs type="border-card" class="prop-edit-area">
        <el-tab-pane label="组件编辑" width="170px">
          <!-- 属性配置 -->
           <editor-props :component="currentComponent"></editor-props>
        </el-tab-pane>
        <el-tab-pane label="图层管理">
              <!-- 组件树 -->
            <editor-tree
              
              @click="handleTreeNodeClick"
              :page-data="pageData"
              :current="currentComponent.uid"
            ></editor-tree>
        </el-tab-pane>

      </el-tabs>

    </el-aside>
    <!-- code dialog -->
   
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";

// component
import EditorWidgetList from "./widget-list.vue";
import EditorProps from "./props.vue";
// import EditorWidgetLayer from './widget-layer.vue';
// import EditorContextMenu from './context-menu.vue';
// import EditorCodeDialog from './code-dialog.vue';
import EditorTree from "../common/tree.vue";
import EditorRender from "../common/render.vue";

import stringifyObject from "@/util/stringify";

export default {
  components: {
    EditorRender,
    EditorWidgetList,
    EditorProps,
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
    codeString() {
      return `return ${stringifyObject(
        this.codeSnippet[this.currentComponent.uid] || {},
        {
          indent: "  ",
          singleQuotes: false
        }
      )}`;
    }
  },
  created() {
    // const testB = require('./test.vue')
    // const instance = Vue.component('test-b', testB);
    // const prop = {}
    // const a = instance.extend(prop)
  },
  methods: {
    handleCodeDialogClose() {
      this.$store.dispatch("editor/updateValue", {
        key: "codeDialogVisible",
        value: false
      });
    },
    handleCodeDialogSave(result) {
      this.$store.dispatch("editor/updateCode", result);
      this.handleCodeDialogClose();
    },
    handleTreeNodeClick(data) {
      this.$store.dispatch("editor/setCurrentComponent", data);
    }
  }
};
</script>

<style lang="scss" >
.layout {
  height: calc(100% - 60px);
}

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
  // border-left: 1px solid #ebeef5;
  .prop-edit-area {
    height: 100%;
    &.el-tabs--border-card {
      & > .el-tabs__header {
        & .el-tabs__item {
          width: 170px;
          height: 48px;
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
    & > .el-tabs__content{
      background-color: #ffffff;
      height: 100%;
      padding:0;
    }
  }
}
</style>

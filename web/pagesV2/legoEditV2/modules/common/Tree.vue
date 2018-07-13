<template>
  <div class="tree-box" :style="styles">
    <!-- <h6 class="tree-box__title">组件树：</h6> -->
    <div class="tree-box__main">
      <el-tree
        :indent="24"
        :data="pageDataCurrent"
        :props="defaultProps"
        :expand-on-click-node="false"
        node-key="uid"
        ref="editorTree"
        @node-click="handleNodeClick"
        highlight-current
        default-expand-all
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          draggable
      >
       <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            :class="data.isLocked ? 'locked' : 'unLocked'"
            type="text"
            size="mini"
            @click="() => lock(data, node, 'isLocked')">
            
          </el-button>
        </span>
      </span></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageData: {
      type: Array,
      default: null
    },
    current: {
      type: [Number, String],
      default: 0
    },
    styles: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      }
      // treeData: this.pageData
    };
  },
  computed: {
    pageDataCurrent() {
      return JSON.parse(JSON.stringify(this.pageData))
    }
  },
  watch: {
    current(newVal) {
      this.setCurrentKey(newVal);
    }
  },
  created() {
    // this.setCurrentKey(this.current);
  },
  methods: {
    handleNodeClick(data, node, component) {
      
      // 这里的data 已经和vuex 失去关联， 需要通过uuid来找， 太慢了！！！！
      this.$emit("handleTreeNodeClick", data);
    },
    setCurrentKey(val) {
      this.$nextTick(() => {
        this.$refs.editorTree.setCurrentKey(val);
      });
    },
    lock(data, node, key) {
      data[key] = !data[key]
      this.$store.dispatch("editor/updatePage", {
        levelIndex: 'top',
        data: this.pageDataCurrent
      });
    },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label, dropNode);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label, dropNode);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label, dropNode);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType, dropNode);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType, dropNode);
      this.$store.dispatch("editor/updatePage", {
        levelIndex: 'top',
        data: this.pageDataCurrent
      });
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.isLocked === true) {
        return false;
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.isLocked !== true;
    }
  }
};
</script>

<style lang="scss">
.tree-box {
  // overflow: hidden;
  & > .tree-box__main {
    height: calc(100% - 26px);
    box-sizing: border-box;
    // overflow: scroll;

    .el-tree-node__label,
    .el-tree__empty-text {
      font-size: 12px;
    }
    & > .el-tree {
      &.el-tree--highlight-current {
        & > .el-tree-node {
          font-size: 16px;
          color: #58586e;
          &:nth-child(2n) {
            background: #f5f6fa;
          }

          .el-tree-node__content {
            padding-left: 40px;
            height: 48px;
            &:hover {
              background-color: darken(#d8dbec, 10%);
            }
          }
        }
      }
      & .el-tree-node {
        &.is-current {
          & > .el-tree-node__content {
            background: #d8dbec;
          }
        }
      }
    }

    & .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      & .locked {
        width: 25px;
        height: 24px;
        background: url("../../../../assets/img/edit/layers_ic_lock@2x.png") 0 0 /
          100% 100%;
      }
      & .unLocked {
        width: 25px;
        height: 24px;
        background: url("../../../../assets/img/edit/layers_ic_unlock@2x.png") 0
          0 / 100% 100%;
      }
    }
  }
}
</style>

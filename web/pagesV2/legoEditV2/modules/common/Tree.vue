<template>
  <div class="tree-box" :style="styles">
    <!-- <h6 class="tree-box__title">组件树：</h6> -->
    <div class="tree-box__main">
      <el-tree
        :indent="12"
        :data="pageData"
        :props="defaultProps"
        :expand-on-click-node="false"
        node-key="uid"
        ref="editorTree"
        @node-click="handleNodeClick"
        highlight-current
        default-expand-all
      ></el-tree>
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
        label: "tag"
      }
      // treeData: this.pageData
    };
  },
  watch: {
    current(newVal) {
      this.setCurrentKey(newVal);
    }
  },
  created() {
    this.setCurrentKey(this.current);
  },
  methods: {
    handleNodeClick(data, node, component) {
      this.$emit("click", data);
    },
    setCurrentKey(val) {
      this.$nextTick(() => {
        this.$refs.editorTree.setCurrentKey(val);
      });
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
              background-color: darken(#d8dbec, 10%) ;
            }
          }
        }
      }
      & .el-tree-node{
          &.is-current {
            & > .el-tree-node__content {
              background: #d8dbec;
            }
          }
      }
    }
  }
}
</style>

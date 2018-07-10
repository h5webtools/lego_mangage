<template>
  <div class="tree-box" :style="styles">
    <!-- <h6 class="tree-box__title">组件树：</h6> -->
    <div class="tree-box__main">
      <el-tree
        :indent="24"
        :data="pageData"
        :props="defaultProps"
        :expand-on-click-node="false"
        node-key="uid"
        ref="editorTree"
        @node-click="handleNodeClick"
        highlight-current
        default-expand-all
      >
       <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            :class="data.isLocked ? 'locked' : 'unLocked'"
            type="text"
            size="mini"
            @click="() => lock(data, 'isLocked')">
            
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
    // this.setCurrentKey(this.current);
  },
  methods: {
    handleNodeClick(data, node, component) {
      this.$emit("handleTreeNodeClick", data);
    },
    setCurrentKey(val) {
      this.$nextTick(() => {
        this.$refs.editorTree.setCurrentKey(val);
      });
    },
    lock(data, key) {
      // this.$refs.editorTree.setCurrentKey(data);
       try {
        this.$store.dispatch("editor/updateValueDirect", {
          data: data,
          update:[{
            key: key,
            value: !data[key]
          }]
        });
      } catch (e) {
        this.$message.error(e.toString());
      }
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

    & .custom-tree-node{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      & .locked{
        width: 25px;
        height: 24px;
        background: url('../../../../assets/img/edit/layers_ic_lock@2x.png') 0 0 / 100% 100%;
      }
      & .unLocked{
        width: 25px;
        height: 24px;
        background: url('../../../../assets/img/edit/layers_ic_unlock@2x.png') 0 0 / 100% 100%;
      }
    }
  }
}
</style>

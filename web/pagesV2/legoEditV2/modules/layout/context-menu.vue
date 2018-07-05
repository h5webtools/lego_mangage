<template>
  <div
    v-show="contextMenuData.visible"
    class="editor-context-menu-wrap"
    :style="contextMenuData.style"  
  >
    <div class="editor-context-menu">
      <strong class="editor-context-menu__title">
        {{contextMenuData.definition.name}}:{{contextMenuData.definition.uid}}
      </strong>
      <ul class="editor-context-menu__list">
        <li class="editor-context-menu__item" @click="handlePropsSetting">属性配置</li>
        <li class="editor-context-menu__item" @click="handleCodeEdit">代码编辑</li>
        <li class="editor-context-menu__item" @click="handleDeleteComponent">删除组件</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contextMenuData: {
      type: Object,
      default() {
        return {
          visible: false,
          style: {},
          definition: {}
        };
      }
    }
  },
  methods: {
    handlePropsSetting() {
      this.$store.dispatch('editor/setCurrentComponent', this.contextMenuData.definition);
    },
    handleCodeEdit() {
      this.$store.dispatch('editor/setCurrentComponent', this.contextMenuData.definition);
      this.$store.dispatch('editor/updateValue', {
        key: 'codeDialogVisible',
        value: true
      });
    },
    handleDeleteComponent() {
      this.$store.dispatch('editor/deleteComponent', this.contextMenuData.definition);
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      if (this.contextMenuData.visible) {
        this.$store.dispatch('editor/hideContextMenu');
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.editor-context-menu-wrap {
  position: fixed;
  z-index: 2000;
}

.editor-context-menu {
  display: inline-block;
  padding-bottom: 3px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.editor-context-menu__title {
  display: block;
  padding: 4px;
  font-size: 12px;
  border-bottom: 1px solid #ebeef5;
  text-align: center;
  color: #999;
}

.editor-context-menu__list {
  margin-top: 3px;
}

.editor-context-menu__item {
  list-style: none;
  line-height: 24px;
  padding: 0 10px;
  font-size: 12px;
  color: #606266;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #ecf5ff;
    color: #66b1ff;
  }
}
</style>

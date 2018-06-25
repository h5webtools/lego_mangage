<template>
<div>
  testAAAA
</div>
</template>

<script>

export default {
  name: 'testA',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    component: {
      type: Object,
      default: () => {}
    },
    codeString: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      code: this.codeString,
      editor: null,
      monacoOptions: {
        selectOnLineNumbers: false
      }
    };
  },
  computed: {
    title() {
      return `${this.component.name}:${this.component.uid} 代码编辑`
    }
  },
  watch: {
    codeString(newVal) {
      this.code = newVal;
    },
    visible(newVal) {
      if (this.editor && newVal) {
        this.editor.setValue(this.code);
      }
      this.dialogVisible = newVal;
    }
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    onCodeChange(editor) {
      
    },
    handleClose() {
      this.$emit('close');
    },
    handleSave() {
      this.$emit('save', {
        current: this.component,
        code: this.editor.getValue()
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-code-dialog {
  .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>

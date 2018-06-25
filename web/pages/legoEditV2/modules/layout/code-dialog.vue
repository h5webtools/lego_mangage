<template>
  <el-dialog
    class="editor-code-dialog"
    width="70%"
    :title="title"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
  >
    <Monaco
      height="400"
      language="javascript"
      srcPath="static/monaco/min"
      :code="codeString"
      :options="monacoOptions"
      :changeThrottle="500"
      theme="vs-dark"
      @mounted="onMounted"
      @codeChange="onCodeChange"
      >
    </Monaco>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="handleSave">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Monaco from '@/components/monaco.vue';

export default {
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
  components: {
    Monaco
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

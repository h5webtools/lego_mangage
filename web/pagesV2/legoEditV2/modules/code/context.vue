<template>
  <el-container class="code-context">
    <el-header class="code-context__editor-header" height="50px">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-alert
            title="公用代码会注入到$context中"
            type="info"
            :closable="false"
            show-icon>
          </el-alert>
        </el-col>
        <el-col :span="4">
          <el-button @click="handleContextReset" size="mini" type="info" plain round>重置</el-button>
          <el-button @click="handleContextSave" size="mini" type="success" plain round>保存</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="code-context__editor-main">
      <Monaco
        height="100%"
        language="javascript"
        srcPath="static/monaco/min"
        :code="contextCodeString"
        :changeThrottle="500"
        theme="vs-dark"
        @mounted="handleContextEditorMounted"
      >
      </Monaco>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Monaco from '@/components/monaco.vue';
import stringifyObject from '@/util/stringify';

const STRINGIFY_OBJECT_OPTIONS = {
  indent: '  ',
  singleQuotes: false
};

export default {
  components: {
    Monaco
  },
  data() {
    return {
      contextCodeString: '',
      contextEditor: null
    };
  },
  computed: {
    ...mapGetters({
      contextCode: 'editor/contextCode'
    })
  },
  watch: {
    contextCode(newVal) {
      return this.createCodeString(newVal);
    }
  },
  created() {
    this.contextCodeString = this.createCodeString(this.contextCode);
  },
  methods: {
    createCodeString(code) {
      return `return ${stringifyObject(code, STRINGIFY_OBJECT_OPTIONS)}`
    },
    setContextEditorValue(val) {
      if (this.contextEditor) {
        this.contextEditor.setValue(val);
        if (this.contextCodeString !== val) {
          this.contextCodeString = val;
        }
      }
    },
    handleContextEditorMounted(editor) {
      this.contextEditor = editor;
    },
    handleContextReset() {
      this.$confirm('此操作将导致改动丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.setContextEditorValue(this.contextCodeString);
      }).catch(() => {});
    },
    handleContextSave() {
      const val = this.contextEditor.getValue();
      this.$store.dispatch('editor/updateContextCode', val);
      this.setContextEditorValue(val);
    }
  }
}
</script>

<style lang="scss" scoped>
.code-context {
  height: 100%;
}

.code-context__editor-header {
  box-sizing: border-box;
  padding-top: 20px;
}

.code-context__editor-main {
  height: calc(100% - 50px);
}
</style>

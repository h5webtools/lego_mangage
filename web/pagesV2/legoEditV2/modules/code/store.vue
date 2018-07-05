<template>
  <el-container class="code-store">
    <el-header class="code-store__editor-header" height="50px">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-alert
            title="书写规则可以参考vuex module"
            type="info"
            :closable="false"
            show-icon>
          </el-alert>
        </el-col>
        <el-col :span="4">
          <el-button @click="handleStoreReset" size="mini" type="info" plain round>重置</el-button>
          <el-button @click="handleStoreSave" size="mini" type="success" plain round>保存</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="code-store__editor-main">
      <Monaco
        height="100%"
        language="javascript"
        srcPath="static/monaco/min"
        :code="storeCodeString"
        :changeThrottle="500"
        theme="vs-dark"
        @mounted="handleStoreEditorMounted"
      >
      </Monaco>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import stringifyObject from '@/util/stringify';
import Monaco from '@/components/monaco.vue';

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
      storeCodeString: '',
      storeEditor: null
    };
  },
  computed: {
    ...mapGetters({
      storeCode: 'editor/storeCode'
    })
  },
  watch: {
    storeCode(newVal) {
      return this.createCodeString(newVal);
    }
  },
  created() {
    this.storeCodeString = this.createCodeString(this.storeCode);
  },
  methods: {
    createCodeString(code) {
      return `return ${stringifyObject(code, STRINGIFY_OBJECT_OPTIONS)}`
    },
    setStoreEditorValue(val) {
      if (this.storeEditor) {
        this.storeEditor.setValue(val);
        if (this.storeCodeString !== val) {
          this.storeCodeString = val;
        }
      }
    },
    handleStoreEditorMounted(editor) {
      this.storeEditor = editor;
    },
    handleStoreReset() {
      this.$confirm('此操作将导致改动丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.setStoreEditorValue(this.storeCodeString);
      }).catch(() => {});
    },
    handleStoreSave() {
      const val = this.storeEditor.getValue();
      this.$store.dispatch('editor/updateStoreCode', val);
      this.setStoreEditorValue(val);
    },
  }
}
</script>

<style lang="scss" scoped>
.code-store {
  height: 100%;
}

.code-store__editor-header {
  box-sizing: border-box;
  padding-top: 20px;
}

.code-store__editor-main {
  height: calc(100% - 50px);
}
</style>

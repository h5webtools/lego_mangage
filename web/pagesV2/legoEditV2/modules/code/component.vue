<template>
  <!-- 内容区域 -->
  <el-container class="code-component">
    <el-main class="code-component__editor-main">
      <Monaco
        height="100%"
        language="vue"
        srcPath="static/monaco/min"
        :code="componentCodeString"
        :changeThrottle="500"
        theme="vs-dark"
        @mounted="handleComponentEditorMounted"
      >
      </Monaco>
    </el-main>
    <!-- 右边侧边栏 -->
    <el-aside class="code-component__aside-right" width="200px">
      <!-- 组件树 -->
      <editor-tree
        @click="handleTreeNodeClick"
        :page-data="pageData"
        :current="currentComponent.uid"
      ></editor-tree>
    </el-aside>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import extend from '@jyb/lib-extend';
import stringifyObject from '@/util/stringify';
import Monaco from '@/components/monaco.vue';
import EditorTree from '../common/tree.vue';

const STRINGIFY_OBJECT_OPTIONS = {
  indent: '  ',
  singleQuotes: false
};

export default {
  components: {
    EditorTree,
    Monaco
  },
  computed: {
    ...mapGetters({
      pageData: 'editor/pageData',
      codeSnippet: 'editor/codeSnippet',
      currentComponent: 'editor/currentComponent',
    })
  },
  watch: {
    currentComponent(newVal) {
      this.setComponentEditorValue(newVal);
      this.componentCodeString = this.generatorCode(newVal, this.codeSnippet[newVal.uid]);
    }
  },
  data() {
    return {
      componentCodeString: '',
      componentEditor: null
    };
  },
  created() {
    const currentComponent = this.currentComponent;
    this.componentCodeString = this.generatorCode(currentComponent, this.codeSnippet[currentComponent.uid]);
  },
  methods: {
    handleComponentEditorMounted(editor) {
      this.componentEditor = editor;
    },
    handleTreeNodeClick(data) {
      this.setComponentEditorValue(data);
    },
    setComponentEditorValue(component) {
      if (this.componentEditor && component) {
        this.componentEditor.setValue(this.generatorCode(component, this.codeSnippet[component.uid]));
      }
    },
    generatorCode(current, codeSnippet) {
      const { tag, props, uid } = current;
      const propsKeys = Object.keys(props);
      const propsArr = propsKeys.map(k => `:${k}="${k}"`);

      // template
      const template = [
        '<template>',
        `  <${tag}\n    ${propsArr.join('\n    ')}>`,
        `  </${tag}>`,
        '<\/template>'
      ];

      // script
      let scriptCode = {};

      if (codeSnippet) {
        scriptCode = extend(true, {}, codeSnippet.extend);
        scriptCode.data = extend(scriptCode.data || {}, props);
      }

      const script = [
        '<script>',
        `export default ${stringifyObject(scriptCode, STRINGIFY_OBJECT_OPTIONS)}`,
        '<\/script>'
      ];

      return `${template.join('\n')}\n\n${script.join('\n')}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.code-component {
  height: 100%;
}

.code-component__aside-right {
  border-left: 1px solid #ebeef5;
}
</style>

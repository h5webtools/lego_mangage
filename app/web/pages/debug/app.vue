<template>
  <div class="debug-wrap">
    <div class="debug-main">
      <div id="js-preview"></div>
      <div class="debug-editor-box">
        <ace-editor
          class="debug-editor"
          editorId="codeString"
          height="300px"
          :variable="editorVar"
          :content="codeString"
          lang="javascript"
          @change="handleEditorChange($event)"
        ></ace-editor>
        <div class="ui-ta-r">
          <a class="btn-save" href="javascript:;" @click="handleSave">保存</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Postmate from 'postmate';
import AceEditor from '@/components/ace-editor.vue';

let childAPI = null;

export default {
  components: {
    AceEditor
  },
  data() {
    return {
      editorVar: {
        'CANYE': {
          des: 'hahaha'
        }
      },
      userInfo: window.userInfo || {},
      codeString: '(function() {\n  // do something\n})();'
    };
  },
  methods: {
    handleEditorChange(val) {
      this.codeString = val;
    },
    handleSave(e) {
      if (this.childAPI) {
        this.childAPI.call('evalFunc', this.codeString);
      }
    }
  },
  mounted() {
    const handshake = new Postmate({
      container: document.getElementById('js-preview'),
      url: 'http://172.16.5.59:8887/demo1.html'
    });
    handshake.then(child => this.childAPI = child);
  }
}
</script>
<style lang="scss" scoped>
.ui-ta-r {
  text-align: right
}

.debug-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  overflow: hidden;
  background-color: #fff;
}

.debug-main {
  display: flex;
  justify-content: space-around;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.debug-editor {
  border: 1px solid #ccc;
}

.debug-editor-box {
  width: 600px;
}

#js-preview {
  iframe {
    width: 375px;
    height: 667px;
    border: 1px solid #ccc;
  }
}

.debug-editor {
  margin-bottom: 10px;
}

.btn-save {
  display: inline-block;
  padding: 4px 8px;
  background-color: #ed6c44;
  font-size: 13px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
}
</style>



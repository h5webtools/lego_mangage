<template>
  <div v-show="visible" class="debug-wrap">
    <div @click="handleClose" class="close-btn"></div>
    <div class="debug-main">
      <div id="js-preview"></div>
      <div class="debug-editor-box">
        <ace-editor
          class="debug-editor"
          editorId="codeStyleString"
          height="300px"
          :content="codeStyleString"
          lang="css"
          @change="handleEditorStyleChange($event)"
        ></ace-editor>
        <ace-editor
          class="debug-editor"
          editorId="codeScriptString"
          height="300px"
          :variable="editorVar"
          :content="codeScriptString"
          lang="javascript"
          @change="handleEditorScriptChange($event)"
        ></ace-editor>
        <div class="ui-ta-r">
          <a class="btn-save" href="javascript:;" @click="handleDebug">调试</a>
          <a class="btn-save" href="javascript:;" @click="handleSave">保存</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Postmate from 'postmate';
import AceEditor from '@/components/ace-editor.vue';

export default {
  components: {
    AceEditor
  },
  data() {
    return {
      visible: false,
      editorVar: {
        'CANYE': {
          des: 'hahaha'
        }
      },
      userInfo: window.userInfo || {},
      codeStyleString: '/* css */\n',
      codeScriptString: '(function() {\n  // do something\n})();'
    };
  },
  methods: {
    handleEditorScriptChange(val) {
      this.codeScriptString = val;
    },
    handleEditorStyleChange(val) {
      this.codeStyleString = val;
    },
    handleClose() {
      this.visible = false;
    },
    handleDebug(e) {
      if (this.childAPI) {
        this.childAPI.call('evalFunc', this.codeScriptString);
      }
    },
    handleSave() {
      this.$emit('save', {
        style: this.codeStyleString,
        script: this.codeScriptString
      });
      this.visible = false;
    }
  },
  mounted() {
    const $preview = document.getElementById('js-preview');
    if ($preview) {
      const handshake = new Postmate({
        container: $preview,
        url: 'http://172.16.5.59:8887/demo1.html'
      });
      handshake.then(child => this.childAPI = child);
    }
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
  padding-top: 12px;
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

.close-btn {
  display: block;
  position: fixed;
  right: 10px;
  top: 10px;
  width: 32px;
  height: 32px;
  transition: transform .25s ease-in-out;
  z-index: 2002;
  cursor: pointer;

  &:hover {
    transform: rotate(180deg);
  }

  &:before {
    content: "";
    position: absolute;
    display: block;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 32px;
    height: 0;
    border-top: 1px solid rgba(0,0,0,0.5);
    transform: rotate(45deg);
    transform-origin: center;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 32px;
    height: 0;
    border-top: 1px solid rgba(0,0,0,0.5);
    transform: rotate(-45deg);
    transform-origin: center;
  }
}
</style>



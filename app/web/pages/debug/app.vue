<template>
  <div v-show="visible" class="debug-wrap">
    <div @click="handleClose" class="close-btn"></div>
    <div class="debug-main">
      <div class="preview-wrapper">
        <div id="js-preview" class="preview-box"></div>
      </div>
      <div class="debug-editor-box">
        <h6 class="debug-editor__title">样式代码：</h6>
        <ace-editor
          class="debug-editor"
          editorId="codeStyleString"
          height="280px"
          :content="codeStyleString"
          lang="css"
          @change="handleEditorStyleChange($event)"
        ></ace-editor>
        <h6 class="debug-editor__title">脚本代码：</h6>
        <ace-editor
          class="debug-editor"
          editorId="codeScriptString"
          height="280px"
          :variable="editorVar"
          :content="codeScriptString"
          lang="javascript"
          @change="handleEditorScriptChange($event)"
        ></ace-editor>
        <div class="ui-ta-r">
          <a class="btn-save" href="javascript:;" @click="handleLoadPage">重新加载页面</a>
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
      frameUrl: '',
      userInfo: window.userInfo || {},
      codeStyleString: '/* css */\n',
      codeScriptString: '(function() {\n  // do something\n})();'
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.frameReload();
      }
    }
  },
  methods: {
    frameReload() {
      if (this.childAPI) {
        this.childAPI.destroy();
        this.childAPI = null;
        this.createPostmate();
      } else {
        this.createPostmate();
      }
    },
    handleLoadPage() {
      if (window.LegoEditor && window.LegoEditor.preview && typeof window.LegoEditor.preview.saveAndCreatePage === 'function') {
        window.LegoEditor.preview.saveAndCreatePage(() => {
          this.frameReload();
        }, 'debug');
      }
    },
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
        this.childAPI.call('injectStyle', { code: this.codeStyleString });
        this.childAPI.call('evalFunc', { code: this.codeScriptString });
      }
    },
    handleSave() {
      this.$emit('save', {
        style: this.codeStyleString,
        script: this.codeScriptString
      });
      this.visible = false;
    },
    removeChild(el) {
      if (el.children && el.children.length > 0) {
        [].slice.call(el.children, 0).forEach(item => el.removeChild(item));
      }
    },
    createPostmate() {
      const $preview = document.getElementById('js-preview');
      if ($preview && this.frameUrl) {
        this.removeChild($preview);
        const handshake = new Postmate({
          container: $preview,
          url: this.frameUrl
        });
        handshake.then(child => {
          this.childAPI = child;
        });
      }
    }
  },
  mounted() {
    this.createPostmate();
  }
}
</script>
<style lang="scss" scoped>
.ui-ta-r {
  text-align: right
}

.preview-wrapper {
  position: relative;
  width: 330px;
  height: 645px;
  margin: 0 50px 0 26px;
  background: url(./img/iphonex_bg.png) no-repeat center 0;
  background-size: 100%;
}

.preview-box {
  position: absolute;
  top: 63px;
  left: 21px;
  right: 23px;
  bottom: 22px;
  overflow: hidden;
  border-radius: 0 0 35px 35px;
  border: 1px solid #edf0f4;
  border-top: none;
  background-color: #edf0f4;
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
  padding-top: 4px;
}

.debug-editor__title {
  margin-bottom: 4px;
  font-size: 14px;
}

#js-preview {
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
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



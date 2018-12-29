<template>
  <div>
    <div :id="editorId" :style="{ 'width': width, 'height': height }" ></div>
    <div v-show="isFullScreen" @click="exitFullScreen" class="ui-close-btn"></div>
  </div>
</template>
<script>
export default {
  name: 'AceEditor',
  props: {
    editorId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    variable: {
      type: Object,
      default: () => {}
    },
    lang: {
      type: String,
      default: 'text'
    },
    theme: {
      type: String,
      default: 'github'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      editor: null,
      langTools: null,
      beforeContent: '',
      isFullScreen: false
    }
  },
  watch: {
    content(newVal) {
    	if (this.beforeContent !== newVal) {
      	this.editor.setValue(newVal, 1);
      }
    },
    variable(newVal) {
      this.setCompleter(newVal);
    }
  },
  methods: {
    setCompleter(list) {
      list = list || {};
      var vlist = [];
      for (var i in list) {
        vlist.push({
          caption: i,
          value: list[i].value || i,
          meta: list[i].desc
        });
      }
      var completer = {
        getCompletions(editor, session, pos, prefix, callback) {
          if (prefix.length === 0) {
            return callback(null, []);
          }
          callback(null, vlist);
        }
      };
      this.langTools.setCompleters([completer, this.langTools.keyWordCompleter]);
    },
    fullScreen(fullScreen = true) {
      if (this.editor) {
        this.isFullScreen = !!fullScreen;
        this.editor.container.classList[this.isFullScreen ? 'add' : 'remove']('ui-full-screen');
        this.editor.setAutoScrollEditorIntoView(!this.isFullScreen);
        this.editor.resize();
      }
    },
    exitFullScreen() {
      this.fullScreen(false);
    }
  },
  beforeDestroy: function() {
    this.editor.destroy();
    this.editor.container.remove();
  },
  mounted () {
    this.editor = window.ace.edit(this.editorId);
    this.langTools = ace.require('ace/ext/language_tools');
    this.editor.setOptions({
      enableLiveAutocompletion: true
    });

    this.setCompleter(this.variable);

    this.editor.setValue(this.content, 1);
    this.editor.getSession().setMode(`ace/mode/${this.lang}`);
    this.editor.setTheme(`ace/theme/${this.theme}`);

    this.editor.on('change', () => {
    	this.beforeContent = this.editor.getValue();
      this.$emit('change', this.beforeContent);
    });
  }
}
</script>
<style lang="scss">
.ui-full-screen {
  height: 100% !important;
  width: 100% !important;
  border: 0;
  margin: 0;
  position: fixed !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
}
</style>



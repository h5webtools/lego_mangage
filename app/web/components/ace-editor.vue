<template>
  <div :id="editorId" :style="{ 'width': width, 'height': height }" ></div>
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
      beforeContent: ''
    }
  },
  watch: {
    'content' (value) {
    	if (this.beforeContent !== value) {
      	this.editor.setValue(value, 1);
      }
    }
  },
  beforeDestroy: function() {
    this.editor.destroy();
    this.editor.container.remove();
  },
  mounted () {
		this.editor = window.ace.edit(this.editorId);
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


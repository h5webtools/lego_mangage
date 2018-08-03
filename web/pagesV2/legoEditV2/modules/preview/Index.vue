<template>
  <div class="preview">
    <div @click="handleClose" class="close"></div>
    <editor-render
      :page-data="pageData"
      :code-snippet="codeSnippet"
      :is-layout="false"
    ></editor-render>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  computed: {
    ...mapGetters({
      pageData: 'editor/pageData',
      codeSnippet: 'editor/codeSnippet'
    })
  },
  methods: {
    handleClose() {
      this.$store.dispatch('editor/updateValue', { key: 'menuActiveIndex', value: 'layout' });
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2001;
  background-color: #fff;
}

.close {
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

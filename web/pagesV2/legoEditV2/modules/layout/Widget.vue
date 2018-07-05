<template>
<!--   <div
    class="drag-element"
    draggable="true"
    @dragstart="handleDragStart"
    @drag="handleDrag"
    @dragend="handleDragEnd"
  > -->
  <div>
    <slot name="widget"></slot>
  </div>
</template>

<script>
export default {
  props: {
    widget: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handleDragStart(e) {
      const uuid = this.widget.uuid;
      if (typeof uuid !== 'undefined') {
        e.dataTransfer.setData('dragElementId', uuid);
      }
    },
    handleDrag() {
      
    },
    handleDragEnd(e) {
      e.dataTransfer.clearData('dragElementId');
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
.drag-element {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

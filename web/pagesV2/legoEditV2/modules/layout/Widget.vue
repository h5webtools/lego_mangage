<template>
<!--   <div
    class="drag-element"
    draggable="true"
    @dragstart="handleDragStart"
    @drag="handleDrag"
    @dragend="handleDragEnd"
  > -->
  <div class="widget-single">
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

<style lang="scss" >
.widget-single{
  display: inline-block;
  padding-right: 16px;
  .widget-thumb{
    width: 88px;
    height: 66px;
    & > img{
      width: 100%;
      height: 100%;
    }
  }
}

</style>

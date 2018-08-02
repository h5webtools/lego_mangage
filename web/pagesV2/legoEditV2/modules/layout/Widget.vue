<template>
<!--   <div
    
  > -->
  <div class="widget-single drag-element"
    draggable="true"
    @dragstart="handleDragStart">
<!--         @drag="handleDrag"
    @dragend="handleDragEnd"> -->
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
      console.log("widget DragStart");
      const widget = this.widget;
      if (typeof widget !== "undefined") {
        const data = {
          dragType: "add",
          item: widget
        };
        this.$store.dispatch("editor/setDragging", true);
        e.dataTransfer.setData("dragElementData", JSON.stringify(data));
      }
    },
    handleDrag() {
      console.log("widget DragOver");
    },
    handleDragEnd(e) {
      console.log("widget Dragend");
      e.dataTransfer.clearData("dragElementData");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" >
.widget-single {
  display: inline-block;
  padding-right: 16px;
  .widget-thumb {
    width: 88px;
    height: 66px;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

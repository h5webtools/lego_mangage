<template>
<!--   <div
    @drag="handleDrag"
    
  > -->
  <div class="widget-single drag-element"
    draggable="true"
    @dragstart="handleDragStart" 
    @dragend="handleDragEnd"> 
    
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
      const widget = this.widget;
      if (typeof widget !== "undefined") {
        const data = {
          dragType: "add",
          item: widget
        };
        this.toggleContainerDragClass(true);
        e.dataTransfer.setData("dragElementData", JSON.stringify(data));
      }
    },
    handleDrag() {
      console.log("widget DragOver");
    },
    handleDragEnd(e) {
      console.log("widget Dragend");
      this.toggleContainerDragClass(false);

      e.dataTransfer.clearData("dragElementData");
    },
    toggleContainerDragClass(mark) {
      const isDragging = "isDragging";

      ["iphone-container", "tree-manage"].forEach(item => {
        let container = document.querySelector(`.${item}`);
        if (mark) {
          if (!container.classList.contains(isDragging)) {
            container.classList.add(isDragging);
          }
        } else {
          container.classList.remove(isDragging);
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" >
.widget-list {
  .el-collapse-item__header {
    font-size: 16px;
    color: #5f6270;
  }

  .widget-box {
    padding: 24px 20px 0 22px;
    & > .widget-single {
      & > div {
        cursor: move;
      }
      &:nth-child(3n) {
        padding-right: 0;
      }
      & .widget-name {
        margin: 5px 0 20px 0;
        text-align: center;
        font-size: 12px;
        line-height: 12px;
        color: #8489ab;
        letter-spacing: 0;
      }
    }
  }
}
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

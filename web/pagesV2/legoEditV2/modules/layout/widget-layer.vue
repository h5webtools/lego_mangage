<template>
<div
  v-show="layerData.visible"
  class="widget-layer"
  :style="layerData.style">
  {{layerData.definition.name}}:{{layerData.definition.uid}}
</div>
</template>

<script>
export default {
  props: {
    layerData: {
      type: Object,
      default() {
        return {
          visible: false,
          style: {},
          definition: {}
        };
      }
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.widget-layer {
  position: fixed;
  z-index: 1999;
  box-sizing: border-box;
  padding: 2px;
  background: #efefef;
  font-size: 12px;
  opacity: 0.5;
  pointer-events: none;
}
</style>

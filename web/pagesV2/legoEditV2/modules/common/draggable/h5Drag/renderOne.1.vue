<template>
  <!-- <div class="list-group-design" v-draggable> -->
    <!--  v-for="(item, index) in currentListData"  -->
     
  <div v-if='renderShowType === "drag"'>
     <render-one-com 
      :item="item"
      :renderShowType ="renderShowType"
      :key="itemIndex" 
      :itemIndex="itemIndex"
      :level=" level" 
      :levelIndex="levelIndex ">
      </render-one-com>
  </div>
  <render-one-com v-else 
    :item="item"
    :renderShowType ="renderShowType"
    :key="itemIndex" 
    :itemIndex="itemIndex"
    :level=" level" 
    :levelIndex="levelIndex ">
  </render-one-com>


</template>

<script>
import Vue from "vue";
import draggableMixin from "./mixin";
import { setUuid, loadComponents } from "@/util/helper";
import renderOneCom from './renderOneCom.vue'

export default {
  name: "renderOne",
  components: {
    renderOneCom
  },
  mixins: [draggableMixin],
  data() {
    return {};
  },
  computed: {
  },
  watch: {},
  created() {},
  methods: {
  }
};
</script>

<style lang="scss">

@import '~assets/sass/mixins/renderOne.scss';
.iphone-container{
  .lego-row{
      min-width: 110px;
      min-height: 100px;
      display: flex;
      border: 1px dashed #999;
  }
  .dragItem{
    transition: all 0.35s;
  }

  .lego-col {
      min-width: 110px;
      min-height: 100px;
      border: 1px dashed #999;
  }

  &.isDragging{
    padding: 5px;
    .lego-row{
      margin: 10px;
      padding: 5px;
    }
    .lego-col{
      margin: 5px;
      padding: 5px;
    }
  }

  .dragItem_current{
    border: 1px solid #ff0000!important;
  }

  .drop-highlight {
    border: 1px solid #409EFF!important;
  }
  &.drop-highlight {
    border: 1px solid #409EFF!important;
  }

}



</style>



<template>
  <component 
        :is="item.tag_name" 
        :key="levelIndex + '-' + itemIndex "  
        v-bind="item.props" 
        :uuid="levelIndex + '-' + itemIndex" 
        :class="{'dragItem_current': item.extendProps &&item.extendProps.isCurrent, 'isDraggable': item.draggable}" 
        class="dragItem"
        v-if="item.is_register === true || typeof item.is_register  === 'undefined' "
        >

            <span v-html="item.props && item.props.text" v-if="item.props && item.props.text"></span>

            <c-render-com 
                :item="itemChild"
                :key="levelIndex + '-' + indexChild "  
                v-for="(itemChild, indexChild) in item.children"
                slot="children"
                :itemIndex="indexChild"
                :level=" level + 1 " 
                :levelIndex="levelIndex + '-' + indexChild" 
                v-if="item.draggable" 
                class="draggableDesign" 
               >
            </c-render-com>

      </component>
</template>

<script>
import Vue from "vue";
import draggableMixin from "./mixin";
import { setUuid, loadComponents } from "../../util/helper";


export default {
  name: "renderOne",
  mixins: [draggableMixin],
  data() {
    return {};
  },
  computed: {
    pageData() {
      return this.$store.state.editor.pageData;
    }
  },
  watch: {},
  created() {},
  methods: {
  }
};
</script>

<style lang="scss">
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



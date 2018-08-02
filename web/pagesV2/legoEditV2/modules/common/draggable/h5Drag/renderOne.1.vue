<template>
  <div class="list-group-design" v-draggable>
      <component 
        :is="item.tag_name" 
        :key="levelIndex + '-' + index "  
        v-bind="item.props" 
        :uuid="levelIndex + '-' + index" 
        :class="{'dragItem_current': item.extendProps &&item.extendProps.isCurrent}" 
        v-for="(item, index) in currentListData"  
        class="dragItem"
        v-if="item.is_register === true || typeof item.is_register  === 'undefined' ">

            <span v-html="item.props && item.props.text" v-if="item.props && item.props.text"></span>

            <c-h5-draggable-multi 
                :currentListData="item.children"
                slot="children"
                :level=" level + 1 " 
                :levelIndex="levelIndex + '-' + index" 
                v-if="item.draggable" 
                element="div" 
                class="draggableDesign" 
                :options="dragOptions">
            </c-h5-draggable-multi>

      </component>
  </div>


</template>

<script>
import Vue from "vue";
import draggableMixin from "./mixin";
import { setUuid, loadComponents } from "@/util/helper";

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
  methods: {}
};
</script>

<style lang="scss">

@import '~assets/sass/mixins/renderOne.scss';
.list-group-design{
  min-height: 100px;
  position: relative;

  .lego-row{
      border: 1px dashed #999;
      & > .list-group-design{
          width: 100%;
          display: flex;
      }
      
    @include flex-row2(justify-center) {
      justify-content: center;
    }
    @include flex-row2(justify-end) {
      justify-content: flex-end;
    }
    @include flex-row2(justify-space-between) {
      justify-content: space-between;
    }
    @include flex-row2(justify-space-around) {
      justify-content: space-around;
    }

    @include flex-row2(align-middle) {
      align-items: center;
    }
    @include flex-row2(align-bottom) {
      align-items: flex-end;
    }

    @include flex-row2(direction-row) {
      flex-direction: row;
    }

    @include flex-row2(direction-row-reverse) {
      flex-direction: row-reverse;
    }

    @include flex-row2(direction-column) {
      flex-direction: column;
    }

    @include flex-row2(direction-column-reverse) {
      flex-direction: column-reverse;
    }
  }

    .lego-col {
      min-height: 100px;
      border: 1px dashed #999;
      & > .list-group-design {
        width: 100%;
      }
    }
}

.drop-highlight {
    border: 1px solid #ff0000!important;
}

</style>



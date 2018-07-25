<template>
  <c-draggable  element="div" class="draggableDesignItem" v-model="currentListData" :options="dragOptions" @choose='onChoose(currentListData, $event)'  @add="onAdd(currentListData, $event)" :move="onMove" @end="onEnd(currentListData, $event)" @sort="onSort(currentListData, $event)" @remove="onRemove(currentListData, $event)">
      <transition-group name="no" class="list-group-design" style="" tag="ul">
      <!-- <transition-group name="no" class="list-group-design" type="transition"> -->
        
         <div v-for="(item, index) in currentListData" :key="levelIndex + '-' + index" class="dragItem" :style="style">

           <template >
         
            <component :is="item.tag_name" :key="levelIndex + '-' + index "  v-bind="item.props" :uuid="levelIndex + '-' + index">
              <span v-html="item.props && item.props.text"></span>

               <c-draggable-multi 
                v-model="item.children" 
                :level=" level + 1 " 
                :levelIndex="levelIndex + '-' + index" 
                v-if="item.draggable" 
                :style="style2" 
                element="div" 
                class="draggableDesign" 
                :options="dragOptions">
               </c-draggable-multi>
            </component>
           </template>

           <!--  <c-draggable-multi 
                v-model="item.children" 
                :level=" level + 1 " 
                :levelIndex="levelIndex + '-' + index" 
                v-if="item.draggable" 
                :style="style2" 
                element="div" 
                class="draggableDesign" 
                :options="dragOptions">
           </c-draggable-multi> -->
           <!-- <slot name="children"></slot> -->
         </div>
      </transition-group>
  </c-draggable>
</template>

<script>
import Vue from "vue";
import draggableMixin from './mixin'

export default {
  mixins: [draggableMixin],
  data() {
    return {
    }

  },
  computed: {
    // isRegisterComponent() {
    //       return this.$store.state.editor.isRegisterComponent
    // }
  },
  watch: {

  },
  created() {},
  methods: {
    

  }
};
</script>

<style lang="scss">

</style>



<template>
  <c-draggable  element="div" class="draggableTreeItem" v-model="currentListData" :options="dragOptions" @choose='onChoose(currentListData, $event)'  @add="onAdd(currentListData, $event)" :move="onMove" @end="onEnd(currentListData, $event)" @sort="onSort(currentListData, $event)" @remove="onRemove(currentListData, $event)">
      <transition-group name="no" class="list-group-design" tag="ul">
      <!-- <transition-group name="no" class="list-group-design" type="transition"> -->
        
         <div v-for="(item, index) in currentListData" :key="levelIndex + '-' + index" class="dragItem" :style="style">

            <div  :key="levelIndex + '-' + index "  v-bind="item.props" :uuid="levelIndex + '-' + index" class="tree-collapse">
              <div class="tree-collapse_operate">
                 <span>{{item.name}} </span>
                  <span>
                    <el-button
                      :class="item.isLocked ? 'locked' : 'unLocked'"
                      type="text"
                      size="mini"
                      @click="() => lock(data, node, 'isLocked')">
                      
                    </el-button>
                  </span>
                </div>

              <c-draggable-multi-tree 
                v-model="item.children" 
                :level=" level + 1 " 
                :levelIndex="levelIndex + '-' + index" 
                v-if="item.draggable" 
                :style="style2" 
                element="div" 
                class="draggableDesign" 
                :options="dragOptions">
              </c-draggable-multi-tree>
            </div>
     
         </div>
      </transition-group>
  </c-draggable>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import draggableMixin from "../mixin.js";

export default {
  mixins: [draggableMixin],
  name: "DraggableTree",
  data() {
    return {
        dragOptions: {
              animation: 50,
              group: {
                  name: "formDesign"
              },
              ghostClass: "ghost",
              handle: '.draggableTreeItem',
              chosenClass: "sortable-chosen",  // Class name for the chosen item
              dragClass: "sortable-drag",
          }
    };
  },
  computed: {
    // isRegisterComponent() {
    //       return this.$store.state.editor.isRegisterComponent
    // }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">

</style>



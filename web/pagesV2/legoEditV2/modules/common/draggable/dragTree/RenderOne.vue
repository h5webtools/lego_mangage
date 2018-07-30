<template>
  <c-draggable  element="div" class="draggableTreeItem" v-model="currentListData" :options="dragOptions" @choose='onChoose(currentListData, $event)'  @add="onAdd(currentListData, $event)" :move="onMove" @end="onEnd(currentListData, $event)" @sort="onSort(currentListData, $event)" @remove="onRemove(currentListData, $event)">

      <transition-group name="no" class="list-group-design" tag="ul">
      <!-- <transition-group name="no" class="list-group-design" type="transition"> -->
        
         <div v-for="(item, index) in currentListData" :key="levelIndex + '-' + index" class="dragItem" :class="{'dragItem_current': item.extendProps &&item.extendProps.isCurrent}" :style="style">

            <div  :key="levelIndex + '-' + index "  v-bind="item.com_config" :uuid="levelIndex + '-' + index" class="tree-collapse" :class="item.extendProps.isFolded ? 'packup' : 'unfold'">
              <div class="tree-collapse_operate" >
                 <span class="label">             
                   <span class="packup-icon" @click.stop.prevent="updateItemFold(item, index)"  v-show="item.children && item.children.length > 0"></span>
                   {{item.name}} 
                 </span>

                  <span>
                    <el-button
                      :class="item.extendProps.isLocked ? 'locked' : 'unLocked'"
                      type="text"
                      size="mini"
                      @click="() => lock(item, index)">
                      
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
        handle: ".draggableTreeItem",
        chosenClass: "sortable-chosen", // Class name for the chosen item
        dragClass: "sortable-drag"
      }
    };
  },
  computed: {
/*     isRegisterComponent() {
        return this.$store.state.editor.isRegisterComponent
    } */
  },
  watch: {},
  created() {},
  methods: {
    lock(item, itemIndex, key = "extendProps.isLocked") {
      this.$store.dispatch("editor/updateValueDirect", {
        item: item,
        levelIndex: this.levelIndex,
        itemIndex: itemIndex,
        update: [
          {
            key: key,
            value: !item.extendProps.isLocked
          }
        ]
      });
    },
    updateItemFold(item, itemIndex, key = "extendProps.isFolded") {
      this.$store.dispatch("editor/updateValueDirect", {
        item: item,
        levelIndex: this.levelIndex,
        itemIndex: itemIndex,
        update: [
          {
            key: key,
            value: !item.extendProps.isFolded
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
</style>



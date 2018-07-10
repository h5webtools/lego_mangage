<template>
  <c-draggable  element="div" class="draggableDesign" v-model="currentListData" :options="dragOptions" @choose='onChoose(currentListData, $event)'  @add="onAdd(currentListData, $event)" >
      <transition-group name="no" class="list-group-design" style="min-height: 50px" tag="ul">
      <!-- <transition-group name="no" class="list-group-design" type="transition"> -->
        
         <div v-for="(item, index) in currentListData" :key="levelIndex + '-' + index" class="dragItem" :style="style">
           <!-- :ItemIndex=" levelIndex + '-' + index "  -->
           <!-- {{item}} -->
           <template >
            <!-- <component :is="item.tag" :key="levelIndex + '-' + index " v-bind="item.props" :uuid="levelIndex + '-' + index"> -->
            <component :is="item.tag" :key="levelIndex + '-' + index "  v-bind="item.props" :uuid="levelIndex + '-' + index">
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {setUuid} from '@/util/helper'

export default {
  model: {
    prop: "listData"
  },
  props: {
    listData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 树的层级
    level: {
      type: Number,
      default: 0
    },
    // 层级index 索引， 例如0-2
    levelIndex: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      currentListData: this.listData,

      style: {
        // "min-height": "80px",
        // background: "red",
        // margin: "10px"
      },
      style2: {
        // "min-height": "50px",
        // background: "yellow",
        // border: "1px dotted black"
      },
      dragOptions: {
        animation: 50,
        group: {
          name: "formDesign"
        },
        ghostClass: "ghost"
      }
    };
  },
  computed: {
    // isRegisterComponent() {
    //       return this.$store.state.editor.isRegisterComponent
    // }
  },
  watch: {
    listData(newVal, oldVal) {
      this.currentListData = this.listData;
    },
    currentListData(newVal, oldVal) {
      // this.$store.dispatch("editor/updatePage", {
      //   levelIndex: this.levelIndex,
      //   data: newVal
      // });
    }
  },
  created() {},
  methods: {
    onChoose(item, event) {
      const self = this;
      setTimeout(function() {
        console.log(item, 'chooseitem')
        console.log(item[event.oldIndex])
        // self.currentChoosedItem = item[event.oldIndex];
        self.$store.dispatch('editor/setCurrentComponent', item[event.oldIndex]);
      }, 50);
    },
    onAdd(item, event) {
      debugger
      // const currentItem = item[event.newIndex];
      setUuid(item[event.newIndex], event.newIndex, this.level, this.levelIndex, item)
      // this.$store.dispatch('editor/updateModelValue', { key: k, value: val });
      // 遍历修改这个值中的uuid属性
      this.$store.dispatch("editor/updatePage", {
        levelIndex: this.levelIndex,
        data: item
      });

    },
    onEnd(item, event) {

    }

  }
};
</script>

<style lang="scss">
.dragItem{
  & .el-row{
    min-height: 50px;
    border: 1px dashed #999;
  }
  & .el-col{
    min-height: 50px;
    border: 1px dashed #999;
  }
}
</style>



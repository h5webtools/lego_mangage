<template>
    <div 
      v-draggable
      :uuid="levelIndex + '-' + itemIndex" 
      :class="[{'dragItem_current': item.extendProps &&item.extendProps.isCurrent}, item.extendProps.isFolded ? 'packup' : 'unfold']" 
      class="dragItem tree-collapse"
      v-if="item.is_register === true || typeof item.is_register  === 'undefined' ">

        <div class="tree-collapse_operate" :style="operateStyle" @click="setCurrentItem" >
              <span class="label">             
                <span class="packup-icon" @click.stop.prevent="updateItemFold(item)"  v-show="item.children && item.children.length > 0"></span>
                {{item.name}} 
              </span>


              <span class="collapse_operate-area">
               <i class="el-icon-delete" @click.stop.prevent="removeItem"></i>
<!-- <el-button plain icon="el-icon-delete">搜索</el-button> -->
                <el-button
                  :class="item.extendProps.isLocked ? 'locked' : 'unLocked'"
                  type="text"
                  size="mini"
                  @click.stop.prevent="lock(item)">
                  
                </el-button>
              </span>
          </div>

          <div class="multi-tree_children">
              <c-h5-draggable-multi-tree
              :item="itemChild"
              :key="levelIndex + '-' + indexChild "  
              v-for="(itemChild, indexChild) in item.children"
              slot="children"
              :itemIndex="indexChild"
              :level=" level + 1 " 
              :levelIndex="levelIndex + '-' + indexChild" 
              v-if="item.draggable" 
              class="draggableDesign">

              </c-h5-draggable-multi-tree>
          </div>

    </div>



</template>

<script>
import Vue from "vue";
import draggableMixin from "../mixin";
import { setUuid, loadComponents } from "@/util/helper";

export default {
  name: "renderOne",
  mixins: [draggableMixin],
  data() {
    return {
      renderType: 'tree'
    };
  },
  computed: {
    /*     pageData() {
      return this.$store.state.editor.pageData;
    } */
    operateStyle() {
      return {
        "padding-left": 10 + this.level * 18 + "px"
      };
    }
  },
  watch: {},
  created() {},
  methods: {
    removeItem() {
      this.$store.dispatch("editor/removeItem", {
        item: this.item,
        levelIndex: this.levelIndex,
        itemIndex: this.itemIndex,
        level: this.level
      });
    },

    setCurrentItem() {
      this.$store.dispatch("editor/setCurrentComponent", {
        item: this.item,
        levelIndex: this.levelIndex,
        itemIndex: this.itemIndex,
        level: this.level
      });
    },
    lock(item, key = "extendProps.isLocked") {
      this.$store.dispatch("editor/updateValueDirect", {
        item: item,
        levelIndex: this.levelIndex,
        itemIndex: this.itemIndex,
        update: [
          {
            key: key,
            value: !item.extendProps.isLocked
          }
        ]
      });
    },
    updateItemFold(item, key = "extendProps.isFolded") {
      this.$store.dispatch("editor/updateValueDirect", {
        item: item,
        levelIndex: this.levelIndex,
        itemIndex: this.itemIndex,
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
@import "~assets/sass/mixins/renderOne.scss";

.tree-manage {
  &.multi-tree_children {
    & > .dragItem {
      background-color: #ffffff;
      &:nth-child(2n) {
        background-color: #f5f6fa;
      }
    }
  }
}

.multi-tree_children {
  transition: all 0.35s;
  & > .dragItem {
    font-size: 16px;
    color: #58586e;
    letter-spacing: 0;
    &.unfold {
      & > .multi-tree_children {
        height: auto;
      }
      & .packup-icon {
        width: 20px;
        height: 20px;
        background: url("../../../../../../assets/img/edit/layers_ic_unfold@2x.png")
          0 0 / 100% 100%;
      }
    }
    &.packup {
      & > .multi-tree_children {
        display: none;
        // opacity: 0;
        // height: 0;
      }
      & .packup-icon {
        width: 20px;
        height: 20px;
        background: url("../../../../../../assets/img/edit/layers_ic_packup@2x.png")
          0 0 / 100% 100%;
      }
    }
    & > .tree-collapse_operate {
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;

      & .label {
        display: flex;
        align-items: center;
      }
      & > .collapse_operate-area {
        display: flex;
        align-items: center;
        .el-icon-delete {
          font-size: 20px;
          cursor: pointer;
          margin-right: 10px;
        }
      }

      & .locked {
        width: 25px;
        height: 24px;
        background: url("../../../../assets/img/edit/layers_ic_lock@2x.png") 0 0 /
          100% 100%;
      }
      & .unLocked {
        width: 25px;
        height: 24px;
        background: url("../../../../assets/img/edit/layers_ic_unlock@2x.png") 0
          0 / 100% 100%;
      }
    }

    &.dragItem_current {
      & > .tree-collapse_operate {
        background-color: rgba(58, 74, 167, 0.2);
      }
    }
  }

  &.isDragging{
    padding: 5px;
    .isDraggable{
      margin: 5px;
      padding: 5px;
    }
  }

  .drop-highlight {
    border: 1px solid #409EFF!important;
  }
  &.drop-highlight {
    border: 1px solid #409EFF!important;
  }
}
</style>



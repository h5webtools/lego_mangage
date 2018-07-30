<template>
  <c-draggable-multi-tree v-model="pageData" class="tree-manage">
  </c-draggable-multi-tree>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    // pageData: {
    //   type: Array,
    //   default: null
    // },
  },
  name: "renderOneTree",
  data() {
    return {
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
    pageData: {
      get() {
        return this.$store.state.editor.pageData;
      }
      /*       set(value) {
        debugger
        this.$store.commit("editor/updatePage", {
          levelKey: "top",
          data: value
        });
      } */
    }
  },
  methods: {}
};
</script>

<style lang="scss" >
.tree-manage {
  &.draggableTreeItem {
    width: 100%;
    // 第一级的背景色奇偶行
    & > .list-group-design {
      & > .dragItem {
        background: #f5f6fa;
        &:nth-child(2n) {
          background: #d8dbec;
        }
      }
    }
  }
}
.draggableTreeItem {
  width: 100%;
  transition: all 0.35s;
  & > .list-group-design {
    & > .dragItem {
      padding-left: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      color: #58586e;
      letter-spacing: 0;
      & > .tree-collapse {
        width: 100%;
        &.unfold {
          & > .draggableTreeItem {
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
          & > .draggableTreeItem {
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

          & .locked {
            width: 25px;
            height: 24px;
            background: url("../../../../assets/img/edit/layers_ic_lock@2x.png")
              0 0 / 100% 100%;
          }
          & .unLocked {
            width: 25px;
            height: 24px;
            background: url("../../../../assets/img/edit/layers_ic_unlock@2x.png")
              0 0 / 100% 100%;
          }
        }
      }
    }
  }

  .dragItem_current {
    // border: 1px solid red;
    background-color: #95a2e8 !important;
  }
}
</style>



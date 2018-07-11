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
      },
      set(value) {
        this.$store.commit("editor/updatePage", {
          levelKey: "top",
          data: value
        });
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" >
.tree-manage {
  &.draggableTreeItem {
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
          & > .tree-collapse_operate {
            padding-right: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 48px;
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
        }
      }
    }
  }
</style>



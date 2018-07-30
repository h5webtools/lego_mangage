<template>
  <c-draggable-multi v-model="pageData">
  </c-draggable-multi>
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
.draggableDesignItem {
  .list-group-design {
    min-height: 50px;
  }
  .dragItem {
    & .lego-row {
      min-height: 100px;
      border: 1px dashed #999;
    }
    & .lego-col {
      min-height: 100px;
      border: 1px dashed #999;
    }
  }
  .sortable-drag {
    background: #dcdfe6;
    cursor: move !important;
  }
  .dragItem_current {
    border: 1px solid red!important;
  }
}
</style>



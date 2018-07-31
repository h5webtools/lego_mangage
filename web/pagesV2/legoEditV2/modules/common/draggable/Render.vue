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
  // width: 100%;
  .list-group-design {
    min-height: 50px;
    padding-bottom: 20px;
  }
  .dragItem {
    & > .lego-row {
      min-height: 100px;
      border: 1px dashed #999;
      & > .draggableDesignItem {
        width: 100%;
        & > .list-group-design {
          width: 100%;
          display: flex;
          & > .dragItem {
            flex: 1;
          }
        }
      }
      
    }
    & > .lego-col {
      min-height: 100px;
      border: 1px dashed #999;
      & > .draggableDesignItem {
        width: 100%;
      }
    }
  }
  .sortable-drag {
    background: #dcdfe6;
    cursor: move !important;
  }
  .dragItem_current {
    border: 1px solid red !important;
  }
}
.iphone-container {
  .draggableDesignItem {
    min-width: 100px;
  }
}

.draggableDesignItem .dragItem > .lego-row.is-justify-center > .draggableDesignItem > .list-group-design {
  justify-content: center;
}

.draggableDesignItem .dragItem > .lego-row.is-justify-end > .draggableDesignItem > .list-group-design {
  justify-content: flex-end;
}

.draggableDesignItem .dragItem > .lego-row.is-justify-space-between > .draggableDesignItem > .list-group-design {
  justify-content: space-between;
}

.draggableDesignItem .dragItem > .lego-row.is-justify-space-around > .draggableDesignItem > .list-group-design {
  justify-content: space-around;
}

.draggableDesignItem .dragItem > .lego-row.is-align-middle > .draggableDesignItem > .list-group-design {
  align-items: center;
}

.draggableDesignItem .dragItem > .lego-row.is-align-bottom > .draggableDesignItem > .list-group-design {
  align-items: flex-end;
}

.draggableDesignItem .dragItem > .lego-row.is-direction-row > .draggableDesignItem > .list-group-design {
  flex-direction: row;
}

.draggableDesignItem .dragItem > .lego-row.is-direction-row-reverse > .draggableDesignItem > .list-group-design {
  flex-direction: row-reverse;
}

.draggableDesignItem .dragItem > .lego-row.is-direction-column > .draggableDesignItem > .list-group-design {
  flex-direction: column;
}

.draggableDesignItem .dragItem > .lego-row.is-direction-column-reverse > .draggableDesignItem > .list-group-design {
  flex-direction: column-reverse;
}

</style>



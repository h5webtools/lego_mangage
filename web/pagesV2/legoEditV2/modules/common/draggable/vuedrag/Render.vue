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

<style lang="scss">

@import '~assets/sass/mixins/renderOne.scss';


.draggableDesignItem {
  // width: 100%;
  .list-group-design {
    position: relative;
    min-height: 50px;
    padding-bottom: 15px;
  }
  .lego-row {
      min-height: 100px;
      border: 1px dashed #999;
      & > .draggableDesignItem {
        width: 100%;
        & > .list-group-design {
          width: 100%;
          display: flex;
       }
      }

      &.is-direction-row > .draggableDesignItem {
        & > .list-group-design {
          padding-bottom: 0;
       }
      }

      &.is-direction-column-reverse > .draggableDesignItem {
        & > .list-group-design {
          padding-bottom: 0;
       }
     }

        @include flex-row(justify-center) {
      justify-content: center;
    }
    @include flex-row(justify-end) {
      justify-content: flex-end;
    }
    @include flex-row(justify-space-between) {
      justify-content: space-between;
    }
    @include flex-row(justify-space-around) {
      justify-content: space-around;
    }

    @include flex-row(align-middle) {
      align-items: center;
    }
    @include flex-row(align-bottom) {
      align-items: flex-end;
    }

    @include flex-row(direction-row) {
      flex-direction: row;
    }

    @include flex-row(direction-row-reverse) {
      flex-direction: row-reverse;
    }

    @include flex-row(direction-column) {
      flex-direction: column;
    }

    @include flex-row(direction-column-reverse) {
      flex-direction: column-reverse;
    }


  }
    
    .lego-col {
      min-height: 100px;
      border: 1px dashed #999;
      & > .draggableDesignItem {
        width: 100%;
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


/* .draggableDesignItem .dragItem.lego-row.is-justify-center > .draggableDesignItem > .list-group-design {
  justify-content: center;
} */



</style>



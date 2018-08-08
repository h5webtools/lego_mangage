<template>
  <c-render-com v-model="pageData">
  </c-render-com>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  props: {
    pageData: {
      type: Array,
      default: null
    },
  },
  data() {
    return {
      dragOptions: {
        animation: 50,
        group: {
            name: 'formDesign',
        },
        ghostClass: 'ghost',
      }
      
    }
  },
  computed: {
    // pageData: {
    //     get() {
    //       return this.$store.state.editor.pageData
    //     },
    //     set(value) {
    //       this.$store.commit('editor/updatePage', {
    //           levelKey: 'top',
    //           data: value
    //       })
    //     }
    // }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" >
.draggableDesignItem{
  .list-group-design{
    min-height: 50px;
  }
  .dragItem{
  & .el-row{
    min-height: 100px;
    border: 1px dashed #999;
  }
  & .el-col{
    min-height: 100px;
    border: 1px dashed #999;
  }
}
.sortable-drag{
  background: #dcdfe6;
  cursor: move!important;
}
}
</style>



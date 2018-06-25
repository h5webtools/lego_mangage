<template>
  <c-draggable-multi v-model="pageData">
  </c-draggable-multi>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  props: {
    // pageData: {
    //   type: Array,
    //   default: null
    // },
  },
  data() {
    return {
      style: {
        'min-height': '150px', 
        background: 'red',
         margin: '10px'
         },
         style2:{
           'min-height': '50px',
           background: 'yellow',
           border: '1px dotted black'
         },
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
    pageData: {
        get() {
          return this.$store.state.editor.pageData
        },
        set(value) {
          this.$store.commit('editor/updatePage', {
              levelKey: 'top',
              data: value
          })
        }
    }
  },
  methods: {
    
  },
/*   render(h) {
    if(!this.pageData || util.isEmptyObject(this.pageData)) return;
    return this.createVNode(h, this.pageData);
  } */
}
</script>

<style lang="scss" scoped>
/* #component-render{
  .list-group-design{
    min-height: 500px;
  .dragItem{
    min-height: 150px;
    background: red;
    border: 1px dotted yellow;
  }
  }
} */


  .list-group-design{
    min-height: 500px;
  }
    .dragItem{
    min-height: 150px;
    background: red;
    border: 1px dotted yellow;
  }
</style>



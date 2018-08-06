<template>
            <div class="tree-manage multi-tree_children" v-draggable :class="{'isDragging': isDragging}">
            <!-- <editor-tree></editor-tree> -->
              <c-h5-draggable-multi-tree 
                  :item="itemChild"
                  :key="indexChild" 
                  :itemIndex="indexChild"
                  :level="  level + 1 " 
                  :levelIndex="levelIndex + '-' + indexChild"  
                  v-for="(itemChild, indexChild) in pageData"
                  :childrenLength="pageData.length"
                  class="draggableDesign" 
                  >
              </c-h5-draggable-multi-tree>
            </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

import { setUuid, loadComponents } from "@/util/helper";

export default {
  name: "renderOne",
  data() {
    return {
      level: 0,
      levelIndex: "0",
      draggable: true,
      renderType: 'tree',
    };
  },
  computed: {
    ...mapGetters({
      isDragging: "editor/isDragging",
      pageData: "editor/pageData",
    })
  },
  watch: {},
  created() {},
  methods: {
  }
};
</script>

<style lang="scss">




</style>



<template>
        <div class="iphone-container"  v-draggable :class="{'isDragging': isDragging}">
            <c-h5-draggable-multi 
                :item="itemChild"
                :key="indexChild" 
                :itemIndex="indexChild"
                :level="  level + 1 " 
                :levelIndex="levelIndex + '-' + indexChild"  
                v-for="(itemChild, indexChild) in pageData"
                element="div" 
                class="draggableDesign" 
                >
            </c-h5-draggable-multi>
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
      draggable: true
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



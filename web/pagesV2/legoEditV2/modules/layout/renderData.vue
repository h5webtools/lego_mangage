<template>
        <div class="iphone-container"  v-draggable >
            <c-h5-draggable-multi 
                :item="itemChild"
                :renderShowType ="renderShowType"
                :key="indexChild" 
                :itemIndex="indexChild"
                :level="  level + 1 " 
                :levelIndex="levelIndex + '-' + indexChild"  
                v-for="(itemChild, indexChild) in pageData"
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
      draggable: true,
      renderShowType: 'drag'
    };
  },
  computed: {
    ...mapGetters({
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



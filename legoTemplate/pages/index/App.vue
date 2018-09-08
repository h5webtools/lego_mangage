<template>
  <div>
    <lego-render class="iphone-container"
      :page-data="pageData"
    ></lego-render>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
//import Vue from "vue";
import LegoRender from "../../modules/common/Render.vue";
export default {
  data () {
    return {
        pageData:window.Lego_ComponentConfig
    }
  },
   components: {
   LegoRender
  },
computed: {
    ...mapGetters({
      //pageData: "editor/pageData",
      //widgetList: "widget/widgetList",
      //currentComponent: "editor/currentComponent"
    }),
  },
  created() {

  },
  methods: {
    handleTreeNodeClick(data) {
      //this.$store.dispatch("editor/setCurrentComponent", data);
    },

  }
}
</script>

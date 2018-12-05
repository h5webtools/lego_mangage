<template>
          <!-- 属性配置 -->
    <div class="choonse-component-style">
        <div  class="component-select" v-for="(item, index) in currentComponent.shows" :key="index" :class="{'current-style': index === currentComponent.showIndex}">
          <img :src="item.com_img" class="image component-desc-img" @click="selectComStyle(item , index)">
          <div style="padding: 14px;">
            <span>{{item.com_desc}} &nbsp;{{index + 1}}</span>
          </div>
        </div>
    </div>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      defaultProps: {
      }
      // treeData: this.pageData
    };
  },
  computed: {
    ...mapGetters({
      currentComponent: "editor/currentComponent"
    }),

  },
  watch: {},
  created() {
    // this.setCurrentKey(this.current);
  },
  methods: {
    selectComStyle(showItem, index) {
      this.$store.dispatch("editor/updateModelValue", { 
        key: 'showIndex',
        value: index  
      });
    }
  }
};
</script>

<style lang="scss">
.choonse-component-style {
  display: flex;
  flex-wrap: wrap;
  & > .component-select{
    &.current-style{
      border: 1px solid red;
    }
    width: 48%;
    height: 200px;
    & > img{
      width: 100%;
      height: 120px;
      
    }
    &  span{
      font-size: 14px;
      color: #606266;
    }
  }
}
</style>

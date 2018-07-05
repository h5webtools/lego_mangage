<template>
  <el-tabs
    v-model="activeName"
    tab-position="left"
    class="code-tab">
    <el-tab-pane class="code-tab-pane" label="页面源码" name="component">
      <component-code v-if="activeName === 'component'"></component-code>
    </el-tab-pane>
    <!-- <el-tab-pane class="code-tab-pane" label="组件代码" name="componentCode">
      
    </el-tab-pane> -->
    <el-tab-pane class="code-tab-pane" label="页面状态" name="store">
      <store-code v-if="activeName === 'store'"></store-code>
    </el-tab-pane>
    <el-tab-pane class="code-tab-pane" label="公用代码" name="context">
      <context-code v-if="activeName === 'context'"></context-code>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters } from 'vuex';
import extend from '@jyb/lib-extend';
// component
import ComponentCode from './component.vue';
import StoreCode from './store.vue';
import ContextCode from './context.vue';

export default {
  components: {
    ComponentCode,
    StoreCode,
    ContextCode
  },
  data() {
    return {
      activeName: 'component'
    };
  }
}
</script>

<style lang="scss" scoped>
.code-tab {
  height: 100%;

  .el-tabs__header {
    width: 96px;
  }

  .el-tabs__content {
    height: 100%;
  }
}

.code-tab-pane {
  height: 100%;
}
</style>

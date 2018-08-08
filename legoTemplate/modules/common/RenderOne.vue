<template>
  <div>
    <div v-for="(item, index) in currentListData" :key="levelIndex + '-' + index" class="dragItem" :class="{'dragItem_current': item.extendProps &&item.extendProps.isCurrent}" :style="style">
      <!-- 已经注册， 或者是直接json内部children时候直接配置基本组件不需要注册 -->
      <template v-if="item.is_register === true || typeof item.is_register  === 'undefined' ">
    
      <component :is="item.tag_name" :key="levelIndex + '-' + index "  v-bind="item.props" :uuid="levelIndex + '-' + index">
        <span v-html="item.props && item.props.text"></span>

      </component>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import draggableMixin from "./mixin";
import { setUuid, loadComponents } from "../../util/helper";

export default {
  mixins: [draggableMixin],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  props: {
    pageData: {
      type: Array,
      default: null
    },
  },
  methods: {
    onAdd(item, event) {
      // 只有这里的updatePage： 拖拽到编辑区域的需要验证组件是否register以及注册

      let newItem = item[event.newIndex];
      setUuid(
        item[event.newIndex],
        event.newIndex,
        this.level,
        this.levelIndex,
        item,
        this.currentThemeStyle
      );

      if (!newItem.is_register) {
        loadComponents(newItem.fileUrl, ()=> {
          window[newItem.component_umd_name].install(Vue);
          // Vue.use(newItem.component_umd_name)
          console.log(Vue.options.components , '注册组件');
          // TODO  安装一个记录一次， 再次拖拽不再安装
          newItem.is_register = true;
          this.updatePage(item);
        })
      } else {
        this.updatePage(item);
      }

    }
  }
};
</script>

<style lang="scss">
</style>



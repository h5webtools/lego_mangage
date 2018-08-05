<template>
  <el-collapse :accordion="true" v-model="activeNames" @change="handleChange" class="widget-list">
    <el-collapse-item
      v-for="(item, groupKey) in list"
      :key="groupKey"
      :title="item.title"
      :name="item.title"
    >
      <div class="widget-box">

          <editor-widget
            v-for="(widget, index) in item.widgetList"
            :key="index"
            :widget="widget">
              <div slot="widget">
                <div class="widget-thumb">
                  <img :src="widget.thumb" :alt="widget.name">
                </div>
                <div class="widget-name">{{widget.name}}</div>
              </div>
          </editor-widget>
          
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import EditorWidget from "./widget.vue";

export default {
  components: {
    EditorWidget
  },
  data() {
    return {
      activeNames: "",
      dragOptionsLib: {
        animation: 50,
        group: {
          name: "formDesign",
          pull: "clone",
          put: false
        },
        ghostClass: "ghost"
      },

    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    handleChange() {},
    onCloneLib(element) {
      console.log('-----------onCloneLib', element)
      // dragggable 唯一key
      return JSON.parse(JSON.stringify(element))
    },
    onMoveLib(element) {
      if(element.to.className !== 'list-group-design') {
        return false;
      } else {
        return true;
      }
      console.log('---onMoveLib--')
    },
    onChooseLib(element) {
      console.log('---onChooseLib--')
    }
  }
};
</script>

<style lang="scss" >


</style>



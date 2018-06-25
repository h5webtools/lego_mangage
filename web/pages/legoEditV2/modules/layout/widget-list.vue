<template>
  <el-collapse :accordion="true" v-model="activeNames" @change="handleChange">
    <el-collapse-item
      v-for="(item, groupKey) in list"
      :key="groupKey"
      :title="item.title"
      :name="item.title"
    >
      <div class="widget-box">
      <!--   <editor-widget
          v-for="widget in item.widgets"
          :key="widget.uuid"
          :widget="widget">
          <el-button slot="widget" size="mini">{{widget.name}}</el-button>
        </editor-widget> -->
      <c-draggable  class="draggableLib"  element="div" v-model="item.widgets" :options="dragOptionsLib" :move="onMoveLib"  :clone='onCloneLib' @choose='onChooseLib'>
            <transition-group type="transition" :name="'flip-list'" tag="ul" class="list-group">
                <!-- <li class="list-group-item" v-for="(element, index) in formLib" :key="index">
                    {{element.label_type}}
                </li> -->
                  <editor-widget
                    v-for="(widget, index) in item.widgets"
                    :key="index"
                    :widget="widget">
                    <el-button slot="widget" size="mini">{{widget.name}}</el-button>
                  </editor-widget>
            </transition-group>
        </c-draggable>
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
        console.log('onCloneLib', element)
        // dragggable 唯一key
        return JSON.parse(JSON.stringify(element))
    },
    onMoveLib() {},
    onChooseLib() {}
  }
};
</script>

<style lang="scss" scoped>
.widget-box {
  padding-left: 10px;
}
</style>



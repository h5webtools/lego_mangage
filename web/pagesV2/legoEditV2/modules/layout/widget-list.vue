<template>
  <el-collapse :accordion="true" v-model="activeNames" @change="handleChange" class="widget-list">
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
                      <div slot="widget">
                        <div class="widget-thumb">
                          <img :src="widget.thumb" :alt="widget.name">
                        </div>
                        <div class="widget-name">{{widget.name}}</div>
                      </div>
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

<style lang="scss" >
.widget-list{
  .el-collapse-item__header{
    font-size: 16px;
    color: #5F6270;
  }

  .widget-box {
  padding: 24px 20px 0 22px;
  & .list-group{
    & > .widget-single{
      &:nth-child(3n) {
        padding-right: 0;
      }
      & .widget-name{
        margin: 5px 0 20px 0;
        text-align: center;
        font-size: 12px;
        line-height: 12px;
        color: #8489AB;
        letter-spacing: 0;
      }
    }
  }  
}
}

</style>



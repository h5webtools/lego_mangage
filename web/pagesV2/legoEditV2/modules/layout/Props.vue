<template>
  <div class="props-box">
    <h6 class="props-box__title"><strong class="props-box__title_bold">{{component.name}}:{{component.uid}}</strong> 属性配置：</h6>
    <div class="props-box__main">
      <!-- {{component}} -->
      <el-form ref="form" :model="formData" size="mini">
        <div v-for="(item, k) in component.model" :key="k">
          <el-form-item v-if="item.type === 'string'" :label="item.title || k">
            <el-input :value="item.value" @input="handleStringInput(k, $event)"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type === 'number'" :label="item.title || k">
            <el-input :value="item.value" @input="handleNumberInput(k, $event)"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type === 'json'" :label="item.title || k">
            <el-input type="textarea" :value="item.value | toStr" @change="handleTextChange(k, $event)"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type === 'boolean'" :label="item.title || k">
            <el-switch :value="item.value" @change="handleSwitchChange(k, $event)"></el-switch>
          </el-form-item>
          <el-form-item v-if="item.type === 'select'" :label="item.title || k">
            <el-select :value="item.value" @change="handleSelect(k, $event)" placeholder="请选择">
              <el-option
                v-for="(val, index) in item.options"
                :key="index"
                :label="val.label"
                :value="val.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    component: {
      type: Object,
      default: {
        model: {}
      }
    }
  },
  data() {
    return {
      formData: Object.keys(this.component.model).reduce((obj, val) => {
        obj[val] = this.component.model[val].value;
        return obj;
      }, {})
    };
  },
  methods: {
    handleStringInput(k, value) {
      this.$store.dispatch('editor/updateModelValue', { key: k, value });
    },
    handleNumberInput(k, value) {
      const val = Number(value);
      if (!isNaN(val)) {
        this.$store.dispatch('editor/updateModelValue', { key: k, value: val });
      } else {
        this.$message.error('必须为number类型');
      }
    },
    handleTextChange(k, value) {
      try {
        this.$store.dispatch('editor/updateModelValue', { key: k, value: JSON.parse(value) });
      } catch (e) {
        this.$message.error(e.toString());
      }
    },
    handleSwitchChange(k, value) {
      this.$store.dispatch('editor/updateModelValue', { key: k, value });
    },
    handleSelect(k, value) {
      this.$store.dispatch('editor/updateModelValue', { key: k, value });
    }
  },
  filters: {
    toStr: function (value) {
      if (!value) return '';
      return JSON.stringify(value);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

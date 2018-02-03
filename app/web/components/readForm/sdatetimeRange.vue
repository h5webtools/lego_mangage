<template>
  <el-date-picker
    v-model="formatDate.value"
    type="datetimerange"
    :editable="false"
    placeholder="选择时间范围">
  </el-date-picker>
</template>
<script>
import * as util from "assets/js/util";
import event from 'assets/js/event';

export default {
  name: 'sdatetimeRange',
  props: {
    paramKey: '',
    param: {},
    defaultValue: '',
    optionList: {},
    groupIndex: 0,
    rule: {
      default() {
        return {}
      }
    },
    ruleConfig: {}
  },
  data() {
    return {
      formatDate: {
        value: this.param[this.paramKey] ? [new Date(this.param[this.paramKey][0]), new Date(this.param[this.paramKey][1])] : this.defaultValue.value ? [new Date(this.defaultValue.value[0]), new Date(this.defaultValue.value[1])] : ""
      }
    }
  },
  created() {
    event.$on(this.paramKey + '-dovalidate-'+ this.groupIndex, this.doValidate);
  },
  destroyed() {
    event.$off(this.paramKey + '-dovalidate-'+ this.groupIndex);
  },
  methods: {
    doValidate() {
      var value = this.formatDate.value,
          errmsg;
      if(this.rule.required) {
        // 必填项，但是内容为空
        if(!this.formatDate.value.length) {
          errmsg = this.paramKey + '参数是必填项';
        }
      }
      var condition = this.formatDate.value && this.formatDate.value.length > 0 && this.formatDate.value[0] instanceof Date;
      this.param[this.paramKey] = condition ? [util.parseTime(this.formatDate.value[0], "{y}/{m}/{d} {h}:{i}:{s}"), util.parseTime(this.formatDate.value[1], "{y}/{m}/{d} {h}:{i}:{s}")] : "";
      event.$emit(this.paramKey + '-validate-notify-'+ this.groupIndex, {
        pass: !errmsg,
        msg: errmsg
      });
    }
  }
  // methods: {
  //   doFormat(value) {
  //     // 赋值
  //     this.param[this.paramKey] = this.formatDate.value.length > 0 ? [util.parseTime(this.formatDate.value[0], "{y}/{m}/{d} {h}:{i}:{s}"), util.parseTime(this.formatDate.value[1], "{y}/{m}/{d} {h}:{i}:{s}")] : "";
  //   }
  // }
}
</script>

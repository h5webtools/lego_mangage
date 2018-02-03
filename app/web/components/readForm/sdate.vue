<template>
  <el-date-picker
    v-model="formatDate.value"
    type="date"
    :editable="false"
    placeholder="选择日期">
  </el-date-picker>
</template>
<script>
import event from 'assets/js/event';
import * as util from "assets/js/util";

export default {
  name: 'sdate',
  props: {
    paramKey: '',
    param: {},
    defaultValue: '',
    groupIndex: 0,
    rule: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formatDate: {
        value: this.param[this.paramKey] ? new Date(this.param[this.paramKey]) : this.defaultValue.value ? new Date(this.defaultValue.value) : ""
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
        if(!this.formatDate.value) {
          errmsg = this.paramKey + '参数是必填项';
        }
      }
      this.param[this.paramKey] = this.formatDate.value ? util.parseTime(this.formatDate.value, "{y}/{m}/{d}") : "";
      event.$emit(this.paramKey + '-validate-notify-'+ this.groupIndex, {
        pass: !errmsg,
        msg: errmsg
      });
    }
  }
}
</script>

<template>
  <el-date-picker
    v-model="formatDate.value"
    type="datetime"
    :editable="false"
    placeholder="选择日期时间">
  </el-date-picker>
</template>
<script>
import * as util from "assets/js/util";
import event from 'assets/js/event';

export default {
  name: 'sdatetime',
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
      this.param[this.paramKey] = this.formatDate.value ? util.parseTime(this.formatDate.value, "{y}/{m}/{d} {h}:{i}:{s}") : "";
      event.$emit(this.paramKey + '-validate-notify-'+ this.groupIndex, {
        pass: !errmsg,
        msg: errmsg
      });
    }
  }
  // methods: {
  //   doFormat(value) {
  //     // 赋值
  //     this.param[this.paramKey] = util.parseTime(this.formatDate.value, "{y}/{m}/{d} {h}:{i}:{s}");
  //   }
  // }
}
</script>

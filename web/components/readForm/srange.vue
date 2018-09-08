<template>
  <el-form :inline="true">
    <el-form-item>
      <el-input v-model="start" :placeholder="'请输入'+ ruleConfig[rule.tag].desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="end" :placeholder="'请输入'+ ruleConfig[rule.tag].desc"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import event from 'assets/js/event';

export default {
  name: 'sinput',
  props: {
    paramKey: '',
    param: {},
    defaultValue: '',
    groupIndex: 0,
    optionList: {},
    rule: {
      default() {
        return {}
      }
    },
    ruleConfig: {}
  },
  data() {
    return {
      start: this.param[this.paramKey] ? this.param[this.paramKey].split('-')[0] : this.defaultData.value ? this.defaultData.value.split('-')[0] : '',
      end: this.param[this.paramKey] ? this.param[this.paramKey].split('-')[1] : this.defaultData.value ? this.defaultData.value.split('-')[1] : '',
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
      var validate = this.ruleConfig[this.rule.tag],
          errmsg;
      if (this.rule.required) {
        // 必填项，但是内容为空
        if (!this.start || !this.end) {
          errmsg = this.paramKey + '的值不能为空';
        } else if (!validate.regexp.test(this.start) || !validate.regexp.test(this.end)) {
          errmsg = this.paramKey + '参数格式为' + validate.desc;
        }
      } else {
        // 输入内容不为空，需要对其进行校验
        if (this.start && validate.regexp.test(this.start)) {
          errmsg = this.paramKey + '参数格式为' + validate.desc;
        }

        if (this.end && validate.regexp.test(this.end)) {
          errmsg = this.paramKey + '参数格式为' + validate.desc;
        }
      }
      // 赋值
      this.param[this.paramKey] = this.start + '-' + this.end;
      event.$emit(this.paramKey + '-validate-notify-'+ this.groupIndex, {
        pass: !errmsg,
        msg: errmsg
      });
    }
  }
}
</script>

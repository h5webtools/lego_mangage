<template>
  <el-input v-model="input" :placeholder="'请输入'+ ruleConfig[rule.tag].desc"></el-input>
</template>
<script>
import event from 'assets/js/event';

export default {
  name: 'sinput',
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
      input: this.param[this.paramKey] || this.getDefault()
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
          value = this.input,
          errmsg;
      if(this.rule.required) {
        // 必填项，但是内容为空
        if(!value) {
          errmsg = this.paramKey + '参数不能为空';
        } else if(!validate.regexp.test(value)) {
          errmsg = this.paramKey + '参数格式为' + validate.desc;
        }
      } else {
        // 输入内容不为空，需要对其进行校验
        if(value && !validate.regexp.test(value)) {
          errmsg = this.paramKey + '参数格式为' + validate.desc;
        }
      }
      // 赋值
      this.param[this.paramKey] = this.input;
      event.$emit(this.paramKey + '-validate-notify-'+ this.groupIndex, {
        pass: !errmsg,
        msg: errmsg
      });
    },
    getDefault() {
      // 兼容老数据
      if(this.defaultValue instanceof Array) {
        return '';
      } else if(this.defaultValue instanceof Object) {
        return this.defaultValue.value;
      } else {
        return this.defaultValue;
      }
    }
  }
}
</script>

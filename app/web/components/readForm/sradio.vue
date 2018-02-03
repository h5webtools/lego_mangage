<template>
  <el-radio-group v-model="param[paramKey]">
      <el-radio v-for="item in optionList" :key="item.key" :label="item.key">{{item.value}}</el-radio>
  </el-radio-group>
</template>
<script>
import event from 'assets/js/event';

export default {
  name: 'sselect',
  props: {
    paramKey: '',
    param: {},
    optionList: {},
    groupIndex: 0,
    rule: {
      default() {
        return {}
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
      var value = this.param[this.paramKey],
          errmsg;
      if(this.rule.required) {
        // 必填项，但是内容为空
        if(!value) {
          errmsg = this.paramKey + '参数需要勾选一项';
        }
      }
      event.$emit(this.paramKey + '-validate-notify-'+ this.groupIndex, {
        pass: !errmsg,
        msg: errmsg
      });
    }
  }
}
</script>

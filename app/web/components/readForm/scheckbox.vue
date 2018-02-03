<template>
  <el-checkbox-group v-model="param[paramKey]">
    <el-checkbox v-for="item in optionList"
        :key="item.key"
        :label="item.key">{{item.value}}</el-checkbox>
  </el-checkbox-group>
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
    if(!this.param[this.paramKey]) {
      this.param[this.paramKey] = [];
    }
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
        if(value.length == 0) {
          errmsg = this.paramKey + '参数是必选项';
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

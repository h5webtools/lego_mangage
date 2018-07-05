<template>
  <div class="debug">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <el-alert
          class="alert-all"
          v-for="(info, index) in allList"
          :key="index"
          :title="info.msg"
          :description="info.desc"
          :type="info.type"
          show-icon>
        </el-alert>
      </el-tab-pane>
      <el-tab-pane label="错误" name="error">
        <el-alert
          class="alert-error"
          v-for="(info, index) in errorList"
          :key="index"
          :title="info.msg"
          :description="info.desc"
          type="error"
          show-icon>
        </el-alert>
      </el-tab-pane>
      <el-tab-pane label="警告" name="warn">
        <el-alert
          class="alert-warn"
          v-for="(info, index) in warnList"
          :key="index"
          :title="info.msg"
          :description="info.desc"
          type="warning"
          show-icon>
        </el-alert>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import store from '@/util/store';

export default {
  data() {
    return {
      activeName: 'all',
      errorList: store.get('error'),
      warnList: store.get('warning'),
      allList: store.get('all')
    };
  },
  methods: {
    handleClick(tab, event) {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.debug {
  padding: 20px;
}

.alert-all,
.alert-error,
.alert-warn {
  margin-bottom: 10px;
}
</style>

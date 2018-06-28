<template>
    <el-header class="el-header-lego">
      <el-row>
        <el-col :span="5">
          <div class="logo">乐高活动配置</div>
        </el-col>

        <el-col :span="2">
          <a target="_blank" href="#/lego/pageList">我的活动</a>
        </el-col>

        <el-col :span="2">
          <a href="javascript:void(0)">帮助反馈</a>
        </el-col>

        <el-col :span="3">
          选择主题：
          <el-popover
            placement="bottom"
            width="200"
            trigger="hover">
            <div v-if="themeColor['color'].length">
              <p>纯色主题：</p>
              <span @click="pickerThemeItem('color', item.t_id)" v-for="(item, index) in themeColor['color']" :key="index" class="theme-item" :style="{background: item.t_color}"></span>
            </div>
            <div v-if="themeColor['grident'].length">
              <p>渐变主题：</p>
              <span @click="pickerThemeItem('grident', item.t_id)" v-for="(item, index) in themeColor['grident']" :key="index" class="theme-item" :style="'background:'+item.t_grident"></span>
            </div>
            <span slot="reference" :style="'background:'+currentThemeColor" class="theme-item"></span>
          </el-popover>
        </el-col>

        <el-col :span="11" class="ui-ta-c">
          <el-button size="mini" type="primary">活动配置</el-button>
          <el-button size="mini" type="success">保存</el-button>
          <el-button size="mini" type="info">预览</el-button>
          <el-button size="mini" type="warning">解锁</el-button>
          <el-button size="mini" type="success">集成发布</el-button>
          <el-button size="mini" type="success">线上发布</el-button>
        </el-col>

        <el-col :span="1" class="ui-ta-r">{{userName}}</el-col>

      </el-row>
    </el-header>
</template>

<script>

import { mapGetters } from 'vuex';
import * as util from '@jyb/lib-util';
import * as queryString from '@/util/querystring';

export default {
  components: {

  },
  data() {
    return {
      loading: true,
      userName: window.userInfo.userAccount,
      currentThemeColor: '#fff',
      themeColor: {
        color: [],
        grident: []
      },
      currentThemeId: -1,
    };
  },
  computed: {
    ...mapGetters({
      activeIndex: 'editor/menuActiveIndex'
    })
  },
  methods: {

  },
  created() {

  }
}
</script>

<style lang="scss" >
.el-header-lego {
  background: #FFFFFF;
  box-shadow: 0 0 4px 0 rgba(77,77,100,0.24);
  height: 64px;
  position: fixed;
  top: 0;
  width:100%;
  padding-left: 0;
  left: 0;
  z-index: 1000;
  line-height: 64px;
  font-size: 14px;
  color: #58586E;
  .logo {
    width: 340px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #FF6E34;
  }
}

.theme-item {
  border: 1px solid #C3C8E4;
  border-radius: 2px;
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #fff;
  vertical-align: middle;
  position: relative;
  top: -3px;
  margin-right: 10px;
  margin-top: 5px;
  cursor: pointer;
}
</style>

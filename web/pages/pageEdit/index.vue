<template>
  <el-container>
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
    <el-container class="el-container-lego">
      <el-aside class="el-aside-lego" width="340px">
        <el-collapse accordion v-model="activeNames">
          <el-collapse-item v-for="(value, key) in filteredComponentsList" :key="key" :title="componentMap[key]" :name="key">
            <ul class="components">
              <li v-for="(item,index) in value" :key="index" class="components__item" :title="item.tb_desc">
                <drag :transfer-data="item">
                    <div class="components__item__imgwrap" :style="{backgroundImage:'url('+item.tb_thumb+')'}"></div>
                    <p class="ui-mt-10">{{item.tb_name}}</p>
                </drag>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="6">
              <drop class="iphone-container" @drop="componentDragEnd"></drop>
            </el-col>
            <el-col :span="18"></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import * as api from 'api/api_lego_pages';
import {Drag, Drop} from 'vue-drag-drop';

export default {
  components: {
    Drag,
    Drop
  },
  data() {
    return {
      dragging: false,
      activeNames: '1',
      userName: window.userInfo.userAccount,
      currentThemeColor: '#fff',
      currentThemeId: -1,
      componentMap: {
        '1':'推广组件',
        '2':'运营活动组件',
        '3':'通用组件',
        '4':'消费线组件'
      },
      filteredComponentsList: {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
      },
      themeColor: {
        color: [],
        grident: []
      },
      dragOptions: {

      }
    }
  },
  created() {
    this.getComponentList();
    this.getLegoThemeColor();
  },
  methods: {
    componentDragEnd(comp, dragEvent) {
      console.log(arguments);
    },
    renderComponent() {

    },
    getComponentList() {
      api.getLegoComponentList({
        pageIndex: 1,
        pageSize: 100
      }).then(json => {
        if(json.code == 0) {
          // 组件分组
          json.data.component_list.forEach(comp => {
            if(this.filteredComponentsList[comp.component_group]) {
              this.filteredComponentsList[comp.component_group].push(comp);
            }
          })
        }
      })
    },
    getLegoThemeColor() {
      api.getLegoThemeColor({}).then(json => {
        if(json.code == 0) {
          json.data.theme_list.forEach(theme => {
            if(theme.t_type == 1) {
              this.themeColor['color'].push(theme);
            } else if(theme.t_type == 2) {
              this.themeColor['grident'].push(theme);
            }
          })
        } else {
          this.$message.error(json.msg);
        }
      })
    },
    pickerThemeItem(themeType, themeId) {
      // TODO 应用背景色
      let target = this.themeColor[themeType].filter(theme => {
        return theme.t_id === themeId;
      });
      if(target.length > 0) {
        this.currentThemeColor = themeType == 'color' ? target[0].t_color : target[0].t_grident;
        this.currentThemeId = themeId;
      }
    }
  }
}
</script>

<style lang="scss">
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

.el-container-lego {
  margin-top: 59px;
  height: 100vh;
  .el-aside {
    background: #FFFFFF;
    border-right: 1px solid rgba(58,74,167,0.10);
    overflow: hidden;
    .components {
      display: flex;
      text-align: center;
      align-items: baseline;
      flex-wrap: wrap;
      padding: 20px;
      .components__item {
        width: 32%;
        margin-top: 24px;
        font-size: 12px;
        color: #8489AB;
        border: 1px solid transparent;
        line-height: 3;
        &:hover {
          border: 1px dashed rgba(58,74,167,0.3);
        }
        .components__item__imgwrap {
          width: 88px;
          height: 66px;
          margin: 0 auto;
          background-position: center center;
          background-size: 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .el-collapse-item__header {
      background: rgba(58,74,167,0.10);
      padding-left: 20px;
      border-bottom: 1px solid rgba(58,74,167,0.3);
      &.is-active {
        border-bottom: 0;
      }
    }
  }
}

.iphone-container {
  width: 375px;
  transition: all 0.3 ease;
  min-height: 800px;
  border: 1px dashed #999;
  position: relative;
  &:after {
    content: "iphone6首屏高度667px";
    position: absolute;
    width: 100%;
    border-bottom: 1px dashed #e5e5e5;
    left: 0;
    top: 667px;
    font-size: 12px;
    color: #e5e5e5;
    text-align: center;
  }
}
</style>

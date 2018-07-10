<template>
    <el-header class="el-header-lego">
      <el-row type="flex">
        <div class="col-logo">
          <div class="logo">
            <img :src="logoImg" alt="">
          </div>
        </div>

        <div class="flex-between">
            <div  class="col-base">
              <a target="_blank" style="margin-right: 20px;" href="#/lego/pageList">我的活动</a>
              <a href="javascript:void(0)">帮助反馈</a>
            </div>

            <div  class="col-theme">
              背景颜色：
              <el-popover
                placement="bottom"
                width="200"
                trigger="hover">
                <div v-if="themeColor['color'].length">
                  <p>纯色主题：</p>
                  <span @click="pickerThemeItem('color', item)" v-for="(item, index) in themeColor['color']" :key="index" class="theme-item" :style="{background: item.t_color}">
                      <!-- <i class="el-icon-check" v-show="currentTheme.color === item.t_color"></i> -->
                      <img v-show="currentTheme.color === item.t_color" :src="rightWhite" alt="" style="width：100%； height: 100%">
                  </span>
                </div>
                <div v-if="themeColor['grident'].length">
                  <p>渐变主题：</p>
                  <span @click="pickerThemeItem('grident', item)" v-for="(item, index) in themeColor['grident']" :key="index" class="theme-item" :style="'background:'+item.t_grident"></span>
                </div>
                <span slot="reference" :style="'background:'+currentTheme.color" class="theme-item"></span>
              </el-popover>
            </div>

            <div class="col-scale">
              <span class="col-scale__zoom-out"></span><span class="col-scale-number">100%</span>
              <span class="col-scale__zoom-in"></span>
            </div>

            <div class="ui-ta-c col-operate">
              <el-button size="mini" type="success">保存</el-button>
              <el-button size="mini" type="primary">活动配置</el-button>
              <el-button size="mini" type="info">预览</el-button>
              <el-button size="mini" type="warning">解锁</el-button>
              <el-button size="mini" type="success">集成发布</el-button>
              <el-button size="mini" type="success">线上发布</el-button>
            </div>
        </div>
        
        <div  class="ui-ta-r col-user">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a href="/login/loginOut">退出登录</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>

      </el-row>
    </el-header>
</template>

<script>

import { mapGetters } from 'vuex';
import * as util from '@jyb/lib-util';
import * as queryString from '@/util/querystring';
import logoImg from 'assets/img/edit/LOGO.png'
import rightWhite from 'assets/img/edit/right-white.png'

export default {
  components: {

  },
  data() {
    return {
      logoImg: logoImg,
      rightWhite: rightWhite,
      loading: true,
      userName: window.userInfo.userName,
      currentTheme: {
        color: '#FF6E34'
      },
      themeColor: {
        color: [{
          t_color:'#C23142'
        },{
          t_color:'#5F3899'
        },{
          t_color:'#FF6E34'
        },{
          t_color:'#212A74'
        },{
          t_color:'#3A4AA7'
        }],
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
    pickerThemeItem(type, item) {
      this.currentTheme.color = item.t_color
    }
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
  padding: 0;
  left: 0;
  z-index: 1000;
  line-height: 64px;
  font-size: 14px;
  color: #58586E;
  & > .el-row{
    display: flex;
    justify-content: space-between;
    .col-logo{
      width: 340px;
      flex: 0 0 340px;
      @media  screen and (max-width: 1450px) {
        flex: 1 1 100px;
      }
      .logo {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #FF6E34;
      }
      img{
        vertical-align: baseline;
      }
    }
    .flex-between{
      flex: 5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .col-base{
        flex: 1 1 200px;
      }
      .col-theme{
        flex: 1 0 120px;
      }
      .col-scale{
        // border: solid 1px #C3C8E4;
        height: 24px;
        display: flex;
        flex: 0 0 108px;
        font-size: 0;
        & > .col-scale-number{
          text-align: center;
          height: 24px;
          line-height: 24px;
          width: 60px;
          font-size: 14px;
          color: #58586E;
          position:relative;
          &::after{
            content: '';
            width:103%;
            height: 1px;
            display: block;
            bottom:0;
            left: -1px;
            position: absolute;
            background-color: #C3C8E4;
          }
          &::before{
            content: '';
            width:103%;
            height: 1px;
            display: block;
            left: -1px;
            top:0;
            position: absolute;
            background-color: #C3C8E4;
          }
          // border-top: 1px solid #C3C8E4;
          // border-bottom: 1px solid #C3C8E4;
        }
        & > .col-scale__zoom-out{
          line-height: 64px;
          width: 24px;
          height: 24px;
          background: url('../../../../assets/img/edit/nav_ic_zoomout@2x.png') 0 0/100% 100%
        }
        & > .col-scale__zoom-in{
          line-height: 64px;
          width: 24px;
          height: 24px;
          background: url('../../../../assets/img/edit/nav_ic_zoomin@2x.png') 0 0/100% 100%
        }
      }
      .col-operate{
        flex: 3 1 550px;
      }
   }

    .col-user{
      margin-right: 20px;
      width: 80px;
      flex: 0 0 80px;
    }
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
  & > .el-icon-check{
    width: 100%;
    height: 100%;
    line-height: 24px;
    font-weight: bolder;
    font-size: 20px;
    color: #FEFEFE;
  }
}
</style>

<template>
  <div class="header">
    <div class="header__title"><i class="header__logo-icon el-icon-fa-cube"></i>cube</div>
    <el-menu
      class="header__menu"
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#324157"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="layout">
        <div class="header__menu-box">
          <i class="header__menu-icon el-icon-fa-columns"></i>
          <span class="header__menu-text" slot="title">布局</span>
        </div>
      </el-menu-item>
      <el-menu-item index="code">
        <div class="header__menu-box">
          <i class="header__menu-icon el-icon-fa-code"></i>
          <span class="header__menu-text" slot="title">源码</span>
        </div>
      </el-menu-item>
      <el-menu-item index="debug">
        <div class="header__menu-box">
          <i class="header__menu-icon el-icon-fa-edit"></i>
          <span class="header__menu-text" slot="title">调试</span>
        </div>
      </el-menu-item>
      <el-menu-item index="preview">
        <div class="header__menu-box">
          <i class="header__menu-icon el-icon-fa-eye"></i>
          <span class="header__menu-text" slot="title">预览</span>
        </div>
      </el-menu-item>
      <el-menu-item v-if="!isDebug" index="save">
        <div class="header__menu-box">
          <i class="header__menu-icon el-icon-fa-save"></i>
          <span class="header__menu-text" slot="title">保存</span>
        </div>
      </el-menu-item>
      <el-menu-item index="help">
        <div class="header__menu-box">
          <i class="header__menu-icon el-icon-fa-question-circle"></i>
          <span class="header__menu-text" slot="title">帮助</span>
        </div>
      </el-menu-item>
    </el-menu>
    <div class="header__user-info" v-if="user.username">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link color-fff">
          {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="el-dropdown-link">
        <img class="header__user-info-avatar" :src="user.avatar">
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import viewState from '@/util/view-state';
import avatarImg from '@/assets/img/avatar.png';
import * as util from '@jyb/lib-util';
import * as queryString from '@/util/querystring';

export default {
  data() {
    return {
      isDebug: queryString.mode === 'debug',
      user: {
        username: '',
        avatar: avatarImg
      }
    };
  },
  created() {
    this.user = Object.assign({}, this.user, viewState.user);
  },
  computed: {
    ...mapGetters({
      activeIndex: 'editor/menuActiveIndex'
    })
  },
  methods: {
    handleSelect(value) {
      if (value === 'save') {
        this.$store.dispatch('editor/savePageCode').then((result) => {
          if (result && result.affectedRows) {
            this.$message({ message: '保存成功', type: 'success' });
          } else {
            this.$message({ message: '保存失败', type: 'error' });
          }
        }).catch(e => this.$message({ message: e.toString(), type: 'error' }));
      } else {
        this.$store.dispatch('editor/updateValue', { key: 'menuActiveIndex', value });
      }
    },
    logout() {
      this.$confirm('确定要注销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        window.location.href = '/auth/logout';
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background-color: #324157;
  display: flex;
  justify-content: space-between;
}

.header__title {
  padding-left: 20px;
  padding-right: 20px;
  line-height: 60px;
  color: #fff;
  font-size: 24px;
}

.header__logo-icon {
  margin-right: 8px;
  &::before {
    font-size: 20px;
  }
}

.header__menu {
  margin-right: 20px;
}

.header__menu-box {
  display: inline-block;
  height: 36px;
  line-height: 2;
  vertical-align: middle;
  text-align: center;
}

.header__menu-icon {
  display: block;
}

.header__menu-text {
  font-size: 12px;
}

.header__user-info {
  line-height: 60px;
  padding-right: 16px;
}

.header__user-info-avatar {
  width: 25px;
  height: 25px;
  vertical-align: -7px;
  margin: 0 0 0 10px;
  border-radius: 50%;
  cursor: pointer;
}
</style>


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
                <div v-if="themeStyle.length">
                  <!-- <p>纯色主题：</p> -->
                  <span @click="pickerThemeItem('style', item)" v-for="(item, index) in themeStyle" :key="index" class="theme-item" :style="{background: item.config.A && item.config.A.color}" :title="item.label">
                   
                      <img v-show="(currentThemeStyle.config.A && currentThemeStyle.config.A.color) === (item.config.A && item.config.A.color)" :src="rightWhite" alt="" style="width：100%； height: 100%">
                  </span>
                </div>
                <!-- <div v-if="themeColor['grident'].length">
                  <p>渐变主题：</p>
                  <span @click="pickerThemeItem('grident', item)" v-for="(item, index) in themeColor['grident']" :key="index" class="theme-item" :style="'background:'+item.t_grident"></span>
                </div> -->
                <span slot="reference" :style="'background:' + (currentThemeStyle.config.A && currentThemeStyle.config.A.color)" class="theme-item"></span>
              </el-popover>
            </div>

            <div class="col-scale">
              <span class="col-scale__zoom-out"></span><span class="col-scale-number">100%</span>
              <span class="col-scale__zoom-in"></span>
            </div>

            <div class="ui-ta-c col-operate">
              <el-button size="mini" type="success" @click="savePage">保存</el-button>
              <el-button size="mini" type="primary" @click="pageConfig">活动配置</el-button>
              <el-button size="mini" type="info">预览</el-button>
              <el-button size="mini" type="warning">解锁</el-button>
              <el-button size="mini" type="success" @click="publishSit">集成发布</el-button>
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
      <el-dialog title="基本配置" :visible.sync="dialogPageConfigVisiable">
        <el-form :model="pageConfigForm" status-icon :rules="pageConfigRules" ref="pageConfigForm"> 
          <el-form-item label="活动名称" prop="pageTitle" :label-width="formLabelWidth">
            <el-input v-model="pageConfigForm.pageTitle" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="目录名称" prop="pageMenu" :label-width="formLabelWidth">
            <el-input v-model="pageConfigForm.pageMenu" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPageConfigVisiable = false">取 消</el-button>
          <el-button type="primary" @click="savePageConfig(pageConfigForm)">确 定</el-button>
        </div>
      </el-dialog>
    </el-header>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

import * as util from "@jyb/lib-util";
import * as queryString from "@/util/querystring";
import logoImg from "assets/img/edit/LOGO.png";
import rightWhite from "assets/img/edit/right-white.png";
import { getUrlKey, formatThemeComStyle, loadComponents } from "@/util/helper";

// import themeQuery from "apiV2/theme"
import * as themeQuery from "apiV2/theme";
import * as pageQuery from "apiV2/page_edit";
import * as legoQuery from "apiV2/lego";

export default {
  components: {},
  data() {
    var checkPath = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入页面路径"));
      } else if (!this.pagePathReg.test(value)) {
        callback(new Error("目录必须以5位或以上字母、数字、下划线组成"));
      } else {
        callback();
      }
    };
    return {
      logoImg: logoImg,
      rightWhite: rightWhite,
      loading: true,
      userName: window.userInfo.userName,
      themeStyle: [],
      currentThemeId: -1,
      pageId: "",
      page_content: null,
      loadComponent: {
        count: 0,
        sum: 0
      },
      dialogPageConfigVisiable: false,
      pageConfigForm: {
        pageTitle: "",
        pageMenu: "",
        dateFolder: ""
      },
      pageConfigRules: {
        pageTitle: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        pageMenu: [{ validator: checkPath, trigger: "blur", required: true }]
      },
      formLabelWidth: "80px",
      pagePathReg: /^[a-zA-Z0-9_]{5,30}$/
    };
  },
  computed: {
    ...mapGetters({
      pageData: "editor/pageData",
      activeIndex: "editor/menuActiveIndex",
      currentThemeStyle: "editor/currentThemeStyle",
      registerComponentList: "editor/registerComponentList"
    })
  },
  watch: {
    'loadComponent.count' (newVal, oldVal) {
      if (newVal === this.loadComponent.sum) {
        this.$store.dispatch("editor/updatePage", {
          dragType: "none",
          item: this.page_content
        });
      }
    }
  },
  created() {
    this.pageId = getUrlKey("pageId");
    this.getLegoThemeStyle();
    if (this.pageId) {
      this.getPage();
    } else {
      this.dialogPageConfigVisiable = true;
    }

    
  },
  methods: {
    addUrlParam(url, key, value) {
      url = url.replace(/？/g, "?"); //异常处理
      let reg = /key[=]/,
        hasQuery = /\?/.test(url);
      let hasAnchor = url.indexOf("#") > -1;
      if (reg.test(url)) {
        //进行替换
        url = url.replace(reg, key + "=" + value);
      } else {
        //没有，则进行追加
        url = hasAnchor
          ? url.replace("#", (hasQuery ? "&" : "?") + key + "=" + value + "#")
          : url + (hasQuery ? "&" : "?") + key + "=" + value;
      }
      return url;
    },
    getLegoThemeStyle() {
      themeQuery.getLegoThemeComStyle({}).then(json => {
        if (json.code == 0) {
          // 格式化theme_list （将某个themeStyle 下的组件配色分组）

          this.themeStyle = formatThemeComStyle(json.data.theme_list);

          if (!this.currentThemeStyle.t_theme_style_id) {
            this.$store.dispatch(
              "editor/setCurrentThemeStyle",
              this.themeStyle[0]
            );
          }
        }
      });
    },
    pickerThemeItem(type, item) {
      if (this.currentThemeStyle.t_theme_style_id === item.t_theme_style_id) {
        return false;
      }

      this.$store.dispatch("editor/setCurrentThemeStyle", item);

      // 根据对应主题设置 pageData 的 对应位置的 originStyles
      this.$store.dispatch("editor/updatePageItemThemeStyle", {
        currentTheme: item
      });
    },
    pageConfig() {
      this.dialogPageConfigVisiable = true;
    },
    savePageConfig(pageConfigForm) {
      this.$refs["pageConfigForm"].validate(valid => {
        if (valid) {
          let basicInfo = {};
          basicInfo.pageId = this.pageId;
          Object.assign(basicInfo, this.pageConfigForm);
          pageQuery.savePageBasicInfo(basicInfo).then(json => {
            if (json.code == 0) {
              if (json && json.data && json.data.pageId) {
                let _url = this.addUrlParam(
                  location.href,
                  "pageId",
                  json.data.pageId
                );
                location.href = _url;
              } else {
                this.$message({
                  message: "保存基本配置成功",
                  type: "success",
                  duration: 3000
                });
              }
            } else {
              this.$message({
                message: json.msg,
                type: "fail",
                duration: 3000
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    savePage() {
      let postData = {};

      // 先重置 currentComponent的
      this.$store.commit("editor/setCurrentComponent", {
        type: "removeCurrent"
      });
      postData.pageContent = JSON.stringify(this.pageData);
      postData.pageRegisterCom = JSON.stringify(this.registerComponentList);

      if (this.pageId) {
        postData.pageId = this.pageId;
      }

      pageQuery
        .savePage(postData)
        .then(json => {
          if (json.code == 0) {
            if (!this.pageId) {
              this.pageId = json.data.pageId;
            }

            this.$store.commit("editor/setCurrentComponent", {
              type: "restoreCurrent"
            });

            this.$message({
              message: "保存成功",
              type: "success",
              duration: 3000
            });
          }
        })
        .catch(() => {});
    },
    publishSit() {
      let postData = {},
          comConfig = "let vuecomponents = { \n ";
      postData.pageContent = JSON.stringify(this.pageData);
      Object.assign(postData, this.pageConfigForm);
      
      this.pageData.forEach((item ,index) => {
        console.log(item.component_umd_name);
        comConfig += "legoComponentBasic:require('@lego/lego_component_basic/public/js/index.js'), \n " 
      });

      comConfig += '};';
      console.log(comConfig);
      // return;
      // debugger;
        legoQuery.publishSit(postData).then(json => {
          if(json.code == 0){
            this.$message({
              message: '发布成功',
              type: 'success',
              duration:3000
            });
          }else{
            this.$message({
              message: '发布失败',
              type: 'success',
              duration:3000
            });
          }
      });
    },
    getPage() {
      let postData = {
        pageId: this.pageId
      };
      pageQuery
        .getPage(postData)
        .then(json => {
          if (json.code == 0) {
            let _data = json.data;
            //更新路径和页面标题
            this.pageConfigForm.pageTitle = _data.page_title;
            this.pageConfigForm.pageMenu = _data.page_menu;
            this.pageConfigForm.dateFolder = _data.date_folder;
            let registerComponentList = JSON.parse(_data.page_register_com);
            const self = this;
            
            let registerComponentListKey = Object.keys(registerComponentList)

            this.page_content = JSON.parse(_data.page_content);

            this.loadComponent.sum = registerComponentListKey.length;
            registerComponentListKey.forEach(key => {
             
              const item = registerComponentList[key];
              loadComponents(item.fileUrl, () => {
                window[item.name].install(Vue);
                // Vue.use(newItem.component_umd_name)
                console.log(Vue.options.components, "注册组件");
                self.loadComponent.count++;
                // TODO  安装一个记录一次， 再次拖拽不再安装
                /*                 ctx.$store.dispatch('editor/addRegisterComponentItem', {
                  name: item.component_umd_name,
                  fileUrl: item.fileUrl
                }); */
              });
            });


            this.$store.dispatch("editor/setRegisterComponentList", {
              dragType: "none",
              item: registerComponentList
            });
            
          } else {
            this.$message.error("该页面不存在");
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" >
.el-header-lego {
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(77, 77, 100, 0.24);
  height: 64px;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0;
  left: 0;
  z-index: 1000;
  line-height: 64px;
  font-size: 14px;
  color: #58586e;
  & > .el-row {
    display: flex;
    justify-content: space-between;
    .col-logo {
      width: 340px;
      flex: 0 0 340px;
      @media screen and (max-width: 1450px) {
        flex: 1 1 100px;
      }
      .logo {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #ff6e34;
      }
      img {
        vertical-align: baseline;
      }
    }
    .flex-between {
      flex: 5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .col-base {
        flex: 1 1 200px;
      }
      .col-theme {
        flex: 1 0 120px;
      }
      .col-scale {
        // border: solid 1px #C3C8E4;
        height: 24px;
        display: flex;
        flex: 0 0 108px;
        font-size: 0;
        & > .col-scale-number {
          text-align: center;
          height: 24px;
          line-height: 24px;
          width: 60px;
          font-size: 14px;
          color: #58586e;
          position: relative;
          &::after {
            content: "";
            width: 103%;
            height: 1px;
            display: block;
            bottom: 0;
            left: -1px;
            position: absolute;
            background-color: #c3c8e4;
          }
          &::before {
            content: "";
            width: 103%;
            height: 1px;
            display: block;
            left: -1px;
            top: 0;
            position: absolute;
            background-color: #c3c8e4;
          }
          // border-top: 1px solid #C3C8E4;
          // border-bottom: 1px solid #C3C8E4;
        }
        & > .col-scale__zoom-out {
          line-height: 64px;
          width: 24px;
          height: 24px;
          background: url("../../../../assets/img/edit/nav_ic_zoomout@2x.png") 0
            0/100% 100%;
        }
        & > .col-scale__zoom-in {
          line-height: 64px;
          width: 24px;
          height: 24px;
          background: url("../../../../assets/img/edit/nav_ic_zoomin@2x.png") 0
            0/100% 100%;
        }
      }
      .col-operate {
        flex: 3 1 550px;
      }
    }

    .col-user {
      margin-right: 20px;
      width: 80px;
      flex: 0 0 80px;
    }
  }
}

.theme-item {
  border: 1px solid #c3c8e4;
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
  & > .el-icon-check {
    width: 100%;
    height: 100%;
    line-height: 24px;
    font-weight: bolder;
    font-size: 20px;
    color: #fefefe;
  }
}
.el-dialog__wrapper {
  line-height: 24px;
  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
  }
}
</style>

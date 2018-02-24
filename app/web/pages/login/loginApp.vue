<template>
    <div id="login">
        <div class="login-container">
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
                <h3 class="title">系统登录</h3>
                <el-form-item prop="account">
                    <el-input name="account" type="text" v-model.trim="loginForm.account" autoComplete="off" placeholder="请输入账号">
                      <i slot-scope="prefix" class="glyphicon glyphicon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" type="password" v-model.trim="loginForm.password" autoComplete="off" placeholder="请输入密码">
                      <i slot-scope="prefix" class="glyphicon glyphicon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  :loading="loading" style="width:100%;" @click.native.prevent="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { trim, getQuery } from "assets/js/util";
import { doLogin } from "api/api-login";
import sha1 from "sha1";

export default {
  name: "login",
  data() {
    const validateAccount = (rule, value, callback) => {
      value = trim(value);
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };

    const validatePassword = (rule, value, callback) => {
      value = trim(value);
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      callback();
    };

    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", validator: validateAccount }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      showDialog: false,
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          doLogin(this.loginForm.account, sha1(this.loginForm.password)).then(jsonData => {
            this.loading = false;
            if (jsonData.code == 0) {
              //this.$router.push("/welcome");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  height: 100vh;
  background-color: #2d3a4b;
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px;
    margin: 120px auto;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .glyphicon {
      vertical-align: middle;
    }
  }
}
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}
</style>

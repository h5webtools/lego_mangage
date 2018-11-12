<template>
  <div class="debug-wrap">
    <div class="debug-header">
      <el-row class="debug-header-box">
        <el-col :span="12">
          <a class="logo" href="javascript:;"><img src="../../assets/img/logo.png"/></a>
        </el-col>
        <el-col :span="12" class="ui-ta-r">
          <el-dropdown class="ui-ta-r">
            <span class="el-dropdown-link">
              {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="/login/loginOut">退出登录</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <div class="debug-main">
      <el-row :gutter="20">
        <el-col :span="10">
          <div id="js-preview"></div>
        </el-col>
        <el-col :span="14">
          <ace-editor
            class="debug-editor"
            editorId="codeString"
            height="300px"
            :variable="editorVar"
            :content="codeString"
            lang="javascript"
            @change="handleEditorChange($event)"
          ></ace-editor>
          <el-button @click="handleSave" type="primary" size="mini" round>保存</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Postmate from 'postmate';
import AceEditor from '@/components/ace-editor.vue';

let childAPI = null;

export default {
  components: {
    AceEditor
  },
  data() {
    return {
      editorVar: {
        'CANYE': {
          des: 'hahaha'
        }
      },
      userInfo: window.userInfo || {},
      codeString: '(function() {\n  // do something\n})();'
    };
  },
  methods: {
    handleEditorChange(val) {
      this.codeString = val;
    },
    handleSave(e) {
      if (this.childAPI) {
        this.childAPI.call('evalFunc', this.codeString);
      }
    }
  },
  mounted() {
    const handshake = new Postmate({
      container: document.getElementById('js-preview'),
      url: 'http://172.16.5.59:8887/demo/demo1.html'
    });
    handshake.then(child => this.childAPI = child);
  }
}
</script>
<style lang="scss" scoped>
.debug-main {
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.debug-header {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #eef1f6;
  width: 100%;
  line-height: 50px;
  margin-bottom: 18px;
}

.debug-header-box {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 1;
}

.logo {
  display: inline-block;
  height: 30px;

  img {
    height: 30px;
  }
}

.debug-editor {
  border: 1px solid #ccc;
}

#js-preview {
  iframe {
    width: 375px;
    height: 667px;
    border: 1px solid #ccc;
  }
}

.editor-box {
  width: 600px;
}
</style>



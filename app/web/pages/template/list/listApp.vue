<template>
  <div>
    <router-view v-if="showSubRoute"></router-view>
    <!-- <el-breadcrumb class="breadcrumb-wrap" separator="/">
      <el-breadcrumb-item>模板管理</el-breadcrumb-item>
      <el-breadcrumb-item>组件模板</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div v-else class="martop20">
      <el-form :inline="true">
        <el-form-item label="关键字：">
          <el-input v-model="queryData.name" placeholder="按关键字查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">
            <a @click="queryFilterList(true)" class="btnchains">查询</a>
          </el-button>
          <el-button type="success" size="small">
            <span @click="addNewTpl('rule')" class="btnchains">
              <i class="glyphicon glyphicon-plus"></i>新增模板</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="listLoading" stripe border highlight-current-row>
        <el-table-column prop="tpl_id" label="模板ID" width="140"></el-table-column>
        <el-table-column prop="com_id" label="组件ID" width="240"></el-table-column>
        <el-table-column prop="name" label="模板名" width="240"></el-table-column>
        <el-table-column prop="creator" label="创建人" width="100"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="remark" label="模板备注(说明)"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="editTpl(scope.row)" type="text" size="small">编辑</el-button>
            <el-button  type="text" size="small">
              <router-link :to="{name:'configTree', params: {tpl_id:scope.row.tpl_id}}">配置模板</router-link>
            </el-button>
            <!-- <el-button @click="configTpl(scope.row)" type="text" size="small">配置模板</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="martop20">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-size="queryData.page_size" div="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增/编辑活动模板" :visible.sync="dialogVisible">
      <el-form v-loading="dialogLoading" ref="templateData" label-width="80px" :rules="rules" :model="templateData">
        <el-form-item label="模板备注" required prop="remark">
          <el-input placeholder="请输入备注说明" v-model="templateData.remark"></el-input>
        </el-form-item>
        <el-form-item label="模板名" required prop="name">
          <el-input placeholder="请输入模板名" v-model="templateData.name"></el-input>
        </el-form-item>
        <el-form-item label="组件Id">
          <el-input placeholder="请输入组件ID" v-model="templateData.com_id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size='small' @click="cancleAddTpl">取 消</el-button>
          <el-button size='small' type="primary" @click="confirmAddTpl('templateData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import * as paramQuery from "api/api_act_params";
export default {
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      dialogLoading: false,
      tableData: [],
      queryData: {
        page_size: 20,
        page: 1,
        order: "",
        orderby: "",
        name: ""
      },
      total: 0,
      showSubRoute: false,
      templateData: {
        tpl_id: "", //模板ID
        com_id: "",
        remark: "",
        name: ""
      },
      rules: {
        remark: [
          { required: true, message: '请输入备注说明', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入模板名', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    '$route': function(val) {
      this.showSubRoute = val.name != 'templateList';
      // this.currentRoute = val.name;
    }
  },
  created() {
    this.showSubRoute = this.$route.name != 'templateList';
    if(!this.showSubRoute) {
      this.queryFilterList(true);
    }
    // this.queryFilterList(true);
  },
  methods: {
    queryFilterList(refreshPage) {
      this.listLoading = true;
      paramQuery.queryGetComponentTemplate(this.queryData).then((jsonData) => {
        this.listLoading = false;

        if (jsonData.code == 0) {
          this.tableData = jsonData.data.data;
        }

        if (refreshPage) {
          this.total = jsonData.data.sum * 1;
          this.queryData.page = 1;
        }
      });
    },
    handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    sortTableByColum() {
    },
    editTpl(row) {
      console.log(row);
      this.templateData.tpl_id = row.tpl_id;
      this.templateData.com_id = row.com_id;
      this.templateData.name = row.name;
      this.templateData.remark = row.remark;
      this.dialogVisible = true;
    },
    configTpl(row) {
      location.href = "chaintpl.html" + "?tpl_id=" + row.tpl_id;
    },
    addNewTpl() {
      this.templateData.tpl_id = "";
      this.templateData.com_id = "";
      this.templateData.name = "";
      this.templateData.remark = "";
      this.dialogVisible = true;
    },
    cancleAddTpl() {
      // TODO 恢复对象本来的值
      this.dialogVisible = false;
    },
    confirmAddTpl(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          paramQuery.saveComponentTemplate(this.templateData).then((jsonData) => {
            console.log(jsonData);
            if (jsonData.code == 0) {
              this.$confirm('活动保存成功', '提示').then(() => {
                location.href = "list.html";
              });
            } else {
              this.$confirm('活动保存失败，请重试！', '提示');

            }
          });
        } else {
          return false;
        }
      });
    }

  }
}
</script>







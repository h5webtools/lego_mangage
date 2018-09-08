<template>
  <div>
    <div class="martop20">
      <el-form :inline="true">
        <el-form-item label="关键字：">
          <el-input v-model="queryData.name" placeholder="按关键字查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryFilterList(true)"><i class="glyphicon glyphicon-search"></i>查询</el-button>
          <el-button type="success" @click="addNewCmd('rule')"><i class="glyphicon glyphicon-plus"></i>新增命令字</el-button>
        </el-form-item>
      </el-form>
      <el-table :header-cell-style="{'color': '#333'}" :data="tableData" v-loading="listLoading" stripe border highlight-current-row>
        <el-table-column prop="command" label="命令字号" width="140"></el-table-column>
        <el-table-column prop="name" label="命令字名称" width="240"></el-table-column>
        <el-table-column prop="creator" label="创建人" width="100"></el-table-column>
        <el-table-column prop="type" :formatter="filterCmdTypeText" label="命令字类型" width="200"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="220"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column  label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editCmd(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="ui-mt-20 ui-ta-r">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-size="queryData.page_size" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增/编辑命令字" :visible.sync="dialogVisible">
      <el-form v-loading="dialogLoading" v-if="dialogVisible" ref="commandData" label-width="80px" :rules="rules" :model="commandData">
        <el-form-item label="命令字号" required prop="command">
          <el-input placeholder="数字、介于40020201于40020299之间"  v-model="commandData.command"></el-input>
        </el-form-item>
        <el-form-item label="命令字名" required prop="name">
          <el-input placeholder="命令字名"  v-model="commandData.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input placeholder="命令字描述" v-model="commandData.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelAddCmd">取 消</el-button>
          <el-button type="primary" @click="confirmAddCmd('commandData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import * as paramQuery from "api/api_act_cmds";
export default {
  components: {
    paramQuery
  },
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      dialogLoading: false,
      tableData: [],
      queryData: {
        act_id:"",
        name: "",
        page_size: 20,
        page: 1,
        order: "",
        orderby: ""
      },
      total: 0,
      cmdTypeMap:{
        0:"常规活动",
        1:"乐高专用"
      },
      commandData: {
        command: "",
        name: "",
        remark: "",
        cmd_id:""
      },
      rules: {
        command: [
          { required: true, message: '请输入命令字', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入命令字名字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.queryFilterList(true);
  },
  methods: {
    queryFilterList(refreshPage) {
      this.listLoading = true;
      paramQuery.queryGetCmds(this.queryData).then((jsonData) => {
        this.listLoading = false;
        const _index = (this.queryData.page - 1) * this.queryData.page_size;
        if (refreshPage) {
            // 设置分页展示
            this.total = jsonData.data.length * 1;
            this.queryData.page = 1;
        }
        if (jsonData.code == 0) {
          this.tableData = jsonData.data.splice(_index , this.queryData.page_size);
        }
        
      });
    },
    handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    filterCmdTypeText(row) {
      return this.cmdTypeMap[row.type];
    },
    sortTableByColum() {
    },
    editCmd(row) {
      this.commandData.cmd_id = row.cmd_id;
      this.commandData.command = row.command;
      this.commandData.name = row.name;
      this.commandData.remark = row.remark;
      this.dialogVisible = true;
    },
    addNewCmd() {
      this.commandData.cmd_id = "";
      this.commandData.command = "";
      this.commandData.name = "";
      this.commandData.remark = "";
      this.dialogVisible = true;
    },
    cancelAddCmd() {
      this.dialogVisible = false;
    },
    confirmAddCmd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          paramQuery.savePostCmd(this.commandData).then((jsonData) => {
            if(jsonData.code == 0){
              this.$confirm('活动保存成功', '提示').then(() => {
                  location.reload();
              });
            }else{
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
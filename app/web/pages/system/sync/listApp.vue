<template>
<div>
    <div class="martop20">
      <el-form :inline="true">
        <el-form-item label="关键字：">
          <el-input v-model="queryData.name" placeholder="按关键字查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryFilterList(true)"><i class="glyphicon glyphicon-search"></i>查询</el-button>
          <el-button type="success" @click="addNewSync('rule')"><i class="glyphicon glyphicon-plus"></i>新增配置</el-button>
        </el-form-item>
      </el-form>
      <el-table :header-cell-style="{'color': '#333'}" :data="tableData" v-loading="listLoading" stripe border highlight-current-row>
        <el-table-column prop="syn_id" label="自增加ID" width="100"></el-table-column>
        <el-table-column prop="table_name" label="表名" width="240"></el-table-column>
        <el-table-column prop="db_config" label="DB连接名称"></el-table-column>
        <el-table-column prop="remote_db_config" label="远程DB连接名称" width="200"></el-table-column>
        <el-table-column prop="field" label="同步字段"></el-table-column>
        <el-table-column prop="is_all" :formatter="formatter" label="是否全量"></el-table-column>
        <el-table-column prop="syn_time" label="同步日期"></el-table-column>
        <el-table-column prop="create_time_field" label="创建时间字段"></el-table-column>
        <el-table-column prop="update_time_field" label="更新时间字段"></el-table-column>
        <el-table-column  label="操作" width="240">
          <template slot-scope="scope">
            <el-button @click="editSync(scope.row)" type="text" size="small">编辑</el-button>
            <el-switch active-text="可用" v-model="scope.row.is_syn" active-color="#13ce66"  active-value="1" inactive-value="0" inactive-color="#ff4949" @change="toggleItemStatus(scope.row)">
            </el-switch>
            <el-button @click="toggleTblSyn(scope.row)" type="text" size="small">立即同步</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="ui-mt-20 ui-ta-r">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-size="queryData.page_size" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增/编辑配置" :visible.sync="dialogVisible">
      <el-form v-loading="dialogLoading"  ref="systemData" label-width="150px" :rules="rules" :model="systemData">
        <el-form-item label="表名：" required prop="table_name">
          <el-input placeholder="请输入表名"  v-model="systemData.table_name"></el-input>
        </el-form-item>
        <el-form-item label="DB连接名称：" required prop="db_config">
          <el-input placeholder="请输入db_config"  v-model="systemData.db_config"></el-input>
        </el-form-item>
        <el-form-item label="远程DB连接名称：" required prop="remote_db_config">
          <el-input placeholder="请输入remote_db_config" v-model="systemData.remote_db_config"></el-input>
        </el-form-item>
        <el-form-item label="同步字段：" required prop="field">
          <el-input placeholder="请输入field" v-model="systemData.field"></el-input>
        </el-form-item>
        <el-form-item label="是否全量：" required >
          <el-radio-group style="margin-right:20px;" v-model="systemData.is_all">
            <el-radio :label="'0'">增量</el-radio>
            <el-radio :label="'1'">全量</el-radio>
            <el-radio :label="'2'">手动</el-radio>
          </el-radio-group>
          <!-- <el-input placeholder="请输入is_all" v-model="systemData.is_all"></el-input> -->
        </el-form-item>
        <el-form-item label="同步日期：" required prop="syn_time">
          <el-date-picker v-model="systemData.syn_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          <!-- <el-input placeholder="syn_time" v-model="systemData.syn_time"></el-input> -->
        </el-form-item>
        <el-form-item label="创建时间字段：" required prop="create_time_field">
          <el-input placeholder="请输入create_time_field" v-model="systemData.create_time_field"></el-input>
        </el-form-item>
        <el-form-item label="更新时间字段：" required prop="update_time_field">
          <el-input placeholder="请输入update_time_field" v-model="systemData.update_time_field"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelAddSync">取 消</el-button>
          <el-button type="primary" @click="confirmAddSync('systemData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import * as paramQuery from "api/api_system_sync";
export default {
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
      systemData: {
          table_name:'',
          db_config:'',
          remote_db_config:'',
          field:'',
          is_all:'',
          syn_time:'',
          create_time_field:'',
          update_time_field:''
      },
      rules: {
        table_name: [
          { required: true, message: '请输入表名', trigger: 'blur' }
        ],
        db_config: [
          { required: true, message: '请输入DB连接名称', trigger: 'blur' }
        ],
        remote_db_config: [
          { required: true, message: '请输入远程DB连接名称', trigger: 'blur' }
        ],
        field: [
          { required: true, message: '请输入同步字段', trigger: 'blur' }
        ],
        is_all: [
          { required: true, message: '请输入是否全量，1为全量，0为增量', trigger: 'blur' }
        ],
        syn_time: [
          { required: true, message: '请输入同步日期', trigger: 'blur' }
        ],
        create_time_field: [
          { required: true, message: '请输入创建时间', trigger: 'blur' }
        ],
        update_time_field: [
          { required: true, message: '请输入更新时间', trigger: 'blur' }
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
      paramQuery.getSyncList().then((jsonData) => {
        this.listLoading = false;
        const _index = (this.queryData.page - 1) * this.queryData.page_size;
        if (refreshPage) {
            // 设置分页展示
            this.total = jsonData.data.data.length * 1;
            this.queryData.page = 1;
        }
        if (jsonData.code == 0) {
          this.tableData = jsonData.data.data.splice(_index , this.queryData.page_size);
        }
      });
    },
    handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    editSync(row) {
      console.log(row,'------------row');
      this.systemData.table_name = row.table_name;
      this.systemData.db_config = row.db_config;
      this.systemData.remote_db_config = row.remote_db_config;
      this.systemData.field = row.field;
      this.systemData.is_all = row.is_all;
      this.systemData.syn_time = row.syn_time;
      this.systemData.create_time_field = row.create_time_field;
      this.systemData.update_time_field = row.update_time_field;
      //编辑时要传syn_id
      this.$set(this.systemData,'syn_id',row.syn_id);
      this.dialogVisible = true;
    },
    formatter(row, column){//是否全量映射
      return row.is_all == 0 ? '增量' : (row.is_all == 1 ? '全量' : (row.is_all == 2 ? '手动' : '-'));
    },
    addNewSync() {
      this.systemData.table_name = "";
      this.systemData.db_config = "";
      this.systemData.remote_db_config = "";
      this.systemData.field = "";
      this.systemData.is_all = "";
      this.systemData.syn_time = "";
      this.systemData.create_time_field = "";
      this.systemData.update_time_field = "";
      //新增配置时不需传syn_id
      this.$delete(this.systemData,'syn_id');

      this.dialogVisible = true;
    },
    cancelAddSync() {
      this.dialogVisible = false;
    },
    //修改同步状态
    toggleItemStatus(row) {
      this.$nextTick(() => {
        paramQuery.savePostSync({
          syn_id: row.syn_id,
          is_syn: row.is_syn
        }).then((json) => {
          if (json.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            })
          } else {
            this.$message.error(json.msg);
            // 恢复原来状态
            row.status = row.is_syn == "1" ? "0" : "1";
          }
        })
      })
    },
    toggleTblSyn(row) {//是否立即同步
      this.$nextTick(() => {
        paramQuery.tblSync({
          syn_id: row.syn_id
        }).then((json) => {
          if (json.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            })
          } else {
            this.$message.error(json.msg);
          }
        })
      })
    },
    confirmAddSync(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          paramQuery.savePostSync(this.systemData).then((jsonData) => {
            console.log(jsonData);
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

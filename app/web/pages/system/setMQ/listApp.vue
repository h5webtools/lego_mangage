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
        <el-table-column prop="event_id" label="事件ID" width="100"></el-table-column>
        <el-table-column prop="event_name" label="事件名称" width="240"></el-table-column>
        <el-table-column prop="exchange" label="交换机"></el-table-column>
        <el-table-column prop="routing_key" label="路由Key" width="200"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="update_time" label="更新时间"></el-table-column>
        <el-table-column prop="mq_flag" :formatter="formatter" label="持久化标记"></el-table-column>
        <!-- <el-table-column prop="mq_flag" label="mq_flag"></el-table-column> -->
        <el-table-column  label="操作" width="240">
          <template slot-scope="scope">
            <el-button @click="editSync(scope.row)" type="text" size="small">编辑</el-button>
            <el-switch active-text="可用" v-model="scope.row.status" active-color="#13ce66"  active-value="1" inactive-value="0" inactive-color="#ff4949" @change="toggleItemStatus(scope.row)">
            </el-switch>
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
        <el-form-item label="事件名称:" required prop="event_name">
          <el-input placeholder="请输入事件名称"  v-model="systemData.event_name"></el-input>
        </el-form-item>
        <el-form-item label="交换机:" required prop="exchange">
          <el-input placeholder="请输入交换机"  v-model="systemData.exchange"></el-input>
        </el-form-item>
        <el-form-item label="路由Key:" required prop="routing_key">
          <el-input placeholder="请输入路由Key" v-model="systemData.routing_key"></el-input>
        </el-form-item>
        <el-form-item label="持久化标记" required >
          <el-radio-group style="margin-right:20px;" v-model="systemData.mq_flag">
            <el-radio :label="'0'">常规</el-radio>
            <el-radio :label="'2'">持久化</el-radio>
          </el-radio-group>
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
import * as paramQuery from "api/api_system_mqSet";
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
          event_name:'',
          exchange:'',
          routing_key:'',
          mq_flag:''
      },
      rules: {
        event_name: [
          { required: true, message: '请输入事件名称', trigger: 'blur' }
        ],
        exchange: [
          { required: true, message: '请输入交换机', trigger: 'blur' }
        ],
        routing_key: [
          { required: true, message: '请输入路由Key', trigger: 'blur' }
        ],
        mq_flag: [
          { required: true, message: '请输入持久化标记', trigger: 'blur' }
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
      paramQuery.GetEvent().then((jsonData) => {
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
      this.systemData.event_name = row.event_name;
      this.systemData.exchange = row.exchange;
      this.systemData.routing_key = row.routing_key;
      this.systemData.mq_flag = row.mq_flag;
      //编辑时要传syn_id
      this.$set(this.systemData,'event_id',row.event_id);
      this.dialogVisible = true;
    },
    formatter(row, column){//是否全量映射
      return row.mq_flag == 0 ? '常规' : (row.mq_flag == 2 ? '持久化' : '');
    },
    addNewSync() {
      this.systemData.event_name = "";
      this.systemData.exchange = "";
      this.systemData.routing_key = "";
      this.systemData.status = "";
      this.systemData.mq_flag = "";
      //新增配置时不需传syn_id
      this.$delete(this.systemData,'event_id');

      this.dialogVisible = true;
    },
    cancelAddSync() {
      this.dialogVisible = false;
    },
    //修改同步状态
    toggleItemStatus(row) {
      this.$nextTick(() => {
        paramQuery.AddOrUpdateEvent({
          event_id: row.event_id,
          status: row.status
        }).then((json) => {
          if (json.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            })
          } else {
            this.$message.error(json.msg);
            // 恢复原来状态
            row.status = row.status == "1" ? "0" : "1";
          }
        })
      })
    },
    confirmAddSync(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          paramQuery.AddOrUpdateEvent(this.systemData).then((jsonData) => {
            if(jsonData.code == 0){
              this.$confirm('配置保存成功', '提示').then(() => {
                  location.reload();
              });
            }else{
              this.$confirm('配置保存失败，请重试！', '提示');

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

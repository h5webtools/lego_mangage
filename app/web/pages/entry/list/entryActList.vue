<template>
  <div>
    <div class="martop20">
      <el-table :header-cell-style="{'color': '#333'}" :data="enterListData" v-loading="listLoading" stripe border highlight-current-row>
        <el-table-column prop="act_title" label="页面标题" width="140"></el-table-column>
        <el-table-column prop="act_id" label="活动号" width="100"></el-table-column>
        <el-table-column prop="title" label="主标题" width="100"></el-table-column>
        <el-table-column prop="sub_title" label="副标题" width="100"></el-table-column>
        <el-table-column  label="图标" width="90">
          <template slot-scope="scope">
            <img class="el-table-column__img" :src='scope.row.pic_url' />
          </template>
        </el-table-column>
        <el-table-column prop="act_url" label="跳转地址" width="400"></el-table-column>
        <el-table-column prop="begin_at" label="开始时间" width="150"></el-table-column>
        <el-table-column prop="end_at" label="下线时间" width="150"></el-table-column>
        <el-table-column :formatter="filterActStatus" label="状态" width="70"></el-table-column>
        <el-table-column :formatter="filterEnterLocation" label="位置" ></el-table-column>
      </el-table>
      <div v-show="!listLoading" class="ui-mt-20 ui-ta-r">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-size="queryData.page_size" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as actQuery from "api/api_entry_index";
export default {
  components: {
    
  },
  data() {
    return {
      editorContent:"",
      listLoading: false,
      queryData: {
        page_size: 20,
        page: 1,
      },
      total: 8,
      enterListData:[
      ],
      enterLocation:{
        3:'九宫格',
        32:'大banner',
        10:'1+2',
        9:'轮播',
        0:'icon'
      },
      actStatus:{
        0:'待审核',
        1:'审核通过'
      }
    };
  },
  created() {
    this.queryFilterList(true);
  },
  methods: {
    queryFilterList(refreshPage) {
      actQuery.getEntrancePlanList(this.queryData).then(jsonData => {
        if (jsonData.code == 0) {
          this.listLoading = false;
          const _index = (this.queryData.page - 1) * this.queryData.page_size;
         if (refreshPage) {
            // 设置分页展示
            this.total = jsonData.data.sum * 1;
            this.queryData.page = 1;
          }
          this.enterListData = jsonData.data.data;
        }
      });
    },
    handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    filterEnterLocation(row) {
      return this.enterLocation[row.entrance_type]+'位置'+row.location;
    },
    filterActStatus(row)  {
      return this.actStatus[row.status];
    }
  }
};
</script>


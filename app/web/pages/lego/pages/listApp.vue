<template>
  <div class="martop20">
    <el-form :inline="true" label-width="130px">
      <el-form-item label="活动作者：">
        <el-input placeholder="请输入" v-model="queryData.pageOwner"/>
      </el-form-item>
      <el-form-item label="活动名称：">
        <el-input placeholder="请输入" v-model="queryData.pageName"/>
      </el-form-item>
    </el-form>
    <el-form :inline="true" label-width="130px">
        <el-form-item label="创建日期范围：">
          <el-date-picker
            v-model="queryData.createRange"
            type="daterange"
            value-format="yyyy-mm-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="创建日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动过期时间：">
          <el-date-picker
            v-model="queryData.expireTime"
            type="datetime"
            value-format="yyyy-mm-dd HH:mm:ss"
            placeholder="活动过期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryActPage">查询</el-button>
        </el-form-item>
      </el-form>
    <el-table :data="tableData" empty-text="当前用户暂时没有创建活动" v-loading="listLoading" stripe border highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="150px">
            <el-form-item label="最近修改时间：">
              <span>{{props.row.page_editdate}}</span>
            </el-form-item>
            <el-form-item label="页面过期时间：">
              <span>{{props.row.page_editdate}}</span>
            </el-form-item>
            <el-form-item label="集成测试：">
              <a target="_blank" style="font-size: 14px;font-weight:bold;text-decoration: underline;" class="color-primary" :href="'https://cdnsit.jyblife.com/act/'+props.row.date_folder+'/'+props.row.page_path.replace('https://cdn.jyblife.com/act/pagemaker/', '').replace(/\//, '')+'/index.html?act_id='+(props.row.page_act_id || '')">https://cdnsit.jyblife.com/act/{{props.row.date_folder}}/{{props.row.page_path|filterOldPath}}/index.html</a>
            </el-form-item>
            <el-form-item label="正式环境：">
              <a target="_blank" style="font-size: 14px;font-weight:bold;text-decoration: underline;" class="color-primary" :href="'https://cdn.jyblife.com/act/'+ props.row.date_folder + '/'+ props.row.page_path.replace('https://cdn.jyblife.com/act/pagemaker/', '').replace(/\//, '') + '/'+ 'index.html?act_id='+ (props.row.page_act_id || '')">https://cdn.jyblife.com/act/{{props.row.date_folder}}/{{props.row.page_path|filterOldPath}}/index.html</a>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="page_id" width="80" label="页面ID"></el-table-column>
      <el-table-column prop="page_author" width="100" label="创建人"></el-table-column>
      <el-table-column prop="page_act_id" label="关联活动号"></el-table-column>
      <el-table-column prop="page_name" min-width="180" label="活动名称"></el-table-column>
      <el-table-column prop="page_type" label="模板类型" :formatter="filterPageType"></el-table-column>
      <el-table-column prop="last_save_erp" label="最近修改人"></el-table-column>
      <el-table-column prop="page_createdate" min-width="160" label="页面创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <a target="_blank" class="color-primary" :href="'/public/edit.html?page_id='+ props.row.page_id + '&act_id='+ (props.row.page_act_id || '')">编辑页面</a>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="martop20">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="queryData.pageIndex" :page-size="queryData.pageSize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import * as pageQuery from 'api/api_lego_pages';

export default {
  data() {
    return {
      total: 0,
      queryData: {
        pageIndex: 1,
        pageOwner: window.userInfo.userAccount,
        pageSize: 20,
        pageName: '',
        createRange: '',
        expireTime: ''
      },
      tableData: [],
      listLoading: false,
      pageType: {
        1: '通用模板',
        2: '可分享模板',
        3: '支付模板'
      }
    }
  },
  created() {
    this.queryActPage(true);
  },
  filters: {
    filterOldPath: function(value) {
      return value.replace('https://cdn.jyblife.com/act/pagemaker/', '').replace(/\//, '');
    }
  },
  methods: {
    queryActPage(refresh) {
      this.listLoading = true;
      pageQuery.getActPages(this.queryData).then(json => {
        this.listLoading = false;
        if(json.code == 0) {
          this.tableData = json.data.page_list;
          this.queryData.pageOwner = json.data.current_user;
          if(refresh) {
            this.total = json.data.total_count;
            this.queryData.pageIndex = 1;
          }
        }
      });
    },
    handleCurrentChange(page) {
      this.queryData.pageIndex = page;
      this.queryActPage(false);
    },
    filterPageType(row, column, value) {
      return this.pageType[value];
    }
  }
}
</script>
<template>
  <div>
    <router-view v-if="showSubRoute"></router-view>
    <div v-else class="martop20">
      <el-form :inline="true">
        <el-form-item label="组件关键字：">
          <el-input placeholder="请输入" v-model="queryData.cname"/>
        </el-form-item>
        <el-form-item label="组件类型：">
          <el-select clearable v-model="queryData.ctype">
            <el-option :key="key" v-for="(value, key) in comTypeMap" :value="key" :label="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryByCondition"><i class="glyphicon glyphicon-search"></i>查询</el-button>
          <el-button type="success" @click="addNewCom('rule')"><i class="glyphicon glyphicon-plus"></i>新增组件</el-button>
        </el-form-item>
      </el-form>
      <el-table  :data="tableData" v-loading="listLoading" stripe border highlight-current-row>
        <el-table-column prop="id" label="组件ID" width="90"></el-table-column>
        <el-table-column prop="path_key" label="组件关键字" width="180"></el-table-column>
        <el-table-column prop="tb_name" label="组件名称" width="180"></el-table-column>
        <el-table-column  label="组件缩略图" width="160">
          <template slot-scope="scope">
            <img :src="scope.row.tb_thumb"/>
          </template>
        </el-table-column>
        <el-table-column prop="component_group" :formatter="filterComTypeText" label="组件类型" width="140"></el-table-column>
        <el-table-column prop="create_date" label="创建时间" width="220"></el-table-column>
        <el-table-column prop="edit_date" label="编辑时间" width="220"></el-table-column>
        <el-table-column prop="tb_desc" label="组件描述" width="240"></el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="scope">
            <el-button @click="editCom(scope.row)" type="text">修改组件</el-button>
            <router-link :to="{name:'componentStyleList', params: {componentId:scope.row.id}}">
              <el-button type="text">管理样式</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="martop20">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="queryData.pageIndex" :page-size="queryData.pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog lock-scroll :close-on-click-modal="false" title="新增/编辑组件" :visible.sync="dialogVisible">
      <el-form v-loading="dialogLoading" v-if="dialogVisible" ref="templateData" label-width="80px" :rules="rules" :model="templateData">
        <el-form-item label="名称" required prop="modname">
          <el-input placeholder="建议中文字符"  v-model.trim="templateData.modname"></el-input>
        </el-form-item>
        <el-form-item label="key" required prop="modpathkey">
          <el-input placeholder="建议用小写字母" v-model.trim="templateData.modpathkey"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" required prop="modthumb">
          <el-input placeholder="输入图片地址" v-model.trim="templateData.modthumb"></el-input>
        </el-form-item>
        <el-form-item label="组件类型" required prop="modgroupzu">
          <el-select v-model="templateData.modgroupzu" placeholder="请选择组件类型">
            <el-option v-for="(value, key) in comTypeMap" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组件描述" required prop="moddesc">
          <el-input placeholder="组件描述" v-model.trim="templateData.moddesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancleAddCom">取 消</el-button>
          <el-button type="primary" @click="confirmAddCom('templateData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
  </div>
</template>
<script>
import * as paramQuery from "api/api_lego_component";
export default {
  components: {
    paramQuery
  },
  data() {
    var validateComKey = (rule, value, callback) => {
      var patter = /^[a-z]*$/g;
      if (!patter.test(value)) {
        callback(new Error('key值必须为小写字母'));
      } else {
        callback();
      }
    };
    return {
      listLoading: false,
      dialogVisible: false,
      dialogLoading: false,
      tableData: [],
      showSubRoute: false,
      queryData: {
        pageSize: 20,
        pageIndex: 1,
        order: '',
        orderby: '',
        cname:'',
        ctype: ''
      },
      comTypeMap:{
        '0':'隐藏',
        '1':'外部注册',
        '2':'活动组件',
        '3':'通用组件'
      },
      total: 0,
      templateData: {
        modname: '', //模板ID
        moddesc: '',
        modpathkey: '',
        modthumb:'',
        modgroupzu:'',
        modgroup:0
      },
      rules: {
        modname: [
          { required: true, message: '请输入组件名', trigger: 'blur' }
        ],
        moddesc: [
          { required: true, message: '请输入组件描述', trigger: 'blur' }
        ],
        modpathkey: [
         {required: true, validator: validateComKey,message: '组件key值必须为小写字母组成', trigger: 'blur' }
        ],
        modthumb: [
          { required: true, message: '请输入组件缩略图', trigger: 'blur' }
        ],
        component_group: [
          { required: true, message: '请选择组件分组', trigger: 'blur' }
        ]
        
      }
    }
  },
  watch: {
    '$route': function(val) {
      this.showSubRoute = val.name != 'componentList';
    }
  },
  created() {
    this.showSubRoute = this.$route.name != 'componentList';
    if(!this.showSubRoute) {
      this.queryFilterList(true);
    }
  },
  methods: {
    queryFilterList(refreshPage) {
      this.listLoading = true;
      paramQuery.getAllComponents(this.queryData).then((json) => {
        this.listLoading = false;
        if (json.code == 0) {
          this.tableData = json.data.component_list;
          // 设置分页展示
          if (refreshPage) {
            this.total = json.data.total_count;
            this.queryData.pageIndex = 1;
          }
        } else {
          this.$message.error(json.msg);
        }
      });
    },
    handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    queryByCondition() {
      this.queryData.page = 1;
      this.queryFilterList(true);
    },
    editCom(row) {
      this.templateData.modname = row.tb_name;//
      this.templateData.moddesc = row.tb_desc;//
      this.templateData.modpathkey = row.path_key;//
      this.templateData.modthumb = row.tb_thumb;//
      this.templateData.modgroupzu = String(row.component_group);//
      this.templateData.uniqueid = row.id;//
      this.templateData.modgroup = 0;
      this.dialogVisible = true;
    },
    configComStyle(row){
      location.href = 'stylelist.html'+'?comid='+row.id;
    },
    addNewCom() {
      this.templateData.modname = '';
      this.templateData.moddesc = '';
      this.templateData.modpathkey = '';
      this.templateData.modthumb = '';
      this.templateData.modgroupzu = '';
      this.templateData.modgroup = 0;
      this.templateData.uniqueid = '';
      this.dialogVisible = true;
    },
    cancleAddCom() {
      // TODO 恢复对象本来的值
      this.dialogVisible = false;
    },
    filterComTypeText(row) {
      return this.comTypeMap[row.component_group];
    },
    confirmAddCom(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let isUpdate = !!this.templateData.uniqueid;
          let method = isUpdate ? paramQuery.updateComponent : paramQuery.saveComponent;
          method(this.templateData).then((json) => {
            if(json.code == 0){
              this.$message({
                'message': isUpdate ? '更新组件成功' : '保存组件成功',
                'type': 'success'
              });
              this.queryFilterList(true);
              this.dialogVisible = false;
            }else{
              this.$message.error(json.msg);
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
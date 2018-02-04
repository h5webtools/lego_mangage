<template>
  <div>
    <el-button type="success" @click="addNewCom('rule')"><i class="glyphicon glyphicon-plus"></i>新增样式</el-button>
    <el-table class="martop10" :data="tableData" v-loading="listLoading" stripe border highlight-current-row>
      <el-table-column  label="demo图片" min-width="200">
        <template slot-scope="scope">
          <img width="200px"  :src="scope.row.image"/>
        </template>
      </el-table-column>
      <el-table-column prop="component_id" label="组件ID" width="90"></el-table-column>
      <el-table-column prop="tpl_url" label="样式模板地址" min-width="200">
        <template slot-scope="props">
          <span>{{props.row.tpl_url.replace('http://act.jtjr.com/martpagemaker', '')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="priority" label="优先级" width="100"></el-table-column>
      <el-table-column prop="com_desc" label="组件描述" min-width="140"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" min-width="140"></el-table-column>
      <el-table-column prop="edit_date" label="编辑时间" min-width="140"></el-table-column>
      <el-table-column  label="操作" >
        <template scope="scope">
          <el-button @click="editCom(scope.row)" type="text" size="small">修改样式</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog lock-scroll :close-on-click-modal="false" title="新增/编辑组件样式" :visible.sync="dialogVisible">
      <el-form v-loading="dialogLoading" v-if="dialogVisible" ref="templateData" label-width="130px" :rules="rules" :model="templateData">
        <el-form-item label="模板地址" required prop="tpl_url">
          <el-input placeholder="/template/new/组件key/show.1.html"  v-model="templateData.tpl_url"></el-input>
        </el-form-item>
        <el-form-item label="demo图地址" required prop="image">
          <el-input placeholder="demo图片地址" v-model="templateData.image"></el-input>
        </el-form-item>
        <el-form-item label="描述" required prop="com_desc">
          <el-input placeholder="组件样式功能概要" v-model="templateData.com_desc"></el-input>
        </el-form-item>
        <el-form-item label="优先级" >
          <el-input placeholder="默认100,越小越靠前" v-model="templateData.priority"></el-input>
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
import * as util from "assets/js/util";
export default {
  data() {
    var validateComKey = (rule, value, callback) => {
      var patter = /^[a-z]*$/g;
      if (!patter.test(value)) {
        callback(new Error("key值必须为小写字母"));
      } else {
        callback();
      }
    };
    return {
      listLoading: false,
      dialogVisible: false,
      dialogLoading: false,
      tableData: [],
      comid: "",
      queryData: {
        page_size: 20,
        page: 1,
        order: "",
        orderby: "",
        name: ""
      },
      comTypeMap: {
        0: "隐藏",
        1: "外部注册",
        2: "活动组件",
        3: "通用注册"
      },
      total: 0,
      templateData: {
        image: "", //模板ID
        tpl_url: "",
        com_desc: "",
        id: "",
        priority: ""
      },
      rules: {
        image: [
          { required: true, message: "请输入demo图片地址", trigger: "blur" }
        ],
        tpl_url: [
          { required: true, message: "请输入样式模板地址", trigger: "blur" }
        ],
        com_desc: [
          { required: true, message: "请输入样式描述", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.comid = this.$route.params.componentId;
    this.queryFilterList(false);
  },
  methods: {
    queryFilterList(refreshPage) {
      this.listLoading = true;
      paramQuery.getSelectedComponentStyles(this.comid).then(jsonData => {
        this.listLoading = false;
        this.tableData = jsonData.data;
      });
    },
    handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    editCom(row) {
      this.templateData.id = row.id; //
      this.templateData.com_desc = row.com_desc; //
      this.templateData.image = row.image; //
      this.templateData.priority = row.priority; //
      this.templateData.tpl_url = row.tpl_url; //
      this.templateData.component_id = row.component_id;

      this.dialogVisible = true;
    },
    addNewCom() {
      this.templateData.id = ""; //
      this.templateData.com_desc = ""; //
      this.templateData.image = ""; //
      this.templateData.priority = 100; //
      this.templateData.tpl_url = "/template/new/组件key/show.1.html"; //
      this.templateData.component_id = this.comid;
      this.dialogVisible = true;
    },
    cancleAddCom() {
      // TODO 恢复对象本来的值
      this.dialogVisible = false;
    },
    confirmAddCom(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let isUpdate = !!this.templateData.id;
          let method = isUpdate ? paramQuery.updateComponentStyle : paramQuery.saveComponentStyle
          method(this.templateData).then(json => {
            if (json.code == 0) {
              this.$message({
                'message': isUpdate ? '更新组件样式成功，正在刷新页面内容' : '新增组件样式成功，正在刷新页面内容',
                'type': 'success'
              });
              this.queryFilterList(true);
              this.dialogVisible = false;
            } else {
              this.$message.error(json.msg)
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
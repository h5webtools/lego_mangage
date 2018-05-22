<template>
  <div class="act_params">
    <div class="martop20">
      <el-form :inline="true">
        <el-form-item label="逻辑名：">
          <el-input v-model="queryData.logic_name" placeholder="按逻辑名查询"></el-input>
        </el-form-item>
        <el-form-item label="逻辑代码：">
          <el-input v-model="queryData.logic_code" placeholder="按逻辑代码查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryFilterList(true)">查询</el-button>
          <el-button type="success" @click="addNewRA('rule')"><i class="glyphicon glyphicon-plus"></i>新增规则</el-button>
          <el-button type="success" @click="addNewRA('action')"><i class="glyphicon glyphicon-plus"></i>新增动作</el-button>
        </el-form-item>
      </el-form>
      <el-table @cell-dblclick="modifyCell" @sort-change="sortTableByColum" :data="tableData" v-loading="listLoading" stripe border highlight-current-row>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-button @click="addParam(props.row)" type="success">新增参数</el-button>
            <el-form class="martop20" :inline="true" v-for="(param, index) in props.row.param" :key="index">
              <el-form-item label="参数描述：">
                <el-input v-model="param.p_name" placeholder="参数名"></el-input>
              </el-form-item>
              <el-form-item label="参数名：">
                <el-input v-model="param.p_code" placeholder="参数代码"></el-input>
              </el-form-item>
              <el-form-item label="展示类型：">
                <el-select @change="paramTypeChange(param)" v-model="param.show_type" placeholder="请选择">
                  <el-option v-for="item in typeList" :key="item.name" :label="item.desc" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="param.show_type">
                <el-button @click="closeParamConfig(param)" type="primary" size="mini">{{param.config_show ? "收起详情" : "展开详情"}}</el-button>
              </el-form-item>
              <el-form-item label="是否展示给测试检查：">
                <el-radio-group v-model="param.is_show">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button @click="deleteParam(props.row, param, index)" type="danger" size="mini">删除参数</el-button>
              </el-form-item>
              <keep-alive>
                <component v-loading="param.loading" :validateRule="validateList" :rule="param.rule" :defaultData="param.defaultData" :paramData="param.paramData" @param-save-success="paramSaveSuccess(props.row, param)" v-bind:is="param.show_type" v-if="param.config_show"></component>
              </keep-alive>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="id" label="ID" width="70"></el-table-column>
        <el-table-column prop="name" label="逻辑名" width="250">
          <template slot-scope="props">
            <div v-loading="props.row.name_loading">
              <span v-if="!props.row.name_edit">{{props.row.name}}</span>
              <el-form v-else style="margin-top: 10px;margin-bottom: 10px;">
                <el-form-item style="margin-bottom: 0;">
                  <el-input v-model="props.row.name" placeholder="请输入逻辑名"></el-input>
                </el-form-item>
                <p class="textcenter martop10">
                  <el-button type="success" @click="saveEdit(props.row, 'name')" size="mini">保存</el-button>
                  <el-button type="danger" @click="cancelEdit(props.row, 'name')" size="mini">取消</el-button>
                </p>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="逻辑代码" width="200">
          <template slot-scope="props">
            <div v-loading="props.row.code_loading">
              <span v-if="!props.row.code_edit">{{props.row.code}}</span>
              <el-form v-else style="margin-top: 10px;margin-bottom: 10px;">
                <el-form-item style="margin-bottom: 0;">
                  <el-input v-model="props.row.code" placeholder="请输入逻辑代码"></el-input>
                </el-form-item>
                <p class="textcenter martop10">
                  <el-button type="success" @click="saveEdit(props.row, 'code')" size="mini">保存</el-button>
                  <el-button type="danger" @click="cancelEdit(props.row, 'code')" size="mini">取消</el-button>
                </p>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="params_type" label="参数类型" width="200">
          <template slot-scope="props">
            <div v-loading="props.row.params_type_loading">
              <span v-if="!props.row.params_type_edit">{{props.row.params_type | formatParamType}}</span>
              <el-form v-else style="margin-top: 10px;margin-bottom: 10px;">
                <el-form-item style="margin-bottom: 0;">
                  <el-select placeholder="请选择" v-model="props.row.params_type">
                    <el-option label="数组" value="array"></el-option>
                    <el-option label="对象" value="object"></el-option>
                  </el-select>
                </el-form-item>
                <p class="textcenter martop10">
                  <el-button type="success" @click="saveEdit(props.row, 'params_type')" size="mini">保存</el-button>
                  <el-button type="danger" @click="cancelEdit(props.row, 'params_type')" size="mini">取消</el-button>
                </p>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="逻辑类型" width="200">
          <template slot-scope="props">
            <div v-loading="props.row.type_loading">
              <span v-if="!props.row.type_edit">{{props.row.type | formatLogicType}}</span>
              <el-form v-else style="margin-top: 10px;margin-bottom: 10px;">
                <el-form-item style="margin-bottom: 0;">
                  <el-select placeholder="请选择" v-model="props.row.type">
                    <el-option label="动作" value="action"></el-option>
                    <el-option label="规则" value="rule"></el-option>
                  </el-select>
                </el-form-item>
                <p class="textcenter martop10">
                  <el-button type="success" @click="saveEdit(props.row, 'type')" size="mini">保存</el-button>
                  <el-button type="danger" @click="cancelEdit(props.row, 'type')" size="mini">取消</el-button>
                </p>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="in_use" label="使用/在用" width="200">
          <template slot-scope="props">
            <span>{{props.row.in_use}}/{{props.row.usage_counter}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="create_time" label="创建时间" width="220"></el-table-column>
        <el-table-column prop="creator" label="创建人" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-switch v-model="props.row.status" active-color="#13ce66" active-text="使用" inactive-text="挂起" active-value="0" inactive-value="1" inactive-color="#ff4949" @change="toggleItemStatus(props.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="martop20">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-size="queryData.page_size" div="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增规则/动作" :visible.sync="dialogVisible">
      <el-form v-loading="dialogLoading" label-width="80px" :model="newRuleActionForm">
        <el-form-item label="逻辑名">
          <el-input placeholder="请输入逻辑名" v-model.trim="newRuleActionForm.name"></el-input>
        </el-form-item>
        <el-form-item label="逻辑代码">
          <el-input placeholder="请输入逻辑代码" v-model.trim="newRuleActionForm.code"></el-input>
        </el-form-item>
        <el-form-item label="参数类型">
          <el-select placeholder="请选择参数类型" v-model="newRuleActionForm.params_type">
            <el-option label="数组" value="array"></el-option>
            <el-option label="对象" value="object"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逻辑类型">
          <el-select placeholder="请选择逻辑类型" v-model="newRuleActionForm.type">
            <el-option label="动作" value="action"></el-option>
            <el-option label="规则" value="rule"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddRA">取 消</el-button>
        <el-button type="primary" @click="confirmAddRA">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as paramQuery from "api/api_act_params";
import sselect from "components/form/select.vue";
import scheckbox from "components/form/checkbox.vue";
import sdate from "components/form/date.vue";
import sgroup from "components/form/group.vue";
import sradio from "components/form/radio.vue";
import srange from "components/form/range.vue";
import sinput from "components/form/input.vue";
import sdateRange from "components/form/dateRange.vue";
// import stime from "components/form/time.vue";
import sdatetime from "components/form/datetime.vue";
import sdatetimeRange from "components/form/datetimeRange.vue";

export default {
  components: {
    scheckbox,
    sdate,
    sselect,
    sdateRange,
    sgroup,
    sradio,
    srange,
    // stime,
    sdatetime,
    sdatetimeRange,
    sinput
  },
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      dialogLoading: false,
      validateList: [
        {
          name: '纯数字类型',
          tag: 'integer'
        },
        {
          name: '带小数点的数字',
          tag: 'integer-point'
        },
        {
          name: 'URL',
          tag: "url"
        },
        {
          name: '纯中文',
          tag: 'zh'
        },
        {
          name: '中英文数字',
          tag: 'int-eng-zh'
        },
        {
          name: '纯字符串',
          tag: 'string'
        },
        {
          name: '数字+字符串',
          tag: 'int-string'
        },
        {
          name: "任意类型",
          tag: 'all'
        },
        {
          name: "手机号",
          tag: 'mobile'
        }
      ],
      typeList: [
        {
          name: "sselect",
          desc: "列表"
        },
        {
          name: "scheckbox",
          desc: "复选框"
        },
        {
          name: "sradio",
          desc: "单选框"
        },
        {
          name: "sdate",
          desc: "日期"
        },
        // {
        //   name: "stime",
        //   desc: "时间"
        // },
        {
          name: "sdate-range",
          desc: "日期范围"
        },
        {
          name: "sdatetime",
          desc: "日期时间"
        },
        {
          name: "sdatetime-range",
          desc: "日期时间范围"
        },
        // {
        //     name: "sswitch",
        //     desc: "开关"
        // },
        {
          name: "sinput",
          desc: "文本框"
        },
        {
          name: "srange",
          desc: "文本范围"
        },
        {
          name: "sarray",
          desc: "数组类型"
        },
        {
          name: "sobject",
          desc: "单对象类型"
        },
        {
          name: "sgroup",
          desc: "复杂类型"
        }
      ],
      paramType: {
        "array": "数组",
        "object": "对象",
      },
      logicType: {
        "action": "动作",
        "rule": "规则",
        "hook": "钩子"
      },
      newRuleActionForm: {
        name: "",
        params_type: "",
        type: "",
        code: ""
      },
      tableData: [],
      queryData: {
        logic_name: "",
        logic_code: "",
        logic_type: "",
        param_type: "",
        page_size: 20,
        page: 1,
        order: "",
        orderby: ""
      },
      total: 0
    }
  },
  created() {
    this.queryFilterList(true);
  },
  methods: {
    queryFilterList(refreshPage) {
      this.listLoading = true;
      paramQuery.queryFilterList(this.queryData).then((jsonData) => {
        this.listLoading = false;
        if (jsonData.code == 0) {
          // 为每个元素都添加show_type字段
          debugger;
          this.tableData = jsonData.data.data.map((item) => {
            if (item.param) {
              item.param = item.param.map((param) => {
                if (!param.show_type) {
                  param.show_type = "";
                  param.paramData = [];
                  // 初始化校验对象
                  param.rule = {
                    required: 1,
                    tag: ''
                  };
                  param.defaultData = {};
                } else {
                  let defaultParam = JSON.parse(param.default);
                  param.paramData = JSON.parse(param.val_data);
                  param.defaultData = defaultParam instanceof Array ? {} : defaultParam;
                  // 初始化校验对象
                  param.rule = !param.rule ? {
                    required: 1,
                    tag: ''
                  } : JSON.parse(param.rule);
                }
                param.loading = false;
                param.config_show = false;
                return param;
              })
            } else {
              // 设置默认值
              item.param = [];
            }
            // 双击编辑使用
            item.name_edit = false;
            item.code_edit = false;
            item.type_edit = false;
            item.params_type_edit = false;
            item.name_loading = false;
            item.code_loading = false;
            item.type_loading = false;
            item.params_type_loading = false;
            return item;
          });
          // jsonData.data.data;
          if (refreshPage) {
            // 设置分页展示
            this.total = jsonData.data.sum * 1;
            this.queryData.page = 1;
          }
        }
      });
    },
    handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    sortTableByColum(row) {
      // 选中某列排序
      if (row.prop) {
        this.queryData.orderby = row.prop;
        this.queryData.order = row.order;
      }
    },
    addNewRA(type) {
      this.newRuleActionForm.type = type;
      this.dialogVisible = true;
    },
    cancelAddRA() {
      // TODO 恢复对象本来的值
      this.dialogVisible = false;
    },
    // 保存新增规则动作
    confirmAddRA() {
      if (this.dialogLoading) {
        return;
      }
      this.dialogLoading = true;
      paramQuery.modifyLogicItem(this.newRuleActionForm).then((json) => {
        this.dialogLoading = false;
        if (json.code == 0) {
          // 隐藏dialog
          this.dialogVisible = false;
          // 插入到表格的最前面
          this.tableData.unshift(Object.assign({
            id: json.data.id,
            status: 0,
            in_use: 0,
            usage_counter: 0,
            create_time: json.data.create_time,
            name_edit: false,
            code_edit: false,
            type_edit: false,
            params_type_edit: false,
            name_loading: false,
            code_loading: false,
            type_loading: false,
            params_type_loading: false,
            param: []
          }, this.newRuleActionForm));
          // 清空对象值
          this.newRuleActionForm.name = '';
          this.newRuleActionForm.code = '';
          this.newRuleActionForm.type = '';
          this.newRuleActionForm.params_type = '';
        } else {
          this.$message.error(json.msg);
        }
      }).catch(() => {
        this.dialogLoading = false;
      })
    },
    modifyCell(row, column, cell, event) {
      row[column.property + "_edit"] = true;
      // 当前值保存一份临时变量，用于取消时候的恢复
      row["temp_" + column.property + "_edit"] = row[column.property];
    },
    cancelEdit(row, key) {
      row[key + "_edit"] = false;
      row[key] = row["temp_" + key + "_edit"];
      delete row["temp_" + key + "_edit"];
    },
    // 保存单元格修改
    saveEdit(row, key) {
      // 过滤空格
      const cellValue = row[key].replace(/\s*/g, '');
      if (!cellValue) {
        this.$message.error("内容不能为空");
        return;
      }
      // 保存数据
      row[key + "_loading"] = true;
      const obj = {
        id: row.id,
        type: row.type
      };
      obj[key] = cellValue;
      // 更新数据
      paramQuery.modifyLogicItem(obj).then((json) => {
        row[key + "_loading"] = false;
        if (json.code == 0) {
          // 恢复原来状态
          row[key + "_edit"] = false;
        } else {
          this.$message.error(json.msg);
        }
      }).catch(() => {
        row[key + "_loading"] = false;
      })
    },
    toggleItemStatus(row) {
      this.$nextTick(() => {
        paramQuery.modifyLogicItem({
          id: row.id,
          status: row.status,
          type: row.type
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
    // 切换交互展示类型
    paramTypeChange(param) {
      if (param.show_type) {
        param.config_show = true;
        param.defaultData = {};
      }
    },
    // 收起参数
    closeParamConfig(param) {
      param.config_show = !param.config_show;
    },
    deleteParam(row, param, index) {
      this.$confirm("确定要删除该参数吗？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (param.pid) {
          paramQuery.deleteParamById(param.pid).then((json) => {
            if (json.code == 0) {
              // 删除该行
              row.param.splice(index, 1);
            } else {
              this.$message.error(json.msg);
            }
          })
        } else {
          row.param.splice(index, 1);
        }
      }).catch(() => { console.log("取消删除") });
    },
    addParam(row) {
      row.param.push({
        p_code: "",
        p_name: "",
        show_type: "sinput",
        config_show: true,
        is_show: 1,
        paramData: [],
        defaultData: {},
        rule: {
          required: 1,
          tag: ''
        },
        loading: false,
        pid: "",
        type: row.type == 'action' ? 2 : 1,
        source_id: row.id
      })
    },
    paramSaveSuccess(row, param) {
      param.loading = true;
      if(param.show_type == 'sselect' || param.show_type == 'scheckbox' || param.show_type == 'sradio') {
        param.paramData = param.paramData.filter(param => {
          return param.value && param.key
        })
      }
      paramQuery.saveParamConfig({
        id: param.pid,
        type: param.type,
        source_id: param.source_id,
        name: param.p_name,
        show_type: param.show_type,
        is_show: param.is_show,
        code: param.p_code,
        rule: param.rule || {},
        struct: param.paramData,
        default: param.defaultData || {}
      }).then((json) => {
        param.loading = false;
        if (json.code == 0) {
          this.$message({
            type: "success",
            message: "参数配置保存成功"
          })
          param.config_show = false;
        } else {
          this.$message.error(json.msg);
        }
      }).catch(() => {
        param.loading = false;
      });
    }
    // formatParamType(row) {
    //     return this.paramType[row.params_type];
    // },
    // formatLogicType(row) {
    //     return this.logicType[row.type];
    // }
  },
  filters: {
    formatParamType(key) {
      const paramType = {
        "array": "数组",
        "object": "对象",
      };
      return paramType[key];
    },
    formatLogicType(key) {
      const logicType = {
        "action": "动作",
        "rule": "规则",
        "hook": "钩子"
      }
      return logicType[key];
    }
  }
}
</script>




<template>
  <div>
    <div class="martop20" v-loading="chainLoading">
      <el-form :inline="true">
        <el-form-item label="命令字列表" style="display:none">
          <el-select style="width: 400px;" @change="cmdChange" filterable v-model="cmdData.cmd" placeholder="请选择命令字">
            <el-option-group v-for="cmds in cmdList" :key="cmds.groupName" :label="cmds.groupName">
              <el-option v-for="child in cmds.children" :key="child.cmd_id" :label="child.command" :value="child.command">
                <p v-bind:class="{'dropdown__item--withdata': child.tpl_id != 0}">
                  <span style="float: left">{{ child.command }}</span>
                  <span style="float: right;font-size: 13px; padding-right:25px;">{{ child.name }}</span>
                </p>
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size='small' type="primary" @click="addConfigChain">增加配置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size='small' type="primary" @click="saveConfig">保存配置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size='small' type="primary"  @click="showChainTpl" ><i class="glyphicon glyphicon-export"></i>导出配置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size='small' type="primary" @click="importChainTpl"><i class="glyphicon glyphicon-import"></i>导入配置</el-button>
        </el-form-item>
      </el-form>

      <div class="tree" v-for="(item,index) in chainConfigObj" :key="item.groupName" :label="item.groupName">

          <el-form class="chain-name" :inline="true">
            <el-form-item  label="配置描述：" required >
              <el-input  v-model="item.remark" placeholder="配置功能描述"></el-input>
            </el-form-item>
            <el-form-item  label="命令字：">
              <el-input  v-model="item.cmd" placeholder="命令字"></el-input>
            </el-form-item>
            <el-form-item class="chain-form-item" label="树类型：" required >
              <el-radio-group v-model="item.type">
                <el-radio :label="'2'">内部访问</el-radio>
                <el-radio :label="'1'">常规活动</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item  class="chain-form-item">
              <el-button type="primary" @click="saveConfig">保存配置</el-button>
            </el-form-item> -->
            <el-form-item  >
              <el-button size='small' type="warning"  @click="deleConfig(index)">删除模板</el-button>
            </el-form-item>
          </el-form>

        <ul>
          <li>
            <div class="node start" @click="addTopNode(item)">
              <span class="text-primary" id="tree_root">开始</span>
            </div>
            <tree-node :parentData="item.chains" :editData="item.chains"></tree-node>
          </li>
        </ul>

      </div>

    </div>
    <el-dialog title="新增/编辑参数" :show-close="false" :close-on-click-modal="false" :visible.sync="paramEditVisible">
      <el-tabs :active-name="dialogData.nodeType" type="card" @tab-click="toggleTab">
        <el-tab-pane :disabled="dialogData.lock || dialogData.lockRule" label="规则" name="rule">
          <el-select style="width:100%" @change="ruleActionChange" v-model="dialogData.chainName" filterable :disabled="dialogData.lock" placeholder="请选择规则">
            <el-option v-for="(value, rule) in ruleActionList.rules" :key="rule" :label="value.name + '（'+ rule +'）'" :value="rule">
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane :disabled="dialogData.lock" label="动作" name="action">
          <el-select style="width:100%" @change="ruleActionChange" v-model="dialogData.chainName" filterable :disabled="dialogData.lock" placeholder="请选择动作">
            <el-option v-for="(value, action) in ruleActionList.actions" :key="action" :label="value.name + '（'+ action +'）'" :value="action">
            </el-option>
          </el-select>
        </el-tab-pane>
      </el-tabs>
      <div class="martop10">
        <el-form ref="form" :inline="true">
          <el-form-item label="语义化">
            <el-input style="width:845px;" type="textarea" :rows="3" placeholder="请输入内容" v-model="dialogData.contentDesc" :value="dialogData.contentDesc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="textright martop10" v-if="dialogData.paramDesc.type == 'array'">
        <el-radio-group style="margin-right:20px;" v-model="dialogData.paramsFixed">
          <el-radio :label="1">固定参数</el-radio>
          <el-radio :label="0">不固定参数</el-radio>
        </el-radio-group>
        <el-button @click="addParamGroup" type="success" size="small">新增一组参数</el-button>
      </div>
      <div class="martop10" v-for="(param, index) in dialogData.params" :key="index">
        <el-form v-for="key in Object.keys(param)" :inline="true" :key="key">
          <el-row :gutter="20">
            <el-col :span="6" class="ui-ta-r">
              <el-form-item :label="dialogData.paramDesc.params[key].params.p_name+'（'+ key +'）:'" :required="dialogData.paramDesc.params[key] | getRequired">
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <component :groupIndex="index" :param="param" :paramKey="key" :defaultValue="dialogData.paramDesc.params[key].p_value" :optionList="dialogData.paramDesc.params[key].val_data" :ruleConfig="ruleConfig" :rule="dialogData.paramDesc.params[key].rule" v-if="dialogData.paramDesc.params[key].params.show_type" v-bind:is="dialogData.paramDesc.params[key].params.show_type"></component>
                <el-input v-else v-model="param[key]" placeholder="请输入内容"></el-input>
                <div class="el-form-item__error" style="width: 150%;" :id="key + '_'+ index"></div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否展示：">
                <el-radio-group v-model="dialogData.paramDesc.params[key].is_show">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="textcenter" v-if="dialogData.paramDesc.type == 'array'">
          <el-button type="danger" @click="deleteParamGroup(index)" size="small">删除该组参数
            <i class="glyphicon glyphicon-arrow-up"></i>
          </el-button>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="cancelEdit">取 消</el-button>
        <el-button size='small' type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 展示树的json格式数据 -->
    <el-dialog title="配置树" :visible.sync="chainsTplVisible">
      <el-row>
        <el-col :span="24">
          <pre class="grid-content bg-purple-dark" :id="'chainsTplConfig'" v-html="configTplHTML">

          </pre>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="cancleChainsTpl">取 消</el-button>
        <el-button size='small' type="primary" @click="confirmChainsTpl">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 展示树的json格式数据 -->

    <!-- 展示树的json格式数据 -->
    <el-dialog title="配置树" :visible.sync="chainsImportTplVisible">
      <el-form :model="chainsTplData">
        <el-form-item >
          <el-input  :spellcheck="false"   v-model="chainsTplData.configData" auto-complete="off"  type="textarea" :autosize="{ minRows: 20}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="cancleImportChainsTpl">取 消</el-button>
        <el-button size='small' type="primary" @click="confirmImportChainsTpl">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 展示树的json格式数据 -->

  </div>
</template>
<script>
import * as chainQuery from "api/api_template_chainApp";
import * as util from "assets/js/util";
import treeNode from './treeNode.vue';
import event from 'assets/js/event';

import sinput from 'components/readForm/sinput.vue';
import sselect from 'components/readForm/sselect.vue';
import scheckbox from 'components/readForm/scheckbox.vue';
import sradio from 'components/readForm/sradio.vue';
import srange from 'components/readForm/srange.vue';
import sdate from 'components/readForm/sdate.vue';
import sdatetime from 'components/readForm/sdatetime.vue';
import sdateRange from 'components/readForm/sdateRange.vue';
import sdatetimeRange from 'components/readForm/sdatetimeRange.vue';
import sobject from 'components/readForm/sobject.vue';
import sarray from 'components/readForm/sarray.vue';

export default {
  components: {
    treeNode,
    sinput,
    sselect,
    sdatetime,
    scheckbox,
    sradio,
    srange,
    sdate,
    sdateRange,
    sdatetimeRange,
    sobject,
    sarray
  },
  data() {
    return {
      // tpl_id: location.hash.split('/').pop() || util.getQuery('tpl_id'),
      tpl_id: this.$route.params.tpl_id|| util.getQuery('tpl_id'),
      path: process.env.BASE_API,
      chainLoading: false,
      cmdList: [],
      chainConfigObj:[],
      chainConfig: {},
      tempChainConfig:{},
      ruleActionList: {},
      treeData: {},
      paramEditVisible: false,
      chainsTplVisible: false,
      chainsImportTplVisible: false,
      importChainFlag: false,
      configTplHTML:"当前无数据",
      chainsTplData: {
        configData:""
      },
      cmdData: {
        cmd: '',
        configData: [],
        isEdit: false
      },
      dialogData: {
        lockRule: false,  // 锁定规则不允许点击
        chainName: '',
        lock: false,
        params: [],
        editParams: [],//是否展示
        paramDesc: {},
        nodeType: 'rule',
        contentDesc:'',//语义化
        paramsFixed:0   //是否固定参数
      },
      dialogVisible:false,
      ruleConfig: {
        'integer': {
          regexp: /^\d+$/,
          desc: '纯数字'
        },
        'integer-point': {
          regexp: /^\d+(\.\d+)?$/,
          desc: '带小数点的数字'
        },
        'url': {
          regexp: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
          desc: 'URL地址'
        },
        'zh': {
          regexp: /^[\u4E00-\u9FA5]+$/,
          desc: '纯中文类型'
        },
        'int-eng-zh': {
          regexp: /^[\u4E00-\u9FA5a-zA-Z0-9]+$/,
          desc: '中英文或数字'
        },
        'string': {
          desc: '纯字符串',
          regexp: /^[a-zA-Z]+$/
        },
        'int-string': {
          desc: '数字或字符串',
          regexp: /^[a-zA-Z0-9]+$/
        },
        'all': {
          desc: '任意类型',
          regexp: /.+/
        },
        'mobile': {
          desc: '手机号',
          regexp: /^1[3456789]\d{9}$/
        }
      }
    }
  },
  created() {
    this.tpl_id = this.$route.params.tpl_id || util.getQuery('tpl_id');
    this.getActCmdList().getChainConfig().getRuleAction();
  },
  filters: {
    getRequired: function(obj) {
      return obj.rule && obj.rule.required == 1 ? true : false;
    }
  },
  mounted() {
    event.$on('showParamDialog', this.showEditDialog);
    // 子组件的动作节点绑定事件
    event.$on('delete-subaction-node', this.deleteSubActionNode);
    event.$on('add-subaction-node', this.addNewSubActionNode);
    event.$on('edit-subaction-node', this.editSubActionNode);
    event.$on('add-edit-sign', this.addEditSign);
  },
  methods: {
    importSuccess() {

    },
    exportConfig() {

    },
    addEditSign() {
      this.cmdData.isEdit = true;
    },
    saveConfig() {
      let ruleActionChain = [];
      let saveData = JSON.parse(JSON.stringify(this.chainConfigObj));
      let curChains ;
      let me = this;
      let isOKFlag = true;
      let error = false;
      let isErrorFlag = false;
      /* 循环检测每个是否配置OK */
      saveData.forEach(function(item,index){
        curChains = item.chains;
        if(item.chains.length == 0) {
          me.$message.error('第'+(index+1)+'个树尚未配置规则');
          isOKFlag = false;
        }

        //判断error
        error = item.chains.some((chain) => {
          let hasError = deepFind(chain);
          if (chain.nodeType == 'action') {
            return false;
          } else {
            if(hasError){
              isErrorFlag = true;
              me.$message.error('第'+(index+1)+'个树每一个分支都需要以动作结束');
            }else{

            }
            return hasError;
          }

      })


      });

      if(!isOKFlag || isErrorFlag){
        return;
      }

      saveData.forEach(function(item, index) {
        me.chainLoading = true;
        item.chains.forEach((chain) => {
          convertData(chain, {
            ruleChain: [],
            actionChain: []
          });
        })

        item.chains = ruleActionChain;
        ruleActionChain = [];
      })

      /* 循环检测每个是否配置OK */

        chainQuery.saveComponentTemplateChains({ //saveComponentTemplateChains
          tpl_id: this.tpl_id ,
          data: saveData
        }).then(json => {
          this.chainLoading = false;
          if(json.code == 0) {
            this.$alert('模板' + '规则树配置成功', '提示');
          } else {
            this.$message.error(json.msg);
          }
        }).catch(() => {
          this.chainLoading = false;
        })
      //}

      function getSubAction(json, pushData) {
        let obj = {
          key: json[0].chainName,
          type: json[0].paramType,
          is: '',
          params: json[0].params[0].param
        };
        let ret = [obj];
        if (json[0].params[0].subAction.length > 0) {
          ret = ret.concat(getSubAction(json[0].params[0].subAction));
        }
        return ret;
      }

      function convertData(json, pushData) {
        json.params.forEach(param => {
          if (json.nodeType == 'action') {
            pushData.actionChain.push({
              key: param.chainName || json.chainName,
              type: json.paramType,
              is: '',
              params: param.param,
              editParams: param.editParams,
              contentDesc: param.contentDesc,
              paramsFixed: param.paramsFixed
            });
            if (pushData.actionChain.length == 0 && pushData.ruleChain.length == 0) {
              ruleActionChain.push(pushData);
            } else {
              if (param.subAction.length > 0) {
                pushData.actionChain = pushData.actionChain.concat(getSubAction(param.subAction));
              }
              ruleActionChain.push(pushData);
            }
          } else {
            let MatchparamObj = {
              key: param.chainName || json.chainName,
              type: json.paramType,
              is: 1,
              params: param.param,
              editParams: param.editParams,
              contentDesc: param.contentDesc,
              paramsFixed: param.paramsFixed
            }
            let notmatchparamObj = {
              key: param.chainName || json.chainName,
              type: json.paramType,
              is: 0,
              params: param.param,
              editParams: param.editParams,
              contentDesc: param.contentDesc,
              paramsFixed: param.paramsFixed
            }
            // 拷贝两个对象
            let matchPush = JSON.parse(JSON.stringify(pushData));
            let unmatchPush = JSON.parse(JSON.stringify(pushData));

            param.match.length > 0 && matchPush.ruleChain.push(MatchparamObj);
            param.notmatch.length > 0 && unmatchPush.ruleChain.push(notmatchparamObj);
            param.match.forEach(match => {
              let copyData = JSON.parse(JSON.stringify(matchPush));
              copyData.actionChain = [];
              convertData(match, copyData);
            });
            param.notmatch.forEach(notmatch => {
              let copyData = JSON.parse(JSON.stringify(unmatchPush));
              copyData.actionChain = [];
              convertData(notmatch, copyData);
            });
          }

        })
      }

      function deepFind(json) {
        let exist = false;
        exist = json.params.some((param, index) => {
          if (!param.match.length && !param.notmatch.length) {
            return true;
          } else {
            let subtree = false;
            subtree = param.match.some((match) => {
              if (match.nodeType == 'action') {
                return false;
              } else {
                return deepFind(match);
              }
            })
            if (!subtree && param.notmatch.length) {
              subtree = param.notmatch.some((notmatch) => {
                if (notmatch.nodeType == 'action') {
                  return false;
                } else {
                  return deepFind(notmatch);
                }
              })
            }
            return subtree;
          }
        })
        return exist;
      }
    },
    cmdChange(cmd) {
      if(this.cmdData.cmd == this.cmdData.lastCmd) {
        return;
      }
      if(this.cmdData.isEdit) {
        this.$confirm('确定要切换命令字？当前编辑内容尚未保存，切换后无法恢复！', '提示').then(() => {
          this.cmdData.lastCmd = cmd;
          this.cmdData.configData = this.chainConfig[cmd] || [];
        }).catch(() => {
          this.cmdData.cmd = this.cmdData.lastCmd;
        })
      } else {
        this.cmdData.lastCmd = cmd;
        this.cmdData.configData = this.chainConfig[cmd] || [];
      }
    },
    /**
     * 删除子动作节点
     * @argument
     */
    deleteSubActionNode(parent, deleteNode) {
      if (parent.params) {
        parent.params[0].subAction = [];
      } else {
        parent.subAction = [];
      }
      this.cmdData.isEdit = true;
    },
    /**
     * 增加子动作节点
     * @argument
     *
     */
    addNewSubActionNode() {
      event.$emit('showParamDialog', {
        data: {
          nodeType: 'action'
        },
        lock: false,
        lockRule: true,
      });
    },
    /**
     * 编辑子动作节点的参数
     * @argument
     * */
    editSubActionNode(param) {
      event.$emit('showParamDialog', {
        data: param,
        lock: true
      });
    },
    /**
     * @description 顶级开始节点添加子节点
     *
     * */
    addTopNode(item) {
      this.showEditDialog({
        data: {},
        lock: false
      });
      event.$once("confirm-param-edit", (config) => {
        let exist = item.chains.some((chain) => {
          return chain.chainName == config.chainName;
        });
        if (exist) {
          this.$message.error('已经存在相同名称的节点');
        } else {
          item.chains.push(config);
        }
      });
    },
    showEditDialog(data) {

      if (data.data.id) {
        let saveData = this.treeData[data.data.id].tagData;
        this.dialogData.lock = data.lock;
        this.dialogData.contentDesc = data.data.contentDesc;
        // this.dialogData.paramsFixed = data.data.paramsFixed;
        this.dialogData.chainName = saveData.key;
        this.dialogData.nodeType = saveData.nodeType;
        this.dialogData.editParams = data.data.editParams instanceof Array ? data.data.editParams : [data.data.editParams];
        this.dialogData.paramDesc = this.ruleActionList[this.dialogData.nodeType + 's'][saveData.key];
        for(var i in this.dialogData.editParams[0]){
          this.$set(this.dialogData.paramDesc.params[i],'is_show', this.dialogData.editParams[0][i].is_show);
        }
        this.$set(this.dialogData,'paramsFixed',data.data.paramsFixed);

        this.dialogData.params = data.data.param ? (data.data.param instanceof Array ? data.data.param : [data.data.param]) : [this.generateParam()];
      }
      if (data.data.nodeType) {
        this.dialogData.nodeType = data.data.nodeType;
      }
      this.dialogData.lockRule = data.lockRule || false;
      this.paramEditVisible = true;
    },
    generateParam() {
      let obj = {}, params = this.dialogData.paramDesc.params;
      for (let key in params) {
        let defaultValue = params[key].p_value;
        this.$set(params[key], 'is_show', 1);
        if(defaultValue instanceof Array) {
          obj[key] = '';
        } else if(defaultValue instanceof Object) {
          obj[key] = defaultValue.value;
        } else {
          obj[key] = defaultValue;
        }
      }
      return obj;
    },
    toggleTab(tab) {
      this.dialogData.nodeType = tab.name;
      this.dialogData.chainName = '';
      this.dialogData.params = [];
      this.dialogData.paramDesc = {};
    },
    cancelEdit() {
      // 还原数据
      this.dialogData = {
        chainName: '',
        lock: false,
        params: [],
        editParams: [],
        paramDesc: {},
        contentDesc: '',
        paramsFixed:0,
        nodeType: 'rule'
      }
      this.paramEditVisible = false;
      event.$off('confirm-param-edit');
    },
    validateForm(rule, name, callback) {
      // 循环
      this.dialogData.params.forEach((param, index) => {
        // 发事件通知各自的组件进行表单校验
        event.$once(name+ '-validate-notify-'+ index, (result) => {
          if(!result.pass) {
            document.querySelector('#'+ name + '_'+ index).innerHTML = result.msg;
            // setTimeout(() => {
            //   this.$notify.error({
            //     title: '错误',
            //     message: result.msg
            //   });
            // }, 20);
          } else {
            document.querySelector('#'+ name + '_'+ index).innerHTML = '';
          }
          callback(result.pass);
        });

        event.$emit(name + '-dovalidate-'+ index);
      });
    },
    confirmEdit() {
      // TODO 做表单校验
      if (!this.dialogData.chainName) {
        this.$message.error("请选择规则/动作");
        return;
      }
      // 校验表单类型
      let validator = this.ruleActionList[this.dialogData.nodeType + 's'][this.dialogData.chainName].params,
          hasError = false;
      for(let param in validator) {
        let rule = validator[param].rule;
        if(rule) {
          rule.regexp = rule.tag && this.ruleConfig[rule.tag].regexp;
          this.validateForm(rule, param, (ret) => {
            if(!ret) {
              hasError = true;
            }
          })
        }
      }
      if(hasError) {
        return;
      }
      let id = this.dialogData.id || this.guid();
      let curParamsType = this.dialogData.paramDesc.type;
      let paramsShow = this.dialogData.paramDesc.params;
      // this.dialogData.editParams = this.dialogData.paramDesc.params;
      this.dialogData.editParams = Object.keys(paramsShow).reduce((obj, val) => {
        obj[val] = {
          is_show: paramsShow[val].is_show
        };
        return obj;
      }, {})
      let configObj = {
        chainName: this.dialogData.chainName,
        id: id,
        nodeType: this.dialogData.nodeType,
        paramType: this.dialogData.paramDesc.type,
        params: [
          {
            id: id,
            chainName: this.dialogData.chainName,
            param: curParamsType =='object'?this.dialogData.params[0] : this.dialogData.params,
            editParams: this.dialogData.editParams,
            contentDesc: this.dialogData.contentDesc,
            paramsFixed: this.dialogData.paramsFixed,
            match: [],
            notmatch: [],
            subAction: []
          }
        ]
      }

      // 记录当前节点信息
      this.treeData[id] = {
        tagData: {
          key: this.dialogData.chainName,
          nodeType: this.dialogData.nodeType
        }
      }
      this.cmdData.isEdit = true;
      event.$emit('confirm-param-edit', configObj);
      // 恢复数据原状
      this.cancelEdit();
    },
    addParamGroup() {
      this.dialogData.params.push(this.generateParam());
    },
    deleteParamGroup(index) {
      this.dialogData.params.splice(index, 1);
    },
    ruleActionChange(code) {
      if (this.dialogData.lock) {
        return;
      }
      if (code) {
        let list = this.ruleActionList[this.dialogData.nodeType + 's'];
        this.dialogData.paramDesc = list[code];
        this.dialogData.params = [this.generateParam()];
      }
    },
    getActCmdList() {
      // chainQuery.getCmdList(this.tpl_id).then(json => {
      //   if (json.code == 0) {
      //     // 循环数据分组
      //     let group = [
      //       {
      //         groupName: "已配置数据",
      //         children: []
      //       }, {
      //         groupName: "未配置数据",
      //         children: []
      //       }
      //     ];
      //     json.data.forEach(item => {
      //       if (item.tpl_id != 0) {
      //         group[0].children.push(item);
      //       } else {
      //         group[1].children.push(item);
      //       }
      //     });
      //     this.cmdList = group;
      //   } else {
      //     this.$message.error(json.msg);
      //   }
      // })
      return this;
    },
    getChainConfig() {
      chainQuery.getComponentTemplateChains({tpl_id:this.tpl_id}).then(json => { // getComponentTemplateChains
        if (json.code == 0) {
          this.chainConfig = json.data;

          this.chainConfig = json.data;
          this.tempChainConfig = JSON.stringify(json.data);
          this.convertChainData();
        } else {
          this.$message.error(json.msg);
        }
      });
      return this;
    },
    getRuleAction() {
      chainQuery.getRuleActionList().then(json => {
        if (json.code == 0) {
          this.ruleActionList = json.data;
        } else {
          this.$message.error(json.msg);
        }
      });
      return this;
    },
    // 转换数据未key-id方式
    convertChainData() {
      // let chainType = util.getObjType(this.chainConfig);
      // if (chainType == '[object Object]') {
      //     return;
      // }
      if (this.chainConfig.length == 0) {
          this.chainConfigObj.push({
            chains:[],
            type:2,
            remark:"树功能",
            cmd:""
          });
          return;
      }
      const cmdConfig = {};
      let defaultCmd = '';
      // 循环命令字对象
      for (let cmd in this.chainConfig) {
        let cmdItem = this.chainConfig[cmd].chains,
          editChainIdData = [],
          editChainIdObj = {},
          len = cmdItem.length;
        !defaultCmd && (defaultCmd = cmd);


        cmdConfig[cmd] = [];
        // 循环命令字下面的规则动作列表
        cmdItem.forEach(chain => {
          let ruleList = chain.ruleChain,
            actionList = chain.actionChain,
            uniqId,
            currentLoop,
            tempObj = {};
          tempObj.chainId = chain.chainId;
          // 将规则链保存到该id下
          ruleList.forEach((ruleItem, index) => {
            uniqId = this.guid();
            ruleItem.nodeType = "rule";
            ruleItem.index = index;
            ruleItem.id = uniqId;
            ruleItem.chainId = chain.chainId;
            if (index == 0) {
              tempObj.id = uniqId;
              tempObj.chainName = ruleItem.key;
              tempObj.nodeType = 'rule';
              tempObj.paramType = ruleItem.type;
              tempObj.params = [{
                id: uniqId,
                chainName: ruleItem.key,
                param: ruleItem.params,
                editParams: ruleItem.editParams,
                contentDesc: ruleItem.contentDesc,
                paramsFixed: ruleItem.paramsFixed,
                match: [],
                notmatch: [],
                subAction: []
              }];
              currentLoop = ruleItem.is == 1 ? tempObj.params[0].match : tempObj.params[0].notmatch;
            } else {
              currentLoop.push({
                id: uniqId,
                chainName: ruleItem.key,
                nodeType: 'rule',
                paramType: ruleItem.type,
                params: [{
                  id: uniqId,
                  chainName: ruleItem.key,
                  param: ruleItem.params,
                  editParams: ruleItem.editParams,
                  contentDesc: ruleItem.contentDesc,
                  paramsFixed: ruleItem.paramsFixed,
                  match: [],
                  notmatch: [],
                  subAction: []
                }]
              });
              currentLoop = ruleItem.is == 1 ? currentLoop[currentLoop.length - 1].params[0].match : currentLoop[currentLoop.length - 1].params[0].notmatch;
            }
            // 记录每一个节点的信息
            this.treeData[uniqId] = {
              tagData: ruleItem,
              children: [uniqId]
            };
          })
          // 动作的循环不处理符合不符合，都认为是符合状态
          actionList.forEach((actionItem, index) => {
            uniqId = this.guid();
            if (!currentLoop) {
              tempObj.id = uniqId;
              tempObj.chainName = actionItem.key;
              tempObj.nodeType = 'action';
              tempObj.paramType = actionItem.type;
              tempObj.params = [{
                id: uniqId,
                chainName: actionItem.key,
                param: actionItem.params,
                editParams: actionItem.editParams,
                contentDesc: actionItem.contentDesc,
                paramsFixed: actionItem.paramsFixed,
                match: [],
                notmatch: [],
                subAction: []
              }];
              currentLoop = tempObj.params[0].subAction;
            } else {
              currentLoop.push({
                id: uniqId,
                chainName: actionItem.key,
                nodeType: 'action',
                paramType: actionItem.type,
                params: [{
                  id: uniqId,
                  chainName: actionItem.key,
                  param: actionItem.params,
                  editParams: actionItem.editParams,
                  contentDesc: actionItem.contentDesc,
                  paramsFixed: actionItem.paramsFixed,
                  match: [],
                  notmatch: [],
                  subAction: []
                }]
              });
              currentLoop = currentLoop[currentLoop.length - 1].params[0].subAction;
            }
            actionItem.id = uniqId;
            actionItem.nodeType = "action";
            actionItem.index = index;
            actionItem.chainId = chain.chainId;
            this.treeData[uniqId] = {
              tagData: actionItem,
              children: [uniqId]
            };
          });
          cmdConfig[cmd].push(tempObj);
        });
        // 查找根节点
        this.findRootTree(cmdConfig[cmd], cmd);
      }
      // 默认一个命令字
      this.cmdData.cmd = defaultCmd;
      this.cmdData.lastCmd = defaultCmd;
      this.chainConfigObj = this.chainConfig;
    },
    /**
     * 查找根节点
     * key相同，参数相同的认为是同一个根节点
     * key相同，参数不同，认为是同一个根节点的不同参数
     * key不同，是一个单独的分支
     * @argument
     *
     */
    findRootTree(cmdConfig, cmd) {
      let _this = this, root = [cmdConfig[0]];
      cmdConfig.forEach((config, index) => {
        if (index == 0) {
          return;
        }
        // 依次与root的进行比较
        let findSame = root.some(item => {
          // 节点名称相同
          if (item.chainName == config.chainName) {
            // 参数相同
            if (JSON.stringify(item.params[0].param) == JSON.stringify(config.params[0].param)) {
              // TODO 需要继续查找子节点，直到查找到不同的为止
              // config.params[0].id = item.id;
              // item.params = item.params.concat(config.params);
              item = this.deepCompare(item, config);
              // item.params.push("查找到相同节点");
            } else {
              // 参数不相同
              item.params = item.params.concat(config.params);
            }
            return true;
          }
          return false;
        });
        if (!findSame) {
          root.push(config);
        }
      });
      // 记录每个命令字对应的数据
      this.chainConfig[cmd].chains = root;
    },
    // 合并两条链
    deepCompare(compareA, compareB) {
      if (!compareA.params[0].match.length) {
        compareA.params[0].match = compareB.params[0].match;
      } else {
        compareA.params[0].match.forEach((itemA, index) => {
          let itemB = compareB.params[0].match[index];
          if (itemB) {
            switch (this.doCompare(itemA, itemB)) {
              case 'sameParam':
                // 比较他的下一个
                this.deepCompare(itemA, itemB);
                break;
              case 'differentParam':
                // 合并两个
                itemA.params.push(itemB.params[0]);
                break;
              case 'differentKey':
                compareA.params[0].match.push(compareB.params[0].match[0]);
                break;
            }
          }
        });
      }
      if (!compareA.params[0].notmatch.length) {
        compareA.params[0].notmatch = compareB.params[0].notmatch;
      } else {
        compareA.params[0].notmatch.forEach((itemA, index) => {
          let itemB = compareB.params[0].notmatch[index];
          if (itemB) {
            switch (this.doCompare(itemA, itemB)) {
              case 'sameParam':
                // 比较他的下一个
                this.deepCompare(itemA, itemB);
                break;
              case 'differentParam':
                // 合并两个
                itemA.params.push(itemB.params[0]);
                break;
              case 'differentKey':
                compareA.params[0].notmatch.push(compareB.params[0].notmatch[0]);
                break;
            }
          }
        });
      }
      return compareA;
    },
    doCompare(itemA, itemB) {
      if (itemA.chainName == itemB.chainName) {
        if (JSON.stringify(itemA.params[0].param) == JSON.stringify(itemB.params[0].param)) {
          return 'sameParam';
        } else {
          return 'differentParam';
        }
      } else {
        return 'differentKey';
      }
    },
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4());
    },
    addConfigChain() {
      this.chainConfigObj.push({
          chains:[],
          type:2,
          remark:"",
          cmd:""
      });
    },
    deleConfig(index) {
      this.$confirm('确定要删除该配置树吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.chainConfigObj.splice(index - 0, 1);
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
    },
    showChainTpl() {

      this.importChainFlag = false;
      this.chainsTplData.configData = this.tempChainConfig;

      this.configTplHTML = this.syntaxHighlight(JSON.parse(this.tempChainConfig));


      this.chainsTplVisible = true;

    },
    importChainTpl() {
      this.chainsImportTplVisible = true;
      this.chainsTplData.configData = "";
    },
    confirmImportChainsTpl() {
        this.chainConfig = JSON.parse(this.chainsTplData.configData);
        this.tempChainConfig = this.chainsTplData.configData;
        this.convertChainData();
        this.chainsImportTplVisible = false;
    },
    confirmChainsTpl() {//确定

      this.copyToClipboard(this.tempChainConfig);
      this.importChainFlag = false;
      this.$message("复制数据模板成功!");
      setTimeout(function(){
        me.chainsTplVisible = false;
      } , 2000);
    },
    cancleChainsTpl() {//
      this.chainsTplVisible = false;
    },
    cancleImportChainsTpl() {
      this.chainsImportTplVisible = false;
    },
    copyToClipboard(content) {
      let aux = document.createElement("input");
      aux.setAttribute("value", content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    },
    syntaxHighlight(json) {
      if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
          var cls = 'number';
          if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                  cls = 'key';
              } else {
                  cls = 'string';
              }
          } else if (/true|false/.test(match)) {
              cls = 'boolean';
          } else if (/null/.test(match)) {
              cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
      });
    }

  }
}
</script>

<style lang="scss">
.el-select-dropdown__item {
  &.selected .dropdown__item--withdata {
    color: #fff;
  }
  .dropdown__item--withdata {
    color: #ff2200;
  }
  p {
    color: #333;
  }
}
.tree{
  margin-bottom: 40px;
}
.tree:nth-child(odd){
  background-color: #f1f0f0;;
}
.chain-name{
  margin-top:20px;
  margin-left: 20px;
  width: 100%!important;
}
.chain-form-item{
   margin-left: 20px;
}
#chainsTplConfig{
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
  height: 400px;
  overflow-y:scroll;
}
.string { color: green; }
.number { color: darkorange; }
.boolean { color: blue; }
.null { color: magenta; }
.key { color: red; }


</style>

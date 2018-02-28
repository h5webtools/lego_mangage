<template>
  <div>
    <router-view v-if="showSubRoute"></router-view>
    <div v-else class="martop20">
      <el-form :inline="true" label-width="90px">
        <el-form-item label="活动名：">
          <el-input v-model="queryData.act_name" placeholder="按活动名查询"></el-input>
        </el-form-item>
        <el-form-item label="活动渠道：">
          <el-input v-model="queryData.act_channel" placeholder="按活动渠道查询"></el-input>
        </el-form-item>
        <el-form-item label="活动号：">
          <el-input v-model="queryData.act_id" placeholder="按活动号查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryFilterList(true)">查询</el-button>
          <el-button type="success">
            <router-link :to="{name: 'newAct'}"><i class="glyphicon glyphicon-plus"></i>新增活动</router-link>
          </el-button>
        </el-form-item>
      </el-form>
      <!--
      <el-form :inline="true" label-width="90px">
        <el-form-item label="到期时间：">
          <el-date-picker
            v-model="queryData.expire_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="活动到期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-date-picker
            v-model="queryData.create_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="活动创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="queryData.end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="活动结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryFilterList(true)">查询</el-button>
          <el-button type="success">
            <router-link :to="{name: 'newAct'}"><i class="glyphicon glyphicon-plus"></i>新增活动</router-link>
          </el-button>
        </el-form-item>
      </el-form>
      -->
      <el-table :data="tableData" v-loading="listLoading" stripe border highlight-current-row @expand-change="getOpsLogs">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-button type="primary">
              <router-link :to="{name:'chainEdit', params: {act_id:props.row.act_id, status:props.row.status, is_draft:'1'}}">副本模板 <i class="el-icon-arrow-right"></i></router-link>
            </el-button> 
            <el-button type="primary">
              <router-link :to="{name:'chainEdit', params: {act_id:props.row.act_id, status:props.row.status, is_draft:'0'}}">正式模板 <i class="el-icon-arrow-right"></i></router-link>
            </el-button>
            <p style="font-size: 16px;" class="ui-mt-20 ui-ta-c">更多活动配置信息</p>
            <el-table :data="[props.row]" stripe border highlight-current-row>
              <el-table-column prop="act_channel" label="活动投放渠道" show-overflow-tooltip></el-table-column>
              <el-table-column prop="url" label="活动地址" show-overflow-tooltip min-width="200"></el-table-column>
              <el-table-column prop="create_time" label="创建时间"></el-table-column>
              <el-table-column prop="creator_name" label="创建人"></el-table-column>
            </el-table>
            <p style="font-size: 16px;" class="ui-mt-20 ui-ta-c">关键配置项展示</p>
            <el-table :data="props.row.showList" stripe border highlight-current-row>
              <el-table-column prop="cmd" label="cmd" ></el-table-column>
              <el-table-column prop="code" label="code" ></el-table-column>
              <el-table-column prop="name" label="name" ></el-table-column>
              <el-table-column prop="p_code" label="p_code" ></el-table-column>
              <el-table-column prop="type" label="type" ></el-table-column>
              <el-table-column prop="p_name" label="p_name" ></el-table-column>
              <el-table-column prop="p_value" label="p_value" ></el-table-column>
            </el-table>
            <div style="margin-top:30px;">
                <el-steps direction="vertical" space='80px' :active='1'>
                  <el-step size='small' icon="el-icon-info" :key="index" v-for="(item,index) in logData[props.row.act_id]">
                    <span slot="title">{{item.changeTime+'&emsp;&emsp;'+item.user_name+'&emsp;&emsp;'+item.opt_time}}</span>
                    <span slot="description">{{item.description}}</span>
                  </el-step>
                </el-steps>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="act_id" label="活动号" width="120"></el-table-column>
        <el-table-column prop="crypt" label="加密号" width="120"></el-table-column>
        <el-table-column prop="act_title" show-overflow-tooltip label="活动名"></el-table-column>
        <el-table-column prop="effect_time" label="生效时间"></el-table-column>
        <el-table-column label="过期时间">
          <template slot-scope="props">
            <span v-html="deadlineNotify(props.row)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="活动状态" width="120">
          <template slot-scope="props">
            <b class="color-success">{{filterStatusText(props.row)}}</b>
          </template>
        </el-table-column>
        <el-table-column width="130" label="操作">
          <template slot-scope="props">
            <el-dropdown size="small">
              <span class="el-dropdown-link color-primary" style="font-size:12px;">
                操作菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="{name:'actEdit', params: {act_id:props.row.act_id, status:props.row.status}}">编辑活动</router-link>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <router-link :to="{name:'chainEdit', params: {act_id:props.row.act_id, status:props.row.status,is_draft:1}}">规则配置</router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="deploy" divided>  
                  <div @click="manual(props.row)">同步配置</div>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="props.row.is_lego == '1'">
                  <a v-if="props.row.pageids.length > 0" target="_blank" :href="'/lego/editPage?page_id='+(props.row.page_ids[0] || '')+'&act_id='+props.row.crypt">编辑页面</a>
                  <a v-else target="_blank" :href="'/lego/homePage?act_id='+props.row.crypt">编辑页面</a>
                </el-dropdown-item>
                <!-- 管理员 页面创建者 授权者 可以提交转测试 -->
                <el-dropdown-item  divided v-if="props.row.status==0 && (props.row.creator == userIds || isAdmin ||  props.row.isRevisability)" >  
                   <el-button @click="submitTest(props)" type="primary">转测试</el-button>
                </el-dropdown-item>
                <!-- 测试负责人 可以提交测试结果 -->
                <el-dropdown-item divided v-if="props.row.status==1 && isTester && props.row.isTestOwner"><!-- && userStatus==1  -->
                  <el-button @click="showTestResultDialog(props)" type="primary">提交测试结果</el-button>
                </el-dropdown-item>
                <!-- 管理员 页面创建者 授权者 可以提交审批 -->
                <el-dropdown-item  divided v-if="props.row.status==2 && (props.row.creator == userIds || isAdmin || props.row.isRevisability)" >  
                  <el-button @click="submitApprove(props)" type="primary">提交审批</el-button>
                </el-dropdown-item>
                <!-- 管理员 页面创建者 授权者 可以提交发布 -->
                <el-dropdown-item divided v-if="props.row.status==4 && (props.row.creator == userIds || isAdmin || props.row.isRevisability)">
                  <el-button @click="toPublish(props)" type="primary">发布</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="ui-mt-20 ui-ta-r">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-size="queryData.page_size" div="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
      <el-dialog title="测试结果" :visible.sync="dialogTestResultVisible">
        <el-form :model="testResult" :rules="rules" ref="testResult">
          <el-form-item label="选择测试结果:" required prop="results">
            <el-radio-group v-model="testResult.results">
              <el-radio label="0">测试通过</el-radio>
              <el-radio label="1">测试不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="测试结果说明:">
              <el-input v-model="testResult.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetTestResut('testResult')">暂不提交</el-button>
          <el-button type="primary" @click="submitTestResult('testResult')">确认提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as listQuery from "api/api_act_list";
import * as util from "assets/js/util";
export default {
  data() {
    return {
      queryData: { 
        act_id: '',
        act_name: '',
        act_channel: '',
        start_time: '',
        end_time: '',
        page: 1,
        page_size: 20,
        expire_time: ''
      },
      deploy: window.currentEnv == 'prod' || window.currentEnv == 'uat',      // prod才展示同步配置入口
      opsLogsData:{
        source_id:'',
        type: 0,
        user_id:''
      },
      dialogTestResultVisible:false,
      tempActInfo:"",
      testResult:{
        results:"",
        remark:""
      },
      rules:{
        results:[
          { required: true, message: '请选择测试结果', trigger: 'change' }
        ]
      },
      showSubRoute: false,
      statusMapNew: { //测试以及发布状态
        0: '待测试',
        1: '测试中',
        2: '待审批',
        3: '审批中',
        4: '待发布', // 待审核或者待发布
        5: '已发布',
        6: '测试未通过'
      },
      isAdmin: window.userInfo.iaAdmin, //管理员
      isTester: window.userInfo.isTester, //测试
      isOperator: window.userInfo.isOperator, // 运营
      isDev: window.userInfo.isDev, // 开发
      userIds: userInfo.userid ,  
      tableData: [],
      logData: {},//日志流水
      listLoading: true,
      total: 0
    }
  },
  watch: {
    '$route': function(val) {
      this.showSubRoute = val.name != 'actList';
    }
  },
  created() {
    this.showSubRoute = this.$route.name != 'actList';
    if(!this.showSubRoute) {
      this.queryFilterList(true);
    }
  },
  methods: {
    queryFilterList(refresh) {
      this.listLoading = true;
      listQuery.getActList(this.queryData).then((jsonData) => {
        this.listLoading = false;
        let me = this;
        if (jsonData.code == 0) {
          let tempData = jsonData.data.data;
          tempData.forEach(function(item){
            /* 
            case:当前用户是管理员 或者当前用户是创建者  
            case:当前用户是测试 并且用户是测试负责人
            case:其他
            */
            item.isTestOwner = util.arrayContain(item.tests,me.userIds);
            item.isRevisability = util.arrayContain(item.revisability,me.userIds);
            item.pageids = item.page_ids ? item.page_ids.join("-") : "";
            
          });
          
    
          //tempData.userStatus = 0;
          this.tableData = jsonData.data.data;
          this.timestamp = new Date(jsonData.data.timestamp * 1000);
          if (refresh) {
            // 设置分页展示
            this.total = jsonData.data.sum * 1;
            this.queryData.page = 1;
          }
        }
      });
    },
    //获取日志流水
    getOpsLogs(row, expandedRows){
      this.opsLogsData.source_id = row.act_id;
      let isRequest = expandedRows.some((item,index) => {
        return item.act_id == row.act_id;
      })
      if(!isRequest){ //关闭扩展时不请求数据
        return false;
      }
      if (this.logData[row.act_id]) { //如果请求过数据则不重复请求
        return false;
      }
      //获取日志流水
      listQuery.getOptLogs(this.opsLogsData).then((jsonData) => {
        if(jsonData.code == 0){
          this.$set(this.logData,row.act_id,jsonData.data);
        }
        this.logData[row.act_id].forEach((item,index) => {
          this.logData[row.act_id][index].changeTime = getDateDiff(getDateTimeStamp(item.opt_time))
        })
      });
      //获取活动列表展示参数
      listQuery.getShowList({
        act_id: row.act_id
      }).then((jsonData) => {
        if(jsonData.code == 0){
          this.$set(row,'showList',jsonData.data);
        }
      });
    },
    //手动触发同步配置
    manual(row){
      listQuery.manual({
        act_id: row.act_id
      }).then((jsonData) => {
        if (jsonData.code == 0) {
          this.$alert('同步到集成环境成功');
        } else {
          this.$message.error(json.msg);
        }
      });
    },
    handleCurrentChange(page) {
      this.queryData.page = page;
      this.queryFilterList(false);
    },
    filterStatusText(row) {
      return this.statusMapNew[row.status];
    },
    deadlineNotify(row) {
      let expireDate = new Date(row.expire_time);
      // 1天内的提醒
      if (Math.abs(expireDate - this.timestamp) < 86400000) {
        return row.expire_time + "&nbsp;&nbsp;<span class='textcenter' style='color: #ff2200;'>即将过期</span>"
      } else {
        return row.expire_time;
      }
    },
    submitTest(props) {
      listQuery.updateActStatus({
        act_id:props.row.act_id,
        action:"initiateTest"
      }).then((jsonData) => {
        if(jsonData.code == 0) {
          this.$message({
            message: "转测成功，请通知相关人员测试！",
            type: 'success'
          });
        }
      });

    },
    showTestResultDialog(props) { // 展示
      this.dialogTestResultVisible = true;
      this.tempActInfo = props;
    },
    toPublish(props) { // 发布
      listQuery.updateActStatus({
        act_id:props.row.act_id,
        action:"publish"
      }).then((jsonData) => {
        if(jsonData.code == 0) {
          this.$message({
            message: "发布成功！",
            type: 'success'
          });
        }
      });

    },
    submitApprove(props) {
      listQuery.updateActStatus({
        act_id:props.row.act_id,
        action:"initiateApprove"
      }).then((jsonData) => {
        if(jsonData.code == 0) {
          this.$message({
            message: "提交审批成功，请通知相关人员审批！",
            type: 'success'
          });
        }
      });

    },
    submitTestResult(formName) { //提交测试结果
      this.$refs[formName].validate((valid) => {
          if (valid) {//testResult.results
            //提交
            let _action = "";//remark
            if(this.testResult.results == 0){
              _action = 'passTest';
            }else{
              _action = 'refuseTest';
            }

            listQuery.updateActStatus({
              act_id:this.tempActInfo.row.act_id,
              action:_action,
              remark:this.testResult.remark
            }).then((jsonData) => {
              if(jsonData.code == 0) {
                this.$message({
                  message: "测试结果提交成功！",
                  type: 'success'
                });
              }
            });
            
            this.dialogTestResultVisible = false; 
          } else {
            //有错误
            return false;
          }
        });
    },
    resetTestResut(formName) { //取消提交测试结果
      this.$refs[formName].resetFields();
      this.dialogTestResultVisible = false;
    }
  }
}
function getDateDiff(dateTimeStamp){
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if(diffValue < 0){return;}
	var monthC =diffValue/month;
	var weekC =diffValue/(7*day);
	var dayC =diffValue/day;
	var hourC =diffValue/hour;
  var minC =diffValue/minute;
  var result = '';
	if(monthC>=1){
		result="" + parseInt(monthC) + "月前";
	}
	else if(weekC>=1){
		result="" + parseInt(weekC) + "周前";
	}
	else if(dayC>=1){
		result=""+ parseInt(dayC) +"天前";
	}
	else if(hourC>=1){
		result=""+ parseInt(hourC) +"小时前";
	}
	else if(minC>=1){
		result=""+ parseInt(minC) +"分钟前";
	}else
	result="刚刚";
	return result;
}
function getDateTimeStamp(dateStr){
 return Date.parse(dateStr.replace(/-/gi,"/"));
}
</script>
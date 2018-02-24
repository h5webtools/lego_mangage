<template>
  <div>
  <el-col :span="16" >
    <el-form :model="ruleForm.icon" :rules="rules" :ref="ruleForm.icon" label-width="120px" >
      <el-form-item label="类型" prop="typevalue">
        <el-select v-model="ruleForm.icon.type" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生效时间" prop="begin_at">
        <el-date-picker v-model="ruleForm.icon.begin_at" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="失效时间" prop="end_at">
        <el-date-picker v-model="ruleForm.icon.end_at" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="statusvalue">
        <el-select v-model="ruleForm.icon.status" :formatter="filterCmdTypeText"  placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="mod-icon-title">
        <h4 class="textleft pd-tp-20 actconfig__title">ICON配置</h4>    
        <div class="mod-add-newconfig">
          <el-button type="primary"  class="mt-lt-16 " @click="addNewIconConfig()">新增配置</el-button>  
        </div>
      </div>
      <div class="mod-newconfig-item" v-for="(item ,index) in ruleForm.pictures" :model="item" :rules="rules" :ref="item" :key="item.act_url" :index="index">
        <div class="mod-save-icon">
          <el-button type="primary" class="mt-lt-16" @click="saveIconConfig(index)">保存</el-button>
        </div>
        <div class="mod-delete-icon">
          <el-button type="danger" class="mt-lt-4" @click="deleteIconConfig(index)">删除</el-button>
        </div>
        <el-form-item label="活动号" class="pd-tp-20" style="width:82%">
          <el-input v-model="item.act_id" placeholder="请输入活动号" class="mod-actid-custom"></el-input>
          <el-button type="primary" class="actid-custom__btn" @click="getActInfo(index)">加载配置</el-button>
        </el-form-item>
        <el-form-item label="投放开始时间" prop="begin_at">
          <el-date-picker v-model="item.begin_at" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="投放下线时间" prop="end_at">
          <el-date-picker v-model="item.end_at" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动生效时间">
          <el-date-picker v-model="item.effect_time" :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="活动生效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动过期时间">
          <el-date-picker v-model="item.expire_time" :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="活动过期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动图片" prop="pic_url">
          <el-input v-model="item.pic_url" placeholder="请输入活动图片"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址" prop="act_url">
          <el-input v-model="item.act_url" :disabled="true" placeholder="请通过活动号拉取跳转地址"></el-input>
        </el-form-item>
        <el-form-item label="MTAID" prop="mta_id">
          <el-input v-model="item.mta_id" placeholder="请输入MTAID"></el-input>
        </el-form-item>
        <el-form-item label="适用用户群" >
          <el-select v-model="item.group_id" filterable multiple placeholder="请选择">
            <el-option
              v-for="(item, index) in userGroups"
              :key="index"
              :label="item.name"
              :value="item.group_id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </el-col>
  <el-col :span="8" class="el-col-border"> 
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in ruleForm.pictures" :key="item.act_id">
        <img :src="item.pic_url"/>
      </el-carousel-item>
    </el-carousel>
  </el-col>
  </div>
</template>

<script>
import * as actQuery from 'api/api_entry_index';

let cityOptions  = [];

export default {
  name: 'configIcon',
  components: {

  },
  props: {
    editData: {},
    parentData: {}
  },
  data() {
    return {
      userGroups:[],
      queryDataFlag:false,
      typeOptions: [{
        value: '0',
        label: '跳转'
      }, {
        value: '1',
        label: '浮层'
      }, {
        value: '2',
        label: '强弹'
      }],
      statusOptions:[{
        value: '0',
        label: '失效'
      }, {
        value: '1',
        label: '生效'
      }],
      ruleForm: {
        icon:{
          type:2,
          begin_at:'',
          end_at:'',
          status:1
        },
        pictures:[
          
        ]
      },
      rules: {
        statusvalue:[{
          type: 'text', required: true, message: '请选择展示状态', trigger: 'change'
        }],
        typevalue:[{
          type: 'text', required: true, message: '请选择展示类型', trigger: 'change'
        }],
        begin_at: [
          { type: 'date', required: true, message: '请填写投放日期', trigger: 'change' }
        ],
        end_at: [
          { type: 'date', required: true, message: '请填写下线日期', trigger: 'change' }
        ],
        pic_url: [
          { type: 'text', required: true, message: '请填写图片地址', trigger: 'change' }
        ],
        act_url: [
          {type: 'text', required: true, message: '请填写跳转地址', trigger: 'change' }
        ],
        mta_id:[
          {type: 'text', required: true, message: '请填写mtaid', trigger: 'change' }
        ],
        group_id:[
          {type: 'array', required: true, message: '请至少选择一个用户群', trigger: 'change' }
        ],
        act_id:[
          {type: 'text', required: true, message: '请输入活动号', trigger: 'change' }
        ]
      },
      cmdTypeMap:{
        0:'常规活动',
        1:'乐高专用'
      },
    };
  },
  created() {
    this.queryUserGroupLists();
  },
  methods: {
    urlValidCheck(url) {//检测url
      var envType = location.origin.indexOf('sit')> -1 ? 0 : 1;
      var sitRegExp = /^https:\/\/cdnsit.jyblife.com/,
          productRegExp = /^https:\/\/cdn.jyblife.com/,
          appRegExp = /^jtjr:\/\//;
      if(envType == 0 && (sitRegExp.test(url) || appRegExp.test(url))){
        return true;
      }else if(envType == 1 && (productRegExp.test(url) || appRegExp.test(url))){
        return true;
      }else{
        return false;
      }
    },
    timeValidCheck(beginTime , endTime , effect_time , expire_time) {////检测时间
      if(effect_time && expire_time){//如果时间没有的就不校验
        var startFlag = new Date(beginTime) >= new Date(effect_time),
            endTimeFalg = new Date(endTime) <= new Date(expire_time);
        if(startFlag && endTimeFalg){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    },
    filterCmdTypeText(row) {
      return this.cmdTypeMap[row.value];
    },
    addNewIconConfig:function(){
      this.ruleForm.pictures.push({
        'plan_id': '',
				'entrance_type': '',
				'location': '',
				'begin_at': '',
        'end_at': '',
        'expire_time':'',
        'expire_time':'',
				'status': '',
				'title': '',
				'sub_title': '',
        'pic_url': '',
        'act_id':'',
				'group_id': []
      });
    },
    queryAppIndexData() {//初始化app首页数据
      actQuery.getIconEntranceDetail().then(jsonData => {
        if (jsonData.code == 0) {
          this.queryDataFlag = true;
          this.ruleForm = jsonData.data;
        }
      });
    },
    queryUserGroupLists() { //获取用户群
      if(this.queryDataFlag){
        return;
      }
      actQuery.getUserGroup({
        scope:"operative"
      }).then(jsonData => {
        if(jsonData.code == 0){
          this.userGroups = jsonData.data;
          debugger;
          this.queryAppIndexData();
        }
      });
    },
    getActInfo:function(index){
      let curIconList = this.ruleForm.pictures[index];
      let actId = curIconList.act_id;
      if(!actId){
        this.$message({
          message: '请先填写活动号',
          type: 'warning'
        });
        return false;
      }
      actQuery.getActivityConfig({
        act_id:actId
      }).then(jsonData => {
        if (jsonData.code == 0) {
          this.$message({
            message: '获取活动信息成功',
            type: 'success'
          });
          curIconList.act_url = jsonData.data.act_url;
          curIconList.effect_time = jsonData.data.effect_time;
          curIconList.expire_time = jsonData.data.expire_time;
        }
      });
    },
    saveIconConfig:function(index){
      this.$confirm('确认保存该配置修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let submitData = this.ruleForm.pictures[index];
        if(!submitData.begin_at || !submitData.end_at){
          this.$message({
            type: 'error',
            message: '必须选择投放和下线时间'
          }); 
          return;   
        }
        if(submitData.group_id.length == 0){
          this.$message({
            type: 'error',
            message: '未选择用户群'
          }); 
          return;   
        }
        if(!this.urlValidCheck(submitData.act_url)){
          this.$message({
            type: 'error',
            message: '跳转地址填写有误'
          }); 
          return;     
        }
        if(!this.timeValidCheck(submitData.begin_at , submitData.end_at , submitData.effect_time,submitData.expire_time)){
          this.$message({
            type: 'error',
            message: '投放时间不在活动有效时间段之内'
          }); 
          return;     
        }
        if(submitData.location){
          actQuery.postEntrancePlan(submitData).then(jsonData => {
            if (jsonData.code == 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }
          });
        }else{
          actQuery.putEntrancePlan(submitData).then(jsonData => {
            if (jsonData.code == 0) {
              this.$message({
                message: '增加成功',
                type: 'success'
              });
            }
          });
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消保存'
        });          
      });
    },
    deleteAppointCon:function(index){
      this.ruleForm.pictures.splice(index - 0, 1);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    },
    deleteIconConfig:function(index){
      this.$confirm('确认删除该配置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let submitData = this.ruleForm.pictures[index];
        if(!submitData.plan_id){
          this.deleteAppointCon();
        }else{
          actQuery.deleteEntrancePlan({
            group_id:submitData.group_id,
            plan_id:submitData.plan_id
          }).then(jsonData => {
            if (jsonData.code == 0) {
              this.deleteAppointCon();
            }
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });          
      });
    }
  }
};
</script>


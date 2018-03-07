<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6" class="el-col-border el-col-width">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="mod-icon-banner" @click="configApp('icon', 0)">
              <img src="http://images.jyblife.com//inner/icon_config_40_40.png"/>
            </div>
          </el-col>
        </el-row>
        <div style="height:10px;width:100%;background-color:#f5f5f5;"></div>
        <appIndex v-on:setAppIndexConfig="setAppIndexConfig()" :parentData="{data:appIndexData , flag:0 ,configindex:configIndex, configtype:configType}" :editData="{data:appIndexData , flag:0 ,configindex:configIndex, configtype:configType}"> </appIndex>
      </el-col>
      <el-col :span="17">
          <h3 class="textleft pd-tp-7 actconfig__title" v-if="configFlag && (configFlag!='icon' || configFlag!='slider')">{{configTitle}}</h3>
          <div class="mod-act-manager" v-if="configFlag && configFlag!='icon'">
            <el-button type="primary"  class="mt-lt-16" @click="addNewSubAct">新增候补活动</el-button>
            <el-button type="primary"  class="mt-lt-16" @click="checkSubActs">查看候补活动</el-button>
          </div>
          <el-row :gutter="20" class="mod-actrule mg-tp-20" v-if="configFlag == 'icon'">
            <config-icon></config-icon>
          </el-row>

          <el-tabs v-model="activeUserGroupId" @tab-click="handleClick" v-if="configFlag && (configFlag == 'topbanner' || configFlag == 'oneaddtwo' || configFlag=='slider' || configFlag=='festivalbanner') ">
            <el-tab-pane v-for="(item,index) in userGroups" :index="index" :label="item.name" :name="item.group_id" :key="item.group_id">
                <!-- 当前活动 -->
                <el-row :gutter="20" @click="selectConfig(0 , index)" v-bind:class="[item.configArr.current_entrance.selectedstatus == 1 ? 'mod-actrule  mod-actrule--selected' : 'mod-actrule']"> 
                  <h4 @click="selectConfig(0 , index)" class="textleft actconfig__title">当前活动</h4>
                  <div class="mod-delete-act">
                    <el-button type="primary"  class="mt-lt-16" @click="takeOffCurAct">下架当前活动</el-button>
                  </div>
                  <el-col :span="16" > 
                    <configForm :parentData="{config:item.configArr.current_entrance , configType:configType}" :editData="{config:item.configArr.current_entrance, configType:configType}"></configForm>
                  </el-col>
                  <el-col :span="8" class="el-col-border mod-app-index" v-if="item.configArr.current_entrance.appIndexData">
                    <appIndex style="transform:scale(0.9, 0.9)" :parentData="{data:item.configArr.current_entrance.appIndexData , flag:1, configindex:configIndex, configtype:configType,config:item.configArr.current_entrance}" 
                    :editData="{data:item.configArr.current_entrance.appIndexData , flag:1,configindex:configIndex,configtype:configType,config:item.configArr.current_entrance}"> </appIndex>
                  </el-col>
                </el-row>
                <div style="height:20px;"></div>
                <!-- 当前活动 -->
                <!-- 候补活动 -->
                <template v-for="(waitingItem , watingIndex) in item.configArr.waiting_activity" >
                  <el-row :key="waitingItem.act_id" @click="selectConfig(1,index,watingIndex)" :gutter="20" v-bind:class="[waitingItem.selectedstatus == 1 ? 'mod-actrule  mod-actrule--selected' : 'mod-actrule']">
                    <h4 @click="selectConfig(1,index,watingIndex)" class="textleft actconfig__title">后补活动{{watingIndex+1}}</h4>
                    <div class="mod-delete-act" >
                      <el-button type="primary"  class="mt-lt-16" @click="saveCurAct(1 , waitingItem.plan_id , watingIndex)">保存</el-button>
                      <el-button type="danger" class="mt-lt-16" @click="deleteCurAct(1 , waitingItem.plan_id , watingIndex)">删除该后补活动</el-button>
                    </div>
                    <el-col :span="16" >
                      <configForm :parentData="{config:waitingItem , configType:configType}" :editData="{config:waitingItem , configType:configType}"></configForm>
                    </el-col>
                    <el-col :span="8" class="el-col-border mod-app-index" v-if="waitingItem.appIndexData">
                      <appIndex style="transform:scale(0.9, 0.9)" :parentData="{data:waitingItem.appIndexData , flag:1,configindex:configIndex,configtype:configType,config:waitingItem}" 
                      :editData="{data:waitingItem.appIndexData , flag:1,configindex:configIndex,configtype:configType,config:waitingItem}"> </appIndex>
                    </el-col>
                  </el-row>
                  <div style="height:20px;" :key="waitingItem.act_id+watingIndex+1"></div>
                </template>
                <!-- 候补活动 -->

                <!-- 默认活动 -->
                <el-row @click="selectConfig(2 ,index)" :gutter="20" v-bind:class="[item.configArr.default_activity.selectedstatus == 1 ? 'mod-actrule  mod-actrule--selected' : 'mod-actrule']" > 
                  <h4 @click="selectConfig(2,index)" class="textleft actconfig__title">默认活动</h4>
                  <div class="mod-delete-act" >
                    <el-button type="primary"  class="mt-lt-16" @click="saveCurAct(2 , '' )" v-if="isOperatorAdmin">保存</el-button>
                  </div>
                  <el-col :span="16" >
                    <configForm :parentData="{config:item.configArr.default_activity , configType:configType}" :editData="{config:item.configArr.default_activity , configType:configType}"></configForm>
                  </el-col>
                  <el-col :span="8" class="el-col-border" v-if="item.configArr.default_activity.appIndexData">
                    <appIndex style="transform:scale(0.9, 0.9)" :parentData="{data:item.configArr.default_activity.appIndexData , flag:1,configindex:configIndex,configtype:configType,config:item.configArr.default_activity}" 
                    :editData="{data:item.configArr.default_activity.appIndexData , flag:1,configindex:configIndex,configtype:configType,config:item.configArr.default_activity}"> </appIndex>
                  </el-col>
                </el-row>
                <div style="height:20px;"></div>
                <!-- 默认活动 -->
            </el-tab-pane>
          </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="查看/编辑候补活动" :visible.sync="checkSubActsListVisible">
      <el-table :data="subActsList">
        <el-table-column prop="status" :formatter="filterActType" label="活动类别" width="150"></el-table-column>
        <el-table-column prop="title" label="活动标题" width="200"></el-table-column>
        <el-table-column prop="begin_at" label="生效时间"></el-table-column>
        <el-table-column prop="actaction" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editSpecifyAct(scope)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="新增/编辑候补活动" class="el-dialog__title" :visible.sync="dialogAddSubActVisible">
      <el-form :model="addSubActForm" :SubActFormRules="SubActFormRules" ref="addSubActForm">  
        <el-form-item label="活动号：" :label-width="formLabelWidth">
          <el-input v-model="addSubActForm.act_id" auto-complete="off" style="width:70%"></el-input>
          <el-button type="primary" class="actid-custom__btn" @click="getActInfo(addSubActForm.act_id)">加载配置</el-button>
        </el-form-item>
        <el-form-item label="投放时间：" prop="begin_at" required :label-width="formLabelWidth">
          <el-date-picker v-model="addSubActForm.begin_at" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下线时间：" prop="end_at" required :label-width="formLabelWidth">
          <el-date-picker v-model="addSubActForm.end_at" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item> 
        <el-form-item label="开始时间：" :label-width="formLabelWidth">
          <el-date-picker v-model="addSubActForm.effect_time" :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="活动开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="过期时间：" :label-width="formLabelWidth">
          <el-date-picker v-model="addSubActForm.expire_time" :disabled="true" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="活动过期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动图片：" prop="pic_url" required :label-width="formLabelWidth">
          <el-input v-model="addSubActForm.pic_url" placeholder="请输入活动图片"></el-input>
        </el-form-item>
        <el-form-item label="主标题：" prop="title"  required :label-width="formLabelWidth" v-if="configType==10 || configType==3">
          <el-input v-model="addSubActForm.title" placeholder="请输入活动主标题"></el-input>
        </el-form-item>
        <el-form-item label="副标题：" prop="sub_title" required :label-width="formLabelWidth" v-if="configType==10">
          <el-input v-model="addSubActForm.sub_title" placeholder="请输入活动副标题"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址：" prop="act_url" required :label-width="formLabelWidth">
          <el-input v-model="addSubActForm.act_url" :disabled="true" placeholder="请通过活动号拉取跳转地址" ></el-input>
        </el-form-item>
        <el-form-item label="MTAID" prop="mta_id" required :label-width="formLabelWidth">
          <el-input v-model="addSubActForm.mta_id" placeholder="请输入MTAID"></el-input>
        </el-form-item>
        <el-form-item label="生效用户群：" prop="checkedUserGroups" required :label-width="formLabelWidth">
          <el-checkbox :indeterminate="addSubActForm.isIndeterminate" v-model="addSubActForm.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="addSubActForm.checkedUserGroups" @change="handlecheckedUserGroupsChange">
            <el-checkbox style="width:200px;margin-left:10px;" v-for="(city , index) in userGroups" :label="city.group_id" :class="[(index%3==0) ? 'mg-lt-0' : '']" :index="index" :key="city.group_id">{{city.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddSubActVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSubAct('addSubActForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getQuery } from "assets/js/util";
import * as actQuery from "api/api_entry_index";
import appIndex from './appIndex.vue';
import configForm from './configForm.vue';
import configIcon from './configIcon.vue';
import configSlider from './configSlider.vue';
import Vue from 'vue';

let userGroupOptions  = [];

export default {
  components: {
    appIndex,
    configForm,
    configIcon,
    configSlider
  },
  data() {
    return {
      configFlag:"", //比如：icon:强弹配置
      configIndex:0,  
      configType:"", //类型： 比如九宫格 大图 1+2 轮播图 icon等
      configTitle:"",
      activeUserGroupId: '0', //默认选中
      isOperatorAdmin:userInfo.isOperatorAdmin,
      addSubActForm:{
        plan_type:"",
        plan_id:"",
        entrance_type:"",
        act_id:"",
        begin_at:"",
        end_at:"",
        pic_url:"",
        act_url:"",
        status:"",
        title:"",
        mta_id:"",
        sub_title:"",
        isIndeterminate:true,
        checkAll:false,
        checkedUserGroups:[],
        userGroups:[]
      },
      SubActFormRules: {
        begin_at: [
          { type: 'date', required: true, message: '请选择投放开始时间', trigger: 'change' }
        ],
        end_at: [
          { type: 'date', required: true, message: '请选择投放下线时间', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请填写主标题', trigger: 'change' }
        ],
        sub_title: [
          { required: true, message: '请填写副标题', trigger: 'change' }
        ],
        pic_url: [
          { required: true, message: '请填写活动图片', trigger: 'change' }
        ],
        act_url: [
          { required: true, message: '请填写活动地址', trigger: 'change' }
        ],
        mta_id: [
          { required: true, message: '请填写mtaid', trigger: 'change' }
        ],
        checkedUserGroups:[
          { required: true, message: '请选择用户群', trigger: 'change' }
        ]
      },
      checkSubActsListVisible: false,
      dialogAddSubActVisible: false,
      formLabelWidth: '120px',
      appIndexData:{ //入口信息 九宫格 大banner 1+2区域 轮播区域
        jiugongge:{
          content:[]
        },
        banner:{
          content:[]
        },
        twoAddOne:{
          content:[]
        },
        marquee:{
          content:[]
        }
      },
      userGroups:[],//用户群
      subActsList:[],
      actType:{
        1:'候补活动',
        2:'默认活动'
      }
    };
  },
  created() {
    this.queryAppIndexData(); //初始化app首页数据
    this.queryUserGroupList();//用户群
  },
  methods: {
    filterActType(row)  {
      return this.actType[row.status];
    },
    urlValidCheck(url) {//检测url
      var envType = location.origin.indexOf("sit") > -1 ? 0 : 1;
      var sitRegExp = /^https:\/\/cdnsit.jyblife.com/,
          productRegExp = /^https:\/\/cdn.jyblife.com/,
          appRegExp = /^jtjr:\/\//;
      if(envType == 0 && (sitRegExp.test(url) || appRegExp.test(url))){
        return true;
      }else if(envType == 1 && (productRegExp.test(url) || appRegExp.test(url))){
        return true;
      }else{
        return true;
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
    querySubActsList() {//type index
      actQuery.getEntrancePlanList({
        type:this.configType,
        location:this.configIndex
      }).then(jsonData => {
        if (jsonData.code == 0) {
          this.subActsList = jsonData.data.data;
        }
      });
    },
    queryUserGroupList() { //获取用户群
      actQuery.getUserGroup({
      }).then(jsonData => {
        if (jsonData.code == 0) {
          this.initUserGroupStr(jsonData.data);
        }
      });
    },
    initUserGroupStr(data){
      data.forEach(element => {
        element.configArr = {
          current_entrance:{},
          waiting_activity:[],
          default_activity:{}
        }
      });
      this.userGroups = data;
      userGroupOptions = data;
    },
    queryAppIndexData() {//初始化app首页数据
      actQuery.getEntranceConf().then(jsonData => {
        if (jsonData.code == 0) {
           this.appIndexData = jsonData.data;
        }
      });
    },
    takeOffCurAct() {
      this.$confirm('你确定要下架该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        actQuery.postEntranceShelves({
          type:this.configType , 
          location:this.configIndex , 
          group_id:[this.activeUserGroupId]
        }).then(jsonData => {
          if (jsonData.code == 0) {
            this.$message({
              type: 'success',
              message: '下架成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: jsonData.msg
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下架'
        });          
      });
    },
    saveCurAct(plan_type , plan_id , index) {//保存用户群下的某个活动的修改 传参为：type location groupid plan_type planid 
      this.$confirm('你确定要修改该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         var submitData = {};
        if(plan_type == 1){//候补活动
          submitData = this.curActList.waiting_activity[index];
        }else if(plan_type == 2){//默认活动
          submitData = this.curActList.default_activity;
        }
        if(!submitData.mta_id || !submitData.begin_at || !submitData.end_at || !submitData.act_id || !submitData.act_url || !submitData.pic_url){
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
        submitData.plan_type = 2;
        submitData.group_id = [this.activeUserGroupId];
        submitData.entrance_type = this.configType;
        submitData.location = this.configIndex;
        delete submitData.appIndexData;
        actQuery.postEntrancePlan(submitData).then(jsonData => {
          if (jsonData.code == 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        });          
      });
    },
    deleteCurAct(plan_type , plan_id){// 传参为：type location groupid plan_type planid
      this.$confirm('你确定要删除该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        actQuery.deleteEntrancePlan({
          type:this.configType,
          location:this.configIndex,
          group_id:[this.activeUserGroupId],
          plan_type:plan_type,
          plan_id:plan_id
        }).then(jsonData => {
          if (jsonData.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    submitSubAct(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddSubActVisible = false;
          if(!this.urlValidCheck(this.addSubActForm.act_url)){
            this.$message({
              type: 'info',
              message: '跳转地址填写有误'
            }); 
            return;     
          }
          if(!this.timeValidCheck(this.addSubActForm.begin_at , this.addSubActForm.end_at , this.addSubActForm.effect_time,this.addSubActForm.expire_time)){
            this.$message({
              type: 'info',
              message: '投放时间不在活动有效时间段之内'
            }); 
            return;     
          }
          this.addSubActForm.location = this.configIndex;
          this.addSubActForm.entrance_type = this.configType;
          this.addSubActForm.group_id = this.addSubActForm.checkedUserGroups;
          if(!this.addSubActForm.plan_id){
            actQuery.putEntrancePlan(
              this.addSubActForm
            ).then(jsonData => {
            if (jsonData.code == 0) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }
            });
          }else{
            actQuery.postEntrancePlan(
              this.addSubActForm
            ).then(jsonData => {
            if (jsonData.code == 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }
            });
          }
        } else {
          return false;
        }
      });
    },
    getActInfo(actId) {
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
          var actData = jsonData.data,
              curSubActForm = this.addSubActForm;
          curSubActForm.act_url = actData.act_url;
          curSubActForm.effect_time = actData.effect_time;
          curSubActForm.expire_time = actData.expire_time;
          this.$message({
            message: '获取活动信息成功',
            type: 'success'
          });
        }
      });
    },
    initNewSubAct() {
      this.addSubActForm = {
        plan_type:"",
        plan_id:"",
        entrance_type:"",
        act_id:"",
        begin_at:"",
        end_at:"",
        pic_url:"",
        act_url:"",
        status:"",
        title:"",
        mta_id:"",
        sub_title:"",
        isIndeterminate:true,
        checkAll:false,
        checkedUserGroups:[],
        userGroups:[]
      }
    },
    addNewSubAct() {
      this.initNewSubAct();
      this.dialogAddSubActVisible = true;
    },
    checkSubActs() {
      this.querySubActsList();
      this.checkSubActsListVisible = true;
    },
    editSpecifyAct(scope) {
      this.dialogAddSubActVisible = true;      
      this.checkSubActsListVisible = false;
      Object.assign(this.addSubActForm,scope.row); 
      this.addSubActForm.checkedUserGroups = scope.row.group_id;
      this.addSubActForm.plan_type = scope.row.status;
    },
    selectConfig(flag , index , waitingIndex) {
      var initData = this.userGroups[index].configArr;
      if(flag == 0){//点击的是默认
       initData.current_entrance.selectedstatus = 1;
      }else{
        initData.current_entrance.selectedstatus = 0;
      }
      if(flag == 2){//点击的是默认
        initData.default_activity.selectedstatus = 1;
      }else{
        initData.default_activity.selectedstatus = 0;
      }

      if(flag == 1){
        initData.waiting_activity && initData.waiting_activity.forEach(function(element , index){
          if(index == waitingIndex){
            element.selectedstatus = 1; 
          }else{
            element.selectedstatus = 0; 
          }
        });
      }else{
        initData.waiting_activity && initData.waiting_activity.forEach(function(element , index){
            element.selectedstatus = 0; 
        });
      }

    },
    queryUserGroupConfig(userGroupName , type , index) {
      //获取之后加入到用户群对应的数据中
      actQuery.getEntranceDetail({
        group_id:this.activeUserGroupId,
        type:this.configType,
        location:this.configIndex
      }).then(jsonData => {
        if (jsonData.code == 0) {
          var curData = jsonData.data;
          this.curActList = curData;
          //增加选中态
          this.userGroups.forEach(element => {
            if(element.group_id == this.activeUserGroupId){
              var _appData = JSON.stringify(this.appIndexData);
              element.configArr = curData;
              element.configArr.default_activity.length == 0 ? (element.configArr.default_activity = {}) : "";
              element.configArr.current_entrance.appIndexData = JSON.parse(_appData);
              Vue.set(element.configArr.current_entrance, 'selectedstatus', 1);
              element.configArr.default_activity.appIndexData = JSON.parse(_appData);
              Vue.set(element.configArr.default_activity, 'selectedstatus', 0);
              element.configArr.waiting_activity && element.configArr.waiting_activity.forEach(element => {
                element.appIndexData = JSON.parse(_appData);
                Vue.set(element, 'selectedstatus', 0);
              });
            }else{
              element.configArr = {
                current_entrance:{
                },
                waiting_activity:[],
                default_activity:{
                }
              }
            }
          });
        }
      });
    },
    handleCheckAllChange(val) {
      var checkedArr = [];
      userGroupOptions.forEach(element => {
        checkedArr.push(element.group_id);
      });
      this.addSubActForm.checkedUserGroups = val ? checkedArr : [];
      this.addSubActForm.isIndeterminate = false;
    },
    handlecheckedUserGroupsChange(value) {
      // let checkedCount = value.length;
      // console.log(checkedCount , this.userGroups.length);
      // this.addSubActForm.checkAll = checkedCount === this.userGroups.length;
      // this.addSubActForm.isIndeterminate = checkedCount > 0 && checkedCount < this.userGroups.length;
    },
    handleClick(tab, event) {
      this.queryUserGroupConfig();
    },
    initConfigTitle() { //初始化配置标题
      var configIndex = this.configIndex+1;
      var typeToDesc = {
        icon:"icon配置",
        topbanner:"顶部banner"+ configIndex +"配置",
        slider:"轮播位置"+configIndex+"配置",
        festivalbanner:"重大节日配置",
        oneaddtwo:"1+2配置"+configIndex
      }
      this.configTitle = typeToDesc[this.configFlag];
    },
    configApp:function(configFlag , configIndex , configType){
      this.configFlag = configFlag;
      this.configIndex = configIndex;
      this.configType = configType;
      this.initConfigTitle();
    },
    showDefaultTabConfig() {//展示默认的
      var firstTab = document.querySelector('#tab-1');
      firstTab && firstTab.click();
    },
    setAppIndexConfig(){ //appIndex子组件的事件
      this.appIndexData.configFlag; //
      this.configFlag = this.appIndexData.configFlag; //当前配置flag
      this.configIndex = this.appIndexData.configIndex;
      this.configType = this.appIndexData.configType;
      this.initConfigTitle();
      this.showDefaultTabConfig();
    },
  }
};
</script>


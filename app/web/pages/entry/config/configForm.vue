<template>
  <el-form :model="parentData.config" :rules="rules"  label-width="120px" > 
    <el-form-item label="活动号" prop="act_id">
      <el-input v-model="parentData.config.act_id" placeholder="请输入活动号" class="mod-actid-custom"></el-input>
      <el-button type="primary" class="actid-custom__btn" @click="getActInfo(parentData.config.act_id)">加载配置</el-button>
    </el-form-item>
    <el-form-item label="主标题" required="" prop="title" v-if="parentData.configType==10 || parentData.configType==3">
      <el-input v-model="parentData.config.title" placeholder="请输入主标题">{{parentData.configType}}</el-input>
    </el-form-item>
    <el-form-item label="副标题" required="" prop="sub_title" v-if="parentData.configType==10">
      <el-input v-model="parentData.config.sub_title" placeholder="请输入副标题"></el-input>
    </el-form-item>
    <el-form-item label="投放开始时间" required="" prop="begin_at" v-if="parentData.config.act_type != 2">
      <el-date-picker v-model="parentData.config.begin_at" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择生效时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="投放下线时间" required="" prop="end_at" v-if="parentData.config.act_type != 2">
      <el-date-picker v-model="parentData.config.end_at" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择下线时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="活动生效时间">
      <el-date-picker v-model="parentData.config.effect_time" :disabled="true" type="datetime" placeholder="活动生效时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="投放过期时间">
      <el-date-picker v-model="parentData.config.expire_time" :disabled="true" type="datetime" placeholder="活动过期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="活动图片" required="" prop="pic_url">
      <el-input v-model="parentData.config.pic_url" placeholder="请输入活动图片"></el-input>
    </el-form-item>
    <el-form-item label="跳转地址" required="" prop="act_url">
      <el-input v-model="parentData.config.act_url" :disabled="true" placeholder="请通过活动号拉取跳转地址"></el-input>
    </el-form-item>
    <el-form-item label="MTAID" required="" prop="mta_id">
      <el-input v-model="parentData.config.mta_id" placeholder="请输入MTAID"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { getQuery } from "assets/js/util";
import * as actQuery from "api/api_entry_index";
export default {
  name: "configForm",
  components: {

  },
  props: {
    editData: {},
    parentData: {}
  },
  data() {
    return {
      rules: {
        act_id: [
          { required: true, message: '请输入活动号', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入主标题', trigger: 'change' }
        ],
        sub_title: [
          { required: true, message: '请输入副标题', trigger: 'change' }
        ],
        begin_at: [
          { type: 'date', required: true, message: '请选择投放开始时间', trigger: 'change' }
        ],
        end_at: [
          { type: 'date', required: true, message: '请选择投放下线时间', trigger: 'change' }
        ],
        pic_url: [
          { required: true, message: '请填写图片地址', trigger: 'change' }
        ],
        act_url: [
          { required: true, message: '请填写跳转地址', trigger: 'change' }
        ],
        mta_id: [
          { required: true, message: '请填写mtaid', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    
  },
  methods: {
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
          this.$message({
            message: '获取活动信息成功',
            type: 'success'
          });
          this.parentData.config.act_url = jsonData.data.act_url;
          this.parentData.config.effect_time = jsonData.data.effect_time;
          this.parentData.config.expire_time = jsonData.data.expire_time;
        }
      });
    }
  }
};
</script>


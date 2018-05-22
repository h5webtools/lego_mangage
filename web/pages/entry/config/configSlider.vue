<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" >
    <el-form-item label="是否展示" prop="name">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="最小版本" prop="name">
      <el-input v-model="ruleForm.name" placeholder="输入兼容的最低app版本"></el-input>
    </el-form-item>
    <el-form-item label="最大版本" prop="name">
      <el-input v-model="ruleForm.name" placeholder="输入兼容的最高app版本"></el-input>
    </el-form-item>
    
    <div class="mod-icon-title">
      <h4 class="textleft pd-tp-20 actconfig__title">轮播配置</h4>    
      <div class="mod-add-newconfig">
        <el-button type="primary"  class="mt-lt-16 " @click="addSlider()">新增轮播配置</el-button>  
      </div>
    </div>
    <div class="mod-newconfig-item" v-for="item in editData.len" :key="item">
      <div class="mod-delete-icon">
        <el-button type="danger" class="mt-lt-16" >删除该配置</el-button>
        <i class="el-icon-arrow-up" title="上移"></i>
        <i class="el-icon-arrow-down" title="下移"></i>
      </div>
      <el-form-item label="活动号" prop="name" class="pd-tp-20" style="width:82%">
        <el-input v-model="ruleForm.name" placeholder="请输入活动号" class="mod-actid-custom"></el-input>
        <el-button type="primary" class="actid-custom__btn">加载配置</el-button>
      </el-form-item>
      <el-form-item label="投放开始时间" prop="name">
        <el-date-picker v-model="ruleForm.date1" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="投放下线时间" prop="name">
        <el-date-picker v-model="ruleForm.date1" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动图片" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入活动图片"></el-input>
      </el-form-item>
      <el-form-item label="跳转地址" prop="name" >
        <el-input v-model="ruleForm.name" placeholder="请输入跳转地址"></el-input>
      </el-form-item>
      <el-form-item label="MTAID" prop="name" >
        <el-input v-model="ruleForm.mtaid" placeholder="请输入MTAID"></el-input>
      </el-form-item>
      <el-form-item label="适用用户群" prop="name">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "configSlider",
  components: {

  },
  props: {
    editData: {},
    parentData: {}
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '展示'
      }, {
        value: '选项2',
        label: '强制展示'
      }, {
        value: '选项3',
        label: '强制不展示'
      }],
      value: '',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  created() {},
  methods: {
    addSlider:function(){
      this.editData.len += 1;
    }
  }
};
</script>


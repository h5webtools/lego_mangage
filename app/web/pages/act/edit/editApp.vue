<template>
  <div>
    <el-row class="martop20" v-loading="editLoading">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" class="form-group-wrap">
        <h3 class="textcenter">活动基本信息</h3>
        <el-form class="form-group" ref="form" :rules="actInfoRule" label-width="110px" :model="actInfo">
          <el-form-item label="活动名称：" required prop="act_title">
            <el-input v-model="actInfo.act_title" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="上线时间：" required prop="effect_time">
            <el-date-picker
              v-model="actInfo.effect_time" 
              type="datetime" 
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择上线的日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="过期时间：" required prop="expire_time">
            <el-date-picker
              v-model="actInfo.expire_time"
              type="datetime" 
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择过期的日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker
              v-model="actInfo.end_time"
              type="datetime" 
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择活动结束的日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="校验类型：" required prop="code_type">
            <el-select v-model="actInfo.code_type" placeholder="请选择活动校验类型" class="full-form-item">
              <el-option
                v-for="item in validateOptions"
                :key="item.value"
                :label="item.key"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动类型：" required >
            <el-radio-group v-model="actInfo.is_inner">
              <el-radio label="1">内部运营活动</el-radio>
              <el-radio label="0">外部推广活动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开发类型：" required prop="is_lego">
            <el-radio-group v-model="actInfo.is_lego">
              <el-radio label="1">乐高搭建</el-radio>
              <el-radio label="0">人工开发</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="测试负责人：">
            <el-select v-model="actInfo.tests" multiple filterable placeholder="请选择该活动的测试人员,默认别少,可选多人" class="full-form-item">
              <el-option
                v-for="(item,index) in testersList" 
                :key="index"
                :label="item.user_name"
                :value="item.user_id">
                <span style="float: left">{{ item.user_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; padding-right:25px;">{{ item.user_account }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="活动链接：" prop="act_url">
            <el-input v-model="actInfo.act_url" placeholder="请输入活动跳转链接"></el-input>
          </el-form-item>
          <el-form-item label="活动关联红包：">
            <el-select v-model="actInfo.coupons" multiple filterable placeholder="请选择活动关联红包" class="full-form-item">
              <el-option
                v-for="item in relatedCoupons"
                :key="item.cid"
                :label="item.name"
                :value="item.cid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授权人列表：">
            <el-select v-model="actInfo.revisability" multiple filterable placeholder="请选择可修改此活动配置的用户" class="full-form-item">
              <el-option
                v-for="(item,index) in enableEditUsers"
                :key="index"
                :label="item.user_name"
                :value="item.user_id">
                <span style="float: left">{{ item.user_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; padding-right:25px;">{{ item.user_account }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动描述：">
            <el-input v-model="actInfo.act_content" type="textarea" placeholder="活动简要描述"></el-input>
          </el-form-item>

          <el-form-item label="乐高pageID：" >
            <el-input v-model="actInfo.pageids" placeholder="多个pageid以'-'隔开"></el-input>
          </el-form-item>
          <el-form-item label="乐高活动规则：" >
            <div id="editorElem"></div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" class="form-group-wrap">
          <h3 class="textcenter">活动成本信息</h3>
          <el-form class="form-group" :rules="actInfoRule" ref="costForm" label-width="140px" :model="actInfo">
            <el-form-item label="成本计算类型：">
              <el-select v-model="actInfo.cost_type" placeholder="请选择" class="full-form-item">
                <el-option
                  v-for="item in costTypeOptions"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="红包成本计算规则：" v-if="actInfo.cost_type==1">
              <el-form :inline="true">
                <el-form-item>
                  <el-input v-model="actInfo.coupon_amount" placeholder="请输入红包金额"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="actInfo.coupon_cost_rule" placeholder="请输入红包计算公式"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="countCost" size="small" class="martop10">计算成本</el-button>
              <span>{{countResult}}</span>
            </el-form-item>
            <el-form-item label="用户成本计算类型：" v-if="actInfo.cost_type==1||actInfo.cost_type==2">
              <el-select v-model="actInfo.user_cost_type" placeholder="请选择" class="full-form-item">
                <el-option
                  v-for="item in userCostType"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户成本计算规则：" v-if="actInfo.cost_type==1||actInfo.cost_type==2">
              <el-input v-model="actInfo.per_user_cost" placeholder="请输入用户成本计算规则"></el-input>
            </el-form-item>
            <el-form-item label="所属渠道：" required prop="business_channel">
            <el-select v-model="actInfo.business_channel" filterable placeholder="请选择活动渠道">
              <el-option
                v-for="item in channelList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-button size="small" type="primary" @click="addNewChannel">新增渠道</el-button>
            <el-form :inline="true" class="martop10" v-if="isAddChannel">
              <el-form-item>
                <el-input v-model="channelAdd.channel" placeholder="请输入渠道名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="saveNewChannel" size="small" type="success">保存</el-button>
                <el-button @click="isAddChannel = false" size="small" type="danger">关闭</el-button>
              </el-form-item>
            </el-form>
          </el-form-item>
            <el-form-item label="负责人：">
              <el-input v-model="actInfo.optor" placeholder="请输入活动负责人"></el-input>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
    <div class="martop20 textcenter" v-if="actInfo.status != 4">
      <el-button type="primary" @click="saveEdit" size="large">提交配置</el-button>
    </div>
  </div>
</template>

<script>
import * as actQuery from 'api/api_act_edit'
import * as util from 'assets/js/util'
import E from 'wangeditor'

export default {
  data() {
    return {
      originEffectTime: '',
      originExpireTime: '',
      editor: {}, //编辑器
      editorContent: '',
      validateOptions: [
        {
          key: '图形验证码',
          value: '1'
        },
        {
          key: '短信验证码',
          value: '2',
        },
        {
          key: '签名',
          value: '3'
        },
        {
          key: '登录',
          value: '4'
        },
        {
          key: '不校验',
          value: '5'
        }
      ],
      costTypeOptions: [
        {
          key: '合作方采购活动',
          value: '1'
        },
        {
          key: '合作方非采购活动',
          value: '2'
        },
        {
          key: '内部拉新活动',
          value: '3'
        },
        {
          key: '运营活动',
          value: '4'
        },
        {
          key: '运营自动化',
          value: '5'
        },
        {
          key: '产品成本',
          value: '6'
        },
        {
          key: '客服活动',
          value: '7'
        },
        {
          key: '其他活动',
          value: '8'
        }
      ],
      userCostType: [
        {
          key: '按新增付费用户人数计算',
          value: '1'
        },
        {
          key: '按红包领取人数计算',
          value: '2'
        },
        {
          key: '按新注册用户人数计算',
          value: '3'
        }
      ],
      channelList: [],
      editLoading: false,
      relatedCoupons: [], // 关联红包列表
      enableEditUsers: [], // 可编辑人员列表
      testersList: [], // 测试人员列表
      countResult: '', // 成本计算结果
      isAddChannel: false, // 是否新增渠道
      ajaxLock: false, // 防止重复请求
      channelAdd: {
        channel: '',
      },
      actInfo: {
        is_inner: '1', // 活动类型（是否是内部活动）
        is_lego: '', //是否是乐高搭建
        act_title: '', // 活动名
        effect_time: '', // 上线时间
        expire_time: '', // 过期时间
        end_time:'', //活动结束时间
        code_type: '', // 活动校验类型
        act_url: '', // 活动链接
        act_content: '', // 活动描述文案
        cost_type: '', // 成本计算类型
        user_cost_type: '', // 用户成本计算类型
        per_user_cost: '', // 单用户成本计算规则
        business_channel: '', // 活动所属渠道
        optor: '', // 活动负责人
        act_id: '', // 活动号
        revisability: '', // 可编辑活动人员
        tests: [], // 测试负责人
        coupons: '', // 活动关联红包
        pageids: '', // 对应的乐高ID
        status: '', // 当前活动状态
        rule_description: '' // 乐高对应活动规则
      },
      actInfoRule: {
        act_title: [
          {
            required: true,
            message: '请输入活动名',
            trigger: 'blur'
          }
        ],
        effect_time: [
          {
            type: 'string',
            required: true,
            pattern: /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/,
            message: '请选择开始时间',
            trigger: 'change'
          }
        ],
        expire_time: [
          {
            type: 'string',
            required: true,
            pattern: /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/,
            message: '请选择结束时间',
            trigger: 'change'
          }
        ],
        code_type: [
          {
            required: true,
            message: '请选择活动校验规则',
            trigger: 'blur'
          }
        ],
        is_lego: [
          {
            required: true,
            message: '请确认是否由乐高搭建页面',
            trigger: 'change'
          }
        ],
        business_channel: [
          {
            required: true,
            message: '请选择活动渠道',
            trigger: 'change'
          }
        ]
      }
    };
  },
  created() {
    let act_id = this.$route.params.act_id || ''
    act_id && this.getActDetail(act_id);
    this.getCouponList()
      .getUserList()
      .getChannelList()
      .getTestEngineer();
  },
  mounted() {
    this.editor = new E("#editorElem");
    // 'code',  // 插入代码 'emoticon',  // 表情
    this.editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'undo', // 撤销
      'redo' // 重复
    ];
    this.editor.customConfig.onchange = html => {
      this.actInfo.rule_description = html;
    };
    this.editor.create();
  },
  methods: {
    // 获取活动详情
    getActDetail(act_id) {
      this.editLoading = true;
      actQuery
        .getActDetail({
          act_id
        })
        .then(json => {
          this.editLoading = false;
          if (json.code == 0) {
            this.actInfo = json.data;
            this.actInfo.pageids = json.data.page_ids && json.data.page_ids.join("-");
            this.editor.txt.html(this.actInfo.rule_description);
            this.originEffectTime = this.actInfo.effect_time;
            this.originExpireTime = this.actInfo.expire_time;
          } else {
            this.$message.error(json.msg);
          }
        })
        .catch(() => {
          this.editLoading = false;
        });
    },
    // 获取关联红包列表
    getCouponList() {
      actQuery.getRelatedCouponList().then(jsonData => {
        if (jsonData.code == 0) {
          this.relatedCoupons = jsonData.data;
        } else {
          this.$message.error(jsonData.msg);
        }
      });
      return this;
    },
    // 获取用户列表
    getUserList() {
      actQuery.getEnableEditUsersList().then(jsonData => {
        if (jsonData.code == 0) {
          jsonData.data.forEach(element => {
            element.user_id += ''; 
          });
          this.enableEditUsers = jsonData.data;
        } else {
          this.$message.error(jsonData.msg);
        }
      });
      return this;
    },
    //获取测试人员列表
    getTestEngineer() {
      actQuery.getTestEngineer().then(jsonData => {
        if (jsonData.code == 0) {
          this.testersList = jsonData.data;
        } else {
          this.$message.error(jsonData.msg);
        }
      });
      return this;
    },
    getChannelList() {
      actQuery.getChannelList().then(json => {
        if (json.code == 0) {
          this.channelList = json.data;
        } else {
          this.$message.error(json.msg);
        }
      });
      return this;
    },
    HTMLDecode(text) { 
      var temp = document.createElement('div'); 
      temp.innerHTML = text; 
      var output = temp.innerText || temp.textContent; 
      temp = null; 
      return output; 
    },
    saveEdit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (!this.actInfo.business_channel) {
            this.$message.error('请选择活动展示渠道');
            return;
          }
          this.editLoading = true;
          let submitInfo = Object.assign({}, this.actInfo);
          // 格式化时间
          submitInfo.page_ids = this.actInfo.pageids
            ? this.actInfo.pageids.split("-")
            : [];

          delete submitInfo.pageids;
          actQuery
            .saveActConfig(submitInfo)
            .then(json => {
              this.editLoading = false;
              if (json.code == 0) {
                this.$confirm('活动配置保存成功', '提示').then(() => {
                  if (
                    new Date(submitInfo.expire_time).getTime() !=
                      new Date(this.originExpireTime).getTime() ||
                    new Date(submitInfo.effect_time).getTime() !=
                      new Date(this.originEffectTime).getTime()
                  ) {
                    this.$confirm(
                      '活动开始时间和结束时间已改变，请通知开发或到乐高系统重新发布活动规则',
                      '提示',
                      {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }
                    )
                      .then(() => {
                      })
                      .catch(() => {});
                  } else {
                    // 跳转到活动列表
                    this.$router.push('/act');
                  }
                });
              } else {
                this.$message.error(json.msg);
              }
            })
            .catch(e => {
              this.editLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    countCost() {
      if (!this.actInfo.coupon_cost_rule || !this.actInfo.coupon_amount) {
        this.$message.error('信息未填写完整');
        return;
      }
      let rule = this.actInfo.coupon_cost_rule.replace(
        /#m#/g,
        this.actInfo.coupon_amount
      );
      this.countResult = rule + '=' + eval(rule);
    },
    addNewChannel() {
      this.isAddChannel = true;
    },
    saveNewChannel() {
      let channelName = this.channelAdd.channel.replace(/\s*/g, '');
      if (!this.channelAdd.channel) {
        this.$message.error('请输入渠道名称');
        return;
      }
      if (this.ajaxLock) {
        return;
      }
      this.ajaxLock = true;
      // 保存渠道数据
      actQuery
        .setChannelList(this.channelAdd)
        .then(jsonData => {
          this.ajaxLock = false;
          if (jsonData.code == 0) {
            this.$message({
              message: '保存成，已添加至列表',
              type: 'success'
            });
            // 在列表里新增一条
            this.channelList.unshift(this.channelAdd.channel);
            // 清空输入
            this.channelAdd.channel = ''
          } else {
            this.$message.error(jsonData.msg);
          }
        })
        .catch(() => {
          this.ajaxLock = false;
        });
    }
  }
};
</script>
<style lang="scss">
  .el-select-dropdown{
    z-index: 10002 !important;
  }
  .el-message-box__wrapper{
    z-index: 10002 !important;
  }
  .w-e-text-container{
    z-index: 1000 !important;
  }
</style>


<template>
  <div class="grid-content bg-purple mg-tp-10 mg-bt-10" >

    <!-- 九宫格配置 实际是4*n -->
    <el-row :gutter="20" v-if="editData.data">
      <el-col :span="6" v-for="(item,index) in editData.data.jiugongge.content" :key="index">
        <div class="up-banner" :index="index"  @click="setAppIndexConfig('topbanner' , index , editData.data.jiugongge.type)">
          <img :src="item.pic_url"/>
        </div>
        <span class="up-banner__desc">{{item.title}}</span>
      </el-col>
    </el-row>
    <!-- 九宫格配置 实际是4*n -->

    <div style="height:10px;width:100%;background-color:#f5f5f5;"></div>
    
    <!-- 重大节日 -->
    <el-row :gutter="24" class="mg-tp-10" v-if="editData.data">
      <el-col :span="24"  v-for="(item,index) in editData.data.banner.content" :key="index">
        <div class="festival-banner" @click="setAppIndexConfig('festivalbanner' , index , editData.data.banner.type)">
          <img :src="item.pic_url" />
        </div>
      </el-col>
    </el-row>
    <!-- 重大节日 -->

    <div style="height:10px;width:100%;background-color:#f5f5f5;"></div>

    <!-- 1+2 -->
    <el-row :gutter="20" class="mg-tp-10" v-if="editData.data">
      <el-col :span="12" v-for="(item,index) in editData.data.twoAddOne.content" :key="index" v-if="index==0">
        <div class="one-inthree-left" @click="setAppIndexConfig('oneaddtwo' , index , editData.data.twoAddOne.type)">
          <dl class="one-inthree__title pd-tp-5">     
            <dt>{{item.title}}</dt>     
            <dd>{{item.sub_title}}</dd>    
          </dl>
          <img :src="item.pic_url"/>
        </div>
      </el-col>
      
      <el-col :span="12">
        <el-row :gutter="24" v-for="(item,index) in editData.data.twoAddOne.content" :key="index" v-if="index>0">
          <el-col :span="24">
            <div class="one-inthree-right" @click="setAppIndexConfig('oneaddtwo' , index , editData.data.twoAddOne.type)">
              <dl class="one-inthree__title">     
                <dt>{{item.title}}</dt>     
                <dd>{{item.sub_title}}</dd>    
              </dl>
              <img :src="item.pic_url"/>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 1+2 -->

    <!-- 轮播图 -->
    <el-row :gutter="20" class="mg-tp-10"  v-if="editData.flag == 0 && editData.data">
      <el-col :span="24">
        <div class="block">
          <el-carousel  height="150px">
            <el-carousel-item v-for="(item,index) in editData.data.marquee.content" :key="index" >
              <img @click="setAppIndexConfig('slider' , index , editData.data.marquee.type)" :src="item.pic_url"/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <!-- 轮播图 -->

  </div>
</template>

<script>
export default {
  name: "appIndex",
  components: {
  },
  props: {
    editData: {},
    parentData: {}
  },
  data() {
    return {
      typeDesc:{
        '3':'jiugongge',
        '22' : 'banner',
        '10' : 'twoAddOne',
        '9' : 'marquee'
      }
    };
  },
  created() {
    if(this.editData.flag == 1){
      var curData = this.editData.data;
      if(curData && curData[this.typeDesc[this.editData.configtype]] && (curData[this.typeDesc[this.editData.configtype]].content)){
        curData[this.typeDesc[this.editData.configtype]].content[this.editData.configindex] = this.editData.config;
      }
    }
  },
  methods: {
    setAppIndexConfig(configFlag , index , type ){
      var _parentData = this.parentData.data;
      _parentData.configFlag = configFlag;
      _parentData.configIndex = index;
      _parentData.configType = type;
      this.$emit('setAppIndexConfig')
    }
  }
};
</script>
<style lang="scss">
.up-banner__desc{
  font-size: 13px;
  line-height: 1.6;
  color: #333;
}

.one-inthree__title{
  font-size: 13px;
  line-height: 1.6;
  color: #333;
}

</style>

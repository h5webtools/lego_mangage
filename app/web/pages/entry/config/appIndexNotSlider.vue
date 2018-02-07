<template>
  <div class="grid-content bg-purple mg-tp-10 mg-bt-10" >
    <!-- 顶部4 -->
    <el-row :gutter="20" >
      <el-col :span="6">
        <div class="up-banner"  @click="setAppIndexConfig('topbanner' , 0)">
          <img src="http://mat.jtjr99.com/static/style/app/publish/img/yunying/app41_banner/20160927/red.png"/>
        </div>
        <span class="up-banner__desc">我的红包</span>
      </el-col>
      <el-col :span="6">
        <div class="up-banner">
          <img src="http://mat.jtjr99.com/static/style/app/publish/img/yunying/app41_banner/20160927/dh.png"/>
        </div>
        <span class="up-banner__desc">我的红包</span>
      </el-col>
      <el-col :span="6">
        <div class="up-banner">
          <img src="http://mat.jtjr99.com/static/style/app/publish/img/yunying/app41_banner/20160927/xshd.png"/>
        </div>
        <span class="up-banner__desc">我的红包</span>
      </el-col>
      <el-col :span="6">
        <div class="up-banner">
          <img src="http://mat.jtjr99.com/static/style/app/publish/img/yunying/app41_banner/20160927/ptsj.png"/>
        </div>
        <span class="up-banner__desc">我的红包</span>
      </el-col>
      <el-col :span="6">
        <div class="up-banner">
          <img src="http://mat.jtjr99.com/static/style/app/publish/img/yunying/app41_banner/20160927/ptsj.png"/>
        </div>
        <span class="up-banner__desc">我的红包</span>
      </el-col>
    </el-row>
    <!-- 顶部4 -->
    <div style="height:10px;width:100%;background-color:#f5f5f5;"></div>
    <!-- 重大节日 -->
    <el-row :gutter="24" class="mg-tp-10">
      <el-col :span="24">
        <div class="festival-banner">
          <img src="https://images.jyblife.com/act/201712/sd/big.png" />
        </div>
      </el-col>
    </el-row>
    <!-- 重大节日 -->

    <div style="height:10px;width:100%;background-color:#f5f5f5;"></div>

    <!-- 1+2 -->
    <el-row :gutter="20" class="mg-tp-10">
      <el-col :span="12">
        <div class="one-inthree-left">
          <dl class="one-inthree__title pd-tp-5">     
            <dt>新年加薪</dt>     
            <dd>领8888元红包</dd>    
          </dl>
          <img src="https://images.jyblife.com/index/Life_2%2B1/%E6%83%A0%E4%BA%AB%E7%94%9F%E6%B4%BB%E5%8C%BA1%E5%B7%A6%E4%BE%A7%E5%A4%A7%E5%9B%BE564x270.png"/>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="one-inthree-right">
              <dl class="one-inthree__title">     
                <dt>新年加薪</dt>     
                <dd>领8888元红包</dd>    
              </dl>
              <img src="https://images.jyblife.com/act/yunying/xugou/x.png"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="pd-tp-5">
          <el-col :span="24">
            <div class="one-inthree-right">
              <dl class="one-inthree__title">     
                <dt>新年加薪</dt>     
                <dd>领8888元红包</dd>    
              </dl>
              <img src="https://images.jyblife.com/act/201710/10yuepingtai/1.png"/>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 1+2 -->

    <!-- 轮播图 -->
    <el-row :gutter="20" class="mg-tp-10">
      <el-col :span="24">
        <div class="block">
          <el-carousel @click="setAppIndexConfig('slider' , 0)" height="150px">
            <el-carousel-item v-for="item in 8" :key="item">
              <img  @click="setAppIndexConfig('slider' , 0)" src="//img30.360buyimg.com/mcoss/jfs/t10885/253/2632354608/16114/144bf87a/59facc0fNf4a65086.jpg.webp"/>
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
      
    };
  },
  created() {},
  methods: {
    setAppIndexConfig(configFlag , index){
      this.parentData.configFlag = configFlag;
      this.parentData.configIndex = index;
      this.$emit('setAppIndexConfig')
    }
  }
};
</script>


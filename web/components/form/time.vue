<template>
    <div class="operate-wrap">
        <p class="desc-text">选择具体的时间（时分秒），可选默认值</p>
        <el-form-item label="选择默认值：">
            <el-time-picker
                v-model="selectedValue"
                placeholder="选择任意时间点">
            </el-time-picker>
        </el-form-item>
        <div class="textcenter">
            <el-button type="primary" @click="saveParamConfig">保存参数配置</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: "stime",
    props: {
        defaultData: {
            type: Object
        }
    },
    data() {
        return {
            selectedValue: ""
        }
    },
    methods: {
        saveParamConfig() {
            this.$emit("param-save-success");
        }
    }
}
</script>
<template>
    <div class="operate-wrap">
        <p class="desc-text">选择日期和时间，可以选择默认值</p>
        <el-form-item label="设置默认值：">
            <el-date-picker
                v-model="formatDate.datetime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="是否必填：">
			<el-radio-group v-model="rule.required">
				<el-radio :label="1">必填项</el-radio>
				<el-radio :label="0">非必填项</el-radio>
			</el-radio-group>
		</el-form-item>
        <div class="textcenter">
            <el-button type="primary" @click="saveParamConfig">保存参数配置</el-button>
        </div>
    </div>
</template>
<script>
import * as util from "assets/js/util";
export default {
    name: "sdatetime",
    props: {
        defaultData: {
            type: Object
        },
        rule: {
			type: Object
		},
		validateRule: {
			type: Array
		}
    },
    data() {
        return {
            formatDate: {
                datetime: this.defaultData.value ? new Date(this.defaultData.value) : ""
            }
        }
    },
    methods: {
        saveParamConfig() {
            this.defaultData.value = this.formatDate.datetime ? util.parseTime(this.formatDate.datetime, "{y}/{m}/{d} {h}:{i}:{s}") : "";
            this.$emit("param-save-success");
        }
    }
}
</script>
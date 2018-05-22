<template>
    <div class="operate-wrap">
        <p class="desc-text">日期类型，选择一个具体日期<br/>1、如果有默认值则输入默认之后保存；<br/>2、没有默认值则直接点击保存按钮保存参数。</p>
        <el-form-item label="默认值（可选）：">
            <el-date-picker
            v-model="formatDate.date"
            type="date"
            placeholder="选择默认日期">
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
    name: "sdate",
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
                date: this.defaultData.value ? new Date(this.defaultData.value) : ""
            }
        }
    },
    methods: {
        saveParamConfig() {
            this.defaultData.value = this.formatDate.date ? util.parseTime(this.formatDate.date, "{y}/{m}/{d}") : "";
            this.$emit("param-save-success");
        }
    }
}
</script>
<template>
    <div class="operate-wrap">
        <p class="desc-text">输入范围类型，可选填写默认值</p>
        <el-form-item label="默认值（可选）：">
            <el-form>
                <el-form-item label="从">
                    <el-input v-model="start" placeholder="输入起始值"></el-input>
                </el-form-item>
                <el-form-item label="到">
                    <el-input v-model="end" placeholder="输入终点值"></el-input>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="是否必填：">
			<el-radio-group v-model="rule.required">
				<el-radio :label="1">必填项</el-radio>
				<el-radio :label="0">非必填项</el-radio>
			</el-radio-group>
		</el-form-item>
        <el-form-item label="选择校验规则：" style="margin-left: 30px;">
			<el-select v-model="rule.tag" placeholder="请选择">
				<el-option
					v-for="validate in validateRule"
					:key="validate.name"
					:label="validate.name"
					:value="validate.tag">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-input v-model="rule.tag" style="width:200px;" placeholder="请输入自定义正则表达式"></el-input>
		</el-form-item>
        <div class="textcenter">
            <el-button type="primary" @click="saveParamConfig">保存参数配置</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: "srange",
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
            start: this.defaultData.value ? this.defaultData.value.split('-')[0] : '',
            end: this.defaultData.value ? this.defaultData.value.split('-')[1] : '',
        }
    },
    methods: {
        saveParamConfig() {
            this.defaultData.value = this.start + '-' + this.end
            this.$emit("param-save-success");
        }
    }
}
</script>
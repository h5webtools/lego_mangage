<template>
	<div class="operate-wrap">
		<p class="desc-text">文本框类型，配置时显示为一个输入框<br/>1、如果有默认值则输入默认之后保存；<br/>2、没有默认值则直接点击保存按钮保存参数。</p>
		<el-form-item label="默认值（可选）：">
			<el-input v-model="defaultData.value" placeholder="请输入参数默认值"></el-input>
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
			<el-input v-model="rule.tag" style="width:200px;"></el-input>
		</el-form-item>
		<div class="textcenter">
			<el-button type="primary" @click="saveParamConfig">保存参数配置</el-button>
		</div>
	</div>
</template>
<script>
export default {
	name: "sinput",
	props: {
		defaultData: {
			type: Object
		},
		rule: {
			type: Object,
			default() {
				return {};
			}
		},
		validateRule: {
			type: Array
		}
	},
	data() {
		return {
			defaultValue: "",
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
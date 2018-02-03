<template>
    <div class="operate-wrap">
        <p class="desc-text">下拉列表类型，需要点击“添加”按钮增加列表选项</p>
        <el-form-item label="新增选项：">
            <el-form :inline="true" class="ui-mb-20" :model="param" v-for="(param, index) in addedParam" :key="index">
                <el-form-item>
                    <el-input v-model="param.key" placeholder="请输入选项值"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="param.value" placeholder="请输入选项描述"></el-input>
                </el-form-item>
                <i class="glyphicon glyphicon-remove" @click="removeOption(index)"></i>
            </el-form>
            <div class="martop20" v-if="addedParam.length > 0">
                <el-button type="success" @click="saveOptions">查看预览</el-button>
                <span style="font-size:12px;color: #999;">填写不完整的表单将被忽略</span>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addOption"><i class="glyphicon glyphicon-plus"></i>添加选项</el-button>
        </el-form-item>
        <el-form-item label="是否必选：">
			<el-radio-group v-model="rule.required">
				<el-radio :label="1">必填项</el-radio>
				<el-radio :label="0">非必填项</el-radio>
			</el-radio-group>
		</el-form-item>
        <el-form-item label="展示预览：" style="margin-left: 40px;">
             <el-select placeholder="请选择" v-model="selectedValue">
                <el-option
                    v-for="item in previewParam"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                </el-option>
            </el-select> 
        </el-form-item>
        <div class="textcenter">
            <el-button type="primary" @click="saveParamConfig">保存参数配置</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: "sselect",
    props: {
        paramData: {
            type: Array,
            default: function() {
                return []
            }
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
            validatePass: false,
            selectedValue: "",
            addedParam: this.paramData,
            previewParam: JSON.parse(JSON.stringify(this.paramData))
        }
    },
    methods: {
        saveOptions() { 
            //只过滤填写完整的key-value，填写不完整的不做处理
            this.addedParam = this.addedParam.filter((item) => {
                // if(item.key && item.value) {
                return item.key != '' && item.value != '';
            })
            if(!this.addedParam.length) {
                this.$message({
                    message: "请填写选项内容",
                    type: "error"
                })
                return;
            }
            this.previewParam = [];
            // 过滤含有相同key的数组项
            this.addedParam.forEach((param) => {
                this.previewParam.push({
                    key: param.key,
                    value: param.value
                });
            })
            this.validatePass = true;
            // 默认选中一项
            this.selectedValue = this.previewParam[0].value;
        },
        saveParamConfig() {
            // if(!this.previewParam.length) {
            //     this.$message.error("请新增列表选项");
            //     return;
            // }
            // this.previewParam.forEach((param, index) => {
            //     this.paramData[index] = param;
            // });
            var filter = this.paramData.filter(param => {
                return param.value && param.key;
            })
            if(filter.length == 0) {
                this.$message.error('请填写列表选项');
                return;
            }
            this.$emit("param-save-success");
        },
        addOption() {
            this.addedParam.push({
                key: "",
                value: ""
            })
        },
        removeOption(index) {
            this.addedParam.splice(index, 1);
            if(!this.addedParam.length) {
                this.selectedValue = '';
            }
        }
    }
}
</script>

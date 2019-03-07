<template>
    <div class="martop20">
        <el-button type="primary" @click="addRecord">添加参数</el-button>
        <el-form class="martop20" :model="form" ref="paramsForm">
            <el-row v-for="(record,index) in form.params" :gutter="10">
                <el-col :span="7">
                    <el-form-item :prop="'params.'+ index + '.label'"
                                  :key="record.key"
                                  :rules='{required:true,message:"参数名必填", trigger: "blur"}'>
                        <el-input size="medium" v-model="record.label" placeholder="请输入参数的标签名">
                            <template slot="prepend">标签</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item :prop="'params.'+ index + '.keyword'"
                                  :key="record.key"
                                  :rules='[{required:true,message:"关键词必填", trigger: "blur" },{pattern: /^[A-Za-z][A-Z_a-z0-9]*$/,message:"关键词必须由字母开头，只能包含大小写字母、数字和下划线", trigger: "blur"}]'>
                        <el-input size="medium" v-model="record.keyword" placeholder="请输入参数的key（英文字符）">
                            <template slot="prepend">关键词</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button size="medium" @click="removeRecord(index)">移除</el-button>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button @click="commit" size="medium">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    function Record(label, keyword) {
        this.label = label;
        this.keyword = keyword;
    }

    import * as actQuery from 'api/api_act_edit'

    export default {
        name: "editParam",
        data: function () {
            return {
                "form": {
                    "params": [
                        new Record()
                    ]
                }
            }
        },
        created: function () {
            this.getParams();
        },
        methods: {
            getParams: function () {
                let app = this;
                actQuery.getSingleFileParams(this.$route.params['singleCode']).then(function (json) {
                    let params = [];
                    if (json.code !== '0') {
                        this.$message.error(json.msg);
                        return;
                    }
                    if (json.data.params.length === 0) {
                        params.push(new Record());
                        return;
                    }
                    for (let i in json.data.params) {
                        params.push(new Record(json.data.params[i].label, json.data.params[i].keyword));
                    }
                    app.form.params = params;
                });
            },
            addRecord: function () {
                this.form.params.push(new Record());
            },
            removeRecord: function (index) {
                this.form.params.splice(index, 1)
            },
            commit: function () {
                let keywords = [];
                //校验重复key
                for (let i in this.form.params) {
                    let keyword = this.form.params[i].keyword;
                    if (keywords.indexOf(keyword) !== -1) {
                        this.$message.error('关键词不能重复出现');
                        return;
                    }
                    keywords.push(keyword);
                }
                let app = this;
                this.$refs['paramsForm'].validate((valid) => {
                    if (valid) {
                        this.form['code'] = this.$route.params['singleCode'];
                        actQuery.putSingleParams(this.form).then(function (json) {
                            if (json.code === '0') {
                                app.$message.info('保存成功')
                            } else {
                                app.$message.error(json.msg)
                            }
                        });
                    } else {
                        return false;
                    }
                });

            }
        }
    }
</script>

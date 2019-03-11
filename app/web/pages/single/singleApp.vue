<template>
    <div class="martop20">
        <el-button type="primary" @click="draftDataDialog.visible = true">副本数据</el-button>
        <el-button type="primary" @click="dataDialog.visible = true">正式数据</el-button>

        <el-form class="single-form" ref="form" :model="form" label-width="25%">
            <el-form-item v-for="param in params" :label="param.label + '（' + param.keyword + '）：'" :key="param.key"
                          :prop="param.keyword">
                <el-input size="medium" v-model="form[param.keyword]"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" @click="postSingleConf()">保存</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="单文件副本数据" :visible.sync="draftDataDialog.visible">
            <el-row class="data-row">
                <el-col class="data-label" :span="5">使用的单文件：</el-col>
                <el-col class="data-text" :span="19">{{ singleDraftConfig.remark || singleDraftConfig.code }}</el-col>
            </el-row>
            <el-row class="data-row">
                <el-col class="data-label" :span="5">数据：</el-col>
                <el-col :span="19">
                    <div class="code-data">
                        <pre><code>{{ JSON.stringify(singleDraftConfig.params, null, 4) }}</code></pre>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="单文件正式数据" :visible.sync="dataDialog.visible">
            <el-row class="data-row">
                <el-col class="data-label" :span="5">使用的单文件：</el-col>
                <el-col class="data-text" :span="19">{{ singleConfig.remark || singleConfig.code }}</el-col>
            </el-row>
            <el-row class="data-row">
                <el-col class="data-label" :span="5">数据：</el-col>
                <el-col :span="19">
                    <div class="code-data">
                        <pre><code>{{ JSON.stringify(singleConfig.params, null, 4) }}</code></pre>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import * as actQuery from 'api/api_act_edit'
    import {clone} from 'assets/js/util'

    function SingleConfig(code, params, remark) {
        this.code = code || null;
        this.params = params || null;
        this.remark = remark || null;
    }

    export default {
        name: "singleApp",
        created: function () {
            this.getSingleFile();
            this.getSingleFile(1);
        },
        data: function () {
            return {
                singleDraftConfig: new SingleConfig(),
                singleConfig: new SingleConfig(),
                dataDialog: {
                    visible: false,
                },
                draftDataDialog: {
                    visible: false,
                },
                params: [],
                form: {}
            }
        },
        watch: {
            singleDraftConfig: function (newValue) {
                let app = this;
                if (newValue.code) {
                    actQuery.getSingleFileParams(newValue.code).then(function (json) {
                        if (json.code !== '0') {
                            this.$message.error(json.msg);
                            return;
                        }
                        app.params = json.data.params;
                        for (let index in app.params) {
                            if (app.singleDraftConfig.params.hasOwnProperty(app.params[index].keyword)) {
                                let param_value = app.singleDraftConfig.params[app.params[index].keyword];
                                if (param_value instanceof Object) {
                                    param_value = JSON.stringify(param_value);
                                } else if (typeof param_value === 'string' || param_value instanceof String) {
                                    // param_value = JSON.stringify(param_value).replace(/^"(.*)"$/g, '$1')
                                }
                                app.$set(app.form, app.params[index].keyword, param_value)
                            }
                        }
                    });
                }
            }
        },
        methods: {
            postSingleConf: function () {
                let app = this;
                let config = clone(this.form);
                for (let i in config) {
                    if(config.hasOwnProperty(i)){
                        try {
                            config[i] = JSON.parse(config[i]);
                        } catch (e) {
                        }
                    }
                }
                actQuery.postSingleConf({
                    config: config,
                    act_id: this.$route.params['act_id']
                }).then(function (json) {
                    if (json.code === '0') {
                        app.$message.success('保存成功')
                    } else {
                        app.$message.error(json.msg)
                    }
                });
            },
            getSingleFile: function (isDraft) {
                let app = this;
                actQuery.getActSingleConfig(this.$route.params['act_id'], isDraft || 0).then(function (json) {
                    if (json.code === '0') {
                        if (isDraft) {
                            app.singleDraftConfig = new SingleConfig(json.data.single_config.single_file, json.data.single_config.params, json.data.single_config.remark);
                        } else {
                            app.singleConfig = new SingleConfig(json.data.single_config.single_file, json.data.single_config.params, json.data.single_config.remark);
                        }
                    } else {
                        app.$message.error(json.msg)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .single-form {
        margin-top: 25px;
    }

    .code-data {
        background-color: #f5f5f5;
        font-family: Courier New !important;
        font-size: 12px !important;
        border: 1px solid #ccc;
        padding: 5px;
        overflow: auto;
        margin: 5px 0;
        color: #000;
    }

    .data-row {
        margin-bottom: 18px;
    }

    .data-label {
        text-align: right;
        padding: 0 12px 0 0;
        @extend .data-text
    }

    .data-text {
        vertical-align: middle;
        font-size: 14px;
        color: #606266;
    }
</style>
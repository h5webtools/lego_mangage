<template>
    <div class="martop20">
        <el-row>
            <el-col :span="10">
                <el-button type="primary" @click="draftDataDialog.visible = true">副本数据</el-button>
                <el-button type="primary" @click="dataDialog.visible = true">正式数据</el-button>
            </el-col>
        </el-row>
        <el-row class="martop20" :gutter="40">
            <el-col :span="10">
                <schema-editor
                        v-if="showSchemaEditor"
                        ref="paramsSchemaForm"
                        :schema="schema"
                        :value="value"
                        :onChange="handleChange"
                >
                </schema-editor>
                <el-button size="medium" @click="postSingleConf()">保存</el-button>
            </el-col>
            <el-col :span="10">
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="活动参数" name="previewValue">
                        <div class="text">
                            {{this.remark || this.code}}
                        </div>
                        <div class="code-data">
                            <pre><code>{{ JSON.stringify(value, null, 4) }}</code></pre>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="接口表">
                        <div v-for="(item,index) in cmd_map" :key="index" class="text item">
                            <div>
                                命令字：{{item.cmd }}
                            </div>
                            <div>
                                方法：{{ item.method}}
                            </div>
                            <div>
                                描述：{{item.description}}
                            </div>
                            <div v-if="item.events">
                                监听事件：
                                <ul class="event-ul">
                                    <li v-for="(event,event_index) in item.events" :key="event_index">
                                        {{event.event_name}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="参数编辑">
                        <el-form :model="configValue" ref="valueEditForm">
                            <el-form-item label="配置" porp="configStr">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 10, maxRows: 15}"
                                        placeholder="请输入内容"
                                        v-model="configValue.configStr"
                                        @change="editValueChange"
                                        autocomplete="off"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="uploadValueConfig">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
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
    import schemaUtil from '@jyb/boxes-schema-util';
    import extend from '@jyb/lib-extend'

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
                showSchemaEditor: false,
                schema: {},
                value: {},
                code: '',
                remark: '',
                cmd_map: [],
                singleDraftConfig: new SingleConfig(),
                singleConfig: new SingleConfig(),
                dataDialog: {
                    visible: false,
                },
                draftDataDialog: {
                    visible: false,
                },
                activeName: 'previewValue',
                configValue: {
                    configStr: ''
                }
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
                        app.schema = schemaUtil.parse(json.data.param_schema);
                        app.cmd_map = json.data.cmd_map;
                        app.code = json.data.code;
                        app.remark = json.data.remark;

                        app.value = schemaUtil.mock(app.schema);
                        extend(true, app.value, newValue.params);
                        app.configValue.configStr = JSON.stringify(newValue.params, null, 4);
                        app.showSchemaEditor = true;
                    });
                }
            }
        },
        methods: {
            uploadValueConfig: function () {
                let config;
                try {
                    config = JSON.parse(this.configValue.configStr);
                } catch (e) {
                    this.$message.error('编辑的参数格式非json格式');
                    return;
                }
                if (!(config instanceof Object)) {
                    this.$message.error('编辑的参数格式非json格式');
                    return;
                }
                this.postSingleConf(config);
            },
            handleChange: function (data) {
                this.value = data;
                this.configValue.configStr = JSON.stringify(this.value, null, 4);
            },
            postSingleConf: function (configValue) {
                let config = configValue || this.$refs.paramsSchemaForm.getValue();
                let app = this;
                actQuery.postSingleConf({
                    config: config,
                    act_id: this.$route.params['act_id'],
                    code: this.code
                }).then(function (json) {
                    if (json.code === '0') {
                        app.$message.success('保存成功')
                    } else {
                        app.$message.error(json.msg)
                    }
                });
            },
            editValueChange: function (newValue) {
                try {
                    let value = JSON.parse(newValue);
                    if (value instanceof Object) {
                        this.value = value;
                    }
                } catch (e) {
                }
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
    .event-ul {
        padding-left: 25px;
        list-style-type: disc;
    }

    .single-form {
        margin-top: 25px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
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
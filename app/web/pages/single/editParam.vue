<template>
    <div class="martop20">
        配置编辑
        <el-row>
            <el-col :span="10">
                <schema-editor
                        v-if="showSchemaEditor"
                        ref="paramsSchemaForm"
                        :schema="paramsSchema"
                        :value="value"
                        :onChange="handleChange"
                >
                </schema-editor>
                <el-button type="primary" @click="commit" size="medium">提交</el-button>
                <el-button @click="preview" size="medium">预览表单</el-button>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="表单预览" name="previewForm">
                        <schema-editor
                                ref="formPreview"
                                :schema="previewSchema"
                                :value="previewValue"
                                :onChange="handlePreviewChange"
                        >
                        </schema-editor>
                    </el-tab-pane>
                    <el-tab-pane label="数据预览" name="previewValue">
                        <div class="code-data">
                            <pre><code>{{ JSON.stringify(previewValue, null, 4) }}</code></pre>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
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
</style>
<script>
    import schemaUtil from '@jyb/boxes-schema-util';

    function getSchema(events) {
        let eventTemplate = "";
        if (Array.isArray(events) && events.length > 0) {
            for (let i in events) {
                if (!events.hasOwnProperty(i)) {
                    continue;
                }
                eventTemplate += events[i].event_id + "(" + events[i].event_name + "),\n";
            }
        }
        const schema = "Object(单文件参数){ \n" +
            "\tparam_schema(参数 Schema): Text,\n" +
            "\tcmd_map(方法命令字映射): Array {\n" +
            "\t\tmethod(方法),\n" +
            "\t\tcmd(命令字),\n" +
            "\t\tdescription(方法描述): Text,\n" +
            "                events(监听的事件): Array{\n" +
            "                        event(事件): Enum {\n" +
            "                                empty(请选择),\n" +
            eventTemplate +
            "                        },\n" +
            "                },\n" +
            "\t},\n" +
            "}";
        return schemaUtil.parse(schema);
    }

    import * as actQuery from 'api/api_act_edit'
    import * as mqQuery from "api/api_system_mqSet";

    export default {
        name: "editParam",
        data: function () {
            let jsonSchema = getSchema();
            return {
                showSchemaEditor: false,
                paramsSchema: jsonSchema,
                value: schemaUtil.mock(jsonSchema),
                previewSchema: {},
                previewValue: {},
                activeName: "previewForm"
            }
        },
        created: function () {
            this.getMqList();
            this.getParams();
        },
        methods: {
            getJsonSchema: function (schema) {
                try {
                    return schemaUtil.parse(schema);
                } catch (e) {
                    this.$message.error('schema 格式错误');
                }
            },
            preview: function () {
                let schema = this.$refs.paramsSchemaForm.getValue().param_schema;
                let jsonSchema = this.getJsonSchema(schema);
                this.$set(this, 'previewSchema', jsonSchema);
            },
            handleChange: function (data) {
                this.value = data;
            },
            handlePreviewChange: function (data) {
                console.log(data);
                this.previewValue = data;
            },
            getParams: function () {
                let app = this;
                actQuery.getSingleFileParams(this.$route.params['singleCode']).then(function (json) {
                    let params = [];
                    if (json.code !== '0') {
                        this.$message.error(json.msg);
                        return;
                    }
                    if (json.data) {
                        app.$set(app, 'value', json.data);
                    }
                    app.showSchemaEditor = true;
                });
            },
            getMqList: function () {//mq配置列表
                let app = this;
                mqQuery.GetEvent({status: '1'}).then(json => {
                    if (json.code === '0') {
                        app.$set(app, "paramsSchema", getSchema(json.data.data))
                    } else {
                        this.$message.error(json.msg);
                    }
                });
            },
            commit: function () {
                let val = this.$refs.paramsSchemaForm.getValue();
                //校验 schema 格式
                this.getJsonSchema(val.param_schema);
                val.code = this.$route.params['singleCode'];
                let app = this;
                actQuery.putSingleParams(val).then(function (json) {
                    if (json.code === '0') {
                        app.$message.info('保存成功')
                    } else {
                        app.$message.error(json.msg)
                    }
                });
            }
        }
    }
</script>

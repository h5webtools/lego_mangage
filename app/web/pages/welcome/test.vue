<template>
    <div class="schema-wrap">
        <schema-editor
                ref="schemaEditor"
                :schema="schema"
                :value="data"
                :onChange="handleChange"
                :config="schemaEditorConfig"
                :onError="handleError"></schema-editor>
        <el-button type="primary" size="mini" @click="handleSave">保存</el-button>
        <div class="schema-code">
            <pre>{{schemaText}}</pre>
        </div>
        <div class="schema-code">
            <pre>{{ newData }}</pre>
        </div>
        <div class="schema-code">
            <pre>{{ schema }}</pre>
        </div>
    </div>
</template>
<script>
    import schemaUtil from '@jyb/boxes-schema-util';
    const json = require('./schema.json');

    // editor mock
    const formSchema = "Object(产品) {\n" +
        "  image(插图): Image,\n" +
        "  title(标题),\n" +
        "  desc(内容),\n" +
        "  relative(关联产品): Object {\n" +
        "    image(插图): Image,\n" +
        "      title(标题),\n" +
        "      desc(内容),\n" +
        "  },\n" +
        "}";
    const formData = {
    };

    export default {
        data() {
            return {
                schemaEditorConfig: {
                    uploadApi: '/api/v2/upload' // 上传API地址
                },
                newData: formData,
                data: formData,
                errorMsg: '',
                schemaText: formSchema,
                schema: schemaUtil.parse(formSchema),
            };
        },
        created() {
            console.log(schemaUtil.parse(formSchema));
            console.log(JSON.stringify(this.schema, null, 2));
        },
        methods: {
            handleChange(data, e) {
                this.newData = data;
            },
            handleError(e) {
                if (e && e.error) {
                    this.errorMsg = ((e && e.error) + (e.fieldPath && e.fieldPath.join('-'))) || '';
                } else {
                    this.errorMsg = '';
                }
            },
            handleSave() {
                const result = this.$refs.schemaEditor.validate();
                if (result.length > 0) {
                    this.$message.error(result[0]);
                } else {
                    this.$message.info('保存成功，打开console查看');
                    console.log(JSON.stringify(this.newData, null, 2));
                }
            }
        }
    }
</script>
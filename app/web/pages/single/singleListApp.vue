<template>
    <div class="singles">
        <router-view v-if="showSubRoute"></router-view>
        <div v-else class="martop20">
            <el-form :inline="true">
                <el-form-item label="搜索：">
                    <el-input v-model="queryData.search" @keyup.enter.native="querySingleList"
                              placeholder="输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="querySingleList">查询</el-button>
                    <el-button type="success" @click="dialog.visible = true"><i class="glyphicon glyphicon-plus"></i>新增
                    </el-button>
                </el-form-item>
            </el-form>
            <el-table stripe border highlight-current-row v-loading="tableLoading" :data="singleList">
                <el-table-column label="编码" prop="code"></el-table-column>
                <el-table-column label="说明" prop="remark"></el-table-column>
                <el-table-column label="详细描述" min-width="300px" prop="description"></el-table-column>
                <el-table-column label="创建人" prop="creator"></el-table-column>
                <el-table-column label="创建时间" prop="created_at"></el-table-column>
                <el-table-column label="更新时间" prop="updated_at"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="openEditSingleDialog(scope.$index)">编辑</el-button>
                        <el-button type="text" size="small"
                                   @click="$router.push({name:'singleParamEdit', params:{singleCode:scope.row.code}})">
                            参数配置
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-show="!tableLoading" class="ui-mt-20 ui-ta-r">
                <el-pagination @current-change="querySingleList" :current-page.sync="queryData.page"
                               :page-size="queryData.pageSize"
                               layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <el-dialog :title="['新增单文件','编辑单文件'][dialog.type]" :visible.sync="dialog.visible"
                       @closed="$refs['singleDialogForm'].clearValidate()" @close="closeSingleDialog">
                <el-form v-loading="dialog.loading" label-width="80px" :rules="dialog.rules" ref="singleDialogForm"
                         :model="dialog.data">
                    <el-form-item label="编码" prop="code" required>
                        <el-input :disabled="dialog.codeDisable" v-model="dialog.data.code"></el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="remark" required>
                        <el-input v-model="dialog.data.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="说明" prop="description">
                        <el-input type="textarea" v-model="dialog.data.description"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitDialog">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import * as actQuery from 'api/api_act_edit'

    function DialogData(data) {
        this.id = null;
        this.code = null;
        this.remark = null;
        this.description = null;
        if (data) {
            this.id = data.id || null;
            this.code = data.code || null;
            this.remark = data.remark || null;
            this.description = data.description || null;
        }
    }

    export default {
        data: function () {
            return {
                queryData: {
                    search: "",
                    page: 1,
                    pageSize: 50
                },
                singleList: [],
                search: "",
                total: 0,
                tableLoading: true,
                dialog: {
                    "type": 0, // 0.新增 1.编辑
                    "visible": false,
                    "loading": false,
                    "rules": {
                        code: [
                            {required: true, message: "请输入编码", trigger: "blur"}
                        ],
                        remark: [
                            {required: true, message: "请输入标题", trigger: "blur"}
                        ],
                        description: [
                            {max: 140, message: "长度不要超过 140 个字符", trigger: "blur"}
                        ]
                    },
                    "data": new DialogData(),
                    'codeDisable': false
                }
            }
        },
        computed: {
            showSubRoute: function () {
                return this.$route.name !== 'singleList';
            }
        },
        watch: {
            "showSubRoute": function (val) {
                if (!val) {
                    this.querySingleList();
                }
            }
        },
        created: function () {
            if(!this.showSubRoute) {
                this.querySingleList();
            }
        },
        methods: {
            querySingleList: function () {
                this.tableLoading = true;
                actQuery.getSingleFile(this.queryData.search, this.queryData.page, this.queryData.pageSize).then(json => {
                    if (json.code === '0') {
                        this.singleList = json.data.single_data;
                        this.total = parseInt(json.data.total);
                    } else {
                        this.total = 0;
                        this.$message.error(json.msg);
                    }
                    this.tableLoading = false;
                });
                return this;
            },
            submitDialog: function () {
                let app = this;
                this.$refs['singleDialogForm'].validate((valid) => {
                    if (valid) {
                        this.dialog.loading = true;
                        actQuery.putSingleFile({
                            "type": this.dialog.type,
                            ...this.dialog.data
                        }).then((json) => {
                            app.dialog.loading = false;
                            if (json.code === '0') {
                                this.dialog.visible = false;
                                this.$message.success('提交成功');
                                app.querySingleList();
                            } else {
                                this.$message.error(json.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            openEditSingleDialog: function (index) {
                this.dialog.codeDisable = true;
                this.dialog.visible = true;
                this.dialog.type = 1;
                this.$set(this.dialog, 'data', new DialogData(this.singleList[index]));
            },
            closeSingleDialog: function () {
                this.dialog.codeDisable = false;
                this.dialog.type = 0;
                this.$set(this.dialog, 'data', new DialogData());
            }
        },
        name: "singleListApp"
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

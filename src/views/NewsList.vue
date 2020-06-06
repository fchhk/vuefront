<template>
    <div>
        <el-table
                :data="news"
                border
                stripe
                height="542"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="ntitle"
                    label="标题"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="nauthor"
                    label="作者"
                    width="150">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="ncontent"
                             label="内容"
                             width="250">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="新增时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="updateTime"
                    label="修改时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button v-on:click="editButton(scope.row)" @click="dialogFormVisible = true" type="primary"
                               icon="el-icon-view" size="medium" circle>
                    </el-button>
                    <el-dialog title="修改公告信息" :visible.sync="dialogFormVisible" :modal-append-to-body="false"
                               :before-close="cancelInfo">
                        <el-form :model="form">
                            <el-form-item label="标题" :label-width="formLabelWidth">
                                <el-input v-model="form.ntitle" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="作者" :label-width="formLabelWidth">
                                <el-input v-model="form.nauthor" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" :label-width="formLabelWidth">
                                <el-input type="textarea" v-model="form.ncontent" autocomplete="off" autosize></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button v-on:click="cancelInfo" @click="dialogFormVisible = false">取消</el-button>
                            <el-button v-on:click="updateInfo" type="primary" @click="dialogFormVisible = false">确定
                            </el-button>
                        </div>
                    </el-dialog>
                    <el-button @click="delButton(scope.row)" type="danger" icon="el-icon-delete" size="medium"
                               circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="size"
                layout="total, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "News",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                news: [{
                    id: '',
                    ntitle: '',
                    nauthor: '',
                    ncontent: '',
                    createTime: '',
                    updateTime: ''
                }],
                dialogFormVisible: false,
                form: {
                    id: '',
                    ntitle: '',
                    nauthor: '',
                    ncontent: '',
                },
                formLabelWidth: '120px'
            };
        },
        methods: {
            editButton(row) {
                this.form = row;
                console.log(row.id);
            },
            cancelInfo() {
                setTimeout(function () {
                    window.location.reload();
                }, 10);
            },
            updateInfo() {
                axios({
                    method: "put",
                    url: "news/updateById",
                    params: {
                        "id": this.form.id,
                        "ntitle": this.form.ntitle,
                        "nauthor": this.form.nauthor,
                        "ncontent": this.form.ncontent
                    }

                }).then(resp => {
                    if (resp.status == 200) {
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                    }

                })
            },
            delButton(row) {
                console.log(row.id)
                this.$confirm('确认删除?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    axios({
                        method: "delete",
                        url: "news/deleteById",
                        params: {
                            "id": row.id
                        }

                    }).then(response => {
                        if (response.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            window.location.reload();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });
            },

            handleCurrentChange(val) {
                axios({
                    method: "get",
                    url: 'news/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.news = response.data.records;
                    this.total = response.data.total;
                    this.size = response.data.size;
                })
            }
        },
        created() {
            axios({
                method: "get",
                url: 'news/selectByPage',
                params: {
                    currentPage: this.currentPage
                }
            }).then(response => {
                this.news = response.data.records;
                this.total = response.data.total;
                this.size = response.data.size;
            })
        }
    }
</script>

<style scoped>


</style>

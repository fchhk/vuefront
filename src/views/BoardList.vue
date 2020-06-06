<template>
    <div>
        <el-table
                :data="board"
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
                    prop="btitle"
                    label="标题"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="bauthor"
                    label="作者"
                    width="150">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="bcontent"
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
                    width="145">
                <template slot-scope="scope">
                    <el-button v-on:click="editButton(scope.row)" @click="dialogFormVisible = true" type="primary"
                               icon="el-icon-view" size="medium" round>
                    </el-button>
                    <el-dialog title="修改公告信息" :visible.sync="dialogFormVisible" :modal-append-to-body="false"
                               :before-close="cancelInfo">
                        <el-form :model="form">
                            <el-form-item label="标题" :label-width="formLabelWidth">
                                <el-input v-model="form.btitle" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="作者" :label-width="formLabelWidth">
                                <el-input v-model="form.bauthor" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" :label-width="formLabelWidth">
                                <el-input type="textarea" v-model="form.bcontent" autocomplete="off" autosize></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button v-on:click="cancelInfo" @click="dialogFormVisible = false">取消</el-button>
                            <el-button v-on:click="updateInfo" type="primary" @click="dialogFormVisible = false">确定
                            </el-button>
                        </div>
                    </el-dialog>
                    <el-button @click="delButton(scope.row)" type="danger" icon="el-icon-delete" size="medium"
                               round></el-button>
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
        name: "Board",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                board: [{
                    id: '',
                    btitle: '',
                    bauthor: '',
                    bcontent: '',
                    createTime: '',
                    updateTime: ''
                }],
                dialogFormVisible: false,
                form: {
                    id: '',
                    btitle: '',
                    bauthor: '',
                    bcontent: '',
                },
                formLabelWidth: '120px'
            };
        },
        methods: {
            /*           handleClick(row) {
                           console.log(row);
                       },*/
            editButton(row) {
                this.form = row;
                console.log(row.id);
            },
            cancelInfo() {
                // this.form=form;
                setTimeout(function () {  //使用知  setTimeout（）方法道设定定时版2000毫秒权
                    window.location.reload();//页面刷新
                }, 10);
            },
            updateInfo() {
                // alert(this.form.id)
                axios({
                    method: "put",
                    url: "http://localhost:8181/charity/board/updateById",
                    params: {
                        "id": this.form.id,
                        "btitle": this.form.btitle,
                        "bauthor": this.form.bauthor,
                        "bcontent": this.form.bcontent
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
                        url: "http://localhost:8181/charity/board/deleteById",
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
                    url: 'http://localhost:8181/charity/board/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.board = response.data.records;
                    this.total = response.data.total;
                    this.size = response.data.size;
                    //console.log(response)

                })
                //console.log(`当前页: ${val}`);
            }

        },
        mounted() {
            axios({
                method: "get",
                url: 'http://localhost:8181/charity/board/selectByPage',
                params: {
                    currentPage: this.currentPage
                }
            }).then(response => {
                this.board = response.data.records;
                this.total = response.data.total;
                this.size = response.data.size;
            })
        }
    }
</script>

<style scoped>


</style>

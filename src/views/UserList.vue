<template>
    <div>
        <el-row>
            <el-col :span="24" class="col1">
                <el-table
                        :data="user"
                        stripe
                        border
                        height="542"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="id"
                            label="ID"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="uname"
                            label="用户名"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="upwd"
                            label="密码"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="uemail"
                            label="邮箱"
                            width="200">
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
                            <el-button v-on:click="editButton(scope.row)" @click="dialogFormVisible = true"
                                       type="primary" size="medium"
                                       icon="el-icon-edit"
                                       circle>
                            </el-button>

                            <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" :modal-append-to-body="false"
                                       :before-close="cancelInfo">
                                <el-form :model="form">
                                    <el-form-item label="用户名" :label-width="formLabelWidth">
                                        <el-input v-model="form.uname" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" :label-width="formLabelWidth">
                                        <el-input v-model="form.upwd" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                                        <el-input v-model="form.uemail" autocomplete="off"></el-input>
                                    </el-form-item>

                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button v-on:click="cancelInfo" @click="dialogFormVisible = false">取 消
                                    </el-button>
                                    <el-button v-on:click="updateInfo" type="primary"
                                               @click="dialogFormVisible = false">
                                        确 定
                                    </el-button>
                                </div>
                            </el-dialog>

                            <el-button @click="delButton(scope.row)" type="danger" size="medium" icon="el-icon-delete"
                                       circle>
                            </el-button>
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

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                user: [{
                    id: '',
                    uname: '',
                    upwd: '',
                    uemail: '',
                    createTime: '',
                    updateTime: ''
                }],
                dialogFormVisible: false,
                form: {
                    id: '',
                    uname: '',
                    upwd: '',
                    uemail: '',
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
                // this.form=form;
                setTimeout(function () {  //使用知  setTimeout（）方法道设定定时版2000毫秒权
                    window.location.reload();//页面刷新
                }, 10);
            },
            updateInfo() {
                // alert(this.form.id)
                axios({
                    method: "put",
                    url: "http://localhost:8181/charity/user/updateById",
                    params: {
                        "id": this.form.id,
                        "uname": this.form.uname,
                        "upwd": this.form.upwd,
                        "uemail": this.form.uemail
                    }

                }).then(resp => {
                    if (resp.status == 200) {
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                        //this.$router.push('/userlist')
                        /*                        setTimeout(function () {  //使用知  setTimeout（）方法道设定定时版2000毫秒权
                                                    window.location.reload();//页面刷新
                                                }, 1000);*/
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
                        url: "http://localhost:8181/charity/user/deleteById",
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

            /*            handleSizeChange(val) {
                            console.log(`每页 ${val} 条`);
                        },*/
            handleCurrentChange(val) {
                axios({
                    method: "get",
                    url: 'http://localhost:8181/charity/user/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.user = response.data.records;
                    this.total = response.data.total;
                    this.size = response.data.size;
                    //console.log(response)
                })
                //console.log(`当前页: ${val}`);
            }

        },
        created() {
            axios({
                method: "get",
                url: 'http://localhost:8181/charity/user/selectByPage',
                params: {
                    currentPage: this.currentPage
                }

            }).then(response => {
                this.user = response.data.records;
                this.total = response.data.total;
                this.size = response.data.size;
                //console.log(response)

            })
            /*            axios.get('http://localhost:8181/charity/user/findAll').then(response => {
                            this.user = response.data
                        })*/
        }
    }
</script>

<style scoped>


</style>

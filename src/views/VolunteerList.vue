<template>
    <div>
        <el-table
                :data="volunteer"
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
                    prop="vname"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="vplace"
                    label="地址"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="vphone"
                    label="电话号码"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="vemail"
                    label="邮箱"
                    width="180">
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
                    <el-dialog title="修改志愿者信息" :visible.sync="dialogFormVisible" :modal-append-to-body="false"
                               :before-close="cancelInfo">
                        <el-form :model="form">
                            <el-form-item label="姓名" :label-width="formLabelWidth">
                                <el-input v-model="form.vname" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" :label-width="formLabelWidth">
                                <el-input v-model="form.vplace" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="电话号码" :label-width="formLabelWidth">
                                <el-input v-model="form.vphone" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" :label-width="formLabelWidth">
                                <el-input v-model="form.vemail" autocomplete="off"></el-input>
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
        name: "VolunteerList",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                volunteer: [{
                    id: '',
                    vname: '',
                    vplace: '',
                    vphone: '',
                    vemail: '',
                    createTime: '',
                    updateTime: ''
                }],
                dialogFormVisible: false,
                form: {
                    id: '',
                    vname: '',
                    vplace: '',
                    vphone: '',
                    vemail: '',
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
                setTimeout(function () {  //使用知  setTimeout（）方法道设定定时版2000毫秒权
                    window.location.reload();//页面刷新
                }, 10);
            },
            updateInfo() {
                // alert(this.form.id)
                axios({
                    method: "put",
                    url: "http://localhost:8181/charity/volunteer/updateById",
                    params: {
                        "id": this.form.id,
                        "vname": this.form.vname,
                        "vplace": this.form.vplace,
                        "vphone": this.form.vphone,
                        "vemail": this.form.vemail
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
                        url: "http://localhost:8181/charity/volunteer/deleteById",
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
                    url: 'http://localhost:8181/charity/volunteer/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.volunteer = response.data.records;
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
                url: 'http://localhost:8181/charity/volunteer/selectByPage',
                params: {
                    currentPage: this.currentPage
                }
            }).then(response => {
                this.volunteer = response.data.records;
                this.total = response.data.total;
                this.size = response.data.size;
            })
        }
    }
</script>

<style scoped>


</style>

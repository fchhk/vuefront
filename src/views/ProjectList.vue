<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="project"
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
                            prop="pname"
                            label="项目名"
                            width="180">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     prop="pcontent"
                                     label="内容"
                                     width="280">
                    </el-table-column>
                    <el-table-column
                            prop="ppicpath"
                            label="图片"
                            width="210">
                        <template slot-scope="scope">
                            <img :src="require('../assets/projectPic/'+scope.row.ppicpath)" class="picture" alt="加载失败">
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                             label="已筹金额"
                             width="150">
                         <template slot-scope="scope">
                             <el-button @click="aa(scope)"></el-button>
                             {{money}}
                         </template>
                     </el-table-column>-->
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
                                       type="primary"
                                       icon="el-icon-view" size="medium" circle>
                            </el-button>
                            <el-dialog title="修改公告信息" :visible.sync="dialogFormVisible" :modal-append-to-body="false"
                                       :before-close="cancelInfo">
                                <el-form :model="form">
                                    <el-form-item label="标题" :label-width="formLabelWidth">
                                        <el-input v-model="form.pname" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="内容" :label-width="formLabelWidth">
                                        <el-input type="textarea" v-model="form.pcontent" autocomplete="off"
                                                  autosize></el-input>
                                    </el-form-item>

                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button v-on:click="cancelInfo" @click="dialogFormVisible = false">取消</el-button>
                                    <el-button v-on:click="updateInfo" type="primary"
                                               @click="dialogFormVisible = false">确定
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ProjectList",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                project: [],
                idd: '',
                money: '',
                dialogFormVisible: false,
                form: {
                    id: '',
                    pname: '',
                    pcontent: '',
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
                    url: "http://localhost:8181/charity/cproject/updateById",
                    params: {
                        "id": this.form.id,
                        "pname": this.form.pname,
                        "pcontent": this.form.pcontent
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
                        url: "http://localhost:8181/charity/cproject/deleteById",
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
                    url: 'http://localhost:8181/charity/cproject/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.project = response.data.records;
                    this.total = response.data.total;
                    this.size = response.data.size;
                    //console.log(response)
                })
                //console.log(`当前页: ${val}`);
            },

            /* aa(s){
                 this.idd = s.row.id;
                 console.log(s.row.id);
             }*/

        },
        created() {
            axios({
                method: "get",
                url: 'http://localhost:8181/charity/cproject/selectByPage',
                params: {
                    currentPage: this.currentPage
                }
            }).then(response => {
                this.project = response.data.records;
                this.total = response.data.total;
                this.size = response.data.size;
            })
            /* axios({
                 method: 'get',
                 url: 'http://localhost:8181/charity/donation/findMoney',
                 params: {
                     id: this.project.id,
                 }
             }).then(response => {
                 console.log(response)
                 this.money = response.data;

             })*/
        }
    }
</script>

<style scoped>
    .picture {
        height: 92px;
        width: 180px;
    }
</style>

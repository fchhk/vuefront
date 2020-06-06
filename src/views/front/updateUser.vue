<template>
    <div class="rr">
        <el-form :model="form" class="demo-ruleForm">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.uname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.upwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.uemail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-on:click="cancelInfo">取 消
                </el-button>
                <el-button v-on:click="updateInfo">确 定
                </el-button>
<!--                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "updateUser",
        data() {
            return {
                xinxi: [],
                form: {
                    id:'',
                    uname: '',
                    upwd: '',
                    uemail: '',
                },
                formLabelWidth: '120px'
            }
        },
        methods:{
            cancelInfo() {
                setTimeout(function () {  //使用知  setTimeout（）方法道设定定时版2000毫秒权
                    window.location.reload();//页面刷新
                }, 10);
            },
            updateInfo() {
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
                    //console.log(resp);
                    if (resp.status == 200) {
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                    }

                })
            },
        },
        created() {
            axios.post('user/profile', null, {headers: {Authorization: "Bearer " + this.$store.state.token}}).then(response => {
                //console.log(response.data.data);
                this.form = response.data.data;
                //console.log(this.form)
            });
        }
    }
</script>

<style scoped>
    .rr {
        margin-top: 30px;
    }

    .demo-ruleForm {
        font-family: 幼圆;
        margin-top: 50px;
        margin-left: 420px;
        text-align: center;
        width: 500px;
    }
</style>

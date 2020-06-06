<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <h3 class="loginTitle">系统注册</h3>
            <h5 align="right"><a href="/homeLogin">已注册，快捷登录</a></h5>
            <el-form-item label="用户名" prop="username">
                <!--auto-complete:是否自动补全-->
                <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
    export default {
        name: "register",
        data() {
            const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            var checkEmail = (rule, value, callback) => {
                if (!regEmail.test(value)) {
                    callback(new Error('邮箱格式不正确'))
                } else {
                    callback();
                }
                /*                setTimeout(() => {
                                    if (!Number.isInteger(value)) {
                                        callback(new Error('请输入数字值'));
                                    } else {
                                        if (value < 18) {
                                            callback(new Error('必须年满18岁'));
                                        } else {
                                            callback();
                                        }
                                    }
                                }, 1000);*/
            };
            var validatePass = (rule, value, callback) => {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();

            };
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    username: '',
                    pass: '',
                    checkPass: '',
                    email: ''
                },
                rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"}
                    ],
                    pass: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, message: "请再次输入密码", trigger: "blur"},
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: "请输入邮箱", trigger: "blur"},
                        {validator: checkEmail, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams();
                        params.append("uname", this.ruleForm.username);
                        params.append("upwd", this.ruleForm.pass);
                        params.append("uemail", this.ruleForm.email);
                        axios.post('http://localhost:8181/charity/user/register', params).then(resp => {
                            console.log(resp)
                            if (resp.status==200){
                                this.$message.success("注册成功！");
                                //alert("注册成功")
                            }
                        })

                        // alert('submit!');
                    } else {
                        this.$message.error("请输入所有字段");
                        //console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .loginTitle {
        margin: 15px;
        text-align: center;
        color: #505458;
    }

    .demo-ruleForm {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 120px auto;
        width: 500px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

</style>

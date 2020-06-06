<template>
    <div class="bb">
        <el-container>
            <el-header>
                <el-divider></el-divider>
            </el-header>
            <el-container>
                <el-aside>
                    <el-menu router>
                        <el-menu-item-group>
                            <template slot="title"><span style="font-size: 28px">志愿者中心<el-divider></el-divider></span>
                            </template>
                            <el-menu-item index="/volist">
                                {{mulu[0].name}}
                            </el-menu-item>
                            <el-menu-item index="/apply">
                                {{mulu[1].name}}
                            </el-menu-item>
                        </el-menu-item-group>
                        <img src="../../assets/erweima.jpg" width="130">
                        <el-menu-item-group title="扫一扫关注公众号">
                        </el-menu-item-group>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px"
                                 class="demo-ruleForm">
                            <h3 class="loginTitle">申请加入</h3>
                            <el-form-item label="姓名" prop="name">
                                <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" prop="place">
                                <el-input type="text" v-model="ruleForm.place" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="phone">
                                <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "apply",
        data() {
            const regPhone = /^1[0-9]{10}$/;
            const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            var checkPhone = (rule, value, callback) => {
                if (!regPhone.test(value)) {
                    callback(new Error('手机号码格式不正确'))
                } else {
                    callback();
                }
            };
            var checkEmail = (rule, value, callback) => {
                if (!regEmail.test(value)) {
                    callback(new Error('邮箱格式不正确'))
                } else {
                    callback();
                }
            };
            return {
                volunteer: [],
                mulu: [
                    {
                        name: '志愿者名单'
                    },
                    {
                        name: '申请加入'
                    }
                ],
                ruleForm: {
                    name: '',
                    place: '',
                    phone: '',
                    email: ''
                },
                rules: {
                    name: [
                        {required: true, message: "请输入姓名", trigger: "blur"}
                    ],
                    place: [
                        {required: true, message: "请输入地址", trigger: "blur"}
                    ],
                    phone: [
                        {required: true, message: "请输入电话号码", trigger: "blur"},
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: "请输入邮箱", trigger: "blur"},
                        {validator: checkEmail, trigger: 'blur'}
                    ]

                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams();
                        params.append("vname", this.ruleForm.name);
                        params.append("vplace", this.ruleForm.place);
                        params.append("vphone", this.ruleForm.phone);
                        params.append("vemail", this.ruleForm.email);
                        axios.post('http://localhost:8181/charity/volunteer/register', params).then(resp => {
                            // console.log(resp)
                            if (resp.status == 200) {
                                this.resetForm('ruleForm');
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>
    .bb {
        font-size: 14px;
        line-height: 0px;
    }
    .loginTitle {
        margin: 15px;
        text-align: center;
        color: #505458;
    }

    .demo-ruleForm {
        border-radius: 15px;
        background-clip: padding-box;
        margin: auto;
        width: 500px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }


</style>

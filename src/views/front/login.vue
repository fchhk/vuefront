<template>
    <div id="bkg">
        <!--element ui的表单验证规则配置 用 :rules="rules"这是简写的，本来是v-model:rules="rules"-->
        <!--:model 表单里面的数据对象-->
        <el-form :rules="rules" label-width="70px" :model="loginForm" class="loginContainer" ref="loginForm">
            <h3 class="loginTitle">系统登录</h3>
            <h5 align="right"><a href="/homeRegister">无账号，去注册</a></h5>
            <!--表单里面的每一项叫做<el-form-item></el-form-item,要加个prop属性，本来是不用加的，但是我们这个使用了字段校验，这种情况家就一定要加prop属性-->
            <el-form-item label="姓名" prop="username">
                <!--auto-complete:是否自动补全-->
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verifycode">
                <el-input type="text" id="code" v-model="loginForm.verifycode" class="code" placeholder="请输入验证码"
                          style="width: 250px"></el-input>

                <div class="login-code" @click="refreshCode">
                    <!--验证码组件-->
                    <s-identify :identifyCode="identifyCode"></s-identify>
                </div>
            </el-form-item>
            <!--            <el-form-item label="验证码" prop="verifycode">-->
            <!--<el-input type="text" id="code" v-model="code" auto-complete="off"
                      placeholder="请输入验证码"></el-input>-->
            <!--            </el-form-item>-->
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>


<script>
    import SIdentify from '../../components/sidentify'
    import {mapMutations} from "vuex";

    export default {
        name: "Login",
        components: {
            SIdentify
        },
        data() {
            return {
                identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
                identifyCode: "",
                // code: "",//text框输入的验证码

                user: [],
                loginForm: {
                    username: '李波',
                    password: '555666',
                    verifycode: ''
                },
                checked: true,
                rules: {
                    //required:true:用户名必填  如果没填就弹出““””“"请输入用户名",trigger:blur 触发的方式是blur失去焦点
                    username: [{required: true, message: "请输入用户名", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}],
                    verifycode: [{required: true, message: "请输入验证码", trigger: "blur"}]
                }
            }
        },

        methods: {
            ...mapMutations(['setToken']),
            //验证码
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },

            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                console.log(this.identifyCode);
            },


            submitLogin() {
                this.$refs.loginForm.validate((validate) => {
                    if (validate) {
                        let data = {"uname": this.loginForm.username, "upwd": this.loginForm.password}
                        if (this.loginForm.verifycode == this.identifyCode) {
                            axios({
                                method: "post",
                                url: 'user/login',
                                data: data
                            }).then(response => {
                                if (response.data.code == 10000) {
                                    //console.log(response)
                                    //console.log(response.data.data)
                                    this.$message.success('登录成功');
                                    this.token = response.data.data;
                                    //console.log(this.token)
                                    this.setToken({token: this.token});
                                } else {
                                    this.$message.error("用户名或密码错误");
                                    this.loginForm.username = '',
                                    this.loginForm.password = '';
                                    this.loginForm.verifycode = '';
                                    this.refreshCode();
                                }
                                if (this.$store.state.token) {
                                    this.$router.push('/homepage');
                                    //console.log(this.$store.state.token.token);
                                } else {
                                    this.$router.replace('/homeLogin');
                                }
                            })
                            /*  else
                                  {
                                      this.$message.error("请输入所有字段");
                                      return false;
                                  }*/
                        } else {
                            this.$message.error("验证码错误");
                            this.loginForm.username = '';
                            this.loginForm.password = '';
                            this.loginForm.verifycode = '';
                            this.refreshCode();
                        }
                        /* let data={"uname":this.loginForm.username,"upwd":this.loginForm.password};
                         axios({
                             method: "post",
                             url: 'user/login',
                             data: data
                         }).then(response => {
                             if (response.data.code == 10000) {
                                 console.log(response)
                                 //console.log(response.data.data)
                                 this.$message.success('登录成功');
                                 this.token = response.data.data;
                                 //console.log(this.token)
                                 this.setToken({token: this.token});
                             }
                             else{
                                 this.$message.error("用户名或密码错误");
                             }
                             if (this.$store.state.token) {
                                 this.$router.push('/homepage');
                                 console.log(this.$store.state.token.token);
                             } else {
                                 this.$router.replace('/homeLogin');
                             }
                         })
                     else {
                         this.$message.error("请输入所有字段");
                         return false;
                     }*/


                        /*    axios.post('http://localhost:8181/charity/user/login',data).then(response => {
                                //this.user = response.data
                                console.log(response)
                                if (this.user.length) {
                                    console.log(this.user.length)
                                    if (this.user[0].upwd == this.loginForm.password && this.loginForm.username == this.user[0].uname) {
                                        if (this.loginForm.verifycode == this.identifyCode) {
                                            console.log("true")
                                            this.$notify.success({
                                                title: '正确',
                                                message: '登录成功'
                                            });
                                            //this.$router.push("/index")
                                        } else {
                                            this.loginForm.verifycode = '';
                                            this.refreshCode();
                                            console.log("false");
                                            this.$notify.error({
                                                title: '错误',
                                                message: '验证码错误'
                                            });
                                        }

                                    } else {
                                        this.loginForm.password = '';
                                        this.loginForm.verifycode = '';
                                        console.log("false");
                                        this.$notify.error({
                                            title: '错误',
                                            message: '密码错误'
                                        });
                                    }
                                } else {
                                    this.loginForm = {};
                                    console.log("false")
                                    this.$notify.error({
                                        title: '错误',
                                        message: '用户名不存在'
                                    });
                                }
                            })*/
                        //this.$router.push("/test")//(this.$router.replace("/test")--replace没有历史即不能返回上个页面)

                    } else {
                        this.refreshCode();
                        this.$message.error("请输入所有字段");
                        return false;
                    }
                })
            }
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        /*        created() {
                    this.refreshCode()
                }*/
    }

</script>

<style scoped>
    #bkg {
        background: url("../../assets/login.jpg") center center no-repeat;
        background-size: 100% 100%;
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
    }

    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 150px auto;
        width: 450px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px;
        text-align: center;
        color: #505458;
    }

    /*验证码样式*/
    .code {
        display: flex;
        /* width: 200px;
         height: 20px;
         border: 1px solid rgba(186, 186, 186, 1);*/
    }

    .login-code {
        cursor: pointer;
        margin-left: 250px;
        margin-top: -35px;
    }


</style>

<template>
    <div id="bkg">
        <!--element ui的表单验证规则配置 用 :rules="rules"这是简写的，本来是v-model:rules="rules"-->
        <!--:model 表单里面的数据对象-->
        <el-form :rules="rules" label-width="70px" :model="loginForm" class="loginContainer" ref="loginForm">
            <h3 class="loginTitle">管理员登录</h3>
            <!--表单里面的每一项叫做<el-form-item></el-form-item,要加个prop属性，本来是不用加的，但是我们这个使用了字段校验，这种情况家就一定要加prop属性-->
            <el-form-item label="姓名" prop="username">
                <!--auto-complete:是否自动补全-->
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <!--            <el-checkbox label="记住密码" class="loginRember" v-model="checked"></el-checkbox>-->
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>


<script>
    import {mapMutations} from "vuex";

    export default {
        name: "Login",
        data() {
            return {
                auser: [],
                loginForm: {
                    username: 'admin',
                    password: '666999',
                },
                checked: true,
                rules: {
                    //required:true:用户名必填  如果没填就弹出““””“"请输入用户名",trigger:blur 触发的方式是blur失去焦点
                    username: [{required: true, message: "请输入用户名", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}],
                }
            }
        },
        /*        created() {
                    /!*            axios({
                                    method: 'get',
                                    url: 'http://127.0.0.1:8181/charity/auser/select',
                                    data: {},
                                    dataType: 'json',
                                    ContentType: 'application/json;charset-utf-8',
                                    headers: {
                                        'ContentType': 'application/json'
                                    }
                                }).then(response => {
                                    this.auser = response.data
                                    //console.log('data:' + this.auser[0].id+' '+this.auser[0].aname)
                                    console.log(this.auser)
                                    console.log("获取数据response:")
                                    console.log(response)
                                }).catch(error => {
                                    console.log(error)
                                })*!/
                    let aa = this.loginForm.username
                    axios.get('http://localhost:8181/charity/auser/select', {params: {aname: aa}}).then(response => {
                        alert("111")
                        this.auser = response.data
                        console.log(response)
                        //console.log(response.request.response)
                        console.log(response.data)
                    }).catch(error => {
                        console.log(error)
                    })
                    //.then(function(resp){this.books=resp.data}
                },*/
        methods: {
            ...mapMutations(['setToken']),
            submitLogin() {
                this.$refs.loginForm.validate((validate) => {
                    if (validate) {
                        let data={"aname":this.loginForm.username,"apwd":this.loginForm.password}
                        /*let params = new URLSearchParams();
                        params.append("aname", this.loginForm.username);
                        params.append("apwd", this.loginForm.password);*/
                        axios({
                            method: "post",
                            url: 'auser/login',
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
                            //this.$router.push({path: "/index"});

                            //var storage = window.localStorage;
                            //console.log(storage);
                            if (this.$store.state.token) {
                                this.$router.push('/index');
                                console.log(this.$store.state.token.token);
                            } else {
                                this.$router.replace('/login');
                            }
                        })

//根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
                        /* this.$store.commit('setToken', ["Authorization"]);

                         if (store.state.token) {
                             this.$router.push('/index')
                             console.log(store.state.token)
                         } else {
                             this.$router.replace('/login');
                         }*/
                        /* this.auser = response.data
                         console.log(response)
                         if (this.auser.length) {
                             console.log(this.auser.length)
                             if (this.auser[0].apwd == this.loginForm.password && this.loginForm.username == this.auser[0].aname) {
                                 console.log("true")
                                 this.$router.push("/index")
                             } else {
                                 console.log("false")
                                 alert("密码错误！")
                             }
                         } else {
                             console.log("false")
                             alert("用户名不存在！")
                         }*/
                    }
                    //this.$router.push("/test")//(this.$router.replace("/test")--replace没有历史即不能返回上个页面)

                    else {
                        this.$message.error("请输入所有字段");
                        return false;
                    }
                })
            }
        }
    }

</script>

<style scoped>
    #bkg {
        background: url("../assets/login.jpg") center center no-repeat;
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

    /*    .loginRember {
            text-align: left;
            margin: 0 0 25px 0;
        }*/
</style>

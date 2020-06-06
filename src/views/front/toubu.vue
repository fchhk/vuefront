<template>
    <div id="bkg">
        <el-container>
            <el-header height="140px">
                <el-row class="ee">
                    <el-col :span="12">
                        <img src="@/assets/header.jpg" align="left" width="1300px" height="100px"
                             style="margin-top: 30px">
                    </el-col>
                    <el-col :span="12" align="right" style="margin-top: 50px">
                        <el-button type="info" plain size="medium" @click="homeLogin" v-if="showbutton">登录</el-button>
                        <el-button type="info" plain size="medium" @click="homeRegister" v-if="showbutton">注册</el-button>
                        <div align="right" style="float: right;margin-top: 5px;margin-right: 20px" v-if="!showbutton">
                            <el-dropdown @command="handleCommand">
                                  <span class="el-dropdown-link">
                                      <el-avatar :size=60 style="font-size: 20px">{{this.name}}</el-avatar>
                                      <!--                                      <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                                  </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="/person"><el-button>个人资料</el-button></el-dropdown-item>
                                    <el-dropdown-item command="/updateUser"><el-button>修改信息</el-button></el-dropdown-item>
                                    <el-dropdown-item command="/homepage"><el-button @click="exit">退出登录</el-button></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>

                <!--            <el-main>-->
                <el-row>
                    <el-menu router
                             class="el-menu-demo"
                             mode="horizontal"
                             background-color="#0099a5"
                             text-color="#fff"
                             active-text-color="#ffd04b">
                        <el-menu-item index="/homepage">首页
                            <!--                            <router-link to="homepage" class="router-link">首页</router-link>-->
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">公益项目</template>
                            <el-menu-item index="/rescue">应急救援</el-menu-item>
                            <el-menu-item index="/help">社会援助</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">新闻中心</template>
                            <el-menu-item index="/newsinfo">新闻动态</el-menu-item>
                            <el-menu-item index="/boardinfo">网站公告</el-menu-item>
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title">志愿者中心</template>
                            <el-menu-item index="/volist">志愿者名单</el-menu-item>
                            <el-menu-item index="/apply">申请加入</el-menu-item>
                        </el-submenu>

                        <el-submenu index="5">
                            <template slot="title">信息披露</template>
                            <el-menu-item index="/receive">接收信息</el-menu-item>
                            <el-menu-item index="/expand">支出信息</el-menu-item>
                        </el-submenu>

                        <el-submenu index="6">
                            <template slot="title">爱心捐赠</template>
                            <el-menu-item index="/donpass">捐赠通道</el-menu-item>
<!--                            <el-menu-item index="/donquery">捐赠查询</el-menu-item>-->
                        </el-submenu>

                        <!--                        <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>-->
                    </el-menu>
                </el-row>
            </el-header>
            <!-- </el-main>-->
            <!--<el-col :span="8">
&lt;!&ndash;                    <img src="../../assets/ban2.jpg">&ndash;&gt;
            </el-col>-->


            <el-main>
                <!--<transition name="fade"></transition>-->
                <router-view></router-view>
            </el-main>

            <el-footer height="60px">
                <span>Copyright @2020 love in small town</span>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "toubu",
        data() {
            return {
                showbutton: false,
                name: '',
            };
        },
        methods: {
            homeLogin() {
                this.$router.push('/homeLogin')

            },
            homeRegister() {
                this.$router.push('/homeRegister')
            },
            handleCommand(command) {
                //this.$message('click on item ' + command);
                this.$router.push(command)
            },
            exit(){
                //console.log("清除了");
                window.localStorage.clear();
                this.$router.go(0)
                //window.location.reload()
                //this.$router.replace("/homeLogin")
            }
        },
        created() {
            if (this.$store.state.token == '') {
                this.showbutton = true;
            } else {
                axios.post('user/profile', null, {headers: {Authorization: "Bearer " + this.$store.state.token}}).then(response => {
                    //console.log(response.data.data);
                    this.name = response.data.data.uname
                });
            }
        }
    }
</script>

<style scoped>
    .router-link {
        text-decoration: none;
    }

    #bkg {
        position: absolute;
        width: 100%;
        top: 0px;
        left: 0px;
        line-height: 50px;
    }


    .el-footer {
        text-align: center;
        line-height: 60px;
        background-color: #38ada9;
    }

    .el-header {
        text-align: center;
        line-height: 60px;
    }

    .el-main {
        min-height: calc(100vh - 200px);
        text-align: center;
        line-height: 50px;
        margin-top: 25px;
    }

    .ee {
        background-color: #00a4b5;
        height: 140px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    /*.dd {
        margin-top: -10px;
    }

    .el-header {
        margin-top: 0px;
    }

    .el-main {
        margin-top: 20px;
    }

    .el-footer {
        background-color: #38ada9;
        margin-bottom: -6px;
    }*/
</style>

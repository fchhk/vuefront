<template>
    <div id="bkg">
        <el-container>
            <el-header height="180px">
                <el-row>
                    <el-col :span="12">
                        <img src="../../assets/logo.jpg">
                    </el-col>
                    <el-col :span="12" align="right">
                        <el-row>
                            <el-input v-model="input" placeholder="请输入搜素内容" size="medium"
                                      prefix-icon="el-icon-search" class="aa" v-if="showbutton"></el-input>
                            <el-button type="primary" icon="el-icon-search" size="medium" v-if="showbutton">搜索</el-button>
                            <el-button type="info" plain size="medium" @click="homeLogin" v-if="showbutton">登录
                            </el-button>
                            <el-button type="info" plain size="medium" @click="homeRegister" v-if="showbutton">注册
                            </el-button>
                        </el-row>
                        <el-row>
                            <div align="right" style="float: right;margin-top: 35px" v-if="!showbutton">
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
                                <!--<el-menu mode="horizontal" router>
                                    <el-submenu index="1">
                                    <template slot="title"> <el-avatar>{{this.name}}</el-avatar></template>
                                    <el-menu-item index="/person">个人资料</el-menu-item>
                                    <el-menu-item index="1-2">修改密码</el-menu-item>
                                    <el-menu-item index="/homeLogin">退出登录</el-menu-item>
                                    </el-submenu>
                                </el-menu>-->
                            </div>
                            <p style="font-family: 幼圆;font-size: 30px; margin-top: 50px;margin-right: 360px">山川异域 风月同天</p>
                        </el-row>
                    </el-col>
                </el-row>
            </el-header>

            <el-main>
                <el-row>
                    <el-menu router
                             :default-active="activeIndex2"
                             class="el-menu-demo"
                             mode="horizontal"
                             @select="handleSelect"
                             background-color="#00A4B5"
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
                <el-row>
                    <el-carousel :interval="5000" arrow="always" height="420px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <!--                            <h3>{{ item }}</h3>-->
                        </el-carousel-item>
                    </el-carousel>

                </el-row>
            </el-main>
            <el-container>
                <el-header class="min">
                    <el-row>
                        <el-col :span="2">
                            <router-link style="text-decoration: none; color: #00a4b5; font-size: 25px" to="/rescue">
                                公益项目
                            </router-link>
                        </el-col>
                        <el-col :span="1" :offset="21" style="font-size: 16px">
                            <router-link style="text-decoration: none" to="/rescue">
                                +更多
                            </router-link>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row>
                        <el-col :span="6" v-for="(item,index) in project" :key="index">
                            <router-link style="text-decoration: none"
                                         :to="{path:'/rescuecontent',query:{id:item.id}}">
                                <img :src="require('../../assets/projectPic/' + item.ppicpath)" alt="加载失败"
                                     class="pic">
                            </router-link>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" v-for="(item,index) in project" :key="index" class="contentcss">
                            {{item.pcontent}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col align="right" :span="6" v-for="(item,index) in project" :key="index">
                            <i class="el-icon-tickets"></i>
                            <span style="font-size: 12px">筹款目标：&yen;经常性项目</span>
                            <el-button type="success" plain @click="donation(item.id)" size="mini">立即捐款</el-button>
                        </el-col>
                    </el-row>
                    <el-row style="background-color: #99CCCC">
                        <span style="font-size: 28px; font-family: 幼圆">关注偏远地区的医疗与健康</span>
                    </el-row>
                </el-header>
            </el-container>

            <el-footer height="60px">
                <span>Copyright @2020 love in small town</span>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                showbutton: false,
                name: '',
                currentPage: 1,
                project: [],
                input: '',
                activeIndex: '1',
                activeIndex2: '1'
            };
        },

        methods: {
            handleCommand(command) {
                //this.$message('click on item ' + command);
                this.$router.push(command)
            },
            donation(id) {
                this.$router.push({
                    path: '/donation',
                    query: {
                        id: id
                    }
                });
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            homeLogin() {
                this.$router.push('/homeLogin')

            },
            homeRegister() {
                this.$router.push('/homeRegister')
            },
            exit(){
                window.localStorage.clear();
                this.$router.go(0)
            }

        },
        mounted() {
            // console.log(this.$store.state.token)
            if (this.$store.state.token == '') {
                this.showbutton = true;
            } else {
                axios.post('user/profile', null, {headers: {Authorization: "Bearer " + this.$store.state.token}}).then(response => {
                    //console.log(response.data.data);
                    this.name = response.data.data.uname;
                });
                //this.$router.push('/homepage');
            }
            axios({
                method: "get",
                url: 'http://localhost:8181/charity/cproject/selectByPage',
                params: {
                    currentPage: this.currentPage
                }
            }).then(response => {
                this.project = response.data.records;
                //console.log(response)
            });
        },

    }
</script>

<style scoped>

    .min {
        min-height: 80vh;
    }

    .router-link {
        text-decoration: none;
    }

    #bkg {
        position: absolute;
        width: 100%;
        top: 0px;
        left: 0px;
    }


    .el-header, .el-footer {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-footer {
        background-color: #38ada9;
    }


    .el-main {
        /*min-height: 130vh;*/
        background-color: #00a4b5;
        color: #333;
        text-align: center;
        line-height: 50px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-carousel__item h3 {
        color: #ff0022;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background: url("../../assets/ban2.jpg");
        background-size: 100% 100%;
        /*background-color: #ffd5d1;*/
    }

    .el-carousel__item:nth-child(2n+1) {
        background: url("../../assets/ban1.jpg");
        background-size: 100% 100%;
        /*background-color: #ffffff;*/
    }

    .aa {
        width: 300px;
    }

    .el-menu-demo {
        font-size: 20px;
    }

    .el-menu-item {
        font-size: 20px;
    }

    .pic {
        height: 250px;
        width: 365px;
    }

    .contentcss {
        font-family: 幼圆;
        font-size: 14px;
        text-align: left;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 20px;
    }
</style>

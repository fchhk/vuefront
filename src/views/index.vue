<template>
    <div id="bkg">
        <el-container>
            <!-- 顶栏 -->
            <el-header height="60px">
                <el-row>
                    <el-col :span="12">
                        <h3 align="left">love in small town</h3>
                    </el-col>
                    <el-col :span="12" align="right" style="margin-top: 10px">
<!--                        <el-row>hello {{this.name}}</el-row>-->
                        <el-row>hello admin</el-row>
                        <el-row style="font-size: 14px; margin-top: 10px">{{this.time}}</el-row>
<!--                        <h4 align="right">你好！ {{this.name}}</h4>-->
                    </el-col>
                </el-row>
            </el-header>
            <!-- 嵌套容器 -->
            <el-container>
                <!-- 侧边导航菜单 -->
                <el-aside width="280px">
                    <el-col :span="24" align="left">
                        <el-menu router background-color="#2C3A47"
                                 text-color="#fff"
                                 active-text-color="#ffd04b"
                                 :default-active="$route.path"
                        >
                            <!--                                 @open="handleOpen"
                                                             @close="handleClose"-->

                            <!--:default-openeds="['3']"
                            :default-active="$router.options.routes[3].children[0].path"-->
                            <!--<el-submenu v-for="(item,index) in $router.options.routes" :index="index+''"
                                        v-if="item.show">
                                <template slot="title">
                                    <i class="el-icon-ice-cream-square"></i>
                                    {{item.name}}
                                </template>

                                <el-submenu v-for="(item2,index2) in item.children" :index="index2+''">
                                    <template slot="title">
                                        <i class="el-icon-milk-tea"></i>
                                        {{item2.name}}
                                    </template>
                                    <el-menu-item v-for="(item3,index3) in item2.children" :index="item3.path">
                                        <i class="el-icon-cold-drink"></i>
                                        {{item3.name}}
                                    </el-menu-item>
                                </el-submenu>-->

                            <!--                               <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                                                                         :class="$route.path==item2.path?'is-active':''">
                                                               <i class="el-icon-milk-tea"></i>
                                                               {{item2.name}}
                                                              &lt;!&ndash; <el-submenu index="1-4">
                                                                   <template slot="title">选项4</template>
                                                                   <el-menu-item index="1-4-1">选项1</el-menu-item>
                                                               </el-submenu>&ndash;&gt;
                                                           </el-menu-item>-->
                            <!--                            </el-submenu>-->
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-milk-tea"></i>
                                    <span>用户管理</span>
                                </template>
                                <el-menu-item index="/userlist">
                                    <i class="el-icon-cold-drink"></i>
                                    <span>用户列表</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>新闻公告</span>
                                </template>
                                <el-submenu index="2-1">
                                    <template slot="title">
                                        <i class="el-icon-apple"></i>
                                        <span>新闻管理</span>
                                    </template>
                                    <el-menu-item index="/newslist">
                                        <i class="el-icon-watermelon"></i>
                                        <span>新闻列表</span>
                                    </el-menu-item>
                                    <el-menu-item index="/addnews">
                                        <i class="el-icon-watermelon"></i>
                                        <span>新增新闻</span>
                                    </el-menu-item>
                                </el-submenu>
                                <el-submenu index="2-2">
                                    <template slot="title">
                                        <i class="el-icon-apple"></i>
                                        <span>公告管理</span>
                                    </template>
                                    <el-menu-item index="/boardlist">
                                        <i class="el-icon-watermelon"></i>
                                        <span>公告列表</span>
                                    </el-menu-item>
                                    <el-menu-item index="/addboard">
                                        <i class="el-icon-watermelon"></i>
                                        <span>新增公告</span>
                                    </el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-mic"></i>
                                    <span>公益项目</span>
                                </template>
                                <el-submenu index="3-1">
                                    <template slot="title">
                                        <i class="el-icon-first-aid-kit"></i>
                                        <span>应急救援</span>
                                    </template>
                                    <el-menu-item index="/projectlist">
                                        <i class="el-icon-sunny"></i>
                                        <span>项目列表</span>
                                    </el-menu-item>
                                    <el-menu-item index="/addproject">
                                        <i class="el-icon-sunny"></i>
                                        <span>新增项目</span>
                                    </el-menu-item>
                                </el-submenu>
                                <el-submenu index="3-2">
                                    <template slot="title">
                                        <i class="el-icon-first-aid-kit"></i>
                                        <span>社会援助</span>
                                    </template>
                                    <el-menu-item>
                                        <i class="el-icon-sunny"></i>
                                        <span>援助列表</span>
                                    </el-menu-item>
                                    <el-menu-item>
                                        <i class="el-icon-sunny"></i>
                                        <span>新增援助</span>
                                    </el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-submenu index="4">
                                <template slot="title">
                                    <i class="el-icon-wind-power"></i>
                                    <span>志愿者中心</span>
                                </template>
                                <el-menu-item index="/volunteerlist">
                                    <i class="el-icon-hot-water"></i>
                                    <span>志愿者列表</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="5">
                                <template slot="title">
                                    <i class="el-icon-folder-checked"></i>
                                    <span>信息披露</span>
                                </template>
                                <el-menu-item index="/addpay">
                                    <i class="el-icon-sold-out"></i>
                                    <span>支出</span>
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                        <!--                        <el-menu-->
                        <!--                                router-->
                        <!--                                :default-openeds="['1','2']"-->
                        <!--                                :default-active="'/userlist'"-->
                        <!--                                class="el-menu-vertical-demo"-->
                        <!--                                @open="handleOpen"-->
                        <!--                                @close="handleClose"-->
                        <!--                                background-color="#545c64"-->
                        <!--                                text-color="#fff"-->
                        <!--                                active-text-color="#ffd04b">-->


                        <!--                            &lt;!&ndash;                            <el-menu-item index="2">-->
                        <!--                                                            <i class="el-icon-menu"></i>-->
                        <!--                                                            <span slot="title">导航二</span>-->
                        <!--                                                        </el-menu-item>-->
                        <!--                                                        <el-menu-item index="3">-->
                        <!--                                                            <i class="el-icon-document"></i>-->
                        <!--                                                            <span slot="title">导航三</span>-->
                        <!--                                                        </el-menu-item>-->
                        <!--                                                        <el-menu-item index="4">-->
                        <!--                                                            <i class="el-icon-setting"></i>-->
                        <!--                                                            <span slot="title">导航四</span>-->
                        <!--                                                        </el-menu-item>&ndash;&gt;-->
                        <!--                        </el-menu>-->
                    </el-col>
                </el-aside>
                <!-- 内容 -->
                <el-main>
                    <!-- 第一列栅格布局 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
            <!-- 底栏 -->
            <el-footer height="47px">
                &copy;fchhk 2020
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                name: '',
                time: ''
            }
        },
        created() {
            //console.log(this);
          /*  axios.post('auser/profile', null, {headers: {Authorization: "Bearer " + this.$store.state.token}}).then(response => {
                //console.log(response.data.data.aname);
                this.name = response.data.data.aname
            });*/
            var aData = new Date();
            //console.log(aData) //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)
            this.time = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
            //console.log(this.time) //2019-8-20
        }
        /*        data() {
                    return {
                        user: [{
                            id: '',
                            uname: '',
                            upwd: '',
                            uemail: '',
                            createtime: '',
                            updatetime: ''
                        }]
                    }
                },
                methods: {
                    handleOpen(key, keyPath) {
                        console.log(key, keyPath);
                    },
                    handleClose(key, keyPath) {
                        console.log(key, keyPath);
                    },
                }*/
    }
</script>

<style scoped>
    #bkg {
        /*background-size: 100% 100%;*/
        position: absolute;
        width: 100%;
        top: 0px;
        left: 0px;
        text-align: center;
        /*right: 0px;*/
        /*bottom: 0px;*/
    }

    .el-header {
        background-color: #485460;
        color: white;
    }

    .el-footer {
        background-color: #38ada9;
        color: black;
        line-height: 50px;
        text-align: center;
    }

    .el-aside {
        background-color: #2C3A47;
    }

    .el-main {
        background-color: #ffffff;
        height: 85vh;
    }

    .el-col {
        height: 574px;
    }

    .col1 {
        background-color: #ffffff;
    }

    .col2 {
        background-color: tomato;
    }

    .col3 {
        background-color: thistle;
    }

</style>

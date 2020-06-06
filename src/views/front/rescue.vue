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
                            <template slot="title"><span style="font-size: 28px">公益项目<el-divider></el-divider></span>
                            </template>
                            <el-menu-item index="/rescue">
                                {{mulu[0].name}}
                            </el-menu-item>
                            <el-menu-item index="/help">
                                {{mulu[1].name}}
                            </el-menu-item>
                        </el-menu-item-group>
                        <img src="../../assets/erweima.jpg" width="130">
                        <el-menu-item-group title="扫一扫关注公众号">
                        </el-menu-item-group>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main v-for="(item,index) in project" :key="index">
                        <el-row>
                            <el-col align="left" :span="5">
                                <router-link style="text-decoration: none"
                                             :to="{path:'/rescuecontent',query:{id:item.id}}">
                                    <img :src="require('../../assets/projectPic/'+item.ppicpath)" alt="加载失败"
                                         class="pic">
                                </router-link>
                            </el-col>
                            <el-col align="left" :span="19">
                                <el-row>
                                    <el-col :span="18">
                                        <el-row>
                                            <router-link style="text-decoration: none"
                                                         :to="{path:'/rescuecontent',query:{id:item.id}}">
                                                <h3>{{item.pname}}</h3>
                                            </router-link>
                                        </el-row>
                                        <!--<el-row>
                                            <h4>已筹金额:&nbsp;&yen;{{money}}元</h4>
                                        </el-row>-->
                                    </el-col>
                                    <el-col :span="6" align="right">
                                        <el-button type="success" plain @click="donation(item.id)">我要捐款</el-button>
                                        <!--                                        {{item.updateTime.substr(0,10)}}-->
                                    </el-col>
                                </el-row>
                                <el-row class="contentcss">
                                    {{item.pcontent}}
                                </el-row>
                            </el-col>
                            <!-- <el-col :span="4" style="float: right">
                                 {{item.updateTime.substr(0,10)}}
                             </el-col>-->

                        </el-row>
                    </el-main>
                    <el-footer>
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="size"
                                layout="total, prev, pager, next, jumper"
                                :total="total" hide-on-single-page>
                        </el-pagination>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "rescue",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                project: [],
                money:'',
                mulu: [
                    {
                        name: '应急救援'
                    },
                    {
                        name: '社会援助'
                    }
                ]
            }
        },
        methods: {
            donation(id) {
                this.$router.push({
                    path: '/donation',
                    query: {
                        id: id
                    }
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
                })
            }
        },
        mounted() {
            // console.log(this.$route)
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
                //console.log(response)
            });
            /*axios({
                method: 'get',
                url: 'http://localhost:8181/charity/donation/findMoney',
                params: {
                    id: this.project.id,
                }
            }).then(response => {
                this.money=response.data;
                console.log(response)
            })*/
           // http://localhost:8181/charity/donation/findMoney?id=9
        }
    }
</script>

<style scoped>
    .bb {
        font-size: 14px;
        line-height: 0px;
    }

    .contentcss {
        line-height: 25px;
        padding-top: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .pic {
        height: 150px;
        width: 200px;
    }

</style>

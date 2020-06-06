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
                            <template slot="title"><span style="font-size: 28px">新闻中心<el-divider></el-divider></span>
                            </template>
                            <el-menu-item index="/newsinfo">
                                {{mulu[0].name}}
                            </el-menu-item>
                            <el-menu-item index="/boardinfo">
                                {{mulu[1].name}}
                            </el-menu-item>
                        </el-menu-item-group>
                        <img src="../../assets/erweima.jpg" width="130">
                        <el-menu-item-group title="扫一扫关注公众号">
                        </el-menu-item-group>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main v-for="(item,index) in board" :key="index">
                        <el-col align="left" :span="20" style="float: left">
                            <router-link style="text-decoration: none" :to="{path:'/boardcontent',query:{id:item.id}}">
                                {{item.btitle}}
                            </router-link>
                            <!--<el-link :underline="false" href="/content/{index}">
                                <i class="el-icon-caret-right"></i>
                                {{item.btitle}}
                            </el-link>-->
                        </el-col>
                        <el-col :span="4" style="float: right">
                            {{item.updateTime.substr(0,10)}}
                        </el-col>
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
        name: "boardInfo",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                board: [],
                mulu: [
                    {
                        name: '新闻动态'
                    },
                    {
                        name: '网站公告'
                    }
                ]
            }
        },
        methods: {
            handleCurrentChange(val) {
                axios({
                    method: "get",
                    url: 'http://localhost:8181/charity/board/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.board = response.data.records;
                    this.total = response.data.total;
                    this.size = response.data.size;
                })
            }
        },
        mounted() {
            // console.log(this.$route)
            axios({
                method: "get",
                url: 'http://localhost:8181/charity/board/selectByPage',
                params: {
                    currentPage: this.currentPage
                }

            }).then(response => {
                this.board = response.data.records;
                this.total = response.data.total;
                this.size = response.data.size;
                //console.log(response)

            })
        }
    }
</script>

<style scoped>
    .bb {
        font-size: 14px;
        line-height: 0px;
    }


</style>

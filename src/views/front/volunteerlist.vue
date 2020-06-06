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
                        <el-table
                                :data="volunteer"
                                border
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="vname"
                                    label="姓名"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="vplace"
                                    label="地址"
                                    width="210">
                            </el-table-column>
                            <el-table-column
                                    prop="vphone"
                                    label="电话号码"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="vemail"
                                    label="邮箱"
                                    width="230">
                            </el-table-column>
                            <el-table-column
                                    prop="createTime"
                                    label="加入时间"
                                    width="429">
                            </el-table-column>
                        </el-table>
                    </el-main>
                    <!--<el-main v-for="(item,index) in volunteer" :key="index">
                        <el-col align="left" :span="20" style="float: left">
                            <router-link style="text-decoration: none" :to="{path:'/rescuecontent',query:{id:item.id}}">
                                {{item.pname}}
                            </router-link>
                        </el-col>
                        <el-col :span="4" style="float: right">
                            {{item.updateTime.substr(0,10)}}
                        </el-col>
                    </el-main>-->
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
        name: "volunteerlist",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                volunteer: [],
                mulu: [
                    {
                        name: '志愿者名单'
                    },
                    {
                        name: '申请加入'
                    }
                ]
            }
        },
        methods: {
            handleCurrentChange(val) {
                axios({
                    method: "get",
                    url: 'http://localhost:8181/charity/volunteer/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.volunteer = response.data.records;
                    this.total = response.data.total;
                    this.size = response.data.size;
                })
            }
        },
        mounted() {
            // console.log(this.$route)
            axios({
                method: "get",
                url: 'http://localhost:8181/charity/volunteer/selectByPage',
                params: {
                    currentPage: this.currentPage
                }

            }).then(response => {
                this.volunteer = response.data.records;
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

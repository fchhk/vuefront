<template>
    <div class="qq">
        <el-container>
            <el-header>
                <el-divider></el-divider>
            </el-header>
            <el-container>
                <el-aside>
                    <el-menu router>
                        <el-menu-item-group>
                            <template slot="title"><span style="font-size: 28px">信息披露<el-divider></el-divider></span>
                            </template>
                            <el-menu-item index="/receive">
                                {{mulu[0].name}}
                            </el-menu-item>
                            <el-menu-item index="/expand">
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
                                :data="donation"
                                border
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="dname"
                                    label="姓名"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="dmoney"
                                    label="金额"
                                    width="210">
                            </el-table-column>
                            <el-table-column
                                    prop="dgoods"
                                    label="物资"
                                    width="350">
                            </el-table-column>
                            <el-table-column
                                    prop="createTime"
                                    label="捐赠时间"
                                    width="350">
                            </el-table-column>
                        </el-table>
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
        name: "receive",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                donation: [],
                mulu: [
                    {
                        name:'接收信息'
                    },
                    {
                        name:'支出信息'
                    }
                ]
            }
        },
        methods:{
            handleCurrentChange(val) {
                axios({
                    method: "get",
                    url: 'http://localhost:8181/charity/donation/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.donation = response.data.records;
                    this.total = response.data.total;
                    this.size = response.data.size;
                })
            }
        },
        created() {
            axios({
                method: "get",
                url: 'http://localhost:8181/charity/donation/selectByPage',
                params: {
                    currentPage: this.currentPage
                }

            }).then(response => {
                this.donation = response.data.records;
                this.total = response.data.total;
                this.size = response.data.size;
                //console.log(response)
            })
        }
    }
</script>

<style scoped>
    .qq {
        font-size: 14px;
        line-height: 0px;
    }


</style>

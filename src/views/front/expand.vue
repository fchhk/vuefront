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
                                :data="pay"
                                border
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="ptitle"
                                    label="支出项目名"
                                    width="250">
                            </el-table-column>
                            <el-table-column
                                    prop="pmoney"
                                    label="金额"
                                    width="210">
                            </el-table-column>
                            <el-table-column
                                    prop="pgoods"
                                    label="货物"
                                    width="350">
                            </el-table-column>
                            <el-table-column
                                    prop="createTime"
                                    label="支出时间"
                                    width="329">
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
        name: "expand",
        data() {
            return {
                total: 0,
                size: 0,
                currentPage: 1,
                pay: [],
                mulu: [
                    {
                        name: '接收信息'
                    },
                    {
                        name: '支出信息'
                    }
                ]
            }
        },
        methods: {
            handleCurrentChange(val) {
                axios({
                    method: "get",
                    url: 'http://localhost:8181/charity/pay/selectByPage',
                    params: {
                        currentPage: val
                    }

                }).then(response => {
                    this.pay = response.data.records;
                    this.total = response.data.total;
                    this.size = response.data.size;
                })
            }
        },
        mounted() {
            // console.log(this.$route)
            axios({
                method: "get",
                url: 'http://localhost:8181/charity/pay/selectByPage',
                params: {
                    currentPage: this.currentPage
                }

            }).then(response => {
                this.pay = response.data.records;
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
